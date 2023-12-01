package somoim.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import somoim.bean.Somoim;
import somoim.bean.SomoimList;
import somoim.bean.SomoimListDTO;
import somoim.repository.SomoimListRepository;
import somoim.repository.SomoimRepository;
import somoim.repository.SomoimUserRepository;
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
		    real.setUser(somoim.getUser());
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
	        SomoimList somoimList = new SomoimList(somoim.get(), user.get(), false);
	        somoimListRepository.save(somoimList); // 저장

	        // 저장된 SomoimList 엔터티 반환
	        System.out.println("서비스 somoimList 소모임네임 : " + somoimList.getSomoim().getSomoimName());
	        return Optional.of(somoimList);
	    } else {
	        return Optional.empty();
	    }
	}
//	public List<SomoimListDTO> getSomoimListDTO(Long id) {
//        List<SomoimList> somoimList = somoimListRepository.findById(id);
//        return somoimList.stream()
//                .map(this::convertToDTO)
//                .collect(Collectors.toList());
//    }
//
//    private SomoimListDTO convertToDTO(SomoimList somoimList) {
//        return new SomoimListDTO(
//                somoimList.getId(),
//                somoimList.getSomoim().getId(),
//                somoimList.getUser().getId(),
//                somoimList.isAdmin()
//        );
//    }

	@Override
	public Optional<SomoimList> isSomoimMember(Long userId, Long somoimId) {		
		System.out.println("여기는 서비스 소모임가입여부 : "+userId);
		return somoimListRepository.findByUserIdAndSomoimId(userId, somoimId);
	}
}
