package matching.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import matching.bean.Matching;
import matching.bean.MatchingDTO;
import user.bean.DogsInfo;
import user.bean.User;

@Repository
public interface MatchingRepository extends JpaRepository<DogsInfo, Integer> {
	
	public List<DogsInfo> findByUserId(long userId);

	public void save(Matching matchingBuilder);

}
