import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import StarPoint from "./join/StarPoint";
import NextBtn from "./NextBtn";
import ModalDogsInfo from "./ModalDogsInfo";

const ModalGoMatching = ({
  modalShow,
  setModalShow,
  modaldogsInfo,
  currentDogIndex,
  setIsSatisfyForNextBtnAuth,
  isSatisfyForNextBtnAuth,
  score,
  setScore,
  handleNextDog,
  handleComplete,
}) => {
  return (
    <div>
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <div className="d-flex justify-content-center align-items-start flex-column">
            <span style={{ fontSize: 30 }}>
              동네 애견 매칭({currentDogIndex + 1}/{modaldogsInfo.length})
            </span>
            <span style={{ color: "gray" }}>
              강아지 사진을 누르면 1:1채팅이 시작됩니다.
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`d-flex justify-content-center align-items-center flex-column`}
            style={{ width: "100%", height: 400 }}
          >
            <div
              className={`d-flex justify-content-center align-items-center`}
              style={{ width: "100%", height: 400 }}
            >
              <div
                className="d-flex justify-content-center align-items-center rounded"
                style={{ width: "60%", height: 400 }}
              >
                {modaldogsInfo.length > 0 && (
                  <img
                    className="rounded"
                    alt="강아지 사진"
                    src={
                      modaldogsInfo[currentDogIndex].image.includes("flirdog")
                        ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${modaldogsInfo[currentDogIndex].image}`
                        : "/image/nullImage/nullImage1.png"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <div style={{ width: "7%" }}></div>
              <div style={{ width: "20%" }}>
                {modaldogsInfo.length > 0 && (
                  <ModalDogsInfo
                    dog={modaldogsInfo[currentDogIndex]}
                  ></ModalDogsInfo>
                )}
              </div>
            </div>
          </div>

          <div
            className={`d-flex justify-content-center align-items-center flex-column`}
            style={{ width: "100%" }}
          >
            <div
              className="d-flex justify-content-center align-items-center flex-column"
              style={{ width: "100%" }}
            >
              <StarPoint
                score={score}
                setScore={setScore}
                currentDogIndex={currentDogIndex}
                setIsSatisfyForNextBtnAuth={setIsSatisfyForNextBtnAuth}
              ></StarPoint>
              {currentDogIndex < modaldogsInfo.length - 1 ? (
                <NextBtn
                  isSatisfyForNextBtnAuth={isSatisfyForNextBtnAuth}
                  text="다음"
                  onClick={handleNextDog}
                ></NextBtn>
              ) : (
                <NextBtn
                  isSatisfyForNextBtnAuth={isSatisfyForNextBtnAuth}
                  text="완료"
                  onClick={handleComplete}
                ></NextBtn>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalGoMatching;
