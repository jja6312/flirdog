package user.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    ADMIN("관리자"),
    USER("일반사용자");

    private final String text;
}
