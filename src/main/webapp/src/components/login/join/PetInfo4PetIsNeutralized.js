import React from "react";
import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import TableCss from "../../../css/date/dateWrite.module.css";

const PetInfo4PetIsNeutralized = ({ onInput, dogsInfo }) => {
  return (
    <>
      <div
        style={{ width: "80px" }}
        className={`d-flex justhfi-content-center flex-column`}
      >
        <span className={`${login.JoinAuthFont3} mt-3`}>중성화 여부</span>
        <div className={`d-flex justify-content-end align-items-center mt-2`}>
          <input
            id="neutralizationBox"
            name="isNeutralized"
            type="checkbox"
            onChange={onInput}
          />
          <label
            className={`${TableCss.neutralizationLabel} ${TableCss.labelClass3}`}
            htmlFor="neutralizationBox"
          ></label>
        </div>
      </div>
    </>
  );
};

export default PetInfo4PetIsNeutralized;
