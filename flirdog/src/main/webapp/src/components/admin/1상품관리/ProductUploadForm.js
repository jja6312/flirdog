import React from "react";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
<<<<<<< HEAD
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import ProductDetail from "./1상품분류정보/ProductDetail";
import EditorBox from "../../EditorBox";
import Container from "react-bootstrap/esm/Container";
import AdminPageInfoText from "../AdminPageInfoText";
import ProductPrimaryInfo from "./2상품기본정보/ProductPrimaryInfo";
=======
import ProductUploadFormImage from "./ProductUploadFormImage";
import ProductUploadFormHeader from "./ProductUploadFormHeader";
import styles from "../../../css/admin/rightContent.module.css";
>>>>>>> bfe3c24 (리팩토링:관리자페이지 css모듈화 완료)

const ProductUploadForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="상품 등록"></LeftSide>
      <div className={styles.rightContent}>
<<<<<<< HEAD
        <Container>
          <RightContentHeader title="상품등록" />

          <AdminPageInfoText
            title="상품 분류 정보"
            subTitle="1차 분류를 선택하시면 2차 분류가 자동으로 제안됩니다."
            isNessasary={true}
          />
          <ProductDetail></ProductDetail>

          <AdminPageInfoText title="상품 기본 정보" isNessasary={true} />
          <ProductPrimaryInfo></ProductPrimaryInfo>
          <EditorBox style={{ width: "60%" }}></EditorBox>
        </Container>
=======
        <ProductUploadFormHeader></ProductUploadFormHeader>
        <ProductUploadFormImage></ProductUploadFormImage>
>>>>>>> bfe3c24 (리팩토링:관리자페이지 css모듈화 완료)
      </div>
    </>
  );
};

export default ProductUploadForm;
