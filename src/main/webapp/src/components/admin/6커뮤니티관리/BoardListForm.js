import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import LeftSide from "../LeftSide";
import RightContentHeader from "../RightContentHeader";
import styles from "../../../css/admin/rightContent.module.css";
import Button from "react-bootstrap/esm/Button";
import Swal from "sweetalert2";
import BoardList from "./BoardList";

const BoardListForm = ({ openLeftside }) => {
  const [allProduct, setAllProduct] = useState([]);
  const [checkedBoards, setCheckedBoards] = useState([]);

  const onDeleteCheckedBoard = () => {
    if (checkedBoards.length === 0) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "삭제할 게시글을 선택해주세요",
        showConfirmButton: false,
        timer: 700,
      });
      return;
    }
    Swal.fire({
      title: "게시글을 일괄 삭제하시겠습니까?",
      text: "삭제한 게시글은 복원 및 수정이 불가능합니다.",
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
            `https://java.flirdog.store/access/boardDeleteSelected?boardId=${checkedBoards}`
          )
          .then(() => {
            window.location.reload();
            Swal.fire({
              title: "삭제 성공!",
              text: "게시글이 삭제되었습니다.",
              icon: "success",
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  useEffect(() => {
    axios
      .post("https://java.flirdog.store/access/getBoardList")
      .then((res) => {
        console.log("보드리스트");
        console.log(res.data);
        setAllProduct(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <AdminHeader></AdminHeader>
      <LeftSide
        openLeftside={openLeftside}
        selected="게시판 조회/삭제"
      ></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="게시판 조회/수정" />

        <div className="d-flex align-items-center mt-4">
          <div>
            [검색:
            {allProduct.length}개 / TOTAL: {allProduct.length} 개]
          </div>

          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={onDeleteCheckedBoard}
          >
            선택 일괄 삭제
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <BoardList
            allProduct={allProduct}
            checkedBoards={checkedBoards}
            setCheckedBoards={setCheckedBoards}
          ></BoardList>
        </div>
      </div>
    </>
  );
};

export default BoardListForm;
