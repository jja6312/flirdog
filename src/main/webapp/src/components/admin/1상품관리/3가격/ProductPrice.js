import React from "react";
import styles from "../../../../css/admin/1상품관리/productPrimaryInfo.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const ProductPrice = ({ priceRef }) => {
  return (
    <div className={styles.tableDiv}>
      <div style={{ width: "99%" }} className="d-flex justify-content-end">
        <span style={{ color: "gray", fontSize: "0.9rem" }}>단위: 원</span>
      </div>
      <table className={styles.tableContainer}>
        <tr>
          <th className={styles.tableTh}>가격</th>
          <td className={styles.tableTd}>
            <InputGroup size="sm">
              <Form.Control
                ref={priceRef}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                type="number"
              />
            </InputGroup>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ProductPrice;
