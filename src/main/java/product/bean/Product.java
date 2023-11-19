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
@NoArgsConstructor(access = AccessLevel.PUBLIC)
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
    private Hit hit = new Hit(); // 명시적으로 new 해서 기본값 0으로 설정했습니다.(지안)

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductComment> productComments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Builder(toBuilder = true)
    private Product(String name, String content, int stock, int price, String image, MainCategory mainCategory,
            SubCategory subCategory) {
        this.name = name;
        this.content = content;
        this.stock = stock;
        this.price = price;
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
