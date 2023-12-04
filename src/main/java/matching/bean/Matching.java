package matching.bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import api.BaseEntity;
import jakarta.persistence.CascadeType;
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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import product.bean.Hit;
import user.bean.DogsInfo;
import user.bean.User;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class Matching extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String title;

    private String content;

    private String image;

    @Enumerated(EnumType.STRING)
    private MatchingPurpose matchingPurpose;

    @Enumerated(EnumType.STRING)
    private MatchingState matchingState;

    @Embedded
    private Hit hit = new Hit(); // 명시적으로 new 해서 기본값 0으로 설정했습니다.(현성)

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY) // cascade 옵션 추가
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dofs_info_id")
    private DogsInfo dogsInfo;

    @NonNull
    private String matchingDate;

    @NonNull
    private String matchingAddress;

    @NonNull
    private String dogMBTI;

    @Builder(toBuilder = true)
    private Matching(Long id, @NonNull String title, String content, String image, MatchingPurpose matchingPurpose,
            MatchingState matchingState, Hit hit, User user, DogsInfo dogsInfo, String matchingDate,
            String matchingAddress,
            String dogMBTI) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.matchingPurpose = matchingPurpose;
        this.matchingState = matchingState;
        this.hit = hit;
        this.user = user;
        this.dogsInfo = dogsInfo;
        this.matchingDate = matchingDate;
        this.matchingAddress = matchingAddress;
        this.dogMBTI = dogMBTI;
        this.user = user;
    }

    public Matching create(List<String> imgs, Matching matching) {
        return matching.toBuilder()
                .image(String.join(",", imgs))
                .build();
    }
}
