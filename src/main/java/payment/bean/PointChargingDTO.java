package payment.bean;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "PointChargingTable")
public class PointChargingDTO {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(name="price", length=50)
    private int price;

	@Column(name="chargingPoint", length=50)
    private int chargingPoint;

	@Column(name="createdDate", length=50)
    private Date createdDate;

	@Column(name="validDate", length=50)
    private Date validDate;
    
}
