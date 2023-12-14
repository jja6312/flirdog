package matching.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import matching.bean.Matching;
import matching.bean.MatchingDTO;
import matching.service.DateMatchingService;
import matching.service.DogsInfoService;
import matching.service.UserInfoService;
import user.bean.DogsInfo;
import user.bean.User;


@CrossOrigin
@RestController
@RequestMapping(path = "date")
public class MatchingController {
	
	@Autowired
	private DogsInfoService dogsInfoService;
	
	@Autowired
	private UserInfoService userInfoService;
	
	@Autowired
	private DateMatchingService dateMatchingService;
	
	@GetMapping(path = "getDogsInfoWithUserId", produces = "application/json;charset=UTF-8")
    public List<DogsInfo> getDogsInfoWithUserId(
    		@RequestParam("id") Long id) {
    
        List<DogsInfo> dogsInfoWithUserId = dogsInfoService.getDogsInfoListByUserId(id);
        return dogsInfoWithUserId;
	}
	
	
	@GetMapping(path = "getUser", produces = "application/json;charset=UTF-8")
	public Optional<User> getUser(@RequestParam("id") Long id){
		System.out.println("들어왔나?");
		Optional<User> getUser = userInfoService.getUser(id);
		
		return getUser;
	}
	
	@GetMapping(path = "getDogsInfoUserId", produces = "application/json;charset=UTF-8")
    public List<DogsInfo> getDogsInfoUserId(
    		@RequestParam("userId") Long id) {
    
        List<DogsInfo> dogsInfoWithUserId = dogsInfoService.getDogsInfoListByUserId(id);
        return dogsInfoWithUserId;
	}
	
	
	@GetMapping(path = "getUserInfo", produces = "application/json;charset=UTF-8")
	public Optional<User> getUserInfo(@RequestParam("userId") Long id){
		System.out.println("들어왔나?");
		Optional<User> getUser = userInfoService.getUser(id);
		
		return getUser;
	}
	
	//매칭글 작성
	@PostMapping(path="dateWriteTest", produces ="application/json")
	public void dateWriteTest(@RequestPart("matchingDTO2") MatchingDTO matchingDTO,
							  @RequestPart(value = "imgFiles", required = false) List<MultipartFile> imgFiles,
							  HttpSession session) throws IOException {
		
		System.out.println("데이터 들어오나?");
		dateMatchingService.dateWriteTest(matchingDTO, imgFiles, session);
	}
	
	//매칭글작성 종인님버전 안됨
	@PostMapping(path= "dateWrite" , consumes = "multipart/form-data")
	public void dateWrite(@RequestPart("matchingDTO") Matching matchingDTO,
						  @RequestParam("id") String userId,
						  @RequestPart("dogsDTO") DogsInfo dogsDTO,
						  @RequestPart("matchingPurpose") String matchingPurpose,
						  @RequestPart("matchingState") String matchingState,
						  @RequestPart(value = "imgFiles", required = false) List<MultipartFile> imgFiles,
						  HttpSession session) throws IOException {
		
		System.out.println("!!!");
		System.out.println(userId);
		
		System.out.println(matchingDTO);
		System.out.println(userId);
		System.out.println(dogsDTO);
		System.out.println(matchingPurpose);
		System.out.println(matchingState);
		
		
		dateMatchingService.dateWrite(matchingDTO, dogsDTO, userId, matchingPurpose, matchingState, imgFiles, session);
	}
	
	//전체 리스트 조회
	/*
	@GetMapping(path="getAllMatchingList", produces = "application/json;charset=UTF-8")
	public List<MatchingDTO> getAllMatchingList() {
		List<MatchingDTO> matchingList = dateMatchingService.getAllMatchingList();
		
		return matchingList;
	}*/
	
	@GetMapping(path = "getAllMatchingList", produces = "application/json;charset=UTF-8")
	public List<MatchingDTO> getAllMatchingList(@RequestParam(defaultValue = "1") int page,
												@RequestParam(defaultValue = "5") int size) {
	    List<MatchingDTO> matchingList = dateMatchingService.getAllMatchingList(page, size);

	    return matchingList;
	}
	
	//상세보기
	@GetMapping(path="dateReadMore")
	public Optional<MatchingDTO> dateReadMore(@RequestParam("seq") String id) {
		System.out.println("상세보기 드가자");
		System.out.println(id);
		return dateMatchingService.dateReadMore(id);
	}
	
	//수정하기
	@PostMapping(path="dateUpdate")
	public void dateUpdate(@RequestPart("matchingDTO2") MatchingDTO matchingDTO,
						   @RequestPart(value = "imgFiles", required = false) List<MultipartFile> imgFiles,
						   HttpSession session) {
		dateMatchingService.dateUpdate(matchingDTO, imgFiles, session);
	}
	
	@PostMapping(path="dateUpdate2")
	public void dateUpdate2(@RequestPart("matchingDTO2") MatchingDTO matchingDTO,
						   HttpSession session) {
		dateMatchingService.dateUpdate2(matchingDTO, session);
	}
	
	//상위 인기애견 3마리 출력
	@GetMapping(path="getTopMatchingThree", produces = "application/json;charset=UTF-8")
	public List<MatchingDTO> getTopMatchingThree() {
		List<MatchingDTO> matchingList = dateMatchingService.getTopMatchingThree();
		return matchingList;
	}
	
	//상세보기
	@DeleteMapping(path="dateDelete")
	public Optional<MatchingDTO> dateDelete(@RequestParam("seq") String id) {
		System.out.println("상세보기 드가자");
		System.out.println(id);
		return dateMatchingService.dateDelete(id);
	}
}
