package user.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matching.bean.Matching;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class DogsInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String age;

    private String gender;

    @Enumerated(EnumType.STRING)
    private DogsBreed dogsBreed; //품종

    private Boolean isNeutralized; //중성화 여부 했으면 true 안했으면 false

    private String image;

    @Embedded
    private Score score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "dogsInfo")
    private List<Matching> matching;

}
