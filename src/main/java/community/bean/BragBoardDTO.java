package community.bean;


import java.util.List;

import api.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Setter
@Table(name = "BragBoard")
public class BragBoardDTO extends BaseEntity{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name="title", length=50)
    private String title;
    
    @NonNull
    @Column(name="content", length=500)
    private String content;
    
    @NonNull
    @Column(name="iamge", length=500)
    private String image;
    
    @NonNull
	@Column(name="userId", length=50)
    private Long userId;
    
    @NonNull
    @Column(name="userNickName", length=100)
    private String userNickName;
    
    @Column(name="communityScore", length=200)
    private int communityScore;
    
    @Column(name="likeScore", length=200)
    private int likeScore;
    
    @Column(name="commentCount", length=200)
    private int commentCount;
    
    @Column(name="hit", length=100)
    @GeneratedValue(strategy= GenerationType.IDENTITY) //MySQL의 AUTO-INCREMENT를 사용하여 자동으로 시쿼스 적용
    private int hit;
    
    @Builder(toBuilder = true)
    public BragBoardDTO(Long userId, String title, String content, String image, String userNickName, 
    					int communityScore, int commentCount, int likeScore, int hit) {
        this.userId = userId;
        this.userNickName = userNickName;
        this.title = title;
        this.content = content;
        this.image = image;
        this.hit = hit;
        this.likeScore = likeScore;
        this.communityScore = communityScore;
        this.commentCount = commentCount;
    }

    public BragBoardDTO create(List<String> imgs, BragBoardDTO bragBoardDTO) {
        return bragBoardDTO.toBuilder()
                .image(String.join(",", imgs))
                .build();
    }
    
    public int getHit() {
        return this.hit;
    }

    public void incrementHit() {
        this.hit++;
    }
}
