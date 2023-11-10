package product.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

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

    @Enumerated(EnumType.STRING)
    private MainCategory mainCategory;

    @Enumerated(EnumType.STRING)
    private SubCategory subCategory;

<<<<<<< HEAD
    @Embedded
    private Hit hit;

    @Builder(toBuilder = true)
=======
    @Builder
>>>>>>> f63edee (스프링 기본 세팅)
    private Product(String name, String content, String image, MainCategory mainCategory, SubCategory subCategory) {
        this.name = name;
        this.content = content;
        this.image = image;
        this.mainCategory = mainCategory;
        this.subCategory = subCategory;
    }

    public static Product create(List<String> imgs, Product product) {
<<<<<<< HEAD
        return product.toBuilder()
                .image(String.join(",", imgs))
=======
        return Product.builder()
                .name(product.getName())
                .content(product.getContent())
                .image(String.join(",", imgs))
                .mainCategory(product.getMainCategory())
                .subCategory(product.getSubCategory())
>>>>>>> f63edee (스프링 기본 세팅)
                .build();
    }
}
