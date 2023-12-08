package mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import mypage.bean.MypageBoardDTO;

public interface MypageBoardDTORepository extends JpaRepository<MypageBoardDTO, Long> {

}
