import React, { useEffect } from "react";
import styles from "../../../../css/admin/1상품관리/productPrimaryInfo.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const ProductPrimaryInfo = ({
  nameRef,
  contentRef,
  productDTOName,
  producTDTOContent,
}) => {
  useEffect(() => {
    if (productDTOName === undefined) {
      nameRef.current.value = "";
    } else if (productDTOName !== undefined) {
      nameRef.current.value = productDTOName;
    }

    if (producTDTOContent === undefined) {
      contentRef.current.value = "";
    } else if (producTDTOContent !== undefined) {
      contentRef.current.value = producTDTOContent;
    }
  }, [contentRef, nameRef, producTDTOContent, productDTOName]);

  return (
    <div className={styles.tableDiv}>
      <table className={styles.tableContainer}>
        <tr>
          <th className={styles.tableTh}>상품명</th>
          <td className={styles.tableTd}>
            <InputGroup size="sm">
              <Form.Control
                ref={nameRef}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </td>
        </tr>
        <tr>
          <th className={styles.tableTh}>상품 간단 설명</th>
          <td className={styles.tableTd}>
            <InputGroup size="sm">
              <Form.Control
                ref={contentRef}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ProductPrimaryInfo;
