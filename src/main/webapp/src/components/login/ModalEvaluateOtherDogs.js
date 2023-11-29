import React, { useState } from "react";
import Login from "./Login";
import PetModal from "./join/PetModal";

const ModalEvaluateOtherDogs = () => {
  const [modalShow, setModalShow] = useState(true);

  <>
    dd
    <Login />
    {modalShow && (
      <PetModal modalShow={modalShow} setModalShow={setModalShow}></PetModal>
    )}
  </>;
};

export default ModalEvaluateOtherDogs;
