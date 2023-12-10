import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import LeftSide from "../LeftSide";
import styles from "../../../css/admin/rightContent.module.css";
import RightContentHeader from "../RightContentHeader";
import { Alert, Button, Table } from "react-bootstrap";
import SearchForm from "../1상품관리/SearchForm";
import Swal from "sweetalert2";
import axios from "axios";
import DogList from "./DogList";
import SearchDropdown from "../1상품관리/SearchDropdown";
import LoadingComponent from "../../Loading";

const DogListForm = ({ openLeftside }) => {
  const [dogList, setDogList] = useState([]);
  const [useFilterCheckNumber, setUseFilterCheckNumber] = useState(0);
  const [checkDog, setCheckDog] = useState([]);
  const [totalFilter, setTotalFilter] = useState([]);

  //----------------SearchDropdown.start------------------
  const [whatProduct, setWhatProduct] = useState([]);
  const [searchValueText, setSearchValueText] = useState("");
  const [useFilter, setUseFilter] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("애견 이름");
  const [placeHolderUseState, setPlaceHolderUseState] =
    useState("애견 이름 검색");
  //----------------SearchDropdown.end------------------
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteSelected = () => {
    if (checkDog.length === 0) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "삭제할 애견을 선택해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
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
            `http://localhost:8080/admin/dogDeleteSelected?dogId=${checkDog}`
          )
          .then(() => {
            window.location.reload();
            Swal.fire({
              title: "삭제 성공!",
              text: "파일이 삭제되었습니다.",
              icon: "success",
              position: "top",
              showConfirmButton: false,
              timer: 700,
            });
          });
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:8080/admin/getDogList")
      .then((res) => {
        console.log("dogList");
        console.log(res.data);
        setDogList(res.data);
        const initialFilter = res.data;

        let finalFilter = initialFilter;
        if (useFilter && selectedDropdown) {
          switch (selectedDropdown) {
            case "애견 아이디":
              finalFilter = finalFilter.filter(
                (item) =>
                  item.id && item.id.toString().includes(searchValueText)
              );
              break;
            case "애견 이름":
              finalFilter = finalFilter.filter(
                (item) => item.name && item.name.includes(searchValueText)
              );
              break;
            case "애견 견종":
              finalFilter = finalFilter.filter(
                (item) =>
                  item.dogsBreed &&
                  item.dogsBreed.includes(searchValueText.toUpperCase())
              );
              break;
          }
        }

        setWhatProduct(finalFilter);
        setTotalFilter(finalFilter.length);
        setIsLoading(false);

        console.log("whatProduct");
        console.log(finalFilter);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [
    useFilter,
    searchValueText,
    useFilterCheckNumber,
    selectedDropdown,
    placeHolderUseState,
  ]);

  return (
    <>
      {isLoading && <LoadingComponent></LoadingComponent>}
      <AdminHeader></AdminHeader>

      <LeftSide
        openLeftside={openLeftside}
        selected="애견 목록 조회/수정"
      ></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="애견 목록 조회/수정" />

        <div
          className="d-flex justify-content-end mt-4"
          style={{ width: "100%" }}
        >
          <SearchDropdown
            type="dog" //이 모듈을 쓰려면, type을 새로 추가해서 내부코드를 수정해야함.
            selectedDropdown={selectedDropdown}
            setSelectedDropdown={setSelectedDropdown}
            setPlaceHolderUseState={setPlaceHolderUseState}
          ></SearchDropdown>
          {/* SearchDropdown.code.end--------------------------------- */}
          <SearchForm
            whatLeftMenuInnerText="애견"
            allProduct={dogList}
            setUseFilter={setUseFilter}
            searchValueText={searchValueText}
            setSearchValueText={setSearchValueText}
            useFilterCheckNumber={useFilterCheckNumber}
            setUseFilterCheckNumber={setUseFilterCheckNumber}
            selectedDropdown={selectedDropdown}
            setSelectedDropdown={setSelectedDropdown}
            placeHolderUseState={placeHolderUseState}
            setPlaceHolderUseState={setPlaceHolderUseState}
          ></SearchForm>
        </div>

        <div className="d-flex align-items-center mt-4">
          <div>
            [검색:
            {totalFilter}개 / TOTAL: {dogList.length} 개]
          </div>

          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={onDeleteSelected}
          >
            선택 일괄 삭제
          </Button>
        </div>
        <div className={styles.tableOverflow}>
          <DogList
            dogList={dogList}
            useFilter={useFilter}
            searchValueText={searchValueText}
            setSearchValueText={setSearchValueText}
            useFilterCheckNumber={useFilterCheckNumber}
            setUseFilterCheckNumber={setUseFilterCheckNumber}
            checkDog={checkDog}
            setCheckDog={setCheckDog}
            setTotalFilter={setTotalFilter}
            whatProduct={whatProduct}
          ></DogList>
        </div>
      </div>
    </>
  );
};

export default DogListForm;
