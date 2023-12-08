import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import dogList from "../../../css/admin/2회원관리/dogList.module.css";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CheckBtn from "../1상품관리/CheckBtn";

const MatchingListAdmin = ({
  selectedIcon,
  selectedIcon2,
  allProduct,
  sellingProduct,
  soldOutProduct,
  checkedMatchings,
  setCheckedMatchings,

  useFilter,
  searchValueText,
  setSearchValueText,
  useFilterCheckNumber,
  setUseFilterCheckNumber,
  checkedProducts,
  setCheckedProducts,
  setTotalFilter,

  whatProduct,
  setWhatProduct,
}) => {
  // 수정 버튼 핸들러
  const goMatchingEditForm = (id) => {
    window.open("http://localhost:3000/date/dateUpdate/" + id, "newWindow");
  };

  const goMatchingWriteForm = (e) => {
    window.open(`/date/dateReadMore/${e.target.id}`, "newWindow");
  };

  // 삭제 버튼 핸들러
  const onDeleteOneMatching = (e) => {
    const deleteBtnId = e.target.id;
    // 삭제 확인 다이얼로그
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제한 매칭은 복원이 불가능합니다.",
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
            `https://java.flirdog.store/admin/matchingDelete?matchingId=${deleteBtnId}`
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
  useEffect(() => {
    let filteredProducts = [];

    // 첫 번째 필터: selectedIcon에 따라 상품 필터링
    if (selectedIcon === "faBorderAll") {
      filteredProducts = allProduct;
    } else if (selectedIcon === "faHourglassHalf") {
      filteredProducts = sellingProduct;
    } else if (selectedIcon === "faHourglassEnd") {
      filteredProducts = soldOutProduct;
    }

    // 두 번째 필터: selectedIcon2에 따라 추가적으로 필터링
    if (selectedIcon2 === "faHeart") {
      filteredProducts = filteredProducts.filter(
        (item) => item.matchingPurpose === "연애"
      );
    } else if (selectedIcon2 === "faTree") {
      filteredProducts = filteredProducts.filter(
        (item) => item.matchingPurpose === "산책"
      );
    }

    // 필터링된 결과를 상태에 설정
    setWhatProduct(filteredProducts);
  }, [selectedIcon, selectedIcon2, allProduct, sellingProduct, soldOutProduct]);

  const averageFormat = (averageScore) => {
    //averageScore 를 소수점 2자리까지만 표시
    return (averageScore * 100 - ((averageScore * 100) % 1)) / 100;
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>선택</th>
          <th>수정</th>
          <th>삭제</th>
          <th>ID</th>
          <th>매칭 목적</th>
          <th className={dogList.longThMore}>제목</th>
          <th className={dogList.longThMore}>내용</th>
          <th>이미지</th>
          <th className={dogList.longTh}>강아지 이름</th>
          <th className={dogList.longTh}>강아지 나이</th>
          <th className={dogList.longTh}>강아지 성별</th>
          <th>중성화 여부</th>

          <th>견종</th>
          <th className={dogList.longTh}>매칭 날짜</th>

          <th>매칭 상태</th>
          <th className={dogList.longThMore}>매칭 주소</th>
          <th>평균 점수</th>
          <th className={dogList.longTh}>커뮤니티 점수</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {whatProduct.map((matching) => (
          <tr key={whatProduct.id}>
            <td>
              <CheckBtn
                productId={matching.id}
                checkedProducts={checkedMatchings}
                setCheckedProducts={setCheckedMatchings}
              ></CheckBtn>
            </td>
            <td>
              <Button
                className={checkBtnStyle.editBtn}
                onClick={() => goMatchingEditForm(matching.id)}
              >
                수정
              </Button>
            </td>
            <td>
              <Button
                id={matching.id}
                variant="outline-danger"
                onClick={onDeleteOneMatching}
              >
                삭제
              </Button>
            </td>
            <td>{matching.id}</td>
            <td
              style={{
                backgroundImage: `url(${
                  matching.matchingPurpose === "연애"
                    ? "/image/admin/love.png"
                    : "/image/admin/freind.png"
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor:
                    matching.matchingPurpose === "연애" ? "#E7C5CF" : "#CED8BF",
                }}
              >
                {matching.matchingPurpose}
              </div>
            </td>
            <td onClick={goMatchingWriteForm} id={matching.id}>
              <span id={matching.id} className={dogList.hrefStyle}>
                {matching.title}
              </span>
            </td>
            <td>{matching.content}</td>
            <td>
              <img
                className="rounded"
                src={
                  matching.image && matching.image.includes("flirdog")
                    ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${matching.image}`
                    : "/image/nullImage/nullImage2.png"
                }
                style={{
                  width: 80,
                  height: 80,

                  objectFit: "cover",
                }}
                alt="매칭 이미지"
              />
            </td>
            <td>{matching.dogName}</td>
            <td>{matching.dogAge}</td>
            <td>
              {matching.dogGender === "Male" ? (
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
            <td>
              {matching.isNeutralized === true ? (
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

            <td>{matching.dogBreed}</td>
            <td>{matching.date}</td>

            <td>{matching.matchingState}</td>
            <td>{matching.matchingAddress}</td>
            <td>{averageFormat(matching.averageScore)}</td>
            <td>{matching.communityScore}</td>
            <td>{matching.hit}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MatchingListAdmin;
