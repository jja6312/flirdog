import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeftSide from "../LeftSide";
import AdminHeader from "../AdminHeader";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import AdminPageInfoText from "../AdminPageInfoText";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import filterForm from "../../../css/admin/filterForm.module.css";
import FilterForm from "./FilterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegular } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import CheckBtn from "./CheckBtn";
import Button from "react-bootstrap/esm/Button";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Swal from "sweetalert2";
import SearchForm from "./SearchForm";

// 사륜안ㅋㅋ

// const ListForm = () => {
//   const navigate = useNavigate();
//   const [isSearch, setIsSearch] = useState(false);
//   const [list, setList] = useState([]);
//   const [pagingArray, setPagingArray] = useState([]);
//   const [currentPage, setCurrentPage] = useState("1");
//   const { page } = useParams();
//   const pageProcess = (item) => {
//     setCurrentPage(item);
//   };
//   const onSearchList = (event) => {
//     event.preventDefault();
//     alert(searchValue);
//     alert(searchValueText);

//     if (searchValue === "선택") {
//       alert("돌아가.");
//       return;
//     } else if (searchValue === "이름" || searchValue === "아이디") {
//       setCurrentPage("1");
//       axios
//         .get(`/user/getUserListSearch?page=0`, {
//           params: { columnName: searchValue, keyword: searchValueText },
//         })
//         .then((res) => {
//           setList(res.data.content);
//           setPagingArray(
//             Array.from({ length: res.data.totalPages }, (_, index) => index + 1)
//           );
//           console.log(res.data);
//           setIsSearch(true);
//         })
//         .catch((error) => console.log(error));
//     }
//   };
//   const [searchValue, setSearchValue] = useState("선택");
//   const onNameOrIdSearch = (e) => {
//     setSearchValue(e.target.value);
//   };
//   const [searchValueText, setSearchValueText] = useState("");
//   const onSearchValueText = (e) => {
//     setSearchValueText(e.target.value);
//   };

//   useEffect(() => {
//     if (isSearch) {
//       axios
//         .get(`/user/getUserListSearch?page=${page}`, {
//           params: { columnName: searchValue, keyword: searchValueText },
//         })
//         .then((res) => {
//           setList(res.data.content);
//           setPagingArray(
//             Array.from({ length: res.data.totalPages }, (_, index) => index + 1)
//           );
//           console.log(res.data);
//           setIsSearch(true);
//         })
//         .catch((error) => console.log(error));
//     } else if (!isSearch) {
//       axios
//         .get(`/user/getUserList?page=${page}`)
//         .then((res) => {
//           setList(res.data.content);
//           setPagingArray(
//             Array.from({ length: res.data.totalPages }, (_, index) => index + 1)
//           );
//         })
//         .catch((error) => console.log(error));
//     }
//   }, [page]);

//   return (
//     <>
//       <NavJian></NavJian>
//       <Container className="mt-5">
//         <Table striped bordered hover size="sm">
//           <thead>
//             <tr>
//               <th>이름</th>
//               <th>아이디</th>
//               <th>비밀번호</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((item, index) => {
//               return (
//                 <tr key={index}>
//                   <th>{item.name}</th>
//                   <th>
//                     <Link
//                       className={styles.subjectA}
//                       to={`/user/updateForm/${item.id}`}
//                     >
//                       {item.id}
//                     </Link>
//                   </th>
//                   <th>{item.pwd}</th>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </Container>
//       {/* 페이징 처리 */}
//       <p style={{ textAlign: "center" }} className="mt-3">
//         {pagingArray.map((item) => (
//           <Link
//             to={`/user/list/${item - 1}`}
//             style={{ textDecoration: "none" }}
//           >
//             <span
//               key={item}
//               style={{
//                 color: item === parseInt(currentPage) ? "red" : "black",
//               }}
//               className="mx-1 "
//               onClick={() => pageProcess(item)}
//             >
//               {item}
//             </span>
//           </Link>
//         ))}
//       </p>

//       <Form className="d-flex justify-content-center">
//         <Form.Select
//           aria-label="Default select example"
//           style={{ width: "11%" }}
//           onChange={onNameOrIdSearch}
//         >
//           <option>선택</option>
//           <option value="이름">이름</option>
//           <option value="아이디">아이디</option>
//         </Form.Select>
//         <Form.Control
//           style={{ width: "33%" }}
//           type="search"
//           placeholder="검색할 아이디 또는 이름을 입력하세요"
//           className="me-2"
//           aria-label="Search"
//           onChange={onSearchValueText}
//         />
//         <Button variant="outline-success" onClick={onSearchList}>
//           검색
//         </Button>
//       </Form>
//     </>
//   );
// };

// export default ListForm;
const ProductListForm = ({ openLeftside }) => {
  const [selectedIcon, setSelectedIcon] = useState("faBorderAll");
  const [checkBtn, setCheckBtn] = useState(false);
  const onDeleteSelected = () => {
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
        Swal.fire({
          title: "삭제 성공!",
          text: "파일이 삭제되었습니다.",
          icon: "success",
        });
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
            searchValue="92"
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
          <FilterForm
            iconName="faCartShopping"
            titleText="판매중"
            searchValue="88"
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
          <FilterForm
            iconName="faStoreSlash"
            titleText="품절"
            searchValue="4"
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          ></FilterForm>
        </div>
        <div
          className="d-flex justify-content-end mt-4"
          style={{ width: "100%" }}
        >
          <SearchForm placeHolder="상품 이름 검색"></SearchForm>
        </div>

        <div className="d-flex align-items-center mt-4">
          <div>[TOTAL: 47 개 / 검색 47 개]</div>

          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={onDeleteSelected}
          >
            선택 일괄 삭제
          </Button>
        </div>

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
              <th>카테고리</th>
              <th>카테고리2</th>
              <th>브랜드</th>
              <th>상품명</th>
              <th>상품 설명</th>
              <th>상품 상세 설명</th>
              <th>가격</th>
              <th>재고</th>
              <th>조회수</th>
              <th>등록일</th>
              <th>수정일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <CheckBtn
                  checkBtn={checkBtn}
                  setCheckBtn={setCheckBtn}
                ></CheckBtn>
              </td>
              <td>
                <Button className={checkBtnStyle.editBtn}>수정</Button>
              </td>
              <td>
                <Button variant="outline-danger">삭제</Button>
              </td>
              <td>1</td>
              <td>
                <div className={styles.imgContainer}>
                  <img src="/image/main/exam/exam1.jpg"></img>
                </div>
              </td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>
                <CheckBtn
                  checkBtn={checkBtn}
                  setCheckBtn={setCheckBtn}
                ></CheckBtn>
              </td>
              <td>
                <Button className={checkBtnStyle.editBtn}>수정</Button>
              </td>
              <td>
                <Button variant="outline-danger">삭제</Button>
              </td>
              <td>1</td>
              <td>
                <div className={styles.imgContainer}>
                  <img src="/image/main/exam/exam3.jpg"></img>
                </div>
              </td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>
                <CheckBtn
                  checkBtn={checkBtn}
                  setCheckBtn={setCheckBtn}
                ></CheckBtn>
              </td>
              <td>
                <Button className={checkBtnStyle.editBtn}>수정</Button>
              </td>
              <td>
                <Button variant="outline-danger">삭제</Button>
              </td>
              <td>1</td>
              <td>
                <div className={styles.imgContainer}>
                  <img src="/image/main/exam/exam2.jpg"></img>
                </div>
              </td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>

            {/* {list.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{item.name}</th>
                  <th>
                    <Link
                      className={styles.subjectA}
                      to={`/user/updateForm/${item.id}`}
                    >
                      {item.id}
                    </Link>
                  </th>
                  <th>{item.pwd}</th>
                </tr>
              );
            })} */}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ProductListForm;
