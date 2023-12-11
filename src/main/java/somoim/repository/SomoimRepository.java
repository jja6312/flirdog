package somoim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import somoim.bean.Somoim;


@Repository
public interface SomoimRepository extends JpaRepository<Somoim, Long>{
	
	// 댓글 등록
	Somoim findSomoimById(Long somoimId);
	
	//@Query("SELECT s1 FROM SomoimList sl JOIN FETCH sl.user WHERE sl.somoim.id = :somoimId")
    //List<SomoimList> findSomoimUsers(@Param("somoimId") Long somoimId);
	
	//List<SomoimList> findBySomoimId(Long somoimId);
}