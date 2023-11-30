package matching.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import product.bean.Hit;
import user.bean.DogsInfo;
import user.bean.User;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    private Hit hit;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

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
                    MatchingState matchingState, Hit hit, User user, DogsInfo dogsInfo) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.matchingPurpose = matchingPurpose;
        this.matchingState = matchingState;
        this.hit = hit;
        this.user = user;
        this.dogsInfo = dogsInfo;
    }

    public Matching create(List<String> imgs, Matching matching) {
        return matching.toBuilder()
                .image(String.join(",",imgs))
                .build();
    }
}
