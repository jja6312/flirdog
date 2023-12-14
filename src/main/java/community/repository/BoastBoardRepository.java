package community.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import community.bean.BragBoardDTO;

@Repository
public interface BoastBoardRepository extends JpaRepository<BragBoardDTO, Long> {

	List<BragBoardDTO> findByContentContainingOrderByIdDesc(String inputValue);

	List<BragBoardDTO> findByTitleContainingOrderByIdDesc(String inputValue);

	List<BragBoardDTO> findByContentContaining(String inputValue);

	List<BragBoardDTO> findByTitleContaining(String inputValue);

}
