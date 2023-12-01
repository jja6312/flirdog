import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
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
  });

  useEffect(() => {
    axios
      .post(`http://localhost:8080/admin/getUser`, { userId })
      .then((response) => setUserDTO(response.data));
  }, [userId]);

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
      .post(`http://localhost:8080/admin/userEdit`, userDTO)
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
              type="text"
              name="modifiedAt"
              value={userDTO.modifiedAt}
              readOnly // 수정 날짜는 읽기 전용일 수 있습니다.
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
