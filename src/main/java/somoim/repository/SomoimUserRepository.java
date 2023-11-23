package somoim.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.User;

public interface SomoimUserRepository extends JpaRepository<User, Long> {

}
