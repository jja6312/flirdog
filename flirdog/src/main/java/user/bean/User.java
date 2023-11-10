package user.bean;

import api.BaseEntity;
<<<<<<< HEAD
import community.bean.Community;
import jakarta.persistence.*;
import lombok.*;
import matching.bean.Matching;
=======
import jakarta.persistence.*;
import lombok.*;
>>>>>>> f63edee (스프링 기본 세팅)

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

<<<<<<< HEAD
    private String nickname;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Embedded
    private Address address;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DogsInfo> dogsInfos;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Popularity popularity;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Matching> matching;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Community> communities;
=======
    @Enumerated(EnumType.STRING)
    private UserRole userRole;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<DogsInfo> dogsInfos;
>>>>>>> f63edee (스프링 기본 세팅)
}

