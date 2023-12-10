package product.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import order.bean.Orders;

import java.util.List;

@Getter
@Setter
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
    private Hit hit = new Hit(); // 정지안 : 이렇게해야 상품등록시 초기값이 0이되네요

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Orders orders;

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
