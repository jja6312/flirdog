package matching.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MatchingPurpose {
    DATE("연애"),
    WALK("산책");

    private final String text;
}
