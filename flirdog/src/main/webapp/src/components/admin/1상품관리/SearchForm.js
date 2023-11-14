import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";

const SearchForm = ({ placeHolder }) => {
  const [searchValueText, setSearchValueText] = useState("");
  const onSearchValueText = (e) => {
    setSearchValueText(e.target.value);
  };
  const onSearchList = (event) => {
    event.preventDefault();
    alert();
    //   axios
    //     .get(`/user/getUserListSearch?page=0`, {
    //       params: { columnName: searchValue, keyword: searchValueText },
    //     })
    //     .then((res) => {
    //       setList(res.data.content);
    //       setPagingArray(
    //         Array.from({ length: res.data.totalPages }, (_, index) => index + 1)
    //       );
    //       console.log(res.data);
    //       setIsSearch(true);
    //     })
    //     .catch((error) => console.log(error));
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
          onChange={onSearchValueText}
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
