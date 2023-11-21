package product.bean;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import admin.conf.HitSerializer;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Embeddable
@Getter
@JsonSerialize(using = HitSerializer.class)
public class Hit {
    private int hit;
}
