package user.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DogsBreed {
    POMERANIAN("포메라니안"),
    RETRIEVER("리트리버");

    private final String text;
}
