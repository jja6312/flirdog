package mypage.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import mypage.service.MypageService;
import payment.bean.PointChargingDTO;
import user.bean.DogsInfoDTO;
import user.bean.User;
import user.bean.UserDTO;

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
	
	@GetMapping(path = "getUserProfileTest")
	public UserDTO getUserProfileTest(@RequestParam String userIdStr) {
	    Long userId = Long.parseLong(userIdStr);
	    UserDTO userProfile = mypageService.getUserProfileTest(userId);
	    return userProfile;
	}
	

	@GetMapping(path = "getPointCharging")
	public PointChargingDTO getPointCharging(@RequestParam String userIdStr) {
	    Long userId = Long.parseLong(userIdStr);
	    PointChargingDTO getPoint = mypageService.getPointCharging(userId);
	    return getPoint;
	}
	
	@PostMapping(path="write")
	public void write(@ModelAttribute DogsInfoDTO dogsInfoDTO) {
		mypageService.write(dogsInfoDTO);
	}


}
