package order.bean;

import java.time.LocalDateTime;
import java.util.List;

import api.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import product.bean.Product;


@Getter
@Setter
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
    @Column(length = 50)  // 12/9 지안수정. 이것때문에 발주확인 등이 먹히지않음.
    private OrderStatus orderStatus;


    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<Product> products;
}
