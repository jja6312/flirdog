package admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.User;

public interface AdminUserRepository extends JpaRepository<User, Integer> {

}
