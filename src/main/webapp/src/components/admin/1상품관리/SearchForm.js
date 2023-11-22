import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";

const SearchForm = ({
  placeHolder,
  allProduct,
  sellingProduct,
  soldOutProduct,
  selectedIcon,
  setUseFilter,
  searchValueText,
  setSearchValueText,
  useFilterCheckNumber,
  setUseFilterCheckNumber,
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
          placeholder={placeHolder}
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
