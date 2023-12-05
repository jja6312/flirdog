package mypage.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping(path="writeUser")
	public void writeUser(@RequestBody UserDTO userDTO) {
		userDTO.setPoint(userDTO.getPoint()+ userDTO.getAmount());
		userDTO.setPointChargings(userDTO.getPointChargings()+1);
		System.out.println("###point" + userDTO.getPoint());
		System.out.println("###amount" + userDTO.getAmount());
//		System.out.println("MypageController 부분에서 " + dogsInfoDTO.getName() );
		mypageService.writeUser(userDTO);
	}
	

	@GetMapping(path = "getPointCharging")
	public PointChargingDTO getPointCharging(@RequestParam String userIdStr) {
	    Long userId = Long.parseLong(userIdStr);
	    PointChargingDTO getPoint = mypageService.getPointCharging(userId);
	    return getPoint;
	}
	
	@PostMapping(path="write")
	public void write(@ModelAttribute DogsInfoDTO dogsInfoDTO) {
//		System.out.println("MypageController 부분에서 " + dogsInfoDTO.getName() );
		mypageService.write(dogsInfoDTO);
	}
	
	@GetMapping(path="getDogInfoList")
	public Page<DogsInfoDTO> getDogInfoList(
			//page는 0부터 시작, 0이면 1페이지, 1이면 2페이지,.......
			@PageableDefault(page=0, size=3, sort="name", direction = Sort.Direction.DESC) Pageable pageable) {         
		return mypageService.getDogInfoList(pageable);
	}

	

}
