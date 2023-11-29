package user.bean;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "userTable")
public class UserDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(name="name", length=50)
    private String name;

	@Column(name="passwd", length=50)
    private String passwd;

	@Column(name="email", length=50)
    private String email;

	@Column(name="nickname", length=50)
    private String nickname;

	@Column(name="userRole", length=50)
    private String userRole;

	@Column(name="point", length=50)
    private Long point;

	@Column(name="communityScore", length=50)
    private int communityScore;

	@Column(name="dogsInfos", length=50)
    private String dogsInfos;

	@Column(name="popularity", length=50)
    private String popularity;

	@Column(name="matching", length=50)
    private String matching;

	@Column(name="communities", length=50)
    private String communities;

	@Column(name="addresses", length=50)
    private String addresses;

	@Column(name="pointChargings", length=50)
    private String pointChargings;
    
	@Column(name="phone", length=50)
    private String phone;
	
	@Column(name="introduce", length=500)
    private String introduce;

	@Column(name="image", nullable = false, length = 100)
    private String image; //이미지의 원래 이름

	@Column(name="imagefilename", nullable = false, length = 100)
	private String imageFileName; //UUID에서 얻은 이름
    
}
