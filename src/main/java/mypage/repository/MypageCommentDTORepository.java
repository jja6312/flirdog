package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import mypage.bean.MypageCommentDTO;

public interface MypageCommentDTORepository extends JpaRepository<MypageCommentDTO, Long>   {

}
