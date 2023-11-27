package access.service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;

import user.bean.User;

public interface AccessService {

	Optional<User> login(String email, String passwd);

	Optional<User> findId(Long id);

}
