package legacy.user.bean;

import java.util.List;

import community.bean.Community;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import matching.bean.Matching;
import payment.bean.PointCharging;
import user.bean.Address;
import user.bean.DogsInfo;
import user.bean.Popularity;

@Getter
@Setter
@Table(name="usertable")
@Entity
public class LegacyUser {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	

	@Column(name="name", nullable=false, length=30)
	private String name;
	
	@Column(name="passwd", nullable=false, length=30)
	private String passwd;

	@Column(name="email", nullable=false,length=30)
	private String email;
	
	@Column(name="nickname", length=30)
    private String nickname;

	@Column(name="userRole", length=30)
    private String userRole;

	@Column(name="point", length=30)
    private Long point;
	
	@Column(name="communityScore", length=30)
    private int communityScore;

    
    //--아래 내용은 다른 테이블과의 관계를 나타냄.
    
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DogsInfo> dogsInfos;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Popularity popularity;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Matching> matching;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Community> communities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PointCharging> pointChargings;
}
