import React, { useEffect } from "react";
import CommunityBtnContainer from "./CommunityBtnContainer";
import CommunityWrite from "./CommunityWrite";
import Container from "react-bootstrap/esm/Container";
import NavigateBtn from "../NavigateBtn";
import styles from "../../../css/main/4커뮤니티/Community.module.css";
import axios from "axios";
import timeAgo from "../timeAgo";

const CommunityMain = () => {
  const [communityBoard, setCommunityBoard] = React.useState([]);

  useEffect(() => {
    axios.post("http://localhost:8080/access/getBragBoard").then((res) => {
      setCommunityBoard(res.data);
      console.log("communityBoard");
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <Container className="px-10">
        <div className="row mt-8">
          <CommunityBtnContainer></CommunityBtnContainer>
        </div>

        <div className="row mt-1">
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
