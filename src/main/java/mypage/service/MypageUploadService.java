package mypage.service;

import java.util.List;
import java.util.Optional;

import user.bean.DogsInfoDTO;

public interface MypageUploadService {
	
	public void upload(List<DogsInfoDTO> dogsImageList);

	public List<DogsInfoDTO> uploadList();
	
	public Optional<DogsInfoDTO> getDogInfo(Long userId);
	
	public void deleteDogInfo(Long userId);
}
