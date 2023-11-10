import React from "react";
import styles from "../../../../css/admin/2상품기본정보/productPrimaryInfo.module.css";

const ProductPrimaryInfo = () => {
  return (
    <div className={styles.tableDiv}>
      <table className={styles.tableContainer}>
        <tr>
          <th className={styles.tableTh}>브랜드</th>
          <td className={styles.tableTd}>d</td>
        </tr>
        <tr>
          <th className={styles.tableTh}>상품명</th>
          <td className={styles.tableTd}></td>
        </tr>
        <tr>
          <th className={styles.tableTh}>상품 간단 설명</th>
          <td className={styles.tableTd}></td>
        </tr>
        <tr>
          <th className={styles.tableTh}>출시일</th>
          <td className={styles.tableTd}></td>
        </tr>
      </table>
    </div>
  );
};

export default ProductPrimaryInfo;
