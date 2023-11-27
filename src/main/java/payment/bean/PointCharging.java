package payment.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;

import api.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import user.bean.User;



@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PointCharging extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int price;

    private int chargingPoint;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
