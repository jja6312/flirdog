import React, { useEffect, useState } from "react";
import rightContent from "../../../../css/admin/rightContent.module.css";
import styles from "../../../../css/admin/1상품관리/productDetail.module.css";

const ProductDetail = () => {
  const category1 = [
    "식품",
    "미용 및 위생",
    "의류 및 액세서리",
    "건강 및 보조제",
    "장난감",
    "생활용품",
    "안전 및 이동",
    "훈련 및 행동조정",
  ];

  const category2 = {
    식품: ["건식사료", "습식사료", "간식", "영양제", "수제식", "기타 식품"],
    "미용 및 위생": [
      "샴푸 및 린스",
      "미용도구",
      "위생용품",
      "목욕용품",
      "냄새제거",
      "기타 미용/위생",
    ],
    "의류 및 액세서리": [
      "옷",
      "신발",
      "모자",
      "목걸이 및 목줄",
      "액세서리",
      "기타 의류",
    ],
    "건강 및 보조제": [
      "영양제",
      "구충제",
      "관절/뼈 건강",
      "치아 관리",
      "피모 관리",
      "기타 건강",
    ],
    장난감: [
      "퍼즐 장난감",
      "볼",
      "츄잉 장난감",
      "인형",
      "끈기반 장난감",
      "기타 장난감",
    ],
    생활용품: [
      "식기 및 급수기",
      "침구류",
      "목욕 및 화장실용품",
      "청소도구",
      "수납용품",
      "기타 생활",
    ],
    "안전 및 이동": [
      "이동장",
      "안전문",
      "목줄 및 하네스",
      "차량용품",
      "안전 액세서리",
      "기타 안전/이동",
    ],
    "훈련 및 행동조정": [
      "훈련용품",
      "매너용품",
      "배변 훈련",
      "행동조정 액세서리",
      "교육 서적/DVD",
      "기타 훈련",
    ],
  };

  const category3 = {
    건식사료: ["소형견용", "중형견용", "대형견용", "기타"],
    습식사료: ["소형견용", "중형견용", "대형견용", "기타"],
    간식: ["치석관리용", "훈련용", "영양간식", "기타"],
    영양제: ["비타민", "오메가 지방산", "장 건강", "기타"],
    수제식: ["원료별", "생식", "기능성", "기타"],
    "기타 식품": ["처방식", "분유", "이유식", "기타"],

    "샴푸 및 린스": ["일반용", "치료용", "미용용", "기타"],
    미용도구: ["브러시/빗", "가위/클리퍼", "네일 케어", "기타"],
    위생용품: ["기저귀", "패드", "청결제", "기타"],
    목욕용품: ["타월/가운", "목욕장비", "목욕 액세서리", "기타"],

    옷: ["코트/자켓", "스웨터/후드", "레인코트", "기타 의류"],
    신발: ["부츠", "양말", "보호화", "기타 신발"],
    모자: ["썬캡", "빈니", "모자 액세서리", "기타 모자"],
    "목걸이 및 목줄": ["가죽", "나일론", "금속", "기타 목줄"],

    영양제: ["비타민", "오메가 지방산", "관절/뼈 지원", "기타 영양제"],
    구충제: ["내부구충", "외부구충", "올인원", "기타 구충제"],
    "관절/뼈 건강": ["보조식품", "치료식", "간식형", "기타"],

    "퍼즐 장난감": ["지능개발용", "문제해결용", "피드백 장난감", "기타"],
    볼: ["러버볼", "테니스볼", "플로팅볼", "기타"],
    "츄잉 장난감": ["뼈모양", "간식삽입형", "덴탈케어", "기타"],

    "식기 및 급수기": ["자동급식기", "물병/급수기", "식기", "기타"],
    침구류: ["방석", "침대", "담요", "기타"],
    "목욕 및 화장실용품": ["배변패드", "배변함", "훈련용품", "기타"],

    이동장: ["소형견용", "중형견용", "대형견용", "기타"],
    안전문: ["실내용", "외출용", "차량용", "기타"],
    "목줄 및 하네스": ["가죽", "나일론", "조절 가능", "기타"],

    훈련용품: ["클리커", "휘슬", "훈련용 스낵", "기타"],
    매너용품: ["매너벨트", "배변봉투", "매너패드", "기타"],
    "배변 훈련": ["배변패드", "배변함", "배변 유도제", "기타"],
  };

  const onSelected = (e) => {
    e.target.style.backgroundColor = "#1967d2";
    e.target.style.color = "white";
    const siblings = e.target.parentNode.childNodes;
    const whatCategory = e.target.parentNode.firstChild.innerText;
    siblings.forEach((item) => {
      if (item !== e.target) {
        item.style.backgroundColor = "white";
        item.style.color = "black";
      }
    });
    if (whatCategory === "=1차분류=") {
      setCategory1Selected(e.target.innerText);
    } else if (whatCategory === "=2차분류=") {
      setCategory2Selected(e.target.innerText);
    } else if (whatCategory === "=3차분류=") {
      setCategory3Selected(e.target.innerText);
    }
  };

  const [category1Selected, setCategory1Selected] = useState("");
  const [category2Selected, setCategory2Selected] = useState("");
  const [category3Selected, setCategory3Selected] = useState("");

  useEffect(() => {
    if (category1Selected !== "=1차분류=") {
      const category2List = category2[category1Selected];
    }
  }, [category1Selected, category2Selected]);

  return (
    <>
      <div className="mt-5">
        <span className={` ${rightContent.titleSecond} `}>상품 분류 정보</span>
        <span className={rightContent.titleSecondStar}>*</span>
      </div>
      <p className={`mt-4 ${rightContent.titleThird} `}>
        1차 분류를 선택하시면 2차 분류가 자동으로 제안됩니다.
      </p>
      <div className={styles.contentContainer}>
        <div className={styles.contentContainerCategory}>
          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>1차 분류</span>
          <div className={styles.categorySmallBox}>
            <div className={styles.categoryDiv}>=1차분류=</div>
            {category1.map((item, index) => (
              <div
                className={styles.categoryDiv}
                key={index}
                onClick={onSelected}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.contentContainerCategory}>
          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>2차 분류</span>
          <div className={styles.categorySmallBox}>
            <div className={styles.categoryDiv}>=2차분류=</div>
          </div>
        </div>
        <div className={styles.contentContainerCategory}>
          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>3차 분류</span>
          <div className={styles.categorySmallBox}>
            <div className={styles.categoryDiv}>=3차분류=</div>
            {/* {category3.map((item, index) => (
              <div
                className={styles.categoryDiv}
                key={index}
                onClick={onSelected}
              >
                {item}
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
