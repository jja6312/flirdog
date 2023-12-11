package somoim.bean;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import user.bean.User;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class SomoimPhotoLike {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_like_id")
    private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "photo_id", nullable = false)
    private SomoimPhoto somoimPhoto;

	
	// @Builder 메소드 추가
    @Builder
    public SomoimPhotoLike(Long id, User user, SomoimPhoto somoimPhoto) {
        this.id = id;
        this.user = user;
        this.somoimPhoto = somoimPhoto;
    }

    // toString 메소드 추가
    @Override
    public String toString() {
        return "SomoimPhotoLike{" +
                "id=" + id +
                ", user=" + user +
                ", somoimPhoto=" + somoimPhoto +
                '}';
    }
}
