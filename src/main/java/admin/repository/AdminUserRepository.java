package admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import user.bean.User;

public interface AdminUserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT u FROM User u LEFT JOIN FETCH u.dogsInfos")
    List<User> findAllWithDogsInfos();


}
