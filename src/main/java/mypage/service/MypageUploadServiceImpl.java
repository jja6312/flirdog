package mypage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mypage.repository.MypageDogsInfoDTOUploadRepository;
import mypage.repository.MypageUserDTORepository;
import user.bean.DogsInfoDTO;
import user.bean.UserDTO;

@Service
@Transactional
public class MypageUploadServiceImpl implements MypageUploadService {

	@Autowired
	private MypageDogsInfoDTOUploadRepository mypageDogsInfoDTOUploadRepository;
	
	@Autowired
	private MypageUserDTORepository mypageUserDTORepository;
	
	@Override
	public void upload(List<DogsInfoDTO> dogsImageList) {
		mypageDogsInfoDTOUploadRepository.saveAll(dogsImageList);
	}

	@Override
	public List<DogsInfoDTO> uploadList(Long userId) {
		return mypageDogsInfoDTOUploadRepository.findAllById(userId);//쿼리 메소드
		
	}

	@Override
	public Optional<DogsInfoDTO> getDogInfo(Long userId) {
	    return mypageDogsInfoDTOUploadRepository.findById(userId);
	}


	@Override
	public void deleteDogInfo(Long userId) {
		//deleteById (delete from usertable where id=?)
		//deleteById()는 내부적으로 findById() 수행하고 delete 를 처리한다.
		//아이디가 없으면 EmptyResultDataAccessException이 발생한다.
		
		//delete()는 findById() 수행하지 않고 바로 delete 를 처리한다.
		mypageDogsInfoDTOUploadRepository.deleteById(userId);
	}

	@Override
	public void uploadProfile(List<UserDTO> userImageList) {
		mypageUserDTORepository.saveAll(userImageList);
	}
}
