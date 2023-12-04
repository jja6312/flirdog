package matching.bean;

import java.util.List;

import api.BaseEntity;
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
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "matchingTable")
public class MatchingDTO extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "userId", length = 50)
    private Long userId;

    @NonNull
    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "content", length = 500)
    private String content;

    @Column(name = "iamge", length = 500)
    private String image;

    @Column(name = "dogName", length = 30)
    private String dogName;

    @Column(name = "dogAge", length = 20)
    private String dogAge;

    @Column(name = "dogGender", length = 20)
    private String dogGender;

    @Column(name = "isNeutralized", length = 20)
    private Boolean isNeutralized;

    @Column(name = "dogMBTI", length = 20)
    private String dogMBTI;

    @Column(name = "dogBreed", length = 50)
    private String dogBreed;

    @Column(name = "date", length = 50)
    private String date;

    @Column(name = "matchingPurpose", length = 50)
    private String matchingPurpose;

    @Column(name = "matchingState", length = 50)
    private String matchingState;

    @Column(name = "matchingAddress", length = 200)
    private String matchingAddress;

    @Column(name = "averageScore", length = 50)
    private String averageScore;

    @Column(name = "communityScore", length = 200)
    private int communityScore;

    @Column(name = "hit", length = 100)
    @GeneratedValue(strategy = GenerationType.IDENTITY) // MySQL의 AUTO-INCREMENT를 사용하여 자동으로 시쿼스 적용
    private int hit;

    @Builder(toBuilder = true)
    public MatchingDTO(Long userId, String title, String content, String dogName, String dogAge, String dogGender,
            Boolean isNeutralized, String dogMBTI, String dogBreed, String date, String matchingState,
            String matchingAddress, String matchingPurpose, String image, String averageScore, int communityScore,
            int hit) {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.dogName = dogName;
        this.dogAge = dogAge;
        this.dogGender = dogGender;
        this.isNeutralized = isNeutralized;
        this.dogMBTI = dogMBTI;
        this.dogBreed = dogBreed;
        this.date = date;
        this.matchingState = matchingState;
        this.matchingAddress = matchingAddress;
        this.matchingPurpose = matchingPurpose;
        this.image = image;
        this.hit = hit;
        this.communityScore = communityScore;
        this.averageScore = averageScore;
    }

    public MatchingDTO create(List<String> imgs, MatchingDTO matchingDTO) {
        return matchingDTO.toBuilder()
                .image(String.join(",", imgs))
                .build();
    }
}
