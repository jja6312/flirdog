package somoim.bean;

import api.BaseEntity;
import jakarta.persistence.Column;
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
import user.bean.User;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class SomoimPhotoComment extends BaseEntity  {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;
	
	@NonNull
	@Column(name = "comment", length = 2000)
    private String comment;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "somoim_id", nullable = false)
    private Somoim somoim;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "photo_id", nullable = false)
    private SomoimPhoto somoimPhoto;
    
    // 해당 댓글의 깊이. 댓글은 0, 대댓글은 1
    @NonNull
    @Column(name = "cDept", nullable = false)
    private int cDept = 0;

    // 대댓글일시 부모댓글의 id값을 참조하도록 설정
    @ManyToOne
    @JoinColumn(name = "cGroup")
    private SomoimPhotoComment parentComment;
    
    // 빌더 메서드 추가
    @Builder
    public SomoimPhotoComment(Long id, @NonNull String comment, Somoim somoim, User user,
                               SomoimPhoto somoimPhoto, int cDept, SomoimPhotoComment parentComment) {
        this.id = id;
        this.comment = comment;
        this.somoim = somoim;
        this.user = user;
        this.somoimPhoto = somoimPhoto;
        this.cDept = cDept;
        this.parentComment = parentComment;
    }

    // toString 메서드 추가
    @Override
    public String toString() {
        return "SomoimPhotoComment{" +
                "id=" + id +
                ", comment='" + comment + '\'' +
                ", somoim=" + somoim +
                ", user=" + user +
                ", somoimPhoto=" + somoimPhoto +
                ", cDept=" + cDept +
                ", parentComment=" + parentComment +
                '}';
    }
}
