package s3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import s3.bean.S3ImgUpload;

@Repository
public interface S3ImgRepository extends JpaRepository<S3ImgUpload, String> {

}
