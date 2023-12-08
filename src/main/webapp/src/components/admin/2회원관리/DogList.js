import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "../../../css/admin/2회원관리/dogList.module.css";
import CheckBtn from "../1상품관리/CheckBtn";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Swal from "sweetalert2";
import axios from "axios";

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

const DogList = ({
  dogList,
  useFilter,
  searchValueText,
  setSearchValueText,
  useFilterCheckNumber,
  setUseFilterCheckNumber,
  checkDog,
  setCheckDog,
  setTotalFilter,
  whatProduct,
}) => {
  const goDogEditForm = (e) => {
    const editBtnId = e.target.id;
    const popupWidth = 600;
    const popupHeight = 900;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const left = screenWidth / 2 - popupWidth / 2;
    const top = screenHeight / 2 - popupHeight / 2;
    window.open(
      "/admin/dogEditForm/" + editBtnId,
      "newWindow",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  };

  const onDeleteOneDog = (e) => {
    //id파악
    const deleteBtnId = e.target.id;

    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 애견은 복원이 불가능합니다.",
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
            `https://java.flirdog.store:8080/admin/dogDelete?dogId=${deleteBtnId}`
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
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>선택</th>
          <th>수정</th>
          <th>삭제</th>
          <th>애견 ID</th>
          <th>이미지</th>
          <th>애견 이름</th>
          <th className={styles.longTh}>AI 프로필 사진</th>
          <th>유저 ID</th>
          <th>유저 이름</th>
          <th>애견 나이</th>
          <th>애견 성별</th>
          <th>견종</th>
          <th className={styles.longTh}>중성화 여부</th>
          <th>등록일</th>
          <th>수정일</th>
        </tr>
      </thead>
      <tbody>
        {whatProduct.map((dog) => (
          <tr key={dog.id}>
            <td>
              <CheckBtn
                productId={dog.id}
                checkedProducts={checkDog}
                setCheckedProducts={setCheckDog}
              ></CheckBtn>
            </td>
            <td>
              <Button
                id={dog.id}
                className={checkBtnStyle.editBtn}
                onClick={goDogEditForm}
              >
                수정
              </Button>
            </td>
            <td>
              <Button
                id={dog.id}
                variant="outline-danger"
                onClick={onDeleteOneDog}
              >
                삭제
              </Button>
            </td>
            <td>{dog.id}</td>
            <td>
              <img
                className="rounded-circle"
                src={
                  dog.image && dog.image.includes("flirdog")
                    ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${dog.image}`
                    : "/image/nullImage/nullImage2.png"
                }
                style={{ width: 80, height: 80, objectFit: "cover" }}
                alt=""
              ></img>
            </td>
            <td>{dog.name}</td>
            <td className={styles.longTh}>
              <img
                className={`rounded`}
                src={
                  dog.imageAiProfile
                    ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/aiDogProfile/${dog.imageAiProfile}`
                    : "/image/nullImage/nullImage2.png"
                }
                style={{ width: 80, height: 80, objectFit: "cover" }}
                alt=""
              ></img>
            </td>

            <td>{dog.user ? dog.user.id : "-"}</td>
            <td>{dog.user ? dog.user.name : "-"}</td>

            <td>{dog.age}</td>
            <td>
              {dog.gender === "Male" ? (
                <img
                  style={{ width: 16, marginRight: 10 }}
                  src="/image/login/man.png"
                  alt="남아"
                />
              ) : (
                <img
                  style={{ width: 16, marginRight: 10 }}
                  src="/image/login/woman.png"
                  alt="여아"
                />
              )}
            </td>
            <td>{dog.dogsBreed}</td>
            <td>
              {dog.isNeutralized === true ? (
                <img
                  style={{ width: 30, marginRight: 10 }}
                  src="/image/login/check.png"
                  alt="중성화 체크"
                />
              ) : (
                <img
                  style={{ width: 30, marginRight: 10 }}
                  src="/image/login/unCheck.png"
                  alt="중성화 언체크"
                />
              )}
            </td>
            <td className={styles.longTh}>
              {dog.createdAt ? formatDate(dog.createdAt) : "-"}
            </td>
            <td className={styles.longTh}>
              {dog.modifiedAt ? formatDate(dog.modifiedAt) : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DogList;
