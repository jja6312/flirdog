import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import StarPoint from "./StarPoint";
import axios from "axios";

const PetModal = ({ modalShow, setModalShow }) => {
  const [dogsInfo, setDogsInfo] = useState([]);

  useEffect(() => {
    //랜덤한 강아지 정보 불러오기

    axios
      .post("http://localhost:8080/access/getFiveDogsInfo")
      .then((res) => {
        setDogsInfo(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            강아지 미모 측정
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`d-flex justify-content-center align-items-center flex-column`}
            style={{ width: 350, height: 350 }}
          >
            <img
              alt="강아지 사진"
              src="/image/join/petModal.png"
              style={{ width: "100%" }}
            />
          </div>
          <div
            className={`d-flex justify-content-center align-items-center flex-column`}
            style={{ width: "100%" }}
          >
            <div
              className="d-flex justify-content-center align-items-center flex-column"
              style={{ width: "100%" }}
            >
              <StarPoint></StarPoint>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetModal;
