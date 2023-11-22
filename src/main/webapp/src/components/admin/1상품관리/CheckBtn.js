import React, { useEffect, useRef } from "react";
import styles from "../../../css/admin/checkBtn.module.css";
import { useState } from "react";

const CheckBtn = ({ productId, checkedProducts, setCheckedProducts }) => {
  const [checkBtn, setCheckBtn] = useState(false);

  const CheckListAddAndRemoveToggle = () => {
    if (!checkBtn) {
      //선택되지않은 상태라면 눌렀을 때 목록에 id 추가
      setCheckedProducts([...checkedProducts, productId]);
    } else {
      setCheckedProducts(checkedProducts.filter((id) => id !== productId));
    }
    setCheckBtn(!checkBtn);
  };

  const productIdRef = useRef();

  return (
    <div>
      {checkBtn ? (
        <svg
          className={`${styles.checkBtn} `}
          onClick={CheckListAddAndRemoveToggle}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          id={productId}
          ref={productIdRef}
        >
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
      ) : (
        <svg
          className={`${styles.checkBtn} `}
          onClick={CheckListAddAndRemoveToggle}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
          id={productId}
          ref={productIdRef}
        >
          <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
      )}
    </div>
  );
};

export default CheckBtn;
