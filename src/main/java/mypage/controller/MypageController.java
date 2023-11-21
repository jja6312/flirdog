package mypage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mypage.service.MypageService;
import user.bean.User;

@CrossOrigin
@RestController
@RequestMapping(path = "mypage")
public class MypageController {
	@Autowired
	private MypageService mypageService;
	
	@GetMapping(path = "getUserProfile")
	public User getUserProfile(@RequestParam String userIdStr) {
	    Long userId = Long.parseLong(userIdStr);
	    User userProfile = mypageService.getUserProfile(userId);
	    return userProfile;
	}
	


}
