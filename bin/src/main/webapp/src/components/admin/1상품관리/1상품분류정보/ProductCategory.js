const categories = {
  mainCategories: [
    { value: "feed", text: "사료" },
    { value: "beauty", text: "미용" },
    { value: "clothing", text: "의류" },
    { value: "health", text: "건강보조제" },
    { value: "toy", text: "장난감" },
    { value: "homeware", text: "생활용품" },
    { value: "safety", text: "안전용품" },
    { value: "training", text: "훈련용품" },
  ],

  subCategories: [
    {
      value: "feed",
      text: "사료",
      sub: [
        { value: "dryFeed", text: "건식사료" },
        { value: "wetFeed", text: "습식사료" },
        { value: "snack", text: "간식" },
        { value: "nutritional", text: "영양제" },
        { value: "homemadeFeed", text: "수제식" },
        { value: "otherFeed", text: "기타 사료" },
      ],
    },
    {
      value: "beauty",
      text: "미용",
      sub: [
        { value: "shampoo", text: "샴푸 및 린스" },
        { value: "tools", text: "미용도구" },
        { value: "hygiene", text: "위생용품" },
        { value: "bath", text: "목욕용품" },
        { value: "odorRemoval", text: "냄새제거" },
        { value: "otherTools", text: "기타 용품" },
      ],
    },
    {
      value: "clothing",
      text: "의류",
      sub: [
        { value: "clothes", text: "옷" },
        { value: "shoes", text: "신발" },
        { value: "hats", text: "모자" },
        { value: "necklacesCollars", text: "목걸이 및 목줄" },
        { value: "accessories", text: "액세서리" },
        { value: "otherClothing", text: "기타 의류" },
      ],
    },
    {
      value: "health",
      text: "건강보조제",
      sub: [
        { value: "nutritionalSupplements", text: "영양제" },
        { value: "dewormers", text: "구충제" },
        { value: "jointBoneHealth", text: "관절/뼈 건강" },
        { value: "dentalCare", text: "치아 관리" },
        { value: "skinCoatCare", text: "피모 관리" },
        { value: "otherHealth", text: "기타 보조제" },
      ],
    },
    {
      value: "toy",
      text: "장난감",
      sub: [
        { value: "puzzleToys", text: "퍼즐 장난감" },
        { value: "balls", text: "볼" },
        { value: "chewToys", text: "츄잉 장난감" },
        { value: "plushToys", text: "인형" },
        { value: "tugToys", text: "끈기반 장난감" },
        { value: "otherToys", text: "기타 장난감" },
      ],
    },
    {
      value: "homeware",
      text: "생활용품",
      sub: [
        { value: "feedingWaterBowls", text: "식기 및 급수기" },
        { value: "bedding", text: "침구류" },
        { value: "bathToiletSupplies", text: "목욕 및 화장실용품" },
        { value: "cleaningTools", text: "청소도구" },
        { value: "storageItems", text: "수납용품" },
        { value: "otherHomeware", text: "기타" },
      ],
    },
    {
      value: "safety",
      text: "안전용품",
      sub: [
        { value: "playpens", text: "이동장" },
        { value: "gates", text: "안전문" },
        { value: "collarsHarnesses", text: "목줄 및 하네스" },
        { value: "accessories", text: "안전 액세서리" },
        { value: "otherSafety", text: "기타 안전/이동" },
      ],
    },
    {
      value: "training",
      text: "훈련용품",
      sub: [
        { value: "training", text: "훈련용품" },
        { value: "manners", text: "매너용품" },
        { value: "potty", text: "배변 훈련" },
        { value: "BooksAndDVDs", text: "교육 서적/DVD" },
        { value: "otherTraining", text: "기타 훈련" },
      ],
    },
  ],
};

export default categories;
