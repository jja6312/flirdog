package access.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import community.bean.BragBoardDTO;

public interface AccessBragBoardRepository extends JpaRepository<BragBoardDTO,Long>{

	List<BragBoardDTO> findTop10ByOrderByHitDesc();
    List<BragBoardDTO> findTop10ByOrderByCreatedAtDesc();

}
