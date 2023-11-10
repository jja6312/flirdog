package community.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BoardType {
    FREE("자유게시판"),
    BRAG("자랑게시판");

    private final String text;
}
