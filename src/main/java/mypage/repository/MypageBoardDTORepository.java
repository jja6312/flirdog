package mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import mypage.bean.MypageBoardDTO;
import user.bean.DogsInfoDTO;

public interface MypageBoardDTORepository extends JpaRepository<MypageBoardDTO, Long> {

    public List<MypageBoardDTO> findAllById(Long userId);
}
