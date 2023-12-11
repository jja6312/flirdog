package product.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MainCategory {
    FEED("사료"),
    BEAUTY("미용"),
    CLOTHING("의류"),
    HEALTH("건강보조제"),
    TOY("장난감"),
    HOMEWARE("생활용품"),
    SAFETY("안전용품"),
    TRAINING("훈련용품");

    private final String text;
}