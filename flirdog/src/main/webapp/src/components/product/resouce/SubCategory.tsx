import {ClassEnum} from "class-enum";
import CheckBox from "./CheckBox";
import React from "react";
import SubCategoryCheckbox from "../Object/SubCategoryCheckbox";

type Sub = {
    value:string;
    text:string;
}
type SubIsChecked = {
    [T:string]:boolean
}

export default class SubCategory extends ClassEnum<SubCategory> {
    public static readonly FEED = new SubCategory("FEED", "사료",[
        { value: "DRYFEED", text: "건식사료" },
        { value: "WETFEED", text: "습식사료" },
        { value: "SNACK", text: "간식" },
        { value: "NUTRITIONAL", text: "영양제" },
        { value: "HOMEMADEFEED", text: "수제식" },
        { value: "OTHERFEED", text: "기타 사료" }
    ]);

    public static readonly BEAUTY = new SubCategory("BEAUTY", "미용", [
        { value: "SHAMPOO", text: "샴푸 및 린스" },
        { value: "TOOLS", text: "미용도구" },
        { value: "HYGIENE", text: "위생용품" },
        { value: "BATH", text: "목욕용품" },
        { value: "ODORREMOVAL", text: "냄새제거" },
        { value: "OTHERTOOLS", text: "기타 용품" }
    ]);

    public static readonly CLOTHING = new SubCategory("CLOTHING", "의류", [
        { value: "CLOTHES", text: "옷" },
        { value: "SHOES", text: "신발" },
        { value: "HATS", text: "모자" },
        { value: "NECKLACESCOLLARS", text: "목걸이 및 목줄" },
        { value: "ACCESSORIES", text: "액세서리" },
        { value: "OTHERCLOTHING", text: "기타 의류" }
    ]);

    public static readonly HEALTH = new SubCategory("HEALTH", "건강보조제", [
        { value: "NUTRITIONALSUPPLEMENTS", text: "영양제" },
        { value: "DEWORMERS", text: "구충제" },
        { value: "JOINTBONEHEALTH", text: "관절/뼈 건강" },
        { value: "DENTALCARE", text: "치아 관리" },
        { value: "SKINCOATCARE", text: "피모 관리" },
        { value: "OTHERHEALTH", text: "기타 보조제" }
    ]);

    public static readonly TOY = new SubCategory("TOY", "장난감", [
        { value: "PUZZLETOYS", text: "퍼즐 장난감" },
        { value: "BALLS", text: "볼" },
        { value: "CHEWTOYS", text: "츄잉 장난감" },
        { value: "PLUSHTOYS", text: "인형" },
        { value: "TUGTOYS", text: "끈기반 장난감" },
        { value: "OTHERTOYS", text: "기타 장난감" }
    ]);

    public static readonly HOMEWARE = new SubCategory("HOMEWARE", "생활용품", [
        { value: "FEEDINGWATERBOWLS", text: "식기 및 급수기" },
        { value: "BEDDING", text: "침구류" },
        { value: "TOILETSUPPLIES", text: "화장실용품" },
        { value: "CLEANINGTOOLS", text: "청소도구" },
        { value: "STORAGEITEMS", text: "수납용품" },
        { value: "OTHERHOMEWARE", text: "기타" }
    ]);

    public static readonly SAFETY = new SubCategory("SAFETY", "안전용품", [
        { value: "PLAYPENS", text: "이동장" },
        { value: "GATES", text: "안전문" },
        { value: "COLLARSHARNESSES", text: "목줄 및 하네스" },
        { value: "SAFETYACCESSORIES", text: "안전 액세서리" },
        { value: "OTHERSAFETY", text: "기타 안전/이동" }
    ]);
    public static readonly TRAINING = new SubCategory("TRAINING", "훈련용품", [
        { value: "TRAINING", text: "훈련용품" },
        { value: "MANNERS", text: "매너용품" },
        { value: "POTTY", text: "배변 훈련" },
        { value: "BOOKSANDDVDS", text: "교육 서적/DVD" },
        { value: "OTHERTRAINING", text: "기타 훈련" }
    ]);

    public readonly text;
    public readonly subCategory;

    constructor(value: string, text: string, subCategory: Sub[]) {
        super(value);
        this.text = text;
        this.subCategory = subCategory;
    }

    public getText() {
        return this.text;
    }

    public getSubCategory() {
        return this.subCategory;
    }
}