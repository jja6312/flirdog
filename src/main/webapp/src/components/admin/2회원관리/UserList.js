import React, { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import CheckBtn from "../1상품관리/CheckBtn";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../Loading";

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

const UserList = ({
  userList,
  useFilter,
  searchValueText,
  setSearchValueText,
  useFilterCheckNumber,
  setUseFilterCheckNumber,
  checkUser,
  setCheckUser,
  setTotalFilter,
}) => {
  const filteredUserList = useFilter
    ? userList.filter((item) => item.name.includes(searchValueText))
    : userList;

  useEffect(() => {
    setTotalFilter(filteredUserList.length);
  }, [
    userList,
    useFilter,
    searchValueText,
    filteredUserList.length,
    setTotalFilter,
  ]);

  const goUserEditForm = (e) => {
    const editBtnId = e.target.id;
    const popupWidth = 600;
    const popupHeight = 900;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const left = screenWidth / 2 - popupWidth / 2;
    const top = screenHeight / 2 - popupHeight / 2;
    window.open(
      "/admin/userEditForm/" + editBtnId,
      "newWindow",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );
  };

  const onDeleteOneUser = (e) => {
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
          .post(`http://localhost:8080/admin/userDelete?userId=${deleteBtnId}`)
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

  if (!Array.isArray(userList)) {
    // userList가 배열이 아닌 경우 처리
    return <Loading></Loading>; // 또는 적절한 로딩 컴포넌트를 표시
  }

  return (
    <>
      {filteredUserList.map((item, index) => (
        <tr key={index}>
          <td>
            <CheckBtn
              productId={item.id}
              checkedProducts={checkUser}
              setCheckedProducts={setCheckUser}
            ></CheckBtn>
          </td>
          <td>
            <Button
              id={item.id}
              className={checkBtnStyle.editBtn}
              onClick={goUserEditForm}
            >
              수정
            </Button>
          </td>
          <td>
            <Button
              id={item.id}
              variant="outline-danger"
              onClick={onDeleteOneUser}
            >
              삭제
            </Button>
          </td>
          <td>{item.id}</td>
          <td>{item.email}</td>
          <td>{item.passwd}</td>
          <td>{item.name}</td>
          <td>{item.nickname}</td>
          <td>{item.userRole}</td>
          <td>{item.point}</td>
          <td>{item.createdAt ? formatDate(item.createdAt) : "-"}</td>
          <td>{item.modifiedAt ? formatDate(item.modifiedAt) : "-"}</td>
        </tr>
      ))}
    </>
  );
};

export default UserList;
