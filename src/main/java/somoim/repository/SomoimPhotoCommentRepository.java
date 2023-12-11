package somoim.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import somoim.bean.SomoimPhotoComment;

public interface SomoimPhotoCommentRepository extends JpaRepository<SomoimPhotoComment, Long>{

	List<SomoimPhotoComment> findBySomoimPhotoId(Long somoimPhotoId, Sort sort);

	//댓글 삭제
	void deleteByIdAndUserId(Long commentId, Long userId);
	//댓글 삭제 전 해당 값이 유효한지 조회
	Optional<SomoimPhotoComment> findByIdAndUserId(Long commentId, Long userId);

}
