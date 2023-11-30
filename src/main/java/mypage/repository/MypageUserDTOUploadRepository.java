package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.UserDTO;

public interface MypageUserDTOUploadRepository extends JpaRepository<UserDTO, Long>{

}
