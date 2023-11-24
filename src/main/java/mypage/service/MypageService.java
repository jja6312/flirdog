package mypage.service;

import payment.bean.PointChargingDTO;
import user.bean.DogsInfoDTO;
import user.bean.User;
import user.bean.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MypageService {

	public User getUserProfile(Long userId);

	public UserDTO getUserProfileTest(Long userId);
	
	public PointChargingDTO getPointCharging(Long userId);

	public void write(DogsInfoDTO dogsInfoDTO);

	public Page<DogsInfoDTO> getDogInfoList(Pageable pageable);
	

}