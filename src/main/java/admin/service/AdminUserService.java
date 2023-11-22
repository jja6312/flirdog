package admin.service;

import java.util.List;

import user.bean.User;

public interface AdminUserService {

	List<User> getUserList();

	void userDelete(String userId);

	void userDeleteSelected(String userId);

}
