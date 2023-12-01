package user.service;

import java.util.Optional;

import user.bean.User;

public interface UserService {

	public Optional<User> login(String email, String passwd);

	public Optional<User> findId(Long id);

}
