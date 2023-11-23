package somoim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import somoim.bean.Somoim;

@Repository
public interface SomoimRepository extends JpaRepository<Somoim, Long>{

}
