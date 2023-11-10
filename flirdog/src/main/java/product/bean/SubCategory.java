package product.bean;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SubCategory {
    DRYFEED("건식사료", "FEED"),
    WETFEED("습식사료", "FEED"),
    SNACK("간식", "FEED"),
    NUTRITIONAL("영양제", "FEED"),
    HOMEMADEFEED("수제식", "FEED"),
    OTHERFEED("기타 사료", "FEED"),

    SHAMPOO("샴푸 및 린스", "BEAUTY"),
    TOOLS("미용도구", "BEAUTY"),
    HYGIENE("위생용품", "BEAUTY"),
    BATH("목욕용품", "BEAUTY"),
    ODORREMOVAL("냄새제거", "BEAUTY"),
    OTHERTOOLS("기타 용품", "BEAUTY"),

    CLOTHES("옷", "CLOTHING"),
    SHOES("신발", "CLOTHING"),
    HATS("모자", "CLOTHING"),
    NECKLACESCOLLARS("목걸이 및 목줄", "CLOTHING"),
    ACCESSORIES("액세서리", "CLOTHING"),
    OTHERCLOTHING("기타 의류", "CLOTHING"),

    NUTRITIONALSUPPLEMENTS("영양제", "HEALTH"),
    DEWORMERS("구충제", "HEALTH"),
    JOINTBONEHEALTH("관절/뼈 건강", "HEALTH"),
    DENTALCARE("치아 관리", "HEALTH"),
    SKINCOATCARE("피모 관리", "HEALTH"),
    OTHERHEALTH("기타 보조제", "HEALTH"),

    PUZZLETOYS("퍼즐 장난감", "TOY"),
    BALLS("볼", "TOY"),
    CHEWTOYS("츄잉 장난감", "TOY"),
    PLUSHTOYS("인형", "TOY"),
    TUGTOYS("끈기반 장난감", "TOY"),
    OTHERTOYS("기타 장난감", "TOY"),

    FEEDINGWATERBOWLS("식기 및 급수기", "HOMEWARE"),
    BEDDING("침구류", "HOMEWARE"),
    BATHTOILETSUPPLIES("목욕 및 화장실용품", "HOMEWARE"),
    CLEANINGTOOLS("청소도구", "HOMEWARE"),
    STORAGEITEMS("수납용품", "HOMEWARE"),
    OTHERHOMEWARE("기타", "HOMEWARE"),

    PLAYPENS("이동장", "SAFETY"),
    GATES("안전문", "SAFETY"),
    COLLARSHARNESSES("목줄 및 하네스", "SAFETY"),
    ACCESSORIES_SAFETY("안전 액세서리", "SAFETY"),
    OTHERSAFETY("기타 안전/이동", "SAFETY"),

    TRAINING("훈련용품", "TRAINING"),
    MANNERS("매너용품", "TRAINING"),
    POTTY("배변 훈련", "TRAINING"),
    BOOKSANDDVDS("교육 서적/DVD", "TRAINING"),
    OTHERTRAINING("기타 훈련", "TRAINING");

    private final String text;
    private final String mainCategory;
}
