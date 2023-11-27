import React, { useEffect } from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import DateUpdateCss from "../../../css/date/dateUpdate.module.css";

const PetInfo3PetGender = ({ onInput }) => {
  return (
    <>
      <div
        style={{ width: 240 }}
        className="d-flex justify-content-start align-items-center"
      >
        <div className="d-flex justify-content-start align-items-start flex-column">
          <div
            style={{ width: "240px" }}
            className={`d-flex justhfi-content-start`}
          >
            <span className={`${login.JoinAuthFont3} mt-3`}>반려견 성별</span>
          </div>
          <div
            className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-start flex-column`}
          >
            <div
              className={`d-flex justify-content-left`}
              style={{ width: "240px" }}
            >
              <input
                id="genderBox1"
                type="radio"
                name="gender"
                value="남아"
                onInput={onInput}
              />
              <label
                className={DateUpdateCss.labelClass1}
                style={{ border: "1px solid #35CCFF", width: "50%" }}
                htmlFor="genderBox1"
              >
                남 아
              </label>
              &nbsp;&nbsp;
              <input
                id="genderBox2"
                type="radio"
                name="gender"
                value="여아"
                onInput={onInput}
              />
              <label
                className={DateUpdateCss.labelClass2}
                style={{ border: "1px solid #F56084", width: "50%" }}
                htmlFor="genderBox2"
              >
                여 아
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetInfo3PetGender;
