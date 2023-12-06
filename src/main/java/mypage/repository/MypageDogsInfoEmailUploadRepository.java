package mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.DogsInfoDTO;

public interface MypageDogsInfoEmailUploadRepository extends JpaRepository<DogsInfoDTO, String> {

    // 새로운 메서드 추가
    public List<DogsInfoDTO> findAllByEmail(String email);
}
