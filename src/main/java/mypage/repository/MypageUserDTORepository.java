package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.UserDTO;

public interface MypageUserDTORepository extends JpaRepository<UserDTO, Long> {

}
