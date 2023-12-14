package somoim.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import somoim.bean.SomoimPhoto;

@Repository
public interface SomoimPhotoRepository extends JpaRepository<SomoimPhoto, Long>{

	List<SomoimPhoto> findBySomoimId(Long somoimId, Sort sort);

	@Transactional
	void deleteByIdAndUserId(Long id, Long userId);
	
	// 댓글 등록
	SomoimPhoto findSomoimPhotoById(Long photoId);
	
	// select 다음엔 영속성의 대상인 내가 잡은 엔티티의 객체명(SomoimPhoto)을 적어야함
	// 자바 17부터는 """만 쓰면 그 안의 +나 "(따옴표) 같은거 전부 생략 가능
	@Query("""
		    SELECT sp
		    FROM SomoimPhoto sp
		    JOIN (
		        SELECT spl.somoimPhoto.id AS photoId, COUNT(*) AS likeCount
		        FROM SomoimPhotoLike spl
		        WHERE spl.somoimPhoto.id IS NOT NULL
		        GROUP BY spl.somoimPhoto.id
		    ) spl ON sp.id = spl.photoId
		    ORDER BY likeCount DESC
		""")
	List<SomoimPhoto> getFindAllOrderByLikesCount();
	
//	@Query("SELECT sp " +
//		       "FROM SomoimPhoto sp " +
//		       "JOIN ( " +
//		       "    SELECT spl.somoimPhoto.id, COUNT(*) AS like_count " +
//		       "    FROM SomoimPhotoLike spl " +
//		       "    GROUP BY spl.somoimPhoto.id " +
//		       ") spl ON sp.id = spl.id " + 
//		       "ORDER BY like_count DESC")
//	public List<SomoimPhoto> findAllOrderByLikesCount();
	
}
