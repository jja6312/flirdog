import React, { useEffect, useState } from "react";
import dogsBreed from "./join/dogsBreeds";

const ModalDogsInfo = ({ dog, isSatisfyCondition }) => {
  const [breedText, setBreedText] = useState("");

  useEffect(() => {
    const dogsBreedFind =
      dogsBreed.find((breed) => breed.value === dog.dogsBreed)?.text ||
      dog.breed;
    setBreedText(dogsBreedFind);
  }, [dog.dogsBreed, isSatisfyCondition]);

  return (
    <div
      className="d-flex justify-content-center aling-items-start flex-column"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="d-flex justify-content-center aling-items-start flex-column mt-3"
        style={{ width: "100%" }}
      >
        <span style={{ color: "gray" }}>강아지 이름</span>
        <div className="d-flex justify-content-start align-items-center">
          {dog.gender === "남아" ? (
            <img
              style={{ width: 16, marginRight: 10 }}
              src="/image/login/man.png"
              alt="남아"
            />
          ) : (
            <img
              style={{ width: 16, marginRight: 10 }}
              src="/image/login/woman.png"
              alt="여아"
            />
          )}
          <span style={{ fontSize: 25 }}>{dog.name}</span>
        </div>
      </div>
      <div
        className="d-flex justify-content-center aling-items-start flex-column mt-3"
        style={{ width: "100%" }}
      >
        <span style={{ color: "gray" }}>나이</span>

        <span style={{ fontSize: 25 }}>{dog.age}살</span>
      </div>

      <div
        className="d-flex justify-content-center aling-items-start flex-column mt-3"
        style={{ width: "100%" }}
      >
        <span style={{ color: "gray" }}>중성화여부</span>
        <span style={{ fontSize: 25 }}>
          {dog.isNeutralized === true ? (
            <img
              style={{ width: 30, marginRight: 10 }}
              src="/image/login/check.png"
              alt="중성화 체크"
            />
          ) : (
            <img
              style={{ width: 30, marginRight: 10 }}
              src="/image/login/unCheck.png"
              alt="중성화 언체크"
            />
          )}
        </span>
      </div>
      <div
        className="d-flex justify-content-center aling-items-start flex-column mt-3"
        style={{ width: "100%" }}
      >
        <span style={{ color: "gray" }}>견종</span>
        <span style={{ fontSize: 25 }}>{breedText}</span>
      </div>
      <div
        className="d-flex justify-content-center aling-items-start flex-column mt-3"
        style={{ width: "100%" }}
      >
        <span style={{ color: "gray" }}>나와의 거리</span>
        <span style={{ fontSize: 25 }}>? km</span>
      </div>
    </div>
  );
};

export default ModalDogsInfo;
