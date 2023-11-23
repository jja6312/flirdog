package mypage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mypage.repository.MypageDTORepository;
import mypage.repository.MypagePointDTORepository;
import mypage.repository.MypageRepository;
import payment.bean.PointChargingDTO;
import user.bean.User;
import user.bean.UserDTO;

@Service
public class MypageServiceImpl implements MypageService {
    @Autowired
    private MypageRepository mypageRepository;

	@Autowired
	private MypageDTORepository mypageDTORepository;
	
	@Autowired
	private MypagePointDTORepository mypagePointDTORepository;
	
    @Override
    public User getUserProfile(Long userId) {
        return mypageRepository.findById(userId).orElse(null);
    }
	@Override
	public UserDTO getUserProfileTest(Long userId) {
		return mypageDTORepository.findById(userId).orElse(null);
	}
	@Override
	public PointChargingDTO getPointCharging(Long userId) {
		return mypagePointDTORepository.findById(userId).orElse(null);
	}
}
