import React from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import CheckBtn from "../1상품관리/CheckBtn";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../../css/admin/rightContent.module.css";

function formatDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const BoardList = ({ allProduct, checkedBoards, setCheckedBoards }) => {
  const onDeleteOneBoard = (e) => {
    //id파악
    const deleteBtnId = e.target.id;

    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 유저는 복원이 불가능합니다.",
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
            `https://java.flirdog.store/access/boardDelete?boardId=${deleteBtnId}`
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
            <th>삭제</th>
            <th>게시글 ID</th>
            <th>제목</th>
            <th>내용</th>
            <th>등록일</th>
            <th>수정일</th>
            <th>조회수</th>
            <th>좋아요 수</th>
            <th>댓글 수</th>
            <th>커뮤니티 점수</th>
            <th>작성자 ID</th>
            <th>작성자 닉네임</th>
          </tr>
        </thead>
        <tbody>
          {allProduct.map((item, index) => (
            <tr key={index}>
              <td>
                <CheckBtn
                  productId={item.id}
                  checkedProducts={checkedBoards}
                  setCheckedProducts={setCheckedBoards}
                ></CheckBtn>
              </td>
              <td>
                <Button
                  id={item.id}
                  variant="outline-danger"
                  onClick={onDeleteOneBoard}
                >
                  삭제
                </Button>
              </td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>{item.createdAt ? formatDate(item.createdAt) : "-"}</td>
              <td>{item.modifiedAt ? formatDate(item.modifiedAt) : "-"}</td>
              <td>{item.hit}</td>
              <td>{item.likeScore}</td>
              <td>{item.commentCount}</td>
              <td>{item.communityScore}</td>
              <td>{item.userId}</td>
              <td>{item.userNickName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default BoardList;
