package matching.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MatchingPurpose {
    연애("연애"),
    산책("산책");

    private final String text;
}
