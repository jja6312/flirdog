package somoim.bean;

import api.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import user.bean.User;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@ToString
public class Somoim extends BaseEntity{
	@Id
	@Column(name="somoim_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@NonNull
	private String somoimName;
	
	@NonNull
	private String introduceSub;
	
	@NonNull
	private String introduceDetail;
	
//	@NonNull
//	private String introducePhoto;
	
	@NonNull
	private Long memberCount;
	
	@NonNull
	private Long cost;
	
	@Enumerated(EnumType.STRING)
	private Location location;
	
	@NonNull
	private String target;
	
	@NonNull // 22일추가
	private String address;
	
	@NonNull // 22일추가
	private String address2;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_id", nullable = false)
	private User user;
	
	@NonNull
	private String accountEmail;
	
	@NonNull
	private Long accountPhone;


}
