package access.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import user.bean.DogsInfo;
import user.bean.User;

public interface AccessRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndPasswd(String email, String passwd);
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM dogs_info ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<DogsInfo> getFiveDogsInfo();
}
