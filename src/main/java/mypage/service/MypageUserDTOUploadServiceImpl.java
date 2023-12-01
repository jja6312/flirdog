package mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mypage.repository.MypageUserDTOUploadRepository;
import user.bean.UserDTO;

@Service
@Transactional
public class MypageUserDTOUploadServiceImpl implements MypageUserDTOUploadService{

	@Autowired
	private MypageUserDTOUploadRepository mypageUserDTOUploadRepository;

	@Override
	public void uploadUser(List<UserDTO> userImageList) {
		mypageUserDTOUploadRepository.saveAll(userImageList);
		
	}
	
	
	
}
