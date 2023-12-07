package mypage.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Entity
@Table(name = "mypageBoard")
public class MypageBoardDTO {
	  	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name="title", length=50)
	    private String title;
	    
	    @Column(name="content", length=500)
	    private String content;
	    
	    @Column(name="image", length=500)
	    private String image;
	    
	    @Column(name="userId", length=50)
	    private Long userId;
	    
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
	    

}
