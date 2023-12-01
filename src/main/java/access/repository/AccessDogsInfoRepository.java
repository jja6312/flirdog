package access.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import matching.bean.MatchingDTO;
import user.bean.DogsInfo;

public interface AccessDogsInfoRepository extends JpaRepository<DogsInfo, Long>{

	@Query(value = "SELECT * FROM dogs_info WHERE image != '/image/nullImage/nullImage1.png' ORDER BY RAND() LIMIT 5", nativeQuery = true)
	List<DogsInfo> getFiveDogsInfo();

	//현성
	DogsInfo findByUserIdAndName(Long userId, String dogName);

}
