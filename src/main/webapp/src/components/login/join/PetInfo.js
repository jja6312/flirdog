import React, { useState } from "react";
import login from "../../../css/login/login.module.css";

import { Form, InputGroup } from "react-bootstrap";
import PetInfo1PetName from "./PetInfo1PetName";
import PetInfo2PetAge from "./PetInfo2PetAge";
import PetInfo3PetGender from "./PetInfo3PetGender";
import PetInfo4PetIsNeutralized from "./PetInfo4PetIsNeutralized";
import PetInfo5PetSpecies from "./PetInfo5PetSpecies";
import PetInfo6PetColors from "./PetInfo6PetColors";

const PetInfo = ({
  dogsInfo,
  setDogsInfo,
  dogsBreed,
  setDogsBreed,
  setDogsColor,
  selectedBreed,
  setSelectedBreed,
}) => {
  const onInput = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setDogsInfo({
      ...dogsInfo,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <div style={{ height: 26 }}></div>

      <span className={login.JoinAuthFont1}>반려견 등록(선택)</span>
      <PetInfo1PetName onInput={onInput}></PetInfo1PetName>
      <PetInfo2PetAge onInput={onInput}></PetInfo2PetAge>
      <PetInfo6PetColors setDogsColor={setDogsColor}></PetInfo6PetColors>
      <PetInfo5PetSpecies
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        setDogsBreed={setDogsBreed}
      ></PetInfo5PetSpecies>
      <div className="d-flex justify-content-between" style={{ width: 340 }}>
        <PetInfo3PetGender onInput={onInput}></PetInfo3PetGender>
        <PetInfo4PetIsNeutralized
          onInput={onInput}
          dogsInfo={dogsInfo}
        ></PetInfo4PetIsNeutralized>
      </div>
    </>
  );
};

export default PetInfo;
