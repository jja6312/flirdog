import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import StarPoint from "./join/StarPoint";
import NextBtn from "./NextBtn";
import ModalDogsInfo from "./ModalDogsInfo";
import ModalMatchingInfo from "./ModalMatchingInfo";
import { calculateCoordsDistance, convertAddressToCoords } from "./utils";

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
  modalUserInfo,
  modalMatchingTable,
}) => {
  const [myAddress, setMyAddress] = useState("");
  const [yourAddress, setYourAddress] = useState("");
  const [distance, setDistance] = useState("?");

  useEffect(() => {
    if (modalMatchingTable[currentDogIndex]) {
      setYourAddress(modalMatchingTable[currentDogIndex].matchingAddress);
      console.log("상대방 address");
      console.log(modalMatchingTable[currentDogIndex].matchingAddress);
    }
    if (localStorage.getItem("address") !== null) {
      // localStorage에서 myAddress 가져오기
      const LocalStorageAddress = localStorage.getItem("address");

      // myAddress를 JSON 형식으로 파싱하여 address 변수에 저장
      const addressParsing = JSON.parse(LocalStorageAddress);

      console.log("로컬스토리지 address");
      console.log(addressParsing.address);
      setMyAddress(
        addressParsing && typeof addressParsing.address === "object"
          ? addressParsing.address.address
          : addressParsing.address
      );
    }
  }, [currentDogIndex, modalMatchingTable]);

  useEffect(() => {
    if (myAddress && yourAddress) {
      convertAddressToCoords(myAddress, (coords1) => {
        convertAddressToCoords(yourAddress, (coords2) => {
          const distance = calculateCoordsDistance(coords1, coords2);
          console.log(`두 주소 사이의 거리: ${distance.toFixed(2)} km`);
          setDistance(distance.toFixed(2));
        });
      });
    } else {
      setDistance("?");
    }
  }, [myAddress, yourAddress, currentDogIndex, modalMatchingTable]);

  return (
    <div>
      <Modal
        size="xl"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <div
            className="d-flex justify-content-start align-items-center"
            style={{ width: "100%" }}
          >
            <div
              className="d-flex justify-content-start align-items-start flex-column"
              style={{ width: "60%" }}
            >
              <span style={{ fontSize: 30 }}>
                동네 애견 매칭({currentDogIndex + 1}/{modaldogsInfo.length})
              </span>
              <span style={{ color: "gray" }}>
                강아지 사진을 누르면 1:1채팅이 시작됩니다.
              </span>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",

                  overflow: "hidden",
                  marginRight: 15,
                }}
              >
                <img
                  src={
                    modaldogsInfo[currentDogIndex] &&
                    `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/aiDogProfile/${modaldogsInfo[currentDogIndex].imageAiProfile}`
                  }
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <span style={{ fontSize: 30, marginRight: 15 }}>
                {modalUserInfo[currentDogIndex] &&
                  modalUserInfo[currentDogIndex].nickname}
              </span>
              <span style={{ fontSize: 30, color: "gray" }}>님 </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`d-flex justify-content-start align-items-center flex-column`}
            style={{ width: "100%" }}
          >
            <div
              className={`d-flex justify-content-center align-items-start`}
              style={{ width: "100%" }}
            >
              <div
                className="d-flex justify-content-center align-items-center flex-column"
                style={{ width: "40%" }}
              >
                <div style={{ height: "20px" }}></div>
                <div
                  className="d-flex justify-content-center align-items-center rounded"
                  style={{ width: "100%", height: "400px" }}
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
                        width: "auto",
                        maxWidth: "450px",
                        height: "100%",

                        objectFit: "cover",
                      }}
                    />
                  )}
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
              </div>
              <div style={{ width: "7%" }}></div>

              <div style={{ width: "20%" }}>
                {modaldogsInfo.length > 0 && (
                  <ModalDogsInfo
                    dog={modaldogsInfo[currentDogIndex]}
                    distance={distance}
                    modalMatchingTableAsCurrentIndex={
                      modalMatchingTable.length > 0 &&
                      modalMatchingTable[currentDogIndex] &&
                      modalMatchingTable[currentDogIndex]
                    }
                  ></ModalDogsInfo>
                )}
              </div>
              <div style={{ width: "20%" }}>
                {modalMatchingTable.length > 0 &&
                  modalMatchingTable[currentDogIndex] && (
                    <ModalMatchingInfo
                      modalMatchingTableAsCurrentIndex={
                        modalMatchingTable[currentDogIndex]
                      }
                    ></ModalMatchingInfo>
                  )}
              </div>
              {!modalMatchingTable[currentDogIndex] && (
                <div
                  className="d-flex justify-content-center align-items-center flex-column"
                  style={{
                    width: "40%",
                    height: 480,
                    transform: "translateX(-20%)",
                  }}
                >
                  <span style={{ color: "gray" }}>매칭정보가 없어요.</span>
                  <span style={{ fontSize: 22 }}>
                    1:1 대화로 매칭을 제안해보세요!
                  </span>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalGoMatching;