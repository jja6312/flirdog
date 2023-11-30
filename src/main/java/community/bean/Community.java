package community.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import product.bean.Hit;
import user.bean.User;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Community extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String title;

    private String content;

    private String image;

    @Enumerated(EnumType.STRING)
    private BoardType boardType;

    @Embedded
    private Hit hit;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "community", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityComment> communityComments;
}
