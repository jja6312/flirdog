package admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.repository.AdminUserRepository;
import user.bean.User;

@Service
public class AdminUserServiceImpl implements AdminUserService {
	@Autowired
	private AdminUserRepository adminUserRepository;
	
	@Override
	public List<User> getUserList() {

		return adminUserRepository.findAll();
	}

	@Override
	public void userDelete(String userId) {
		adminUserRepository.deleteById(Integer.parseInt(userId));
		
	}

	@Override
	public void userDeleteSelected(String userId) {
		// userId는 쉼표가 포함되어있을 수도 있다. 따라서 쉼표로 split해서 배열로 만들어준다.
		String[] userIdArray = userId.split(",");

		for (String id : userIdArray) {
			adminUserRepository.deleteById(Integer.parseInt(id));
		}
		
	}

}
