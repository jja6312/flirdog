package community.service;

import java.util.Optional;

import user.bean.User;

public interface BragUserInfoService {

	public Optional<User> getUser(Long id);

}
