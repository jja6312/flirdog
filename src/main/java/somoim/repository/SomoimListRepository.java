package somoim.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import somoim.bean.SomoimList;

public interface SomoimListRepository extends JpaRepository<SomoimList, Long>{

	Optional<SomoimList> findByUserIdAndSomoimId(Long somoimId, Long id);
	
}
