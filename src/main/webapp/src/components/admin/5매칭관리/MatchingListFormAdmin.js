import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import LeftSide from "../LeftSide";
import axios from "axios";
import Swal from "sweetalert2";
import FilterForm from "../1상품관리/FilterForm";
import filterForm from "../../../css/admin/filterForm.module.css";
import RightContentHeader from "../RightContentHeader";
import styles from "../../../css/admin/rightContent.module.css";
import { Alert, Button } from "react-bootstrap";
import SearchForm from "../1상품관리/SearchForm";
import MatchingListAdmin from "./MatchingListAdmin";
import FilterForm2 from "../1상품관리/FilterForm2";
import SearchDropdown from "../1상품관리/SearchDropdown";
import LocationSelector from "../../main/LocationSelector";

const MatchingListFormAdmin = ({ openLeftside }) => {
  const [selectedIcon, setSelectedIcon] = useState("faBorderAll");
  const [selectedIcon2, setSelectedIcon2] = useState("faBorderAll");
  const [allProduct, setAllProduct] = useState([]);
  const [sellingProduct, setSellingProduct] = useState([]);
  const [soldOutProduct, setSoldOutProduct] = useState([]);
  const [useFilterCheckNumber, setUseFilterCheckNumber] = useState(0);
  const [checkedMatchings, setCheckedMatchings] = useState([]);
  const [totalFilter, setTotalFilter] = useState([]);

  //----------------SearchDropdown.start------------------
  const [whatProduct, setWhatProduct] = useState([]);
  const [searchValueText, setSearchValueText] = useState("");
  const [useFilter, setUseFilter] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("매칭 제목");
  const [placeHolderUseState, setPlaceHolderUseState] =
    useState("매칭 제목 검색"); //사용시 변경필요
  // ## 아래 useEffect도 같이 복사해야함.
  //----------------SearchDropdown.end------------------
  const [heartEA, setHeartEA] = useState(0);
  const [treeEA, setTreeEA] = useState(0);

  //LocationSelector.start ---------------------------------------
  const [selectedLocation, setSelectedLocation] = useState("지역 선택");
  //LocationSelector.end ---------------------------------------

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/getMatchingList")
      .then((res) => {
        console.log("matchingList, allProduct");
        console.log(res.data);
        setAllProduct(res.data);
        setSellingProduct(
          res.data.filter((item) => item.matchingState === "매칭대기")
        );
        setSoldOutProduct(
          res.data.filter((item) => item.matchingState !== "매칭대기")
        );

        setHeartEA(
          res.data.filter((item) => item.matchingPurpose === "연애").length
        );
        setTreeEA(
          res.data.filter((item) => item.matchingPurpose === "산책").length
        );
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let initialFilter = [];

    // selectedIcon에 따른 첫 번째 필터링
    if (selectedIcon === "faBorderAll") {
      initialFilter = allProduct;
    } else if (selectedIcon === "faHourglassHalf") {
      initialFilter = sellingProduct;
    } else if (selectedIcon === "faHourglassEnd") {
      initialFilter = soldOutProduct;
    }

    // selectedIcon2에 따른 두 번째 필터링
    let secondFilter = initialFilter;
    if (selectedIcon2 === "faHeart") {
      secondFilter = initialFilter.filter(
        (item) => item.matchingPurpose === "연애"
      );
    } else if (selectedIcon2 === "faTree") {
      secondFilter = initialFilter.filter(
        (item) => item.matchingPurpose === "산책"
      );
    }

    const thirdFilter = secondFilter.filter((item) =>
      item.matchingAddress.includes(selectedLocation)
    );

    // SearchDropdown.selectedDropdown.start----------------------------------
    let finalFilter = thirdFilter; //secondFilter대신 원하는 데이터구조(배열)를 넣어야함.
    if (useFilter && selectedDropdown) {
      switch (selectedDropdown) {
        case "유저 아이디":
          finalFilter = finalFilter.filter((item) =>
            item.userId.toString().includes(searchValueText)
          );
          break;
        // case "유저 이메일":
        //   // finalFilter = finalFilter.filter(item => item.userEmail.includes(searchValueText));
        //   break;
        case "애견 아이디":
          finalFilter = finalFilter.filter((item) =>
            item.dogId.toString().includes(searchValueText)
          );
          break;
        case "애견 이름":
          finalFilter = finalFilter.filter((item) =>
            item.dogName.includes(searchValueText)
          );
          break;
        case "매칭 제목":
          finalFilter = finalFilter.filter((item) =>
            item.title.includes(searchValueText)
          );
          break;
        case "매칭 아이디":
          finalFilter = finalFilter.filter((item) =>
            item.id.toString().includes(searchValueText)
          );
          break;
      }
    }

    setWhatProduct(finalFilter);
    setTotalFilter(finalFilter.length);
    console.log("whatProduct");
    console.log(finalFilter);
    // SearchDropdown.selectedDropdown.end----------------------------------
  }, [
    selectedIcon,
    selectedIcon2,
    allProduct,
    sellingProduct,
    soldOutProduct,
    useFilter,
    searchValueText,
    setTotalFilter,
    selectedDropdown,
  ]);

  const onDeleteCheckedMatchings = () => {
    if (checkedMatchings.length === 0) {
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
            `http://localhost:8080/admin/matchingDeleteSelected?matchingId=${checkedMatchings}`
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

  return (
    <>
      <AdminHeader></AdminHeader>
      <LeftSide openLeftside={openLeftside} selected="매칭글 조회"></LeftSide>
      <div className={styles.rightContent}>
        <RightContentHeader title="매칭글 조회/수정" />

        <div
          className={`${filterForm.filterFormContainer} d-flex justify-content-start align-items-center px-4`}
        >
          <div className="d-flex justify-content-start align-items-start flex-column">
            <div>
              <h6>매칭 상태</h6>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <FilterForm
                iconName="faBorderAll"
                titleText="전체"
                searchValue={allProduct.length}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
              ></FilterForm>
              <FilterForm
                iconName="faHourglassHalf"
                titleText="매칭 대기"
                searchValue={sellingProduct.length}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
              ></FilterForm>
              <FilterForm
                iconName="faHourglassEnd"
                titleText="매칭 완료"
                searchValue={soldOutProduct.length}
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
              ></FilterForm>
            </div>
          </div>
        </div>
        <div
          className={`${filterForm.filterFormContainer} d-flex justify-content-start align-items-center px-4`}
        >
          <div className="d-flex justify-content-start align-items-start flex-column">
            <div>
              <h6>매칭 목적</h6>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <FilterForm2
                iconName="faBorderAll"
                titleText="전체"
                searchValue={heartEA + treeEA}
                selectedIcon2={selectedIcon2}
                setSelectedIcon2={setSelectedIcon2}
              ></FilterForm2>
              <FilterForm2
                iconName="faHeart"
                titleText="연애"
                searchValue={heartEA}
                selectedIcon2={selectedIcon2}
                setSelectedIcon2={setSelectedIcon2}
              ></FilterForm2>
              <FilterForm2
                iconName="faTree"
                titleText="산책"
                searchValue={treeEA}
                selectedIcon2={selectedIcon2}
                setSelectedIcon2={setSelectedIcon2}
              ></FilterForm2>
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center align-items-center mt-4"
          style={{ width: "100%" }}
        >
          <div>
            {/* SearchDropdown.code.start--------------------------------- */}
            <SearchDropdown
              type="matching"
              selectedDropdown={selectedDropdown}
              setSelectedDropdown={setSelectedDropdown}
              setPlaceHolderUseState={setPlaceHolderUseState}
            ></SearchDropdown>
          </div>
          {/* SearchDropdown.code.end--------------------------------- */}
          <SearchForm
            whatLeftMenuInnerText="매칭"
            allProduct={allProduct}
            sellingProduct={sellingProduct}
            soldOutProduct={soldOutProduct}
            selectedIcon={selectedIcon}
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

          <LocationSelector
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            where="admin"
          ></LocationSelector>
        </div>
        <div className="d-flex align-items-center mt-4">
          <div>
            [검색:
            {totalFilter}개 / TOTAL: {allProduct.length} 개]
          </div>

          <Button
            className="mx-2"
            variant="outline-danger"
            onClick={onDeleteCheckedMatchings}
          >
            선택 일괄 삭제
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <MatchingListAdmin
            selectedIcon={selectedIcon}
            selectedIcon2={selectedIcon2}
            allProduct={allProduct}
            sellingProduct={sellingProduct}
            soldOutProduct={soldOutProduct}
            useFilter={useFilter}
            searchValueText={searchValueText}
            setSearchValueText={setSearchValueText}
            useFilterCheckNumber={useFilterCheckNumber}
            setUseFilterCheckNumber={setUseFilterCheckNumber}
            checkedProducts={checkedMatchings}
            setCheckedProducts={setCheckedMatchings}
            setTotalFilter={setTotalFilter}
            whatProduct={whatProduct}
            setWhatProduct={setWhatProduct}
            checkedMatchings={checkedMatchings}
            setCheckedMatchings={setCheckedMatchings}
          ></MatchingListAdmin>
        </div>
      </div>
    </>
  );
};

export default MatchingListFormAdmin;
