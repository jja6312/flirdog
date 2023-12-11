package admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import user.bean.User;

public interface AdminUserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT u FROM User u LEFT JOIN FETCH u.dogsInfos")
    List<User> findAllWithDogsInfos();
	
	@Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);


}
