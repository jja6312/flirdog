package mypage.service;

import java.util.List;

import user.bean.DogsInfoDTO;

public interface MypageUploadService {
	
	public void upload(List<DogsInfoDTO> dogsImageList);

	public List<DogsInfoDTO> uploadList();
}
