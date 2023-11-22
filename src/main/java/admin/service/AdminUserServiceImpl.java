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

}
