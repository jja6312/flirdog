package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import payment.bean.PointChargingDTO;

public interface MypagePointChargingDTORepository  extends JpaRepository<PointChargingDTO, Long>{

}
