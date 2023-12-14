package somoim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import user.bean.User;

public interface SomoimUserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT s1.user FROM SomoimList s1 WHERE s1.somoim.id = :somoimId")
    List<User> findSomoimUsers(@Param("somoimId") Long somoimId);
	
	// 댓글 등록
	User findUserById(Long userId);

}