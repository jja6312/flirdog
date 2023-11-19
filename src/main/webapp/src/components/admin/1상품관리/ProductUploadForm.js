import React, { useRef, useState } from "react";
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
import axios from "axios";
import ProductCategory from "./1상품분류정보/ProductCategory";

//   const [userUploadDTO, setUserUploadDTO] = useState({
//     imageName: "",
//     imageContent: "",
//     imageFileName: "",
//     imageOriginalFileName: "",
//   });

const ProductUploadForm = ({ openLeftside }) => {
  const [productDTO, setProductDTO] = useState({
    name: "",
    content: "",
    price: "",
    stock: "",
    // contentDetail: "",
  });

  const nameRef = useRef();
  const contentRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const imgRef = useRef();

  const [imgList, setImgList] = useState([]); //미리보기 이미지
  const [imgFiles, setImgFiles] = useState("");
  const [category1Selected, setCategory1Selected] = useState("");
  const [category2Selected, setCategory2Selected] = useState("");

  const productUpload = () => {
    const mainCategory = ProductCategory.mainCategories.find(
      (item) => item.text === category1Selected
    );

    const subCategoryObject = ProductCategory.subCategories.find(
      (item) => item.value === mainCategory.value
    );
    const subCategory = subCategoryObject.sub.find(
      (item) => item.text === category2Selected
    );

    const mainCategoryUppercase = mainCategory.value.toUpperCase();
    const subCategoryUppercase = subCategory.value.toUpperCase();
    const name = nameRef.current.value;
    const content = contentRef.current.value;
    const price = priceRef.current.value;
    const stock = stockRef.current.value;

    setProductDTO({
      ...productDTO,
      name: name,
      content: content,
      price: price,
      stock: stock,
    });

    console.log(productDTO);

    const formData = new FormData();
    formData.append("productDTO", JSON.stringify(productDTO));
    formData.append("mainCategory", mainCategoryUppercase);
    formData.append("subCategory", subCategoryUppercase);
    formData.append("imgFiles", imgFiles[0]);

    console.log(formData);
    axios
      .post("http://localhost:8080/admin/productUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => alert("상품 등록 완료"))
      .catch((error) => console.log(error));
  };

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
          <ProductDetail
            category1Selected={category1Selected}
            setCategory1Selected={setCategory1Selected}
            category2Selected={category2Selected}
            setCategory2Selected={setCategory2Selected}
          ></ProductDetail>

          <AdminPageInfoText title="상품 기본 정보" isNessasary={true} />
          <ProductPrimaryInfo
            nameRef={nameRef}
            contentRef={contentRef}
          ></ProductPrimaryInfo>

          <AdminPageInfoText
            title="가격"
            subTitle="옵션별 상품 가격은 동일하게 입력하여야 하며, 옵션별 가격이 다를 경우 별도의 상품으로 등록해 주십시오."
            isNessasary={true}
          />
          <ProductPrice priceRef={priceRef}></ProductPrice>

          <AdminPageInfoText title="재고" subTitle="" isNessasary={true} />
          <Alert
            style={{ fontSize: "0.7rem", color: "#6d6d6d" }}
            variant="danger"
          >
            - 재고를 입력하지 않으면 상품이 품절되었다고 표시됩니다.<br></br>- 0
            이하는 입력하실 수 없습니다.
          </Alert>
          <ProductStock stockRef={stockRef}></ProductStock>

          <AdminPageInfoText
            title="상품 대표 이미지"
            subTitle=""
            isNessasary={false}
          />
          <ProductThumnail
            imgRef={imgRef}
            imgList={imgList}
            setImgList={setImgList}
            setImgFiles={setImgFiles}
          ></ProductThumnail>

          <AdminPageInfoText title="상품 상세 정보" isNessasary={false} />
          <EditorBox style={{ width: "60%" }}></EditorBox>
        </Container>

        <ProductNoticeBanner
          productUpload={productUpload}
        ></ProductNoticeBanner>
      </div>
    </>
  );
};

export default ProductUploadForm;
