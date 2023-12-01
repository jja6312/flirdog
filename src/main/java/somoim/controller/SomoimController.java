package somoim.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpSession;
import somoim.bean.Somoim;
import somoim.bean.SomoimList;
import somoim.bean.SomoimListDTO;
import somoim.bean.SomoimRequest;
import somoim.service.SomoimService;
import user.bean.User;
import user.service.UserService;

@CrossOrigin
@RestController
@RequestMapping(path = "somoim")
public class SomoimController {
	
	@Autowired
	private SomoimService somoimService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/")
	public String main() {
		return "/somoim";
	}
	
	// 소모임 개설
	@PostMapping(path="/somoimNewWrite", 
			consumes = "multipart/form-data", 
			produces = "application/json;charset=UTF-8")
	public void somoimNewWrite(@RequestPart("updatedFormData") String updatedFormDataJson,
					@RequestPart("introducePhoto") MultipartFile introducePhoto,
					HttpSession session) {
		ObjectMapper objectMapper = new ObjectMapper();
		
		try {
	        SomoimRequest somoimRequest = objectMapper.readValue(updatedFormDataJson, SomoimRequest.class);
	        
	        Somoim somoim = somoimRequest.getSomoim();
	        User user = somoimRequest.getUser();
	        System.out.println("컨트롤 Somoim : " + somoim.toString());
	        System.out.println("컨트롤 User : " + user.getId());
	        System.out.println("컨트롤 IntroducePhoto : " + introducePhoto);
	        
	        Optional<User> optionalUser = userService.findId(user.getId());
	        System.out.println("컨트롤 optionalUser : " + optionalUser.get().toString());
	        
	        if (optionalUser.isPresent()) {
		        user = optionalUser.get();
		        somoim.setUser(user);
		        System.out.println(somoim.toString());
		    } else {
		        // optionalUser가 비어있는 경우에 대한 처리
		        throw new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다.");
		    }

		    if (somoim.getUser() == null) {
		        throw new IllegalArgumentException("Somoim에 대한 User 정보가 올바르게 설정되지 않았습니다.");
		    }//if
		    
			somoimService.write(somoim, introducePhoto, session);    
	    } catch (IOException e) {
	    	// JSON 변환 중 예외 발생 시 예외 처리
	        e.printStackTrace();
	    }//try-catch
	}
	
	/*
	@PostMapping(path="/somoimNewWrite", produces = "application/json;charset=UTF-8")
	public void somoimNewWrite(@RequestBody SomoimRequest somoimRequest) {
		System.out.println("컨트롤러" + somoimRequest);
		Somoim somoim = somoimRequest.getSomoim();
	    User user = somoimRequest.getUser();
	    System.out.println("Somoim : " + somoim.toString());
	    System.out.println("User : " + user.getId());

	    Optional<User> optionalUser = userService.findId(user.getId());
	    System.out.println("optionalUser : " + optionalUser.toString());

	    if (optionalUser.isPresent()) {
	        user = optionalUser.get();
	        somoim.setUser(user);
	        System.out.println(somoim.toString());
	    } else {
	        // optionalUser가 비어있는 경우에 대한 처리
	        // 예를 들어, 사용자가 존재하지 않는 경우 에러를 처리하거나 다른 방법으로 대응할 수 있습니다.
	        throw new IllegalArgumentException("해당 ID의 사용자를 찾을 수 없습니다.");
	    }

	    if (somoim.getUser() == null) {
	        throw new IllegalArgumentException("Somoim에 대한 User 정보가 올바르게 설정되지 않았습니다.");
	    }
	    
		somoimService.write(somoim);
	}*/
 
	
	// 소모임 개설
	@GetMapping("/getSomoimForm")
	public Optional<Somoim> getSomoimForm(@RequestParam Long id) {
		System.out.println("controller 소모임정보 : " + id);
		//return somoimService.getSomoimForm(id);
		
		Optional<Somoim> somoimOptional = somoimService.getSomoimForm(id);

	    // [여기에 Hibernate.initialize()를 호출해야 합니다.]
	     if (somoimOptional.isPresent()) {
	         String name = somoimOptional.get().getUser().getName();
	         Long userid = somoimOptional.get().getUser().getId();
	         System.out.println("somoimOptional 이름 : " + name);
	         System.out.println("somoimOptional 아이디 : " + userid);
	     }

	    return somoimOptional;
	}
	
	// 소모임 목록 조회
	@GetMapping(path="/getSomoimList")
	public List<Somoim> getSomoimList() {
		List<Somoim> somoimList = somoimService.getSomoimList();
		
		return somoimList;
	}
	
	//특정 회원 조회
	@PostMapping(path ="getUser", produces ="application/json;charset=UTF-8")
	public Optional<User> getUser(@RequestBody Map<String, String> requestBody) {
	    String userId = requestBody.get("userId");
	    System.out.println("!!!!!!!!!userid:" + userId);
	    Optional<User> user = somoimService.getUser(userId);

	    return user;
	}
	
	// 소모임 회원가입
	@PostMapping(path="/joinSomoim")
	public ResponseEntity<SomoimList> joinSomoim(@RequestBody Map<String, Long> request) {
		Long somoimId = request.get("somoimId");
	    Long userId = request.get("userId");
	    
		Optional<SomoimList> somoimList = somoimService.joinSomoim(somoimId, userId);
		
		if (somoimList.isPresent()) {
			Long joinUserId = somoimList.get().getUser().getId();
			System.out.println("컨트롤단 somoimList 유저 아이디 조회 : " + joinUserId);
			somoimList.get().setAdmin(false);
			return ResponseEntity.ok(somoimList.get());
		} else {
			return ResponseEntity.notFound().build(); // 또는 다른 적절한 응답 코드로 수정
		}
	}
	
	// 소모임 회원가입 여부 조회
	@GetMapping(path="/isSomoimMember")
	// false는 클라이언트측에서 값을 안받아도 된다.
	public boolean  isSomoimMember(@RequestParam Long somoimId,
											   @RequestParam(required=false) Long userId){
		System.out.println("controller 소모임 회원가입 여부 조회용 아이디 : " + userId);
		Optional<SomoimList> isJoin = null;
		if(userId != null ) {
			
			isJoin = somoimService.isSomoimMember(userId, somoimId);
			System.out.println("isAdmin : " + isJoin.get().isAdmin());
		} 
		System.out.println("isJoin 통째로 : " + isJoin);
		return isJoin.get().isAdmin();
	}
	
//	@GetMapping("/isSomoimMember")
//    public List<SomoimListDTO> getSomoimListDTO(@RequestParam Long id) {
//        return somoimService.somoimMemberIs(id);
//    }
}
