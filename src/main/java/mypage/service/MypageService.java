package mypage.service;

import payment.bean.PointChargingDTO;
import user.bean.DogsInfoDTO;
import user.bean.User;
import user.bean.UserDTO;

public interface MypageService {

	public User getUserProfile(Long userId);

	public UserDTO getUserProfileTest(Long userId);
	
	public PointChargingDTO getPointCharging(Long userId);

	public void write(DogsInfoDTO dogsInfoDTO);

}
