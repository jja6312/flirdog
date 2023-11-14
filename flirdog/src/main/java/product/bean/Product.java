package product.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import order.bean.Order;
import user.bean.DogsInfo;
import user.bean.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    private String content;

    private String image;

    private int stock;

    private int price;

    private String contentDetail;

    @Enumerated(EnumType.STRING)
    private MainCategory mainCategory;

    @Enumerated(EnumType.STRING)
    private SubCategory subCategory;

    @Embedded
    private Hit hit;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductComment> productComments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Builder(toBuilder = true)
    private Product(String name, String content, String image, MainCategory mainCategory, SubCategory subCategory) {
        this.name = name;
        this.content = content;
        this.image = image;
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
    }

    public static Product create(List<String> imgs, Product product) {
        return product.toBuilder()
                .image(String.join(",", imgs))
                .build();
    }
}
