package order.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderType {
    POINT("포인트결제"),
    CARD("카드결제"),
    KAKAO("카카오결제");

    private final String text;
}
