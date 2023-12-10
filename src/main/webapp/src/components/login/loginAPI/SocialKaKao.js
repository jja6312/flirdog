import React, { useState } from "react";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SocialKakao = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // setUser 함수의 타입을 로그로 확인
  console.log("setUser type:", typeof setUser);

  const kakaoClientId = "5ef65674b926693e29d5904e2c2d93db";

  const kakaoOnSuccess = async (data) => {
    const accessToken = data.response.access_token;
    try {
      const response = await axios.post(
        "http://localhost:8080/access/kakaoAuth",
        {
          token: accessToken,
        }
      );
      console.log("Response from backend", response.data);
      if (typeof setUser === "function") {
        setUser(response.data); // UserContext의 setUser 함수를 사용하여 상태 업데이트
      } else {
        console.error("setUser is not a function");
      }
      console.log("localStorage");
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("address", JSON.stringify(response.data.address));

      //저장되고나면 순서에 따라 홈으로 이동
      navigate("/");
    } catch (error) {
      console.error("Error during token transmission:", error);
    }
  };

  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
