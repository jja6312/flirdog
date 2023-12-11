package access.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import user.bean.DogsInfo;

public interface AccessDogsInfoRepository extends JpaRepository<DogsInfo, Long>{

	@Query(value = "SELECT * FROM dogs_info WHERE image != '/image/nullImage/nullImage1.png' ORDER BY RAND() LIMIT 5", nativeQuery = true)
	List<DogsInfo> getFiveDogsInfo();

	//현성
	DogsInfo findByUserIdAndName(Long userId, String dogName);

	List<DogsInfo> findByUserId(Long userId);

	  @Query("SELECT d FROM DogsInfo d WHERE d.score.averageScore IS NOT NULL ORDER BY d.score.averageScore DESC")
	    List<DogsInfo> findTop3ByOrderByAverageScoreDesc();

	  @Query("SELECT d FROM DogsInfo d JOIN d.user u JOIN u.addresses a WHERE a.address LIKE %:location% ORDER BY d.score.averageScore DESC")
	  List<DogsInfo> findByAddressOrderedByAverageScore(@Param("location") String location);


}
