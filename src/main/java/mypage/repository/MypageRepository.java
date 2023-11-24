package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.User;

public interface MypageRepository extends JpaRepository<User, Long> {

}
