import React from "react";
import { Modal } from "react-bootstrap";
import StarPoint from "./StarPoint";

const PetModal = ({ modalShow, setModalShow }) => {
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
              alt=""
              src="/image/join/petModal.png"
              style={{ width: "100%" }}
            />
            <div>
              <StarPoint></StarPoint>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PetModal;
