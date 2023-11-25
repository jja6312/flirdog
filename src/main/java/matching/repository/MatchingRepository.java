package matching.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import matching.bean.Matching;
import user.bean.DogsInfo;

@Repository
public interface MatchingRepository extends JpaRepository<DogsInfo, Integer> {
	
	public List<DogsInfo> findByUserId(int userId);

	public void save(Matching matchingBuilder);

}
