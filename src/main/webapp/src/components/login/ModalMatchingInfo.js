import React from "react";
import { Form } from "react-bootstrap";
import KaKaoMapOnlyMap from "./KaKaoMapOnlyMap";
import { Link } from "react-router-dom";

const ModalMatchingInfo = ({ modalMatchingTableAsCurrentIndex }) => {
  return (
    <>
      <div
        className="d-flex justify-content-start aling-items-start flex-column"
        style={{ width: "100%", height: "100%" }}
      >
        <div
          className="d-flex justify-content-center aling-items-start flex-column mt-3"
          style={{ width: "100%" }}
        >
          <div className="d-flex flex-column">
            <span style={{ fontSize: 31 }}>매칭 정보</span>
            <Link
              to={`/date/dateReadMore/${modalMatchingTableAsCurrentIndex.id}`}
            >
              (매칭글 바로가기)
            </Link>
          </div>
          <div className="d-flex mt-3">
            {modalMatchingTableAsCurrentIndex.matchingPurpose === "연애" && (
              <span style={{ color: "#F56084" }}>
                ({modalMatchingTableAsCurrentIndex.matchingPurpose})
              </span>
            )}
            {modalMatchingTableAsCurrentIndex.matchingPurpose === "산책" && (
              <span style={{ color: "green" }}>
                ({modalMatchingTableAsCurrentIndex.matchingPurpose})
              </span>
            )}
            <span style={{ color: "gray" }}>매칭글 제목</span>
          </div>

          <div className="d-flex justify-content-start align-items-center">
            {/* bootstrab input박스로 위 스팬과 똑같은내용을 읽기전용으로 만들기. */}
            <Form.Control
              type="text"
              value={modalMatchingTableAsCurrentIndex.title}
              style={{
                width: "100%",
                fontSize: 15,
                backgroundColor: "#ffdfde",
              }}
              readOnly
            />
          </div>
        </div>
        <div
          className="d-flex justify-content-center aling-items-start flex-column mt-3"
          style={{ width: "100%" }}
        >
          <span style={{ color: "gray" }}>매칭글 내용</span>

          <div
            className="d-flex justify-content-start align-items-center"
            style={{ position: "relation" }}
          >
            <Form.Control
              type="text"
              style={{
                width: "100%",
                fontSize: 15,
                whiteSpace: "pre-line",
                height: 40,
                verticalAlign: "top",
                overflow: "auto",
                backgroundColor: "#ffdfde",
              }}
              value={`${modalMatchingTableAsCurrentIndex.content}ddddddddddddddddd
          ddsddddddddddddddddd`}
              readOnly
            />
          </div>
        </div>

        <div
          className="d-flex justify-content-center aling-items-start flex-column mt-3"
          style={{ width: "100%" }}
        >
          <span style={{ color: "gray" }}>매칭 희망 날짜</span>

          <Form.Control
            type="text"
            value={modalMatchingTableAsCurrentIndex.date}
            style={{
              width: "100%",
              fontSize: 15,
              backgroundColor: "#ffdfde",
            }}
            readOnly
          />
        </div>
        <div
          className="d-flex justify-content-center aling-items-start flex-column mt-3"
          style={{ width: "100%" }}
        >
          <span style={{ color: "gray" }}>만남 희망 장소</span>
          <Form.Control
            type="text"
            value={modalMatchingTableAsCurrentIndex.matchingAddress}
            style={{
              width: "100%",
              fontSize: 15,
              backgroundColor: "#ffdfde",
            }}
            readOnly
          />
          <div style={{ width: 220, height: 120, border: "1px solid gray" }}>
            <KaKaoMapOnlyMap
              matchingAddress={
                modalMatchingTableAsCurrentIndex.matchingAddress || ""
              }
            ></KaKaoMapOnlyMap>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMatchingInfo;
