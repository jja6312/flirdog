package somoim.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import somoim.bean.SomoimPhotoLike;

@Repository
public interface SomoimPhotoLikeRepository extends JpaRepository<SomoimPhotoLike, Long>{

	//Optional<SomoimPhotoLike> findByUserIdAndSomoimPhoto(Long userId, Long photoId);

	@Query("SELECT l FROM SomoimPhotoLike l WHERE l.user.id = :userId AND l.somoimPhoto.id = :photoId")
	Optional<SomoimPhotoLike> findByUserAndSomoimPhoto(@Param("userId") Long userId, @Param("photoId") Long photoId);
	
	// SomoimPhoto 객체의 id를 조회
	Long countBySomoimPhoto_Id(Long photoId);

}
