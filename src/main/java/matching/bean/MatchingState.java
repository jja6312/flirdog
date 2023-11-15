package matching.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MatchingState {
    PENDING("매칭중"),
    CANCLE("매칭취소"),
    COMPLETE("매칭완료");


    private final String text;
}
