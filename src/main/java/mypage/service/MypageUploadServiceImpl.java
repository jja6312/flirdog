package mypage.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import mypage.repository.MypageDogsInfoDTOUploadRepository;
import user.bean.DogsInfoDTO;

@Service
@Transactional
public class MypageUploadServiceImpl implements MypageUploadService {

	@Autowired
	private MypageDogsInfoDTOUploadRepository mypageDogsInfoDTOUploadRepository;
	
	@Override
	public void upload(List<DogsInfoDTO> dogsImageList) {
		mypageDogsInfoDTOUploadRepository.saveAll(dogsImageList);
	}

	@Override
	public List<DogsInfoDTO> uploadList() {
		return mypageDogsInfoDTOUploadRepository.findAll();//쿼리 메소드
		
	}

	@Override
	public Optional<DogsInfoDTO> getDogInfo(Long userId) {
	    return mypageDogsInfoDTOUploadRepository.findById(userId);
	}
}
