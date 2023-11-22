package matching.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import admin.service.ObjectStorageService;
import jakarta.servlet.http.HttpSession;
import matching.bean.Matching;
import matching.bean.MatchingPurpose;
import matching.bean.MatchingState;
import matching.repository.MatchingRepository;
import user.bean.DogsInfo;

@Service
public class DateMatchingServiceImpl implements DateMatchingService {
	
	@Autowired
	private ObjectStorageService objectStorageService;
	private String bucketName ="bitcamp-edu-bucket-111";
	
	@Autowired
	private MatchingRepository matchingRepository;

	@Override
	public void dateWrite(Matching matchingDTO, DogsInfo dogsDTO, String matchingPurpose, String matchingState, List<MultipartFile> imgFiles, HttpSession session) {
		
		MatchingPurpose matchingPurposeEnum = MatchingPurpose.valueOf(matchingPurpose);
		MatchingState matchingStateEnum = MatchingState.valueOf(matchingState);
		
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);
		
		File file;
		String originalFileName;
		String fileName;
		
		List<String> imagePaths = new ArrayList<>();
		
		// 이미지가 없는 경우 지정된 이미지사용
	    if (imgFiles.isEmpty() || imgFiles.get(0).isEmpty()) {
	        imagePaths.add("/image/nullImage/nullImage1.png"); // 대체 이미지 경로 또는 빈 문자열
	    }else {
	    	for(MultipartFile img : imgFiles) {
	    		originalFileName = img.getOriginalFilename();
	    		System.out.println("originalFileName: "+originalFileName);
	    		
	    		fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/", img);
	    		file = new File(filePath, originalFileName);
	    		
	    		imagePaths.add("flirdogStorage/"+fileName);
	    		
	    		try {
	    			img.transferTo(file);
	    		} catch (IOException e) {
	    			e.printStackTrace();
	    		}
	    	}
	    	
	    }
	    
	    Matching matchingBuilder = Matching.builder()
	    		.title(matchingDTO.getTitle())
	    		.id(matchingDTO.getId())
	    		.content(matchingDTO.getContent())
	    		.image(String.join(",", imagePaths))
	    		.matchingPurpose(matchingPurposeEnum)
				.matchingState(matchingStateEnum) 
				.hit(matchingDTO.getHit())
				.user(matchingDTO.getUser())
				.dogsInfo(dogsDTO)
	    		.build();
	    
	    matchingRepository.save(matchingBuilder);
	}

}
