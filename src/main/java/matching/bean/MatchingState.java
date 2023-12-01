package matching.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MatchingState {
    매칭대기("매칭 대기"),
    매칭중("매칭 중"),
    매칭완료("매칭완료");


    private final String text;
}
