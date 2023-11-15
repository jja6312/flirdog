package s3.bean;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "s3Img")
public class S3ImgUpload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int seq;
    private String imageName;
    private String imageContent;
    private String imageFileName;
    private String imageOriginalName;
}