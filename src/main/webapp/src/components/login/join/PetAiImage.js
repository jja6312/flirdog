import React, { useEffect, useState } from "react";
import axios from "axios";
import ScratchCard from "./ScratchCard";
import loginStyles from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";

const PetAiImage = ({
  user,
  setUser,
  dogsInfo,
  aiDogProfileImgUrl,
  setAiDogProfileImgUrl,
  login,
  onAcceptAiImage,
  onJoin,
}) => {
  const NononononoJoin = () => {
    Swal.fire({
      icon: "error",
      title: "닉네임을 입력해주세요.",
      showConfirmButton: false,
      timer: 800,
      position: "top",
    });
  };

  const onInput = (e) => {
    const { value } = e.target;

    setUser({ ...user, nickname: value });
  };
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("b3eef06a2754cfd6cae91b650e23a921");
    }
  }, []);

  const sendKakaoMessage = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "Ai 강아지 프로필 생성",
        description: "우리집 강아지 연애/산책 매칭 플랫폼, 플러독",
        imageUrl: "https://i.ibb.co/0jZQY5q/ai-dog-profile.png",
        link: {
          mobileWebUrl: "http://localhost:3000/join/auth",
          webUrl: "http://localhost:3000/join/auth",
        },
      },
    });
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center mt-5"
        style={{
          width: 300,
          height: 300,
          backgroundColor: "black",
          //배경이미지 크기 딱맞추기
          backgroundSize: "cover",
          // backgroundImage: `url(${aiDogProfileImgUrl})`,
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <ScratchCard
          frontImageSrc="/image/login/sticky.png"
          backImageSrc={aiDogProfileImgUrl}
          width="300px"
          height="300px"
        />
      </div>

      <InputGroup style={{ width: "340px" }} size="lg" className={`mt-2`}>
        <Form.Control
          onChange={onInput}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="닉네임을 입력해주세요."
        />
      </InputGroup>
      <div
        className={`${
          user.nickname.length > 0
            ? loginStyles.loginBtn
            : loginStyles.disabledBtn
        } mt-2 d-flex justify-content-center align-items-center rounded 
        
          ${loginStyles.loginFormElementDiv}
            
        `}
        onClick={user.nickname.length > 0 ? onJoin : NononononoJoin}
      >
        <span className={login.loginBtnSpan}>프로필 설정 및 회원가입 완료</span>
      </div>

      <div
        className="mt-3"
        style={{
          border: "1px solid lightGray",
          width: "50vw",
          height: "1px",
        }}
      ></div>
      <span>공유하기</span>
      <img
        onClick={sendKakaoMessage}
        style={{ cursor: "pointer", borderRadius: "50%" }}
        src="/image/login/kakao.png"
        alt="kakao"
        width="70px"
      />
    </>
  );
};

export default PetAiImage;
