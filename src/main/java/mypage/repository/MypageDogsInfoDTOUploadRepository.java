package mypage.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.DogsInfoDTO;

public interface MypageDogsInfoDTOUploadRepository extends JpaRepository<DogsInfoDTO, Long>{

	public List<DogsInfoDTO> findAll(); //findAllByOrderBySeqDesc(); 이렇게 하면 seq로 매핑된거 없어서 오류 나옴. 화면전체 데이터 안나옴.
	

    public Optional<DogsInfoDTO> findById(Long id);
}
