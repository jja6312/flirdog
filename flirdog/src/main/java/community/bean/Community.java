package community.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import product.bean.Hit;
import user.bean.DogsInfo;
import user.bean.User;

import java.util.List;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
