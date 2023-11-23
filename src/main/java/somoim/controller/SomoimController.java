package somoim.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import somoim.bean.Somoim;
import somoim.service.SomoimService;
import user.bean.User;

@CrossOrigin
@RestController
@RequestMapping(path = "somoim")
public class SomoimController {
	
	@Autowired
	private SomoimService somoimService;
	
	@GetMapping("/")
	public String main() {
		return "/somoim";
	}
	
	@PostMapping(path="/somoimNewWrite", produces = "application/json;charset=UTF-8")
	public void somoimNewWrite(@ModelAttribute Somoim somoim) {
		System.out.println("컨트롤러" + somoim);
		somoimService.write(somoim);
	}
	
	// 소모임 개설
	@GetMapping("/getSomoimForm")
	public Optional<Somoim> getSomoimForm(@RequestParam Long id) {
		System.out.println("controller 소모임정보 : " + id);
		return somoimService.getSomoimForm(id);
	}
	
	// 소모임 목록 조회
	@GetMapping(path="/getSomoimList")
	public List<Somoim> getSomoimList() {
		List<Somoim> somoimList = somoimService.getSomoimList();
		
		return somoimList;
	}
	
	//특정 회원 조회
	@PostMapping(path = "getUser", produces = "application/json;charset=UTF-8")
	public Optional<User> getUser(@RequestBody Map<String, String> requestBody) {
	    String userId = requestBody.get("userId");
	    System.out.println("!!!!!!!!!userid:" + userId);
	    Optional<User> user = somoimService.getUser(userId);

	    return user;
	}
}
