package somoim.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import somoim.bean.SomoimPhoto;

@Repository
public interface SomoimPhotoRepository extends JpaRepository<SomoimPhoto, Long>{

	List<SomoimPhoto> findBySomoimId(Long somoimId, Sort sort);
	
}
