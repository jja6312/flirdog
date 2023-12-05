import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import SearchDropdown from "./SearchDropdown";

const SearchForm = ({
  whatLeftMenuInnerText,
  placeHolder,
  setUseFilter,
  setSearchValueText,
  useFilterCheckNumber,
  setUseFilterCheckNumber,
  selectedDropdown,
  setSelectedDropdown,
  placeHolderUseState,
  setPlaceHolderUseState,
}) => {
  const searchInput = useRef();

  const onSearchList = (event) => {
    event.preventDefault();
    const searchInputValue = searchInput.current.value;
    setSearchValueText(searchInputValue);

    console.log(searchInputValue);
    if (searchInputValue === "") {
      setUseFilter(false);
      setUseFilterCheckNumber(useFilterCheckNumber + 1);
    } else if (searchInputValue !== "") {
      setUseFilter(true);
      setUseFilterCheckNumber(useFilterCheckNumber + 1);
    }
  };

  return (
    <>
      <Form className="d-flex justify-content-start" style={{ width: "100%" }}>
        <Form.Control
          style={{ width: "470px", height: "50px" }}
          type="search"
          placeholder={placeHolderUseState}
          className="me-2"
          aria-label="Search"
          // onChange={onSearchValueText}
          ref={searchInput}
        />
        <Button
          className={checkBtnStyle.editBtn}
          style={{ width: "100px" }}
          onClick={onSearchList}
        >
          검색
        </Button>
      </Form>
    </>
  );
};

export default SearchForm;
