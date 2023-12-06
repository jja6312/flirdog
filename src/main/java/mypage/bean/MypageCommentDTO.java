package mypage.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NonNull;


@Data
@Entity
@Table(name = "mypageComment")
public class MypageCommentDTO {
	   
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	   
	    @Column(name="boardId", length=50)
	    private Long boardId;
	   
	    @Column(name="userId", length=50)
	    private Long userId;
	   
	    @Column(name="userNickName", length=100)
	    private String userNickName;
	   
	    @Column(name="content", length=500)
	    private String content;

}
