package somoim.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import api.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import product.bean.Hit;
import user.bean.User;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
//@ToString
public class SomoimPhoto extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="photo_id")
    private Long id;
	
	@NonNull
	private String photoTitle;
	
	@NonNull
	@Column(length = 2000)
	private String photoContent;
	
	@NonNull
	private String photoLink;
	
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long photoLike;
	
//	@Embedded
//    private Hit hit = new Hit(); // 명시적으로 new 해서 기본값 0으로 설정
	@Column(nullable = false)
    private int hit = 0;
	
	@NonNull
	private String somoimPhoto;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "somoim_id", nullable = false)
    private Somoim somoim;

	
    @Builder(toBuilder = true)
    private SomoimPhoto(Long id, @NonNull String photoTitle, @NonNull String photoContent,
                        @NonNull String photoLink, @NonNull String somoimPhoto, int hit,
                        @NonNull Long photoLike, User user, Somoim somoim) {
        this.id = id;
        this.photoTitle = photoTitle;
        this.photoContent = photoContent;
        this.photoLink = photoLink;
        this.somoimPhoto = somoimPhoto;
        this.hit = hit;
        this.photoLike = photoLike;
        this.user = user;
        this.somoim = somoim;
    }

    public SomoimPhoto create(List<String> imgs, SomoimPhoto somoimPhoto) {
        return new SomoimPhotoBuilder()
                .somoimPhoto(String.join(",", imgs))
                .build();
    }

    @Override
    public String toString() {
        return "SomoimPhoto{" +
                "id=" + id +
                ", photoTitle='" + photoTitle + '\'' +
                ", photoContent='" + photoContent + '\'' +
                ", photoLink='" + photoLink + '\'' +
                ", photoLike=" + photoLike +
                ", hit=" + hit +
                ", somoimPhoto='" + somoimPhoto + '\'' +
                ", userId=" + user.getId() +
                ", somoimId=" + somoim.getId() +
                '}';
    }

}
