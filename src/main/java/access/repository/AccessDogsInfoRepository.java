package access.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import user.bean.DogsInfo;

public interface AccessDogsInfoRepository extends JpaRepository<DogsInfo, Long>{

}
