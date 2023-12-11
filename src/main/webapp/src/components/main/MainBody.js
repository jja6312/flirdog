import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import NavigateBtn from "./NavigateBtn";
import MainScreen from "./1메인화면/MainScreen";
import BestFlirdog from "./2베스트플러독/BestFlirdog";
import SmallGroupMain from "./3강아지소모임/SmallGroupMain";
import CommunityMain from "./4커뮤니티/CommunityMain";
import BestProductMain from "./5인기상품/BestProductMain";

import axios from "axios";
import Chatting from "../Chatting";
import { useNavigate } from "react-router-dom";

const MainBody = () => {
  const [userInfoArray, setUserInfoArray] = React.useState([]);
  const [dogsInfoArray, setDogsInfoArray] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전국 랭킹");
  const [selectedLocation, setSelectedLocation] = useState("지역 선택");
  const [isOpenChatting, setIsOpenChatting] = useState(false);

  const [selectedRadio, setSelectedRadio] = useState("미모 점수 높은 순");
  const navigate = useNavigate();

  const openChatting = (e) => {
    if (localStorage.getItem("user") === null) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    setIsOpenChatting(!isOpenChatting);
    // 카카오 로그인으로 진행했을 때
    const userIdLocal = localStorage.getItem("user");
    const userIdParsing = JSON.parse(userIdLocal);
    let userId = userIdParsing.id;

    if (userId === undefined) {
      // 만약 일반적인 로그인으로 진행했다면 ??
      userId = userIdParsing.user.id;
    }

    if (userId === null) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    const otherUserId = e.currentTarget.id;
    alert("내 아이디: " + userId);
    alert("상대 개의 아이디: " + otherUserId);

    axios
        .post("https://java.flirdog.store:8080/message/createRoom", null, {
          params: {
            userIds: `${userId},${otherUserId}`,
            name: `1:1채팅방${userId}${otherUserId}`,
          },
        })
        .then((res) => {
          alert("채팅방 생성 성공! res.data: " + res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  //서버에서 userInfoArray를 가져온다.(communityScore가 높은 순으로 3개)
  //userInfoArray.map으로, 1등 2등 3등의 id를 통해 dogsInfoArray(첫번째값만)를 가져온다.
  //각각의 dogsInfoArray의 값들을 BestFlirdogImg에 넣어준다.
  //BestFlirdogImg에는 text로 communityScore를 넣어준다.
  const fetchData = async () => {
    try {
      if (selectedRadio === "커뮤니티 점수 높은 순") {
        let url = "https://java.flirdog.store:8080/access/getUserInfoArray";
        const res1 = await axios.post(url);
        setUserInfoArray(res1.data);
        console.log("전체 유저데이터");
        console.log(res1.data);

        const dogsInfoPromises = res1.data.map((item) =>
            axios.post("https://java.flirdog.store:8080/access/getDogsInfoArray", null, {
              params: {
                userId: item.id,
              },
            })
        );
        const dogsInfoResults = await Promise.all(dogsInfoPromises);
        const combinedDogsInfo = dogsInfoResults.map((res) => res.data);
        setDogsInfoArray(combinedDogsInfo.flat());
        console.log("전체 개데이터");
        console.log(combinedDogsInfo.flat());
      } else {
        const res1 = await axios.post(
            "https://java.flirdog.store:8080/access/getDogsInfoArrayByBeautyScore"
        );

        console.log("미모점수 높은 순 강아지데이터");
        console.log(res1.data);
        const topThreeDogsData = res1.data.slice(0, 3);
        setDogsInfoArray(topThreeDogsData);

        const topThreeUsersData = topThreeDogsData.map((dog) => dog.user);
        setUserInfoArray(topThreeUsersData);

        console.log("Top 3 Users Info:");
        console.log(topThreeUsersData);
      }
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const fetchDataLocal = async (location) => {
    if (selectedRadio === "커뮤니티 점수 높은 순") {
      try {
        let url = "https://java.flirdog.store:8080/access/getUserInfoArrayLocation";

        const res1 = await axios.post(url, null, {
          params: { location: location },
        });
        setUserInfoArray(res1.data);
        console.log("로컬 유저데이터" + res1.data);

        const dogsInfoPromises = res1.data.map((item) =>
            axios.post("https://java.flirdog.store:8080/access/getDogsInfoArray", null, {
              params: {
                userId: item.id,
              },
            })
        );

        const dogsInfoResults = await Promise.all(dogsInfoPromises);
        const combinedDogsInfo = dogsInfoResults.map((res) => res.data);
        setDogsInfoArray(combinedDogsInfo.flat());
        console.log("로컬 개데이터" + combinedDogsInfo.flat());
      } catch (error) {
        console.log("error: " + error);
      }
    } else {
      const url = `https://java.flirdog.store:8080/access/getDogsInfoByLocationAndBeautyScore?location=${encodeURIComponent(
          location
      )}`;
      const res1 = await axios.get(url);
      console.log("미모 점수 높은 순 강아지데이터");
      console.log(res1.data);

      // 강아지 정보 저장
      const dogsInfo = res1.data.slice(0, 3); // 0, 1, 2번째 강아지 정보만 저장
      setDogsInfoArray(dogsInfo);
      console.log("강아지데이터 저장");
      console.log(dogsInfo);

      // 유저 정보 추출 및 저장
      const userInfo = dogsInfo.map((dog) => dog.user); // 각 강아지 정보에서 유저 정보 추출
      setUserInfoArray(userInfo);
      console.log("유저데이터 저장");
      console.log(userInfo);
    }
  };
  useEffect(() => {
    if (selectedCategory === "전국 랭킹") {
      fetchData();
    } else if (
        selectedCategory === "지역 랭킹" &&
        selectedLocation !== "지역 선택" &&
        selectedLocation !== "" &&
        selectedLocation !== "전체"
    ) {
      fetchDataLocal(selectedLocation);
    }
  }, [selectedCategory, selectedLocation, selectedRadio]);

  return (
      <>
        <Chatting isOpenChatting={isOpenChatting}></Chatting>

        <MainScreen></MainScreen>

        <Container className="px-10">
          <BestFlirdog
              userInfoArray={userInfoArray}
              dogsInfoArray={dogsInfoArray}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              openChatting={openChatting}
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio}
          />
        </Container>
        <SmallGroupMain></SmallGroupMain>
        <CommunityMain></CommunityMain>
        <Container className="px-10">
          <BestProductMain></BestProductMain>

          <div className="mt-7 d-flex justify-content-center align-items-center">
            <NavigateBtn
                text="쇼핑몰 이동"
                url="/product"
                fontSize="2.5vw"
                btnWidth="25vw"
                btnHeight="80px"
            ></NavigateBtn>
          </div>
        </Container>
      </>
  );
};

export default MainBody;