import React from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";

const PetInfo6PetColors = ({ setDogsColor }) => {
  return (
    <>
      <div
        style={{ width: "350px" }}
        className={`d-flex justhfi-content-start`}
      >
        <span className={`${login.JoinAuthFont3} mt-3`}>반려견 색상</span>
      </div>
      <div
        className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center flex-column`}
      >
        <InputGroup size="lg" className={`mt-2`}>
          <Form.Control
            onChange={(e) => setDogsColor(e.target.value)}
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="반려견의 색상을 입력해주세요."
          />
        </InputGroup>
      </div>
    </>
  );
};

export default PetInfo6PetColors;
