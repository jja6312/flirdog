package somoim.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import somoim.bean.SomoimList;

public interface SomoimListRepository extends JpaRepository<SomoimList, Long>{

	Optional<SomoimList> findBySomoimIdAndUserId(Long somoimId, Long userId);
	
	Long countBySomoimId(Long somoimId);

	List<SomoimList> findAllBySomoimId(Long somoimId);

	//void deleteBySomoimIdAndUserId(Long somoimId, Long userId); 
	
	@Modifying
	@Query("DELETE FROM SomoimList s WHERE s.somoim.id = :somoimId AND s.user.id = :userId")
    void deleteBySomoimIdAndUserId(@Param("somoimId") Long somoimId, @Param("userId") Long userId);
}
