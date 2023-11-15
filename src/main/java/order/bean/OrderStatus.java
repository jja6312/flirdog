package order.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    PAYMENT_COMPLETED("결제완료"),
    PAYMENT_FAILED("결제실패"),
    COMPLETED("배송완료");

    private final String text;
}
