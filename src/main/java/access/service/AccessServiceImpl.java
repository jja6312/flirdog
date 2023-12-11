package access.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import access.bean.JoinRequestDTO;
import access.repository.AccessBragBoardRepository;
import access.repository.AccessDogsInfoRepository;
import access.repository.AccessMatchingRepository;
import access.repository.AccessProductRepository;
import access.repository.AccessRepository;
import admin.service.ObjectStorageService;
import community.bean.BragBoardDTO;
import jakarta.servlet.http.HttpSession;
import matching.bean.MatchingDTO;
import product.bean.Product;
import user.bean.Address;
import user.bean.DogsBreed;
import user.bean.DogsInfo;
import user.bean.Score;
import user.bean.User;
import user.bean.UserRole;

@Service
public class AccessServiceImpl implements AccessService {
	@Autowired
	public AccessRepository accessRepository;
	@Autowired
	public AccessDogsInfoRepository accessDogsInfoRepository;
	@Autowired
	public AccessMatchingRepository accessMatchingRepository;
	@Autowired
	public AccessProductRepository accessProductRepository;
	@Autowired
	public AccessBragBoardRepository accessBragBoardRepository;

	@Autowired
	private ObjectStorageService objectStorageService;
	private String bucketName = "bitcamp-edu-bucket-112";

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
		return accessDogsInfoRepository.getFiveDogsInfo();
	}

	@Override
	public void processJoin(JoinRequestDTO joinRequest, HttpSession session) {

		// 실제 폴더
		// s3문제
		String filePath = session.getServletContext().getRealPath("/public/storage");
		// String filePath =
		// session.getServletContext().getRealPath("/public/image/product/");
		System.out.println("실제폴더 = " + filePath);

		File file;
		String originalFileName;
		String fileName;

		List<String> imagePaths = new ArrayList<>();

		MultipartFile image = joinRequest.getImage();

		// 이미지가 없는 경우 지정된 이미지사용
		if (image == null || image.isEmpty()) {
			imagePaths.add("/image/nullImage/nullImage1.png"); // 대체 이미지 경로 또는 빈 문자열
		} else {

			originalFileName = image.getOriginalFilename();
			System.out.println("originalFileName: " + originalFileName);
			// s3문제
			fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/dogs/",
					image);
			// fileName = UUID.randomUUID().toString() + ".png";

			// s3문제
			file = new File(filePath, originalFileName);
			// file = new File(filePath, fileName);

			// s3문제
			imagePaths.add("flirdogStorage/dogs/" + fileName);
			// imagePaths.add("/image/product/" + fileName);

			try {
				image.transferTo(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		User user = joinRequest.getUser();
		DogsInfo dogsInfo = joinRequest.getDogsInfo();
		Address address = joinRequest.getAddress();
		address.setUser(user);
		  if (user.getAddresses() == null) {
		        user.setAddresses(new ArrayList<>());
		    }
		    user.getAddresses().add(address);
		    
		if (dogsInfo != null) {
			String imageAiProfile = joinRequest.getImageAiProfile();
			System.out.println("###dogsInfo에넣을게?: " + joinRequest.getDogsBreed());
			DogsBreed dogsBreed = joinRequest.getDogsBreed();
			System.out.println("###dogsInfo에넣음: " + dogsBreed);
			Score score = new Score();
			score.setTotalScore((double) 0);
			score.setVoteCount(0);
			score.setAverageScore((double) 0);
			user.setPoint((long) 0);
			user.setUserRole(UserRole.USER);
			
			User savedUser = accessRepository.save(user);
			dogsInfo.setUser(savedUser);
			dogsInfo.setImageAiProfile(imageAiProfile);
			dogsInfo.setDogsBreed(dogsBreed);
			dogsInfo.setScore(score);
			dogsInfo.setImage(imagePaths.get(0));
			accessDogsInfoRepository.save(dogsInfo);
		} else {
			System.out.println("### 회원가입시 dogsInfo null값들어옴.");
		}

	}

	@Override
	public boolean checkEmailExist(String email) {
		return accessRepository.findByEmail(email).isPresent();
	}

	@Override
	public void saveDogScore(String dogsIdStr, String scoreStr) {
		Double scoreValue = Double.parseDouble(scoreStr);
		Long dogsId = Long.parseLong(dogsIdStr);
		Optional<DogsInfo> optionalDogsInfo = accessDogsInfoRepository.findById(dogsId);

		if (optionalDogsInfo.isPresent()) {
			DogsInfo dogsInfo = optionalDogsInfo.get();
			Score dogScore = dogsInfo.getScore();

			if (dogScore == null) {
				dogScore = new Score();
				dogsInfo.setScore(dogScore);
			}

			dogScore.calulateAverageScore(scoreValue);
			accessDogsInfoRepository.save(dogsInfo);
		} else {
			System.out.println("dogsInfo를 찾을수없음!");
		}
	}

	@Override
	public void updatePwd(String email, String passwd) {
		Optional<User> userOptional = accessRepository.findByEmail(email);
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			user.setPasswd(passwd);
			accessRepository.save(user);
		} else {
			System.out.println("###유저가 없어요!");
		}

	}

	@Override
	public Optional<User> getUserInfoAsDogId(String dogIdStr) {
		Long dogId = Long.parseLong(dogIdStr);
		return accessDogsInfoRepository.findById(dogId)
				.map(DogsInfo::getUser);
	}

	@Override
	public Optional<MatchingDTO> getMatchingTable(String dogName, String userIdStr) {
		Long userId = Long.parseLong(userIdStr);
		List<MatchingDTO> list = accessMatchingRepository.findTopByDogNameAndUserIdOrderByDesc(dogName, userId);
		return list.isEmpty() ? Optional.empty() : Optional.ofNullable(list.get(0));
	}

	@Override
	public List<User> getUserInfoArray() {

		return accessRepository.findTop3ByOrderByCommunityScoreDesc();

	}

	@Override
	public Optional<DogsInfo> getDogsInfoArray(String userIdStr) {
		Long userId = Long.parseLong(userIdStr);
		List<DogsInfo> list = accessDogsInfoRepository.findByUserId(userId);
		return list.isEmpty() ? Optional.empty() : Optional.ofNullable(list.get(0));
	}

	@Override
	public List<User> getUserInfoArrayLocation(String location) {
	    return accessRepository.findTop3ByAddresses_AddressContainingOrderByCommunityScoreDesc(location);
	}

	@Override
	public List<Product> getProductInfoArray() {
		
		return accessProductRepository.findTop8ByOrderByHitDesc();
	}

	@Override
	public List<BragBoardDTO> getBragBoard() {
		// 
		return accessBragBoardRepository.findTop10ByOrderByHitDesc();
	}

	@Override
	public List<BragBoardDTO> getBragBoardClosestDate10() {
		
		return accessBragBoardRepository.findTop10ByOrderByCreatedAtDesc();
	}

	@Override
	public List<BragBoardDTO> getBoardList() {
		
		return accessBragBoardRepository.findAll();
	}

	@Override
	public void boardDelete(String boardId) {
		accessBragBoardRepository.deleteById(Long.parseLong(boardId));
		
	}

	@Override
	public void boardDeleteSelected(String boardId) {
		
		String[] boardIdArray = boardId.split(",");

		for (String id : boardIdArray) {
			accessBragBoardRepository.deleteById(Long.parseLong(id));
		}
		
	}

	@Override
	public List<DogsInfo> getDogsInfoArrayByBeautyScore() {

		return accessDogsInfoRepository.findTop3ByOrderByAverageScoreDesc();
	}

	@Override
	public Optional<User> getUserInfoArrayOfThreeDogsInfo(String userIdStr) {
	    Long userId = Long.parseLong(userIdStr);
	    return accessRepository.findById(userId); 
	}

	public List<DogsInfo> getDogsInfoByLocationAndBeautyScore(String location) {
        return accessDogsInfoRepository.findByAddressOrderedByAverageScore(location);
    }

	
	   

}
