package community.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import community.bean.BragBoardDTO;

@Repository
public interface BoastBoardRepository extends JpaRepository<BragBoardDTO, Long> {

}
