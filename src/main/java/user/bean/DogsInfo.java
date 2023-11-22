package user.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import api.BaseEntity;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matching.bean.Matching;

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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "dogsInfo")
    private List<Matching> matching;

}
