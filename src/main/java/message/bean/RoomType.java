package message.bean;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoomType {
    IMAGE("이미지"),
    TEXT("텍스트");

    private final String text;
}
