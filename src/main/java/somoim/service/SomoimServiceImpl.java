package somoim.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import matching.repository.MatchingRepository;
import somoim.bean.Somoim;
import somoim.bean.SomoimList;
import somoim.bean.SomoimPhoto;
import somoim.bean.SomoimPhotoComment;
import somoim.bean.SomoimPhotoLike;
import somoim.repository.SomoimListRepository;
import somoim.repository.SomoimPhotoCommentRepository;
import somoim.repository.SomoimPhotoLikeRepository;
import somoim.repository.SomoimPhotoRepository;
import somoim.repository.SomoimRepository;
import somoim.repository.SomoimUserRepository;
import user.bean.DogsInfo;
import user.bean.User;

@Service
public class SomoimServiceImpl implements SomoimService {
	
	@Autowired
	private SomoimRepository somoimRepository;
	@Autowired
	private SomoimUserRepository somoimUserRepository;
	@Autowired
	private SomoimListRepository somoimListRepository;
	@Autowired
	private MatchingRepository matchingRepository;
	@Autowired
	private SomoimPhotoRepository somoimPhotoRepository;
	@Autowired
	private SomoimPhotoLikeRepository somoimPhotoLikeRepository;
	@Autowired
	private SomoimPhotoCommentRepository somoimPhotoCommentRepository;
	
	@Autowired
	private ObjectStorageService objectStorageService;
	private String bucketName ="bitcamp-edu-bucket-112";
	
	// 소모임 개설
	@Override
	@Transactional
	public void write(Somoim somoim, MultipartFile introducePhoto, HttpSession session) {
		System.out.println("서비스 소모임 : " + somoim);
		System.out.println("서비스 이미지 : " + introducePhoto);
		
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);
		
		File file;
		String originalFileName;
		String fileName;
		
		String imagePaths;
		
		// 이미지가 없는 경우 지정된 이미지사용
	    if (introducePhoto.isEmpty()) {
	        imagePaths = "/image/main/main1.png"; // 대체 이미지 경로 또는 빈 문자열
	    }else {
	    	originalFileName = introducePhoto.getOriginalFilename();
	        System.out.println("originalFileName: " + originalFileName);
	        
	        // UUID 생성
	        fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/somoim/", introducePhoto);
	        file = new File(filePath, originalFileName);

	        imagePaths = "flirdogStorage/somoim/" + fileName;

	        try {
	        	introducePhoto.transferTo(file);
	        } catch (IOException e) {
	            e.printStackTrace();
	        }//try-catch
	        
	        Somoim real = new Somoim();
		    //BeanUtils.copyProperties(somoim, real);
		    
		    real.setSomoimName(somoim.getSomoimName());
		    real.setIntroduceSub(somoim.getIntroduceSub());
		    real.setIntroduceDetail(somoim.getIntroduceDetail());
		    if (!imagePaths.isEmpty()) {
		    	real.setIntroducePhoto(originalFileName);
		    	real.setIntroducePhotoUUID(fileName);
		    }
		    real.setMemberCount(somoim.getMemberCount());
		    real.setLocation(somoim.getLocation());
		    real.setTarget(somoim.getTarget());
		    real.setAddress(somoim.getAddress());
		    real.setAddress2(somoim.getAddress2());
		    real.setZipcode(somoim.getZipcode());
		    real.setUser(somoim.getUser());
		    real.setAccountName(somoim.getAccountName());
		    real.setAccountEmail(somoim.getAccountEmail());
		    real.setAccountPhone(somoim.getAccountPhone());
		    
		    System.out.println("서비스단 : " + real.toString());
			somoimRepository.save(real);
	    	
			 // 새로 추가: SomoimList에 값 추가
	        SomoimList somoimList = new SomoimList();
	        somoimList.setSomoim(real);
	        somoimList.setUser(somoim.getUser());
	        System.out.println("somoimList : " + somoimList.toString());
	        somoimListRepository.save(somoimList);
	    }//if	
	   
	}

	@Override
	public Optional<Somoim> getSomoimForm(Long id) {
		Optional<Somoim> getSomoim = somoimRepository.findById(id);
		System.out.println("서비스 getSomoim : " + getSomoim);
		return getSomoim;
	}
	
	@Override
	public Optional<User> getUser(String userIdStr) {
		Long userId = Long.parseLong(userIdStr);
		//Integer userId = Integer.parseInt(userIdStr);
		
		System.out.println("여기는 서비스"+userId);
		return somoimUserRepository.findById(userId);
	}

	@Override
	public List<Somoim> getSomoimList() {
		// 순서 거꾸로 정렬
		Sort sortByCreatedAtDesc = Sort.by(Sort.Direction.DESC, "id");
		return somoimRepository.findAll(sortByCreatedAtDesc);
	}
	
	// 소모임 회원가입
	@Override
	public Optional<SomoimList> joinSomoim(Long somoimId, Long userId) {
		Optional<Somoim> somoim = somoimRepository.findById(somoimId);
		Optional<User> user = somoimUserRepository.findById(userId);
		
		if (somoim.isPresent() && user.isPresent()) {     
	        SomoimList somoimList = new SomoimList(somoim.get(), user.get(), 0);
	        somoimListRepository.save(somoimList); // 저장

	        // 저장된 SomoimList 엔터티 반환
	        System.out.println("서비스 somoimList 소모임네임 : " + somoimList.getSomoim().getSomoimName());
	        return Optional.of(somoimList);
	    } else {
	        return Optional.empty();
	    }
	}

	@Override
	public Optional<SomoimList> isSomoimMember(Long somoimId, Long userId) {		
		System.out.println("여기는 서비스 소모임가입여부 아이디 : "+ userId);
		Optional<SomoimList> somoimListOptional  = somoimListRepository.findBySomoimIdAndUserId(somoimId, userId);
		
		if(somoimListOptional.isPresent()) {
			SomoimList somoimList = somoimListOptional.get();
			System.out.println("somoimListOptional.isPresent(): " + somoimListOptional.isPresent());
		} else {
			System.out.println("소모임 가입여부 서비스단 레포지토리 조회 에러");
		}
		return somoimListOptional;
	}

	// 소모임 회원수 조회
	@Override
	public Long getMemberCount(Long somoimId) {
		Long memberCount = somoimListRepository.countBySomoimId(somoimId);
		System.out.println("서비스단 소모임 회원수 조회 : " + memberCount);
		return memberCount;
	}
	
	// 소모임 리스트 조회
	@Override
	public List<SomoimList> getSomoimAllList(Long somoimId) {
		
		List<SomoimList> somoimAllList = somoimListRepository.findAllBySomoimId(somoimId);
		if (!somoimAllList.isEmpty()) {
	        System.out.println("서비스단 소모임 리스트 : " + somoimAllList);
	        return somoimAllList;
	    } else {
	        // 해당 ID에 해당하는 소모임이 없을 경우에 대한 처리
	        return Collections.emptyList();
	    }
	}
	
	// 소모임 가입회원 목록 조회
	@Override
	public List<User> getSomoimUserList(Long somoimId) {
		
		return somoimUserRepository.findSomoimUsers(somoimId);
	}
	
	// 독스인포 조회
	@Override
	public List<DogsInfo> getDogsInfo() {
		List<DogsInfo> dogsInfo = matchingRepository.findAll();
		
		System.out.println("서비스단 독스인포 조회 : " + dogsInfo.toString());
		return dogsInfo;
	}
	
	// 회원목록 삭제
	@Transactional
	@Override
	public String deleteUser(Long somoimId, Long userId) {
		try {
	        somoimListRepository.deleteBySomoimIdAndUserId(somoimId, userId);
	        return "강퇴 성공!!!";
	    } catch (Exception e) {
	        // 예외 처리 및 실패 시 메시지 반환
	        e.printStackTrace(); // 또는 로깅
	        return "강퇴 실패";
	    }
	}

	// 사진첩 사진 등록
	@Override
	public void somoimPhotoUpload(SomoimPhoto somoimPhoto, List<MultipartFile> imgFiles, HttpSession session) {
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

				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/somoim/somoimPhoto/", img);
				file = new File(filePath, originalFileName);

				imagePaths.add("flirdogStorage/somoim/somoimPhoto/" + fileName);

				try {
					img.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}//for

		}//if
		
		SomoimPhoto somoimPhotoBuilder = SomoimPhoto.builder()
				.id(somoimPhoto.getId())
				.photoTitle(somoimPhoto.getPhotoTitle())
				.photoContent(somoimPhoto.getPhotoContent())
				.photoLink(somoimPhoto.getPhotoLink())
				.photoLike(somoimPhoto.getPhotoLike())
				.hit(somoimPhoto.getHit())
				.somoimPhoto(String.join(",", imagePaths))
				.user(somoimPhoto.getUser())
				.somoim(somoimPhoto.getSomoim())
				.build();
		System.out.println("서비스단 사진첩 업로드 : " + somoimPhotoBuilder.getPhotoTitle());
		somoimPhotoRepository.save(somoimPhotoBuilder);
		
	}
	
	// 사진첩 목록 조회
	@Override
	public List<SomoimPhoto> somoimPhotoList(Long somoimId) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		List<SomoimPhoto> somoimPhotoList = somoimPhotoRepository.findBySomoimId(somoimId, sort);
		
		for (int i=0; i < somoimPhotoList.size(); i++) {
			String photoTitle = somoimPhotoList.get(i).getPhotoTitle();
			String photoContent = somoimPhotoList.get(i).getPhotoContent();
			int hit = somoimPhotoList.get(i).getHit();
			System.out.println("서비스단 photoTitle : " + photoTitle + ", hit : " + hit);
		}
		
		return somoimPhotoList;
	}
	
	//사진첩 게시글 삭제
	@Override
	public void somoimPhotoDelete(Long id, Long userId, Long somoimId) {
		System.out.println("여기는 서비스 사진첩 글삭제 아이디 : "+ userId);
		Optional<SomoimList> photoDelete  = somoimListRepository.findBySomoimIdAndUserId(somoimId, userId);
		
		if(photoDelete.isPresent()) {
			int isAdmin = photoDelete.get().getIsAdmin();
			System.out.println("photoDelete.isPresent(): " + photoDelete.isPresent());
			
			if(isAdmin != 2) {
				somoimPhotoRepository.deleteByIdAndUserId(id, userId);
			}// 안쪽 if
		} else {
			System.out.println("소모임 사진첩 삭제 서비스단 소모임리스트 레포지토리 조회 에러");
		}//바깥 if
		
		
	}
	
	// 사진첩 게시글 조회
	@Override
	public Optional<SomoimPhoto> somoimPhotoCount(Long id) {
		 // 해당 ID에 대한 Photo 엔티티 조회
		Optional<SomoimPhoto> somoimPhoto = somoimPhotoRepository.findById(id);
				
		// 조회수 증가 및 저장
		if(somoimPhoto.isPresent()) {
			SomoimPhoto photoCount = somoimPhoto.get();
			photoCount.setHit(photoCount.getHit() + 1);
			this.somoimPhotoRepository.save(photoCount);
			
			return Optional.of(photoCount);
		} else {
            throw new RuntimeException("somoimPhoto not found with id: " + id);
        }
		
	}
	
	// 사진첩 좋아요 등록 여부 조회
	@Override
	public boolean isSomoimPhotoLiked(Long userId, Long photoId) {
		System.out.println("서비스단 사진첩 좋아요 여부조회 userId 잘 받아왔나? " + userId);
		System.out.println("서비스단 사진첩 좋아요 여부조회 photoId 잘 받아왔나? " + photoId);
		
		boolean isLiked = somoimPhotoLikeRepository.findByUserAndSomoimPhoto(userId, photoId).isPresent();
		System.out.println("서비스단 사진첩 좋아요 등록여부 조회 : " + isLiked);
		return isLiked;
    }

	// 사진첩 좋아요 등록
	@Override
	public void somoimPhotoLikes(Long userId, Long photoId) {
		System.out.println("(전)userId의 값 : " + userId);
		System.out.println("(전)photoId의 값 : " + photoId);
		
	
		//Optional<SomoimPhoto> photo = somoimPhotoRepository.findById(photoId);
		Optional<User> user = somoimUserRepository.findById(userId);
		System.out.println("(후)userId의 값 : " + user);
		Optional<SomoimPhoto> photo = Optional.of(somoimPhotoRepository.getOne(photoId));
		System.out.println("(후)photoId의 값 : " + photo);
		//Optional<SomoimPhotoLike> likeOptional = somoimPhotoLikeRepository.findByUserAndSomoimPhoto(userId, photoId);
        
		if (photo.isPresent() && user.isPresent()) {
        	SomoimPhotoLike somoimPhotoLike = new SomoimPhotoLike();
        	somoimPhotoLike.setUser(user.get());
        	somoimPhotoLike.setSomoimPhoto(photo.get());
        			
        	somoimPhotoLikeRepository.save(somoimPhotoLike);
        } else {
        	System.out.println("Optional.empty() ???? : " + Optional.empty());
        }//if문
	}
	
	// 사진첩 좋아요 취소
	@Override
	public void somoimPhotoUnLikes(Long userId, Long photoId) {
		System.out.println("서비스단 좋아요 등록 및 취소 userId 잘 받아왔나 ? " + userId);
		System.out.println("서비스단 좋아요 등록 및 취소 photoId 잘 받아왔나 ? " + photoId);
	    Optional<SomoimPhotoLike> likeOptional = somoimPhotoLikeRepository.findByUserAndSomoimPhoto(userId, photoId);
	    likeOptional.ifPresent(somoimPhotoLikeRepository::delete);
	}
	
	// 사진첩 좋아요 받은 개수 조회
	@Override
	public Long somoimPhotoLikeCount(Long photoId) {
		System.out.println("서비스단 사진첩 좋아요 개수 조회를 위한 게시글 아이디 : " + photoId);
		Long likeCount = somoimPhotoLikeRepository.countBySomoimPhoto_Id(photoId);
		System.out.println("서비스단 사진첩 좋아요 개수 조회 : " + likeCount);
		return likeCount;
	}
	
	// 모임 하이라이트를 위한 사진첩 전체 조회
	@Override
	public List<SomoimPhoto> somoimPhotoListAll() {
		//Sort sort = Sort.by(Sort.Direction.DESC, "id");
		List<SomoimPhoto> somoimPhotoList = somoimPhotoRepository.getFindAllOrderByLikesCount();
		
		// 제대로 값을 가져왔는지 확인용
		for (int i=0; i < somoimPhotoList.size(); i++) {
			String photoTitle = somoimPhotoList.get(i).getPhotoTitle();
			String photoContent = somoimPhotoList.get(i).getPhotoContent();
			int hit = somoimPhotoList.get(i).getHit();
			System.out.println("서비스단 전체 photoTitle : " + photoTitle + ", hit : " + hit);
		}
		
		return somoimPhotoList;
	}

	// 사진첩 수정
//	@Override
//	public void somoimPhotoUpdate(SomoimPhoto pinDetails, 
//			List<MultipartFile> imgFiles, HttpSession session) {
//		System.out.println("서비스단 pinDetails : " + pinDetails);
//		if (imgFiles != null) {
//	        for (MultipartFile img : imgFiles) {
//	            System.out.println("서비스단 imgFiles : " + img);
//	        }
//	    }
//		
//		// 이미지 업로드 및 경로 설정
//	    List<String> imagePaths = new ArrayList<>();
//
//	    if (imgFiles != null && !imgFiles.isEmpty()) {
//	        // 새 이미지가 등록된 경우, 기존 이미지 삭제 후 새 이미지 추가
//	        deleteExistingImages(pinDetails); // 기존 이미지 삭제
//	        for (MultipartFile img : imgFiles) {
//	            String fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/somoim/somoimPhoto/", img);
//	            imagePaths.add("flirdogStorage/somoim/somoimPhoto/" + fileName);
//	        }
//	    } else {
//	        // 새 이미지가 등록되지 않은 경우, 기존 이미지 유지
//	        imagePaths = Arrays.asList(pinDetails.getSomoimPhoto().split(","));
//	    }
//
//	    // DB에 저장할 이미지 URL 구성
//	    String somoimPhotoUrls = String.join(",", imagePaths);
//
//	    // 기존 데이터 가져오기
//	    SomoimPhoto existingData = somoimPhotoRepository.findById(pinDetails.getId())
//	    		.orElseThrow(() -> new EntityNotFoundException("SomoimPhoto not found"));
//
//	    // 수정된 데이터 설정
//	    existingData.setPhotoTitle(pinDetails.getPhotoTitle());
//	    existingData.setPhotoContent(pinDetails.getPhotoContent());
//	    existingData.setPhotoLink(pinDetails.getPhotoLink());
//	    existingData.setPhotoLike(pinDetails.getPhotoLike());
//	    existingData.setHit(pinDetails.getHit());
//	    existingData.setSomoimPhoto(somoimPhotoUrls);
//
//	    // 데이터 업데이트
//	    somoimPhotoRepository.save(existingData);
//
//	}
	
	@Override
	@Transactional
	public void somoimPhotoUpdate(SomoimPhoto pinDetails, 
			List<MultipartFile> imgFiles, 
			List<MultipartFile> newImgFiles, HttpSession session) {
	    System.out.println("서비스단 pinDetails : " + pinDetails);
	    
	    
	    
	    if (newImgFiles != null) {
	        for (MultipartFile newImg : newImgFiles) {
	            System.out.println("서비스단 newImgFiles : " + newImg);
	        }
	    }
	    
	    if (imgFiles != null) {
	        for (MultipartFile img : imgFiles) {
	            System.out.println("서비스단 imgFiles : " + img);
	        }
	    }

	    File file;
		String originalFileName;
		String fileName;
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);

	    // 이미지 업로드 및 경로 설정
	    List<String> imagePaths = new ArrayList<>();

	    String somoimPhotoUrls = null;  // 변수를 if 블록 외부에서 선언

	    if (newImgFiles == null) {
	        Optional<SomoimPhoto> data = somoimPhotoRepository.findById(pinDetails.getId());
	        String originImg = data.get().getSomoimPhoto();
	        System.out.println("서비스단 originImg : " + originImg);
	        somoimPhotoUrls = String.join(",", originImg);  // 기존 이미지가 있는 경우 값을 설정
	    } 
	    if (newImgFiles != null) {
	    	for (MultipartFile newImg : newImgFiles) {
	    		originalFileName = newImg.getOriginalFilename();
				System.out.println("originalFileName: " + originalFileName);
	            fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/somoim/somoimPhoto/", newImg);
	            file = new File(filePath, originalFileName);
	            imagePaths.add("flirdogStorage/somoim/somoimPhoto/" + fileName);
	            try {
	            	newImg.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
	        }
	    	somoimPhotoUrls = String.join(",", imagePaths);  // 기존 이미지가 없는 경우 값을 설정
	    }


	    // 새 이미지 업로드
//	    if (newImgFiles != null && !newImgFiles.isEmpty()) {
//	        for (MultipartFile newImg : newImgFiles) {
//	            String fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/somoim/somoimPhoto/", newImg);
//	            imagePaths.add("flirdogStorage/somoim/somoimPhoto/" + fileName);
//	        }
//	    }
	    
	    // DB에 저장할 이미지 URL 구성
	    //somoimPhotoUrls = String.join(",", imagePaths);

	    // 기존 데이터 가져오기
	    SomoimPhoto existingData = somoimPhotoRepository.findById(pinDetails.getId())
	            .orElseThrow(() -> new EntityNotFoundException("SomoimPhoto not found"));

	    // 수정된 데이터 설정
	    existingData.setPhotoTitle(pinDetails.getPhotoTitle());
	    existingData.setPhotoContent(pinDetails.getPhotoContent());
	    existingData.setPhotoLink(pinDetails.getPhotoLink());
	    existingData.setPhotoLike(pinDetails.getPhotoLike());
	    existingData.setHit(pinDetails.getHit());
	    existingData.setSomoimPhoto(somoimPhotoUrls);

	    // 데이터 업데이트
	    somoimPhotoRepository.save(existingData);
	}

	
	private void deleteExistingImages(SomoimPhoto pinDetails) {
	    // 기존 이미지 경로 가져오기
	    String existingSomoimPhoto = pinDetails.getSomoimPhoto();

	    if (existingSomoimPhoto != null && !existingSomoimPhoto.isEmpty()) {
	        // 이미지 경로를 쉼표(,)를 기준으로 분리
	        String[] existingImagePaths = existingSomoimPhoto.split(",");

	        for (String imagePath : existingImagePaths) {
	            try {
	                // 이미지 경로에서 파일명 추출
	                String fileName = extractFileNameFromPath(imagePath);

	                // 기존 이미지 삭제
	                objectStorageService.deleteList(bucketName, fileName);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	}

	// 파일 경로에서 파일명 추출
	private String extractFileNameFromPath(String filePath) throws IOException {
	    Path path = Paths.get(filePath);
	    return path.getFileName().toString();
	}

	// 댓글 등록
//	@Override
//	public void somoimPhotoReply(String comment, Long userId, Long somoimId, Long photoId) {
//		SomoimPhotoComment reply = new SomoimPhotoComment();
//		
//		reply.setId(reply.getId());
//		reply.setComment(reply.getComment());
//		reply.setSomoim(reply.getSomoim());
//		reply.setUser(reply.getUser());
//		reply.setSomoimPhoto(reply.getSomoimPhoto());
//		reply.setCDept(reply.getCDept());
//		reply.setParentComment(reply.getParentComment());
//		
//		System.out.println("서비스단 : " + reply.toString());
//		somoimPhotoCommentRepository.save(reply);
//	}
	
	@Override
	public void somoimPhotoReply(String comment, Long userId, Long somoimId, Long photoId) {
		
		System.out.println("서비스단 comment : " + comment);
	    System.out.println("서비스단 comment id : " + userId);
	    System.out.println("서비스단 comment somoimId : " + somoimId);
	    System.out.println("서비스단 comment somoimPhoto : " + photoId);
	    
	    // 해당 엔티티로부터 값을 가져오기
	    User user = somoimUserRepository.findUserById(userId);
	    Somoim somoim = somoimRepository.findSomoimById(somoimId);
	    SomoimPhoto somoimPhoto = somoimPhotoRepository.findSomoimPhotoById(photoId);
	    
	    SomoimPhotoComment reply = new SomoimPhotoComment();
	    reply.setComment(comment);
	    reply.setUser(user);
	    reply.setSomoim(somoim);
	    reply.setSomoimPhoto(somoimPhoto);
	    reply.setCDept(reply.getCDept());
	    reply.setParentComment(reply.getParentComment());

	    System.out.println("서비스단 : " + reply.toString());
	    somoimPhotoCommentRepository.save(reply);
	}

	
	// 댓글 목록 조회
	@Override
	public List<SomoimPhotoComment> getSomoimPhotoReply(Long somoimPhotoId) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		List<SomoimPhotoComment> photoReplyList = somoimPhotoCommentRepository.findBySomoimPhotoId(somoimPhotoId, sort);
		
		for (int i=0; i < photoReplyList.size(); i++) {
			String photoComment = photoReplyList.get(i).getComment();
			Long commentId = photoReplyList.get(i).getId();
			
			// parentComment가 null이 아닌 경우에 대해서만 출력
	        if (photoReplyList.get(i).getParentComment() != null) {
	            Long parentCommentId = photoReplyList.get(i).getParentComment().getId();
	            System.out.println("서비스단 photoComment : " + photoComment + 
	                ", CommentId : " + commentId + ", parentComment : " + parentCommentId);
	        } else {
	            System.out.println("서비스단 photoComment : " + photoComment + 
	                ", CommentId : " + commentId + ", parentComment : null");
	        }
		}
		
		return photoReplyList;
	}
	
	// 사진첩 댓글 삭제
	@Override
	@Transactional
	public void photoReplyDelete(Long commentId, Long userId) {
		System.out.println("사진첩 댓글삭제 서비스단에서 CommentId 확인 : " + commentId + 
							" & UserId 확인 : " + userId);
		
		somoimPhotoCommentRepository.deleteByIdAndUserId(commentId, userId);
		
		Optional<SomoimPhotoComment> comment = somoimPhotoCommentRepository.findByIdAndUserId(commentId, userId);
	    if (comment.isPresent()) {
	        somoimPhotoCommentRepository.deleteByIdAndUserId(commentId, userId);
	    } else {
	        // 존재하지 않는 댓글에 대한 처리
	    }
	}
	
}
