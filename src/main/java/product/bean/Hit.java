package product.bean;

import admin.conf.HitSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@JsonSerialize(using = HitSerializer.class)
public class Hit {
    private int hit = 0;

    public Hit(int hit) {
        this.hit = hit;
    }
}
