package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.User;
import user.bean.UserDTO;

public interface MypageDTORepository extends JpaRepository<UserDTO, Long> {

}
