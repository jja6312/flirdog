package admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import user.bean.DogsInfo;

public interface AdminDogRepository extends JpaRepository<DogsInfo, Long> {
    
    @EntityGraph(attributePaths = {"user"})
    @Query("SELECT d FROM DogsInfo d")
    List<DogsInfo> findAllWithUser();
}

