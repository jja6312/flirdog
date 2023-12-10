package matching.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import matching.bean.MatchingDTO;

public interface MatchingDTORepository extends JpaRepository<MatchingDTO, Long> {
	List<MatchingDTO> findTop3ByOrderByAverageScoreDesc();
    
}
