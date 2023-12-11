package access.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import matching.bean.MatchingDTO;

public interface AccessMatchingRepository extends JpaRepository<MatchingDTO, Long> {

    @Query("SELECT m FROM MatchingDTO m WHERE m.dogName = :dogName AND m.userId = :userId ORDER BY m.id DESC")
    List<MatchingDTO> findTopByDogNameAndUserIdOrderByDesc(@Param("dogName") String dogName, @Param("userId") Long userId);
}
