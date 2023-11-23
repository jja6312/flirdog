package user.bean;

import api.BaseEntity;
import message.bean.JoinUser;
import message.bean.MessageRoom;
import community.bean.Community;
import jakarta.persistence.*;
import lombok.*;
import matching.bean.Matching;
import payment.bean.PointCharging;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User extends BaseEntity{
    @Id
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
    private UserRole userRole;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Address> addresses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PointCharging> pointChargings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<JoinUser> joinUsers;
}

