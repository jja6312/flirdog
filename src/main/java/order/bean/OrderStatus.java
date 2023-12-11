package order.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {
    PAYMENT_COMPLETED("결제완료"),
    PAYMENT_FAILED("결제실패"),
    ORDER_CHECKED("발주확인"),
    ORDER_CANCLED("발주취소"),
    COMPLETED("배송완료");

    private final String text;
}
