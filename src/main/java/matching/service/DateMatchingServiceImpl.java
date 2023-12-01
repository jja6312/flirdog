package matching.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import admin.service.ObjectStorageService;
import jakarta.persistence.TypedQuery;
import jakarta.servlet.http.HttpSession;
import matching.bean.Matching;
import matching.bean.MatchingDTO;
import matching.bean.MatchingPurpose;
import matching.bean.MatchingState;
import matching.repository.MatchingDTORepository;
import matching.repository.MatchingRepository;
import user.bean.DogsInfo;
import user.bean.User;

@Service
public class DateMatchingServiceImpl implements DateMatchingService {

	@Autowired
	private ObjectStorageService objectStorageService;
	private String bucketName = "bitcamp-edu-bucket-112";

	@Autowired
	private MatchingRepository matchingRepository;

	@Autowired
	private MatchingDTORepository matchingDTORepository;

	@Override
	public void dateWriteTest(MatchingDTO matchingDTO, List<MultipartFile> imgFiles, HttpSession session) {

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

				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/matching/", img);
				file = new File(filePath, originalFileName);

				imagePaths.add("flirdogStorage/matching/" + fileName);

				try {
					img.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}

		MatchingDTO matchingDTOBuilder = MatchingDTO.builder()
				.userId(matchingDTO.getUserId())
				.title(matchingDTO.getTitle())
				.content(matchingDTO.getContent())
				.dogName(matchingDTO.getDogName())
				.dogAge(matchingDTO.getDogAge())
				.dogGender(matchingDTO.getDogGender())
				.isNeutralized(matchingDTO.getIsNeutralized())
				.dogMBTI(matchingDTO.getDogMBTI())
				.dogBreed(matchingDTO.getDogBreed())
				.date(matchingDTO.getDate())
				.matchingState(matchingDTO.getMatchingState())
				.matchingAddress(matchingDTO.getMatchingAddress())
				.matchingPurpose(matchingDTO.getMatchingPurpose())
				.image(String.join(",", imagePaths))
				.hit(matchingDTO.getHit())
				.averageScore(matchingDTO.getAverageScore())
				.communityScore(matchingDTO.getCommunityScore())
				.build();

		matchingDTORepository.save(matchingDTOBuilder);
	}

	@Override
	public void dateWrite(Matching matchingDTO, DogsInfo dogsDTO, String userId, String matchingPurpose,
			String matchingState, List<MultipartFile> imgFiles, HttpSession session) {
		System.out.println("####");
		System.out.println(userId);

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
		} else {
			for (MultipartFile img : imgFiles) {
				originalFileName = img.getOriginalFilename();
				System.out.println("originalFileName: " + originalFileName);

				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/matching/", img);
				file = new File(filePath, originalFileName);

				imagePaths.add("flirdogStorage/matching/" + fileName);

				try {
					img.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}
		Matching matching = new Matching();
		User userForUserId = new User();
		userForUserId.setId(Long.parseLong(userId));

		matching.setTitle(matchingDTO.getTitle());
		matching.setId(matchingDTO.getId());
		matching.setContent(matchingDTO.getContent());
		matching.setImage(String.join(",", imagePaths));
		matching.setMatchingPurpose(matchingPurposeEnum);
		matching.setMatchingState(matchingStateEnum);
		matching.setHit(matchingDTO.getHit());
		matching.setDogMBTI(matchingDTO.getDogMBTI());
		matching.setMatchingAddress(matchingDTO.getMatchingAddress());
		matching.setMatchingDate(matchingDTO.getMatchingDate());
		matching.setDogsInfo(dogsDTO);
		matching.setUser(userForUserId);

		/*
		 * Matching matchingBuilder = Matching.builder()
		 * .title(matchingDTO.getTitle())
		 * .id(matchingDTO.getId())
		 * .content(matchingDTO.getContent())
		 * .image(String.join(",", imagePaths))
		 * .matchingPurpose(matchingPurposeEnum)
		 * .matchingState(matchingStateEnum)
		 * .hit(matchingDTO.getHit())
		 * .user(matchingDTO.getUser())
		 * .dogMBTI(matchingDTO.getDogMBTI())
		 * .matchingAddress(matchingDTO.getMatchingAddress())
		 * .matchingDate(matchingDTO.getMatchingDate())
		 * .dogsInfo(dogsDTO)
		 * .user(userDTO)
		 * .build();
		 */

		matchingRepository.save(matching);

	}

	@Override
	public List<MatchingDTO> getAllMatchingList() {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		return matchingDTORepository.findAll(sort);
	}

	@Override
	public Optional<MatchingDTO> dateReadMore(String id) {
		try {
			Long idLong = Long.parseLong(id);
			return matchingDTORepository.findById(idLong);
		} catch (NumberFormatException e) {
			// 변환에 실패하면 예외 처리
			// 적절한 처리를 추가하거나 예외를 다시 던지거나, 기본값을 반환하거나 등의 처리를 할 수 있습니다.
			return Optional.empty(); // 예를 들어, 실패 시 Optional.empty()를 반환하는 등의 방법을 선택할 수 있습니다.
		}
	}

	@Override
	public void dateUpdate(MatchingDTO matchingDTO, List<MultipartFile> imgFiles, HttpSession session) {
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filePath);

		File file;
		String originalFileName;
		String fileName;

		List<String> imagePaths = new ArrayList<>();

		Optional<MatchingDTO> existingMatchingDTOOptional = matchingDTORepository.findById(matchingDTO.getId());

		// 이미지가 없는 경우 지정된 이미지사용
		if (imgFiles.isEmpty() || imgFiles.get(0).isEmpty()) {
			imagePaths.add("/image/nullImage/nullImage1.png"); // 대체 이미지 경로 또는 빈 문자열
		} else {
			for (MultipartFile img : imgFiles) {
				originalFileName = img.getOriginalFilename();
				System.out.println("originalFileName: " + originalFileName);

				fileName = objectStorageService.uploadFile(bucketName, "flirdogStorage/matching/", img);
				file = new File(filePath, originalFileName);

				imagePaths.add("flirdogStorage/matching/" + fileName);

				try {
					img.transferTo(file);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}

		if (existingMatchingDTOOptional.isPresent()) {
			MatchingDTO existingMatchingDTO = existingMatchingDTOOptional.get();
			// 이미지 업로드 및 경로 설정 코드 생략

			// 기존 매칭 객체의 필드 업데이트
			existingMatchingDTO.setTitle(matchingDTO.getTitle());
			existingMatchingDTO.setContent(matchingDTO.getContent());
			existingMatchingDTO.setDogName(matchingDTO.getDogName());
			existingMatchingDTO.setDogAge(matchingDTO.getDogAge());
			existingMatchingDTO.setDogGender(matchingDTO.getDogGender());
			existingMatchingDTO.setIsNeutralized(matchingDTO.getIsNeutralized());
			existingMatchingDTO.setDogMBTI(matchingDTO.getDogMBTI());
			existingMatchingDTO.setDogBreed(matchingDTO.getDogBreed());
			existingMatchingDTO.setDate(matchingDTO.getDate());
			existingMatchingDTO.setMatchingState(matchingDTO.getMatchingState());
			existingMatchingDTO.setMatchingAddress(matchingDTO.getMatchingAddress());
			existingMatchingDTO.setMatchingPurpose(matchingDTO.getMatchingPurpose());
			existingMatchingDTO.setHit(matchingDTO.getHit());
			existingMatchingDTO.setAverageScore(matchingDTO.getAverageScore());
			existingMatchingDTO.setCommunityScore(matchingDTO.getCommunityScore());
			existingMatchingDTO.setImage(String.join(",", imagePaths));

			// 변경된 매칭 객체 저장
			matchingDTORepository.save(existingMatchingDTO);
		} else {
			// 매칭 객체가 존재하지 않는 경우 예외 처리 또는 다른 로직 수행
		}

	}

	@Override
	public List<MatchingDTO> getTopMatchingThree() {
		System.out.println("들어왔나??");
		return matchingDTORepository.findTop3ByOrderByAverageScoreDesc();
	}

}
