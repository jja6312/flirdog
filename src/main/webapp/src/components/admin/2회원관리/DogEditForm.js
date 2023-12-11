import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import styles from "../../../css/admin/2회원관리/dogEditForm.module.css";

const DogEditForm = () => {
  const { dogId } = useParams();
  const [dogDTO, setDogDTO] = useState({
    id: "",
    name: "",
    user: { id: "", name: "" },
    age: "",
    gender: "",
    dogsBreed: "",
    isNeutralized: false,
    createdAt: "",
    modifiedAt: "",
    image: "",
    imageAiProfile: "",
  });

  useEffect(() => {
    axios
      .post(`https://java.flirdog.store:8080/admin/getDog`, { dogId })
      .then((response) => setDogDTO(response.data));
  }, [dogId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogDTO({
      ...dogDTO,
      [name]: value,
    });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setDogDTO({
      ...dogDTO,
      user: {
        ...dogDTO.user,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form 제출 로직
  };

  const onSave = () => {
    axios
      .post(`https://java.flirdog.store:8080/admin/dogEdit`, dogDTO)
      .then((response) => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "애견 정보 수정 성공",
          showConfirmButton: false,
          timer: 1000,
        });

        setTimeout(() => {
          window.close();
        }, 1000);

        window.opener.location.reload();
      });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "50px",
          backgroundColor: "#F56084",
          color: "white",
        }}
      >
        <h2>애견 정보 수정</h2>
      </div>
      <Container className="px-10 mt-4">
        <Form onSubmit={handleSubmit}>
          {/* 유저 ID 필드 */}
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="d-flex justify-content-first align-items-center ">
              <Link to={`/admin/userEditForm/${dogDTO.user.id}`}>
                <h2>유저 정보</h2>
              </Link>
            </div>
            <div className="d-flex mt-3">
              <div className="d-flex" style={{ width: "30vw", height: "27vw" }}>
                <img
                  src={
                    dogDTO.imageAiProfile
                      ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/aiDogProfile/${dogDTO.imageAiProfile}`
                      : "/image/nullImage/nullImage2.png"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translateX(-10px)",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  }}
                ></img>
              </div>

              <div className="d-flex justify-content-center align-items-center flex-column">
                {/* 애견 이름 필드 */}

                <Form.Group className="mb-3">
                  <Form.Label>유저 ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={dogDTO.user.id}
                    onChange={handleUserChange}
                    style={{ backgroundColor: "#EEEEEE" }}
                    readOnly
                  />
                </Form.Group>

                {/* 유저 이름 필드 */}
                <Form.Group className="mb-3">
                  <Form.Label>유저 이름</Form.Label>
                  <Form.Control
                    style={{ backgroundColor: "#EEEEEE" }}
                    type="text"
                    name="name"
                    value={dogDTO.user.name}
                    onChange={handleUserChange}
                    readOnly
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-center align-items-center flex-column">
            <h1>애견 상세 정보</h1>

            <div className="d-flex justify-content-center align-items-center mt-3">
              <div className="d-flex" style={{ width: "30vw", height: "45vw" }}>
                <img
                  className="rounded"
                  src={
                    dogDTO.image
                      ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${dogDTO.image}`
                      : "/image/nullImage/nullImage2.png"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "translateX(-10px)",
                  }}
                ></img>
              </div>
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>애견 아이디</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={dogDTO.id}
                    onChange={handleChange}
                    style={{ backgroundColor: "#EEEEEE" }}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>애견 이름</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={dogDTO.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* 애견 나이 필드 */}

                <Form.Group className="mb-3">
                  <Form.Label>애견 나이</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={dogDTO.age}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          {/* 애견 성별 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>애견 성별</Form.Label>
            <span style={{ color: "gray" }}>(아이콘을 클릭해 변경하세요.)</span>
            <br></br>

            <div
              className={`${
                dogDTO.gender === "Male"
                  ? styles.genderDivMale
                  : styles.genderDivFemale
              } d-flex justify-content-center align-items-center`}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() =>
                setDogDTO({
                  ...dogDTO,
                  gender: dogDTO.gender === "Male" ? "FeMale" : "Male",
                })
              }
            >
              {dogDTO.gender === "Male" ? (
                <svg
                  className="m-2"
                  style={{ width: 30, height: 30, fill: "blue" }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="14"
                  viewBox="0 0 448 512"
                >
                  <path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" />
                </svg>
              ) : (
                <svg
                  className="m-2"
                  style={{ width: 30, height: 30, fill: "red" }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="12"
                  viewBox="0 0 384 512"
                >
                  <path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V349.1z" />
                </svg>
              )}
            </div>
          </Form.Group>

          {/* 견종 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>견종</Form.Label>
            <Form.Control
              type="text"
              name="dogsBreed"
              value={dogDTO.dogsBreed}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 중성화 여부 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>중성화 여부</Form.Label>
            <span style={{ color: "gray" }}>(아이콘을 클릭해 변경하세요.)</span>
            <br></br>
            <div
              className={`d-flex justify-content-center align-items-center ${styles.isNeutralizedDiv}`}
              onClick={() =>
                setDogDTO({
                  ...dogDTO,
                  isNeutralized: !dogDTO.isNeutralized,
                })
              }
            >
              <img
                className="m-2"
                style={{ width: 30, marginRight: 10, cursor: "pointer" }}
                src={
                  dogDTO.isNeutralized
                    ? "/image/login/check.png"
                    : "/image/login/unCheck.png"
                }
                alt="중성화 체크"
              />
            </div>
          </Form.Group>

          {/* 등록일 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>등록일</Form.Label>
            <Form.Control
              style={{ backgroundColor: "#EEEEEE" }}
              type="text"
              value={dogDTO.createdAt}
              readOnly
            />
          </Form.Group>

          {/* 수정일 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>수정일</Form.Label>
            <Form.Control
              style={{ backgroundColor: "#EEEEEE" }}
              type="text"
              value={dogDTO.modifiedAt}
              readOnly
            />
          </Form.Group>

          <Button className={checkBtnStyle.editBtn} onClick={onSave}>
            저장
          </Button>
        </Form>
        <div style={{ height: 30 }}></div>
      </Container>
    </>
  );
};

export default DogEditForm;
