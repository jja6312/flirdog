package admin.service;

import java.util.List;
import java.util.Optional;

import access.bean.KakaoUserInfo;
import user.bean.DogsInfo;
import user.bean.User;

public interface AdminUserService {

	List<User> getUserList();

	void userDelete(String userId);

	void userDeleteSelected(String userId);

	Optional<User> getUser(String userId);

	void userEdit(User userDTO);

	KakaoUserInfo getKakaoUserInfo(String accessToken);

	User processKakaoLogin(KakaoUserInfo kakaoUserInfo);

	

}
