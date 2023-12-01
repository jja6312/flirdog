package user.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DogsBreed {
	요크셔테리어("요크셔테리어"),
	리트리버("리트리버"),
	비숑("비숑"),
	푸들("푸들"),
	포메라니안("포메라니안"),
	허스키("허스키"),
	치와와("치와와"),
	닥스훈트("닥스훈트"),
	말티즈("말티즈"),
	비글("비글"),
	시츄("시츄"),
	웰시코기("웰시코기"),
	진돗개("진돗개"),
	보더콜리("보더콜리"),
	저먼셰퍼드("저먼셰퍼드"),
	코커스패니얼("코커스패니얼");

    private final String text;
}
