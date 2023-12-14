package user.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import api.BaseEntity;
import jakarta.persistence.Column;
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
import lombok.Setter;
import matching.bean.Matching;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") // 12/4 지안추가. 개정보 조회/수정시 유저가
                                                                                           // 안끌고와져서 추가.
public class DogsInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String age;

    private String gender;

    @Enumerated(EnumType.STRING)
    private DogsBreed dogsBreed;

    private Boolean isNeutralized;

    private String image;

    @Column(length = 1000) // 지안 추가. AI 프로필 사진
    private String imageAiProfile; // 지안 추가. AI 프로필 사진

    @Embedded
    private Score score;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "dogsInfo")
    private List<Matching> matching;

    @Override
    public String toString() {
        return "DogsInfo{id=" + id + ", "
                + "name='" + name + "', "
                + "age='" + age + "', "
                + "user='" + user.getId() + "', "
                + "gender='" + gender + "'}";
    }

}
