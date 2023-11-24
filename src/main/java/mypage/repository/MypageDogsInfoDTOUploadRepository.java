package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.DogsInfoDTO;

public interface MypageDogsInfoDTOUploadRepository extends JpaRepository<DogsInfoDTO, Long>{

}
