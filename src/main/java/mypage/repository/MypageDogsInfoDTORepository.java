package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.DogsInfoDTO;

public interface MypageDogsInfoDTORepository extends JpaRepository<DogsInfoDTO, String>  {

}
