import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Mypage from "../../css/main/100마이페이지/mypage.module.css";
import MypageSubHeader11 from "./5공통/MypageSubHeader1_1";

import axios from "axios";

const MypageMain = () => {
  //navigate
  const navigate = useNavigate();
  const [userObject, setUserObject] = useState({});

  const [userDTO, setUserDTO] = useState({
    name: "",
    passwd: "",
    email: "",
    nickname: "",
    userRole: "",
    point: 0,
    communityScore: 0,
    image: "",
    // 나머지 필드들에 대해서도 테이블의 컬럼에 따라 추가해주세요.
    // 예를 들면, dogsInfos, popularity, matching 등...
  });

  const fetchData = async () => {
    try {
      // 로컬스토리지에서 유저 아이디 가져오기
      const userJsonString = localStorage.getItem("user");

      const userObject = JSON.parse(userJsonString);
      console.log(userObject);
      setUserObject(userObject);
      const userId = userObject.id;

      // getUserId가 null이 아닌 경우
      const response = await axios.get(
        `https://java.flirdog.store:8080/mypage/getUserProfileTest?userIdStr=${userId}`
      );
      setUserDTO(response.data);

      console.log(response.data);

      // setUserDTO 함수 정의 확인 필요
      // setUserDTO(response.data);
    } catch (e) {
      console.log(e);
      alert("실패");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (userObject) {
      console.log("userObject");
      console.log(userObject);
    }
  }, [userObject]);

  useEffect(() => {
    fetchData();
  }, []);

  const getEmailLogo = () => {
    try {
      if (userDTO.email.includes("@gmail.com")) {
        return "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5rH/image/aFrEyVpANu07FvoBZQbIB4aF_uc";
      } else if (userDTO.email.includes("@daum.net")) {
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Daum_communication_logo.svg/2560px-Daum_communication_logo.svg.png";
      } else if (userDTO.email.includes("@naver.com")) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNxSXeJZ1HXb0496ON1Fdvpg81u2dl5AMqw&usqp=CAU";
      } else {
        return "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5rH/image/aFrEyVpANu07FvoBZQbIB4aF_uc";
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <MypageSubHeader11 />
      {/*  */}
      <Container className="px-10 mt-8">
        {" "}
        {/* 사진이미지부분 */}
        <Row>
          <Col xs={5} md={4}></Col>
          <Col xs={2} md={4} className={Mypage.Imagecenter}>
            <Image
              alt={userDTO.name}
              src={`../storage/${encodeURIComponent(userDTO.image)}`}
              roundedCircle
              className={Mypage.RoundedCircle}
            />
          </Col>
          <Col xs={5} md={4}></Col>
        </Row>
      </Container>
      <Container className="px-10 mt-5">
        {" "}
        {/* 마이페이지 내 프로필 내용부분 */}
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center"></div>
          <div className="col-lg-4 d-flex justify-content-right">
            <div className={`row ${Mypage.Text}`}>
              <div className={Mypage.Space3}>
                <span>닉네임</span>
                <span className={Mypage.Space}>{userDTO.nickname}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center"></div>
        </div>
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center"></div>
          <div className="col-lg-4 d-flex justify-content-start">
            <div className={`row ${Mypage.Text}`}>
              <span
                className="col-6 d-flex justify-content-start"
                style={{ marginBottom: "3px", marginTop: "1px" }}
              >
                {userDTO.email}
              </span>
              <span className="col-6 d-flex justify-content-end">
                <img alt="img" className={Mypage.Email} src={getEmailLogo()} />
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center"></div>
          <div className="col-lg-4 d-flex justify-content-right">
            <div className={`row ${Mypage.Text}`}>
              <div className={Mypage.Space3}>
                <div className="d-grid gap-2">
                  <Link to="/mypage/MyprofileUpdate">
                    <Button
                      variant="outline-danger"
                      className={`col-md-4 ${Mypage.Btn}`}
                    >
                      회원 정보 수정
                    </Button>
                    {""} {/* <==여기 글자입력하면 밑에 글자나옴 */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center"></div>
        </div>
        <div className="row">
          <div className="col-sm-4 d-flex justify-content-center"></div>
          <div className="col-sm-4 d-flex justify-content-right">
            {" "}
            {/* offset 사용예시 */}
            <Button variant="outline-danger" className={Mypage.Btn2}>
              로그아웃
            </Button>
            {""}
            {/* <button type="button" className={`btn btn-warning ${Mypage.Btn}`} >Warning</button>   */}
            {/* 부트스트랩 이랑 className이랑 혼용예시 */}
          </div>
          <div className="col-sm-4 d-flex justify-content-center"></div>
        </div>
      </Container>
    </div>
  );
};

export default MypageMain;
