package access.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.DogsInfo;
import user.bean.User;

public interface AccessRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndPasswd(String email, String passwd);
    Optional<User> findByEmail(String email);
    List<User> findTop3ByOrderByCommunityScoreDesc();
    List<User> findTop3ByAddresses_AddressContainingOrderByCommunityScoreDesc(String city);
	


}
