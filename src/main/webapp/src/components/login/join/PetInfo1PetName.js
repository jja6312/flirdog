import React from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";

const PetInfo1PetName = ({ onInput }) => {
  return (
    <>
      <div
        style={{ width: "350px" }}
        className={`d-flex justhfi-content-start`}
      >
        <span className={`${login.JoinAuthFont3} mt-3`}>반려견 이름</span>
      </div>
      <div
        className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center flex-column`}
      >
        <InputGroup size="lg" className={`mt-2`}>
          <Form.Control
            onChange={onInput}
            name="name"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="반려견 이름을 입력해주세요."
          />
        </InputGroup>
      </div>
    </>
  );
};

export default PetInfo1PetName;
