import React, { useEffect, useState } from "react";
import styles from "../../../../css/admin/1상품관리/productDetail.module.css";
import ProductCategory from "./ProductCategory";

const ProductDetail = ({
  category1Selected,
  setCategory1Selected,
  category2Selected,
  setCategory2Selected,
}) => {
  const [category2Array, setCategory2Array] = useState([]);

  const category1 = ProductCategory.mainCategories;
  const category2 = ProductCategory.subCategories;
  useEffect(() => {
    if (category1Selected !== "") {
      const filteredSubCategories = category2.find(
        (item) => item.text === category1Selected
      );
      setCategory2Array(filteredSubCategories.sub);
    } else {
      setCategory2Array([]);
    }
  }, [category1Selected, category2]);

  const onSelected = (e, categoryType) => {
    const selectedCategory = e.target.innerText;

    if (categoryType === "category1Type") {
      setCategory1Selected(selectedCategory);
      setCategory2Selected("");
    } else if (categoryType === "category2Type") {
      setCategory2Selected(selectedCategory);
    }
  };

  return (
    <>
      {" "}
      <div className={styles.contentContainer}>
        <div className={styles.contentContainerCategory}>
          <span className={styles.contentContainerCategorySpan}>1차 분류</span>
          <div className={styles.categorySmallBox}>
            {category1.map((item, index) => (
              <div
                className={`${styles.categoryDiv} ${
                  category1Selected === item.text ? styles.categorySelected : ""
                }`}
                key={index}
                onClick={(e) => onSelected(e, "category1Type")}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.contentContainerCategory}>
          <span className={styles.contentContainerCategorySpan}>2차 분류</span>
          <div className={styles.categorySmallBox}>
            {category2Array.map((item, index) => (
              <div
                className={`${styles.categoryDiv} ${
                  category2Selected === item.text ? styles.categorySelected : ""
                }`}
                key={index}
                onClick={(e) => onSelected(e, "category2Type")}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
