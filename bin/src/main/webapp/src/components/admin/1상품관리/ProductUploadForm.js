import React from "react";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import ProductDetail from "./1상품분류정보/ProductDetail";
import EditorBox from "../../EditorBox";
import Container from "react-bootstrap/esm/Container";
import AdminPageInfoText from "../AdminPageInfoText";
import ProductPrimaryInfo from "./2상품기본정보/ProductPrimaryInfo";
import ProductPrice from "./3가격/ProductPrice";
import Alert from "react-bootstrap/Alert";
import ProductStock from "./4재고/ProductStock";
import ProductNoticeBanner from "./ProductNoticeBanner";
import ProductThumnail from "./5상품대표이미지/ProductThumnail";

const ProductUploadForm = ({ openLeftside }) => {
  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide openLeftside={openLeftside} selected="상품 등록"></LeftSide>
      <div className={styles.rightContent}>
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

          <AdminPageInfoText
            title="가격"
            subTitle="옵션별 상품 가격은 동일하게 입력하여야 하며, 옵션별 가격이 다를 경우 별도의 상품으로 등록해 주십시오."
            isNessasary={true}
          />
          <ProductPrice></ProductPrice>

          <AdminPageInfoText title="재고" subTitle="" isNessasary={true} />
          <Alert
            style={{ fontSize: "0.7rem", color: "#6d6d6d" }}
            variant="danger"
          >
            - 재고를 입력하지 않으면 상품이 품절되었다고 표시됩니다.<br></br>- 0
            이하는 입력하실 수 없습니다.
          </Alert>
          <ProductStock></ProductStock>

          <AdminPageInfoText
            title="상품 대표 이미지"
            subTitle=""
            isNessasary={false}
          />
          <ProductThumnail></ProductThumnail>

          <AdminPageInfoText title="상품 상세 정보" isNessasary={false} />
          <EditorBox style={{ width: "60%" }}></EditorBox>
        </Container>

        <ProductNoticeBanner></ProductNoticeBanner>
      </div>
    </>
  );
};

export default ProductUploadForm;
