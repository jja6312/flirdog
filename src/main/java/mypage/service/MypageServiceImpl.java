package mypage.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import mypage.repository.MypageDogsInfoDTORepository;
import mypage.repository.MypagePointDTORepository;
import mypage.repository.MypageRepository;
import mypage.repository.MypageUserDTORepository;
import payment.bean.PointChargingDTO;
import user.bean.DogsInfoDTO;
import user.bean.User;
import user.bean.UserDTO;

@Service
public class MypageServiceImpl implements MypageService {
    @Autowired
    private MypageRepository mypageRepository;
    @Autowired
    private MypageDogsInfoDTORepository mypageDogsInfoDTORepository;

	@Autowired
	private MypageUserDTORepository mypageUserDTORepository;
	
	@Autowired
	private MypagePointDTORepository mypagePointDTORepository;
	
    @Override
    public User getUserProfile(Long userId) {
        return mypageRepository.findById(userId).orElse(null);
    }
	@Override
	public UserDTO getUserProfileTest(Long userId) {
		return mypageUserDTORepository.findById(userId).orElse(null);
	}
	@Override
	public PointChargingDTO getPointCharging(Long userId) {
		return mypagePointDTORepository.findById(userId).orElse(null);
	}
	@Override
	public void write(DogsInfoDTO dogsInfoDTO) {
//		System.out.println("MypageServiceImpl 부분에서 " + dogsInfoDTO.getName() );
		mypageDogsInfoDTORepository.save(dogsInfoDTO);
		
	}
	@Override
	public Page<DogsInfoDTO> getDogInfoList(Pageable pageable) {	
		//DB
		Page<DogsInfoDTO> list = mypageDogsInfoDTORepository.findAll(pageable);
		System.out.println(list.getContent());
		
		return list;
	}
	@Override
	public Optional<DogsInfoDTO> getDogInfo(Long userId) {
		// TODO Auto-generated method stub
	    return mypageDogsInfoDTORepository.findById(userId);
	}

}
