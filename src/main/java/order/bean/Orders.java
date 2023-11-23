package order.bean;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import product.bean.Product;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Orders extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalPrice;

    private LocalDateTime registeredDateTime;

    private int phone;

    private String city;

    private String state;

    private String zipCode;

    @Enumerated(EnumType.STRING)
    @Transient
    private OrderType orderType;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;


    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<Product> products;
}
