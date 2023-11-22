package user.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DogsBreed {
	YORKSHIRE("요크셔테리어"),
	RETRIEVER("리트리버"),
	BICHON("비숑"),
	POODLE("푸들"),
    POMERANIAN("포메라니안"),
	HUSKY("허스키"),
	CHIHUAHUA("치와와"),
	DACHSHUND("닥스훈트"),
	MALTESE("말티즈"),
	BEAGLE("비글"),
	SHIHTZU("시츄"),
	WELSHCORGI("웰시코기"),
	JINDO("진돗개"),
	BORDERCOLLIE("보더콜리"),
	GermanShepherd("저먼셰퍼드"),
	COCKERSPANIEL("코커스패니얼");

    private final String text;
}
