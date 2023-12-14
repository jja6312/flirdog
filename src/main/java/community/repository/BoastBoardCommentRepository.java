package community.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import community.bean.BragBoardCommentDTO;

@Repository
public interface BoastBoardCommentRepository extends JpaRepository<BragBoardCommentDTO, Long> {

	public List<BragBoardCommentDTO> findAllByBoardId(Long boardId);

	public int countByBoardId(Long boardId);

	public void deleteByBoardId(Long boardId);
}
