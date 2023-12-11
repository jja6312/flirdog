package somoim.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import matching.repository.MatchingRepository;
import product.bean.Hit;
import somoim.bean.Somoim;
import somoim.bean.SomoimList;
import somoim.bean.SomoimPhoto;
import somoim.repository.SomoimListRepository;
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
}
