package mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import mypage.bean.MypageBoardDTO;

public interface MypageBoardDTOEmailRepository extends JpaRepository<MypageBoardDTO, String>  {

    public List<MypageBoardDTO> findAllByEmail(String email);
}
