package matching.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MatchingState {
    PENDING("매칭찾는중"),
    MATCHINGPROGRESS("매칭진행중"),
    COMPLETE("매칭완료");


    private final String text;
}
