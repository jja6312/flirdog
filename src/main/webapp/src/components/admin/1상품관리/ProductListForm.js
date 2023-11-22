import React, { useEffect, useState } from "react";

import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";

import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import filterForm from "../../../css/admin/filterForm.module.css";
import FilterForm from "./FilterForm";

import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import SearchForm from "./SearchForm";
import axios from "axios";
import ProductList from "./ProductList";

const ProductListForm = ({ openLeftside }) => {
  const [selectedIcon, setSelectedIcon] = useState("faBorderAll");

  //전체상품
  const [allProduct, setAllProduct] = useState([]);
  //판매중인상품(allProduct - soldOutProduct)
  const [sellingProduct, setSellingProduct] = useState([]);
  //품절상품
  const [soldOutProduct, setSoldOutProduct] = useState([]);

  const [useFilter, setUseFilter] = useState(false);
  const [useFilterCheckNumber, setUseFilterCheckNumber] = useState(0);
  const [searchValueText, setSearchValueText] = useState("");
  const [checkedProducts, setCheckedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/getProductList")
      .then((res) => {
        console.log(res.data);

        setAllProduct(res.data);
        setSellingProduct(res.data.filter((item) => item.stock !== 0));
        setSoldOutProduct(res.data.filter((item) => item.stock === 0));
      })
      .catch((error) => console.log(error));
  }, []);

  const onDeleteCheckedProducts = () => {
    if (checkedProducts.length === 0) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "삭제할 상품을 선택해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      title: "상품을 일괄 삭제하시겠습니까?",
      text: "삭제한 상품은 복원 및 수정이 불가능합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `http://localhost:8080/admin/productDeleteSelected?productId=${checkedProducts}`
          )
          .then(() => {
            //삭제 후 새로고침
            window.location.reload();
            Swal.fire({
              title: "삭제 성공!",
              text: "파일이 삭제되었습니다.",
              icon: "success",
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <>
      <AdminHeader></AdminHeader>

      <LeftSide
        openLeftside={openLeftside}
        selected="전체 상품 조회/수정"
      ></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="전체 상품 조회/수정" />
        <Alert
          style={{ fontSize: "0.7rem", color: "#6d6d6d" }}
          variant="danger"
        >
          - 삭제한 상품은 복원 및 수정이 불가능합니다.<br></br>- 삭제된 상품은
          재고수량 "0” 변경 및 품절 처리 진행되며, 연동된 제휴몰에서 삭제가 아닌
          품절 처리됩니다.
        </Alert>
        <div
          className={`${filterForm.filterFormContainer} d-flex justify-content-start align-items-center px-4`}
        >
          <FilterForm
            iconName="faBorderAll"
            titleText="전체"
            searchValue={allProduct.length}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
          <FilterForm
            iconName="faCartShopping"
            titleText="판매중"
            searchValue={sellingProduct.length}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
          <FilterForm
            iconName="faStoreSlash"
            titleText="품절"
            searchValue={soldOutProduct.length}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
        </div>
        <div
          className="d-flex justify-content-end mt-4"
          style={{ width: "100%" }}
        >
          <SearchForm
            placeHolder="상품 이름 검색"
            allProduct={allProduct}
            sellingProduct={sellingProduct}
            soldOutProduct={soldOutProduct}
            selectedIcon={selectedIcon}
            setUseFilter={setUseFilter}
            searchValueText={searchValueText}
            setSearchValueText={setSearchValueText}
            useFilterCheckNumber={useFilterCheckNumber}
            setUseFilterCheckNumber={setUseFilterCheckNumber}
          ></SearchForm>
        </div>

        <div className="d-flex align-items-center mt-4">
          <div>
            [TOTAL:
            {selectedIcon === "faBorderAll" && allProduct.length}
            {selectedIcon === "faCartShopping" && sellingProduct.length}
            {selectedIcon === "faStoreSlash" && soldOutProduct.length}개 / 검색{" "}
            {allProduct.length} 개]
          </div>

          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={onDeleteCheckedProducts}
          >
            선택 일괄 삭제
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            className={`${styles.table} mt-3`}
            striped
            bordered
            hover
            size="sm"
          >
            <thead>
              <tr>
                <th>선택</th>
                <th>수정</th>
                <th>삭제</th>
                <th>상품번호</th>
                <th>썸네일 이미지</th>
                <th>메인 카테고리</th>
                <th>하위 카테고리</th>
                <th>상품명</th>
                <th>상품 설명</th>
                {/* <th>상품 상세 설명</th> */}
                <th>가격</th>
                <th>재고</th>
                <th>조회수</th>
                <th>등록일</th>
                <th>수정일</th>
              </tr>
            </thead>
            <tbody>
              <ProductList
                selectedIcon={selectedIcon}
                allProduct={allProduct}
                sellingProduct={sellingProduct}
                soldOutProduct={soldOutProduct}
                // checkBtn={checkBtn}
                // setCheckBtn={setCheckBtn}
                useFilter={useFilter}
                searchValueText={searchValueText}
                setSearchValueText={setSearchValueText}
                useFilterCheckNumber={useFilterCheckNumber}
                setUseFilterCheckNumber={setUseFilterCheckNumber}
                checkedProducts={checkedProducts}
                setCheckedProducts={setCheckedProducts}
              ></ProductList>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProductListForm;
