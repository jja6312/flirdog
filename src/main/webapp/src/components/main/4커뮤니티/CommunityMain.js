import React, { useEffect, useState } from "react";
import CommunityBtnContainer from "./CommunityBtnContainer";
import CommunityWrite from "./CommunityWrite";
import Container from "react-bootstrap/esm/Container";
import NavigateBtn from "../NavigateBtn";
import styles from "../../../css/main/4커뮤니티/Community.module.css";
import axios from "axios";
import timeAgo from "../timeAgo";

const CommunityMain = () => {
  const [communityBoard, setCommunityBoard] = useState([]);
  const [communityBoardBest, setCommunityBoardBest] = useState([]);
  const [bragBoardData, setBragBoardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("실시간 인기글");

  useEffect(() => {
    axios.post("http://localhost:8080/access/getBragBoard").then((res) => {
      setCommunityBoardBest(res.data);
      console.log("communityBoardBest");
      setCommunityBoard(res.data);
      console.log(res.data);
    });

    axios
      .post("http://localhost:8080/access/getBragBoardClosestDate10")
      .then((res) => {
        setBragBoardData(res.data);
        console.log("bragBoardData");
        console.log(res.data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "실시간 인기글") {
      setCommunityBoard(communityBoardBest);
    } else if (selectedCategory === "자랑 게시판") {
      setCommunityBoard(bragBoardData);
    }
  }, [selectedCategory]);

  return (
    <>
      <Container className="px-10">
        <div className={`row mt-8 d-flex justify-content-center`}>
          <CommunityBtnContainer
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          ></CommunityBtnContainer>
        </div>

        <div className="row mt-3">
          <div
            className={` col-12 col-xl-6 ${styles.communityWriteElementContainer}`}
          >
            <div className={styles.communityWriteElement}>
              {communityBoard.map((item, index) => {
                if (index < 5) {
                  return (
                    <CommunityWrite
                      id={item.id}
                      title={`${item.title}[${item.commentCount}]`}
                      createdDate={timeAgo(item.createdAt)}
                      author={item.userNickName}
                      imgSrc={item.image}
                      number={index + 1}
                    ></CommunityWrite>
                  );
                }
              })}
            </div>
          </div>
          <div
            className={`{ col-12 col-xl-6 ${styles.communityWriteElementContainer}}`}
          >
            <div className={styles.communityWriteElement}>
              {/* 6~10번째까지 출력하되 게시글이없으면 에러안뱉게함. */}

              {communityBoard.map((item, index) => {
                if (index >= 5 && index < 10) {
                  return (
                    <CommunityWrite
                      id={item.id}
                      title={`${item.title}[${item.commentCount}]`}
                      createdDate={timeAgo(item.createdAt)}
                      author={item.userNickName}
                      imgSrc={item.image}
                      number={index + 1}
                    ></CommunityWrite>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="mt-7 d-flex justify-content-center align-items-center">
          <NavigateBtn
            text="커뮤니티 이동"
            url="/"
            fontSize="2.5vw"
            btnWidth="25vw"
            btnHeight="80px"
          ></NavigateBtn>
        </div>
      </Container>
    </>
  );
};

export default CommunityMain;
