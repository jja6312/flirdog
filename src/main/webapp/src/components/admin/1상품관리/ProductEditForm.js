import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import ProductDetail from "./1상품분류정보/ProductDetail";
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

import { useNavigate, useParams } from "react-router-dom";

const ProductEditForm = ({ openLeftside }) => {
  const { productId } = useParams();

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

  const navigate = useNavigate();
  const productEdit = () => {
    if (category1Selected === "" || category2Selected === "") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "상품 분류를 선택해주세요.",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }

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

    if (name === "" || content === "" || price === "" || stock === "") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "필수 입력 항목을 입력해주세요.",
        showConfirmButton: false,
        timer: 1000,
      });

      if (name === "") nameRef.current.focus();
      else if (content === "") contentRef.current.focus();
      else if (price === "") priceRef.current.focus();
      else if (stock === "") stockRef.current.focus();

      return;
    }

    const updatedProductDTO = {
      ...productDTO,
      name: name,
      content: content,
      price: price,
      stock: stock,
    };

    setProductDTO(updatedProductDTO);

    const formData = new FormData();
    formData.append("productDTO", JSON.stringify(updatedProductDTO));
    formData.append("mainCategory", mainCategoryUppercase);
    formData.append("subCategory", subCategoryUppercase);
    formData.append("productId", productId);

    console.log(formData.entries());

    if (imgFiles === "" && imgList.length > 0) {
      alert(
        "파일을 새로 업로드하지 않고, 이미지 리스트가 0이 아닐때, db의 이미지를 그대로놔둠."
      );
      axios
        .post(
          "http://localhost:8080/admin/productUpdateWithoutImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setTimeout(() => {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "상품 수정 성공",
              showConfirmButton: false,
              timer: 1500,
            });
          }, 10);

          setTimeout(() => {
            navigate("/admin/productListForm");
          }, 1600);
        })
        .catch((error) => console.log(error));
    } else {
      //----------------else---------------------
      alert("이미지 리스트가 없거나, 새로운파일이있으면 정상 업데이트");

      for (var i = 0; i < imgFiles.length; i++) {
        formData.append("imgFiles", imgFiles[i]);
      }
      if (imgFiles.length === 0) {
        formData.append("imgFiles", new File([], ""));
      }

      axios
        .post(
          "http://localhost:8080/admin/productUpdateAllWithImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setTimeout(() => {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "상품 수정 성공",
              showConfirmButton: false,
              timer: 1500,
            });
          }, 10);

          setTimeout(() => {
            navigate("/admin/productListForm");
          }, 1600);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/admin/getProductUpdateForm?productId=${productId}`
      )
      .then((res) => {
        console.log(res.data);
        setProductDTO(res.data);

        const mainCategoryData = ProductCategory.mainCategories.find(
          (item) => item.value === res.data.mainCategory.toLowerCase()
        );

        const subCategoryData = ProductCategory.subCategories
          .find((item) => item.value === res.data.mainCategory.toLowerCase())
          .sub.find(
            (item) => item.value === res.data.subCategory.toLowerCase()
          );

        setCategory1Selected(mainCategoryData.text);
        setCategory2Selected(subCategoryData.text);
        const imgArray = res.data.image.split(",").map((item) => item);
        setImgList([imgArray]);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  return (
    <>
      <AdminHeader></AdminHeader>
      <LeftSide
        openLeftside={openLeftside}
        selected="전체 상품 조회/수정"
      ></LeftSide>
      <div className={styles.rightContent}>
        <Container>
          <RightContentHeader title="상품수정" />

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
            productDTOName={productDTO.name}
            producTDTOContent={productDTO.content}
            nameRef={nameRef}
            contentRef={contentRef}
          ></ProductPrimaryInfo>

          <AdminPageInfoText
            title="가격"
            subTitle="옵션별 상품 가격은 동일하게 입력하여야 하며, 옵션별 가격이 다를 경우 별도의 상품으로 등록해 주십시오."
            isNessasary={true}
          />
          <ProductPrice
            productDTOPrice={productDTO.price}
            priceRef={priceRef}
          ></ProductPrice>

          <AdminPageInfoText title="재고" subTitle="" isNessasary={true} />
          <Alert
            style={{ fontSize: "0.7rem", color: "#6d6d6d" }}
            variant="danger"
          >
            - 재고를 입력하지 않으면 상품이 품절되었다고 표시됩니다.<br></br>- 0
            이하는 입력하실 수 없습니다.
          </Alert>
          <ProductStock
            productDTOStock={productDTO.stock}
            stockRef={stockRef}
          ></ProductStock>

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
          {/* <EditorBox style={{ width: "60%" }}></EditorBox> */}
        </Container>

        <ProductNoticeBanner
          productUploadOrEdit={productEdit}
          type="productEdit"
        ></ProductNoticeBanner>
      </div>
    </>
  );
};

export default ProductEditForm;
