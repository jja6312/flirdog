package mypage.service;

import java.util.List;

import user.bean.UserDTO;

public interface MypageUserDTOUploadService {

	public void uploadUser(List<UserDTO> userImageList);
}
