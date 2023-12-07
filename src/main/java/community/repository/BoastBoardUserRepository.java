package community.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import user.bean.User;

@Repository
public interface BoastBoardUserRepository extends JpaRepository<User, Object>{

}
