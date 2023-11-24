package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import payment.bean.PointChargingDTO;

public interface MypagePointDTORepository extends JpaRepository<PointChargingDTO, Long>  {

}
