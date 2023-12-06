package mypage.service;

import java.util.List;
import java.util.Optional;

import user.bean.DogsInfoDTO;
import user.bean.UserDTO;

public interface MypageUploadService {
	
	public void upload(List<DogsInfoDTO> dogsImageList);

	public List<DogsInfoDTO> uploadListDog(String email);
	
	public List<DogsInfoDTO> uploadList(Long userId);
	
	public Optional<DogsInfoDTO> getDogInfo(Long userId);
	
	public void deleteDogInfo(Long userId);

	public void uploadProfile(List<UserDTO> userImageList);
}
