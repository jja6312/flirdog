package access.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import access.bean.JoinRequestDTO;
import access.repository.AccessDogsInfoRepository;
import access.repository.AccessRepository;
import jakarta.servlet.http.HttpSession;
import user.bean.DogsBreed;
import user.bean.DogsInfo;
import user.bean.Score;
import user.bean.User;

@Service
public class AccessServiceImpl implements AccessService {
	@Autowired
    public AccessRepository accessRepository;
	@Autowired
	public AccessDogsInfoRepository accessDogsInfoRepository;
	   
	   @Override
	    public Optional<User> login(String email, String passwd) {
	        return accessRepository.findByEmailAndPasswd(email, passwd);
	    }

	   @Override
	   public Optional<User> findId(Long id) {
	      Optional<User> user = accessRepository.findById(id);
	      System.out.println("UserService id값 찾기 : " + user);
	      return user;
	   }

	   @Override
	   public List<DogsInfo> getFiveDogsInfo() {
	       return accessRepository.getFiveDogsInfo();
	   }

	   @Override
	    public void processJoin(JoinRequestDTO joinRequest, HttpSession session) {
		   
		// 실제 폴더
		 //s3문제
//		 		String filePath = session.getServletContext().getRealPath("/public/storage");
		 		String filePath = session.getServletContext().getRealPath("/public/image/product/");
		 		System.out.println("실제폴더 = " + filePath);

		 		File file;
		 		String originalFileName;
		 		String fileName;
		 		
		 		List<String> imagePaths = new ArrayList<>();
		 		
		 		MultipartFile image = joinRequest.getImage();
		   
		 	// 이미지가 없는 경우 지정된 이미지사용
				if (image.isEmpty()) {
					imagePaths.add("/image/nullImage/nullImage1.png"); // 대체 이미지 경로 또는 빈 문자열
				} else {
		   
				originalFileName = image.getOriginalFilename();
				System.out.println("originalFileName: " + originalFileName);
//s3문제
//				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/", img);
				fileName = UUID.randomUUID().toString() + ".png";
				
//s3문제
//				file = new File(filePath, originalFileName);
				file = new File(filePath, fileName);

//s3문제
//				imagePaths.add("flirdogStorage/" + fileName);
				imagePaths.add("/image/product/" + fileName);

				try {
					image.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
				}
			
		   
	        User user = joinRequest.getUser();
	        DogsInfo dogsInfo = joinRequest.getDogsInfo();
	        String imageAiProfile = joinRequest.getImageAiProfile();
	        DogsBreed dogsBreed = joinRequest.getDogsBreed();
	        Score score = new Score();
	        score.setTotalScore((double) 0);
	        score.setVoteCount(0);
	        score.setAverageScore((double)0);        
	        user.setPoint((long) 0);
	        User savedUser = accessRepository.save(user);
	        dogsInfo.setUser(savedUser);
	        dogsInfo.setImageAiProfile(imageAiProfile);
	        dogsInfo.setDogsBreed(dogsBreed);	        
	        dogsInfo.setScore(score);        
	        dogsInfo.setImage(imagePaths.get(0));
	        accessDogsInfoRepository.save(dogsInfo);
	        
	        
	    }


}
