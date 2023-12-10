package user.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import api.BaseEntity;
import community.bean.Community;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import matching.bean.Matching;
import payment.bean.PointCharging;
import somoim.bean.Somoim;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@JsonSerialize(using = UserSerializer.class)
@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) // 12/2
// 지안추가. 모달띄울때 user정보를불러오는데, 이때 이게있으니까 잘됨.
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") // 12/4 지안추가. 개정보 조회/수정시
                                                                                           // 유저가안끌고와져서 추가.
public class User extends BaseEntity {
    @Id
    // @Column(name="user_Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private String passwd;

    @NonNull
    private String email;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.USER; // 기본값으로 USER 할당. 12/9지안.

    private Long point;

    private int communityScore;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<DogsInfo> dogsInfos;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Popularity popularity;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Matching> matching;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Community> communities;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Address> addresses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PointCharging> pointChargings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Somoim> somoim;

    public Long getPoint() {
        return point != null ? point : 0L; // point가 null이면 0 반환
    }
}
