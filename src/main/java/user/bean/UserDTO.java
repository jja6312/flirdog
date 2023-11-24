package user.bean;

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

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "userTable")
public class UserDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "name", length = 50)
    private String name;

    @NonNull
    @Column(name = "passwd", length = 50)
    private String passwd;

    @NonNull
    @Column(name = "email", length = 50)
    private String email;

    @NonNull
    @Column(name = "nickname", length = 50)
    private String nickname;

    @NonNull
    @Column(name = "userRole", length = 50)
    private String userRole;

    @NonNull
    @Column(name = "point", length = 50)
    private Long point;

    @Column(name = "communityScore", length = 50)
    private int communityScore;

    @Column(name = "dogsInfos", length = 50)
    private String dogsInfos;

    @Column(name = "popularity", length = 50)
    private String popularity;

    @Column(name = "matching", length = 50)
    private String matching;

    @Column(name = "communities", length = 50)
    private String communities;

    @Column(name = "addresses", length = 50)
    private String addresses;

    @Column(name = "pointChargings", length = 50)
    private String pointChargings;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "introduce", length = 500)
    private String introduce;

    @Builder(toBuilder = true)
    public UserDTO(Long id, @NonNull String name, String passwd, String email, String nickname, String userRole,
            Long point, int communityScore, String dogsInfos, String popularity, String matching,
            String communities, String addresses, String pointChargings, String phone, String introduce) {
        this.id = id;
        this.name = name;
        this.passwd = passwd;
        this.email = email;
        this.nickname = nickname;
        this.userRole = userRole;
        this.point = point;
        this.communityScore = communityScore;
        this.dogsInfos = dogsInfos;
        this.popularity = popularity;
        this.matching = matching;
        this.communities = communities;
        this.addresses = addresses;
        this.pointChargings = pointChargings;
        this.phone = phone;
        this.introduce = introduce;
    }

}
