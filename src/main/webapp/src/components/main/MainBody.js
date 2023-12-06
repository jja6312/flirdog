import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import NavigateBtn from "./NavigateBtn";
import MainScreen from "./1메인화면/MainScreen";
import BestFlirdog from "./2베스트플러독/BestFlirdog";
import SmallGroupMain from "./3강아지소모임/SmallGroupMain";
import CommunityMain from "./4커뮤니티/CommunityMain";
import BestProductMain from "./5인기상품/BestProductMain";

import axios from "axios";

const MainBody = () => {
  const [userInfoArray, setUserInfoArray] = React.useState([]);
  const [dogsInfoArray, setDogsInfoArray] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전국 랭킹");
  const [selectedLocation, setSelectedLocation] = useState("지역 선택");

  const [file, setFile] = useState();
  const oneFileGo = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:8080/admin/oneFileGo", formData)
      .then((res) => {
        console.log(res);
        alert("성공");
      })
      .catch((err) => {
        console.log(err);
        alert("실패");
      });
  };

  //서버에서 userInfoArray를 가져온다.(communityScore가 높은 순으로 3개)
  //userInfoArray.map으로, 1등 2등 3등의 id를 통해 dogsInfoArray(첫번째값만)를 가져온다.
  //각각의 dogsInfoArray의 값들을 BestFlirdogImg에 넣어준다.
  //BestFlirdogImg에는 text로 communityScore를 넣어준다.
  const fetchData = async () => {
    try {
      const res1 = await axios.post(
        "http://localhost:8080/access/getUserInfoArray"
      );
      setUserInfoArray(res1.data);
      console.log("전체 유저데이터");
      console.log(res1.data);

      const dogsInfoPromises = res1.data.map((item) =>
        axios.post("http://localhost:8080/access/getDogsInfoArray", null, {
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
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const fetchDataLocal = async (location) => {
    try {
      const res1 = await axios.post(
        "http://localhost:8080/access/getUserInfoArrayLocation",
        null,
        { params: { location: location } }
      );
      setUserInfoArray(res1.data);
      console.log("로컬 유저데이터" + res1.data);

      const dogsInfoPromises = res1.data.map((item) =>
        axios.post("http://localhost:8080/access/getDogsInfoArray", null, {
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
  }, [selectedCategory, selectedLocation]);

  return (
    <>
      <input
        type="file"
        id="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      ></input>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "red",
          cursor: "pointer",
        }}
        onClick={oneFileGo}
      >
        Go
      </div>
      <MainScreen></MainScreen>

      <Container className="px-10">
        <BestFlirdog
          userInfoArray={userInfoArray}
          dogsInfoArray={dogsInfoArray}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
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
