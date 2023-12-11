package community.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import admin.service.ObjectStorageService;
import community.bean.BragBoardCommentDTO;
import community.bean.BragBoardDTO;
import community.repository.BoastBoardCommentRepository;
import community.repository.BoastBoardRepository;
import community.repository.BoastBoardUserRepository;
import jakarta.servlet.http.HttpSession;
import matching.bean.MatchingDTO;
import user.bean.DogsInfo;
import user.bean.Score;
import user.bean.User;

@Service
public class BragBoardServiceImpl implements BragBoardService {
	@Autowired
	private ObjectStorageService objectStorageService;
	private String bucketName = "bitcamp-edu-bucket-112";
	
	@Autowired
	private BoastBoardUserRepository boastBoardUserRepository;
	
	@Autowired
	private BoastBoardRepository boastBoardRepository;
	
	@Autowired
	private BoastBoardCommentRepository boastBoardCommentRepository;

	@Override
	public void boastBoardWrite(BragBoardDTO boardWriteDTO, List<MultipartFile> imgFiles, HttpSession session) {
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);

		File file;
		String originalFileName;
		String fileName;

		List<String> imagePaths = new ArrayList<>();

		// 이미지가 없는 경우 지정된 이미지사용
		if (imgFiles.isEmpty() || imgFiles.get(0).isEmpty()) {
			imagePaths.add("/image/nullImage/nullImage1.png"); // 대체 이미지 경로 또는 빈 문자열
		} else {
			for (MultipartFile img : imgFiles) {
				originalFileName = img.getOriginalFilename();
				System.out.println("originalFileName: " + originalFileName);

				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/bragCommunity/", img);
				file = new File(filePath, originalFileName);

				imagePaths.add("flirdogStorage/bragCommunity/" + fileName);

				try {
					img.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}
		
		// MatchingDTO에서 communityScore 업데이트
	    int additionalCommunityScore = 5; // 필요에 따라 값을 조절할 수 있습니다.
		
	    // User 엔티티에서 communityScore 업데이트
	    Long userId = boardWriteDTO.getUserId();
	    User user = boastBoardUserRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("ID에 해당하는 사용자를 찾을 수 없습니다: " + userId));
	    int userCommunityScore  = user.getCommunityScore() + additionalCommunityScore;
	    String userNick = user.getNickname();
	    user.setCommunityScore(userCommunityScore);
	    int updatedCommunityScore = user.getCommunityScore(); // getCommunityScore 메서드가 있다고 가정
	    boardWriteDTO.setCommunityScore(updatedCommunityScore);
	    
	    BragBoardDTO boardWriteDTOBuilder = BragBoardDTO.builder()
				.userId(boardWriteDTO.getUserId())
				.userNickName(userNick)
				.title(boardWriteDTO.getTitle())
				.content(boardWriteDTO.getContent())
				.image(String.join(",", imagePaths))
				.hit(boardWriteDTO.getHit())
				.likeScore(boardWriteDTO.getLikeScore())
				.commentCount(boardWriteDTO.getCommentCount())
				.communityScore(updatedCommunityScore)
				.build();

	    boastBoardRepository.save(boardWriteDTOBuilder);
		
		boastBoardUserRepository.save(user);
	}

	@Override
	public List<BragBoardDTO> getBoastBoardList() {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
	    List<BragBoardDTO> bragBoardDTOList = boastBoardRepository.findAll(sort);
	    
	    for (BragBoardDTO bragBoardDTO : bragBoardDTOList) {
	        Long userId = bragBoardDTO.getUserId();

	        // 유저 엔티티에서 communityScore 업데이트
	        User user = boastBoardUserRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("ID에 해당하는 사용자를 찾을 수 없습니다: " + userId));
	        int userCommunityScore = user.getCommunityScore();
	        bragBoardDTO.setCommunityScore(userCommunityScore);

	        // 해당 게시글의 댓글 수 가져오기
	        Long boardId = bragBoardDTO.getId();  // 변수명 변경
	        int commentCount = boastBoardCommentRepository.countByBoardId(boardId);

	        // 게시글의 댓글 수 업데이트
	        bragBoardDTO.setCommentCount(commentCount);

	        // MatchingDTO 저장 (이 부분이 댓글 수를 가져오는 것이 아니라 게시글의 댓글 수를 업데이트하는 것)
	        boastBoardRepository.save(bragBoardDTO);
	    }

	    return bragBoardDTOList;
	}

	@Override
	public void boastCommentWrite(BragBoardCommentDTO bragBoardCommentDTO) {		
		// 새로운 댓글 추가
	    BragBoardCommentDTO newComment = BragBoardCommentDTO.builder()
	            .boardId(bragBoardCommentDTO.getBoardId())
	            .userId(bragBoardCommentDTO.getUserId())
	            .userNickName(bragBoardCommentDTO.getUserNickName())
	            .content(bragBoardCommentDTO.getContent())
	            .build();

	    boastBoardCommentRepository.save(newComment);
	    
	    int additionalCommunityScore = 1; // 필요에 따라 값을 조절할 수 있습니다.
	    // 해당 게시글의 commentCount 증가 및 저장
	    Long boardId = bragBoardCommentDTO.getBoardId();
	    
	    BragBoardDTO bragBoardDTO = boastBoardRepository.findById(boardId)
	            .orElseThrow(() -> new RuntimeException("해당 글을 찾을 수 없습니다. " + boardId));
	    
	    Long userId = newComment.getUserId();
	    User user = boastBoardUserRepository.findById(userId)
	    			.orElseThrow(() -> new RuntimeException("ID에 해당하는 사용자를 찾을 수 없습니다: " + userId));
	    int userCommunityScore  = user.getCommunityScore() + additionalCommunityScore;
	    
	    user.setCommunityScore(userCommunityScore);
	    
	    
	    // commentCount를 1 증가시키고 저장
	    int commentCount = bragBoardDTO.getCommentCount();
	    bragBoardDTO.setCommentCount(commentCount + 1);
	    boastBoardUserRepository.save(user);
	    boastBoardRepository.save(bragBoardDTO);
	}
	
	public List<BragBoardCommentDTO> getBoastBoardCommentList(Long boardId){
		List<BragBoardCommentDTO> bragBoardCommentList = boastBoardCommentRepository.findAllByBoardId(boardId);
		
		return bragBoardCommentList;
	}

	@Override
	public Optional<BragBoardDTO> getBoastBoard(Long boardId) {
		Optional<BragBoardDTO> optionalBragBoardDTO = boastBoardRepository.findById(boardId);

	    // Optional.isPresent()를 사용하여 optionalBragBoardDTO가 비어있지 않은 경우에만 처리
	    if (optionalBragBoardDTO.isPresent()) {
	        BragBoardDTO bragBoardDTO = optionalBragBoardDTO.get();
	        bragBoardDTO.incrementHit(); // 조회수 증가
	        
	        boastBoardRepository.save(bragBoardDTO);
	        return Optional.of(bragBoardDTO); // 수정된 DTO를 Optional로 감싸서 반환
	    }

	    return optionalBragBoardDTO; // Optional이 비어있으면 그대로 반환
	}

	@Override
	public int getBoardCommentCount(Long boardId) {
	    // 게시글에 해당하는 댓글 개수 조회
	    int commentCount = boastBoardCommentRepository.countByBoardId(boardId);

	  return commentCount;
	}

	@Override
	@Transactional
	public void getBoastBoardDelete(Long boardId) {
		boastBoardRepository.deleteById(boardId);
		boastBoardCommentRepository.deleteByBoardId(boardId);
	}

	@Override
	public List<BragBoardDTO> getSearchBoastBoardList(String searchValue, String inputValue) {
		List<BragBoardDTO> bragBoardDTOList;

	    if ("all".equals(searchValue)) {
	        // 'all'이면 모든 게시물을 가져오도록 설정
	        bragBoardDTOList = boastBoardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	    } else if ("content".equals(searchValue)) {
	        // 'content'면 content 값으로 검색하고 id로 정렬
	        bragBoardDTOList = boastBoardRepository.findByContentContainingOrderByIdDesc(inputValue);
	    } else if ("title".equals(searchValue)) {
	        // 'title'이면 title 값으로 검색하고 id로 정렬
	        bragBoardDTOList = boastBoardRepository.findByTitleContainingOrderByIdDesc(inputValue);
	    } else {
	        // 그 외의 경우에는 모든 게시물을 가져오도록 설정
	        bragBoardDTOList = boastBoardRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	    }

        return bragBoardDTOList;
	}
	
	
}
