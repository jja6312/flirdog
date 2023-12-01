package access.bean;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import user.bean.DogsBreed;
import user.bean.DogsInfo;
import user.bean.User;

@Getter
@Setter
public class JoinRequestDTO {
    private User user;
    private DogsInfo dogsInfo;
    private MultipartFile image;
    private String imageAiProfile;
    private DogsBreed dogsBreed;

}