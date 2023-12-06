package message.bean;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomType {
    SOMOIM("소모임"),
    MATCHING("매칭"),
    ADMIN("관리자문의");

    private final String text;
}