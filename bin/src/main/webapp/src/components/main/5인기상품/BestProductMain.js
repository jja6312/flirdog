import React from "react";
import ShoppingProduct from "./ShoppingProduct";
import styles from "../../../css/main/5인기상품/shoppingProduct.module.css";

const BestProductMain = () => {
  return (
    <>
      <div className="d-flex justify-content-center mt-10 flex-column">
        <span className={styles.titleText}>인기 상품</span>
        <div className="row mt-5">
          <ShoppingProduct imgSrc="/image/main/exam/exam1.jpg"></ShoppingProduct>
          <ShoppingProduct imgSrc="/image/main/exam/exam2.jpg"></ShoppingProduct>
          <ShoppingProduct imgSrc="/image/main/exam/exam3.jpg"></ShoppingProduct>
          <ShoppingProduct imgSrc="/image/main/exam/exam4.jpg"></ShoppingProduct>
        </div>
        <div className="row">
          <ShoppingProduct imgSrc="/image/main/exam/exam5.jpg"></ShoppingProduct>
          <ShoppingProduct imgSrc="/image/main/exam/exam6.jpg"></ShoppingProduct>
          <ShoppingProduct imgSrc="/image/main/exam/exam7.jpg"></ShoppingProduct>
          <ShoppingProduct imgSrc="/image/main/exam/exam8.jpg"></ShoppingProduct>
        </div>
      </div>
    </>
  );
};

export default BestProductMain;
