package admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import matching.bean.MatchingDTO;

public interface AdminMatchingRepository extends JpaRepository<MatchingDTO, Long> {

}
