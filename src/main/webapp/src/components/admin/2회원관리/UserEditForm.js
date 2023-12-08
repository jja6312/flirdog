import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import checkBtnStyle from "../../../css/admin/checkBtn.module.css";

import Container from "react-bootstrap/Container";

import Swal from "sweetalert2";

const UserEditForm = () => {
  const { userId } = useParams();
  const [userDTO, setUserDTO] = useState({
    id: "",
    email: "",
    passwd: "",
    name: "",
    nickname: "",
    userRole: "",
    point: "",
    createdAt: "",
    modifiedAt: "",
    dogsInfos: [],
  });

  useEffect(() => {
    axios
      .post(`https://java.flirdog.store:8080/admin/getUser`, { userId })
      .then((response) => setUserDTO(response.data));
  }, [userId]);

  useEffect(() => {
    console.log("userDTO");
    console.log(userDTO);
    if (userDTO.dogsInfos && userDTO.dogsInfos.length > 0) {
      console.log(userDTO.dogsInfos[0].imageAiProfile);
    }
  }, [userDTO]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDTO({
      ...userDTO,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form 제출 로직
  };

  const onSave = () => {
    axios
      .post(`https://java.flirdog.store:8080/admin/userEdit`, userDTO)
      .then((response) => {
        console.log(response.data);

        Swal.fire({
          position: "top",
          icon: "success",
          title: "회원 수정 성공",
          showConfirmButton: false,
          timer: 1000,
        });

        //현재창 닫기

        setTimeout(() => {
          window.close();
        }, 1000);

        //부모창 새로고침
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
        <h2>회원 정보 수정</h2>
      </div>
      <Container className="px-10 mt-4">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100%" }}
        >
          <h1>회원 상세 정보</h1>
        </div>

        <div
          className="d-flex justify-content-center align-items-center "
          style={{ width: "100%", position: "relative" }}
        >
          <div style={{ position: "absolute", bottom: 0, right: 0 }}>
            {/* 아쉽다 이걸못쓰네1207 */}
            {/* ${userDTO.dogsInfos && userDTO.dogsInfos[0].id} */}
            {/* <Link
              to={`/admin/dogEditForm/
            `}
            >
              <div>
                <h6>애견 정보</h6>
              </div>

              <div
                className="d-flex justify-content-center align-items-center flex-column"
                style={{ width: "15vw", height: "15vw" }}
              >
                <img
                  className="rounded"
                  src={
                    userDTO.dogsInfos && userDTO.dogsInfos[0]
                      ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${userDTO.dogsInfos[0].image}`
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
            </Link> */}
          </div>
          <div style={{ width: "30vw", height: "27vw" }}>
            <img
              src={
                userDTO.dogsInfos && userDTO.dogsInfos[0]
                  ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/aiDogProfile/${userDTO.dogsInfos[0].imageAiProfile}`
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
        </div>
        <Form onSubmit={handleSubmit}>
          {/* 이메일 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userDTO.email}
              onChange={handleChange}
              style={{ backgroundColor: "#EEEEEE" }}
              readOnly
            />
          </Form.Group>

          {/* 비밀번호 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="text"
              name="passwd"
              value={userDTO.passwd}
              onChange={handleChange}
              style={{ backgroundColor: "#EEEEEE" }}
              readOnly
            />
          </Form.Group>

          {/* 이름 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userDTO.name}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 닉네임 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              type="text"
              name="nickname"
              value={userDTO.nickname}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 사용자 역할 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>사용자 역할</Form.Label>
            <Form.Control
              type="text"
              name="userRole"
              value={userDTO.userRole}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 포인트 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>포인트</Form.Label>
            <Form.Control
              type="text"
              name="point"
              value={userDTO.point}
              onChange={handleChange}
            />
          </Form.Group>

          {/* 생성 날짜 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>생성 날짜</Form.Label>
            <Form.Control
              type="text"
              name="createdAt"
              value={userDTO.createdAt}
              style={{ backgroundColor: "#EEEEEE" }}
              readOnly // 생성 날짜는 읽기 전용일 수 있습니다.
            />
          </Form.Group>

          {/* 수정 날짜 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>수정 날짜</Form.Label>
            <Form.Control
              style={{ backgroundColor: "#EEEEEE" }}
              type="text"
              name="modifiedAt"
              value={userDTO.modifiedAt}
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

export default UserEditForm;
