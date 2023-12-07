package community.bean;

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
@Table(name = "BragBoardCommentTable")
public class BragBoardCommentDTO extends BaseEntity{
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NonNull
	@Column(name="boardId", length=50)
    private Long boardId;
	
	@NonNull
	@Column(name="userId", length=50)
    private Long userId;
	
	@NonNull
    @Column(name="userNickName", length=100)
    private String userNickName;
	
	@NonNull
    @Column(name="content", length=500)
    private String content;
	
	@Builder(toBuilder = true)
    public BragBoardCommentDTO(Long id, Long boardId, Long userId, String userNickName, String content) {
		this.id = id;
		this.boardId = boardId;
        this.userId = userId;
        this.userNickName = userNickName;
        this.content = content;
    }
}
