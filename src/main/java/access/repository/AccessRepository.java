package access.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.User;

public interface AccessRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndPasswd(String email, String passwd);
    Optional<User> findByEmail(String email);
}
