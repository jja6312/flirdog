package product.bean;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import admin.conf.HitSerializer;
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
