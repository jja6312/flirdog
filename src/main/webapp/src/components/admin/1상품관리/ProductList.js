import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import CheckBtn from "./CheckBtn";
import styles from "../../../css/admin/rightContent.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = ({
  selectedIcon,
  allProduct,
  sellingProduct,
  soldOutProduct,
  checkBtn,
  setCheckBtn,
  useFilter,
  searchValueText,
  onSearchList,
  useFilterCheckNumber,
  setUseFilterCheckNumber,
  checkedProducts,
  setCheckedProducts,
  setTotalFilter,
  whatProduct,
}) => {
  const navigate = useNavigate();

  const onDeleteOneProduct = (e) => {
    //id파악
    const deleteBtnId = e.target.id;

    Swal.fire({
      title: "정말 삭제하시겠습니까?",
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
            `https://java.flirdog.store/admin/productDelete?productId=${deleteBtnId}`
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

  const goProductEditForm = (e) => {
    const editBtnId = e.target.id;

    navigate(`/admin/productEditForm/${editBtnId}`);
  };

  return (
    <>
      {whatProduct.map((item, index) => {
        return (
          <tr key={index}>
            <td>
              <CheckBtn
                productId={item.id}
                checkedProducts={checkedProducts}
                setCheckedProducts={setCheckedProducts}
                // checkBtn={checkBtn}
                // setCheckBtn={setCheckBtn}
              ></CheckBtn>
            </td>
            <td>
              <Button
                id={item.id}
                className={checkBtnStyle.editBtn}
                onClick={goProductEditForm}
              >
                수정
              </Button>
            </td>
            <td>
              <Button
                id={item.id}
                variant="outline-danger"
                onClick={onDeleteOneProduct}
              >
                삭제
              </Button>
            </td>
            <td>{item.id}</td>
            <td>
              <div className={styles.imgContainer}>
                <img
                  alt=""
                  src={`${
                    item.image === "/image/nullImage/nullImage1.png"
                      ? item.image
                      : //s3문제
                        `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${item.image}`
                    // `${item.image}`
                  }`}
                ></img>
              </div>
            </td>
            <td>{item.mainCategory}</td>
            <td>{item.subCategory}</td>
            <td>{item.name}</td>
            <td>{item.content}</td>
            {/* <td>{item.contentDetail}</td> */}
            <td>{item.price}</td>
            <td>{item.stock}</td>
            <td>{item.hit}</td>
            <td>{item.createdAt}</td>
            <td>{item.modifiedAt}</td>
          </tr>
        );
      })}
    </>
  );
};

export default ProductList;
