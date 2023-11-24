package mypage.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import user.bean.DogsInfoDTO;

public interface MypageDogsInfoDTORepository extends JpaRepository<DogsInfoDTO, String>  {

}
