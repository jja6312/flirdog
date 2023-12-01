package matching.service;

import java.util.List;
import java.util.Optional;

import user.bean.User;

public interface UserInfoService {

	public Optional<User> getUser(Long id);

}
