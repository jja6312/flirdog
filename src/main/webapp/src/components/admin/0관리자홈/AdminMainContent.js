import React, { useState } from "react";
import rightContent from "../../../css/admin/rightContent.module.css";
import styles from "../../../css/admin/adminMainContent.module.css";
import AiSupportList from "./AiSupportList";
import Banner from "./Banner";
import AiOutput from "./AiOutput";
import { Alert } from "react-bootstrap";
import ChatAi from "./ChatAi";
import axios from "axios";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,

  CategoryScale
);

//------------신규 회원 지역 분포 ----------------
const locationOfUserData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

///--------------맻이 대기 및 성사 상태--------------------
const labels = ["January", "February", "March", "April", "May", "June", "July"];
const matchingState = {
  labels,
  datasets: [
    {
      label: "매칭 완료 비율",
      data: [60, 60, 70, 60, 80, 87, 90],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

//---------------------------------

//-----------애견 성별에 따른 매칭 건수----------
const MatchingOfdogSex = {
  labels,
  datasets: [
    {
      label: "여아",
      data: [6, 10, 125, 23, 69, 679, 234],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "남아",
      data: [5, 12, 80, 120, 190, 490, 679],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "중성견",
      data: [50, 120, 250, 258, 897, 4920, 5500],
      borderColor: "rgb(87, 255, 87)",
      backgroundColor: "rgb(87, 255, 87)",
    },
  ],
};
//---------------------------------

//-----지역별 강아지 종류 분포---------------
const dogLocationData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
//---------------------------------

const AdminMainContent = () => {
  const [aiDogProfileImgUrl, setAiDogProfileImgUrl] = useState("");
  const [AiImageInputText, setAiImageInputText] = useState("");
  const [isContent, setIsContent] = useState(false);

  return (
    <>
      <div className={` d-flex justify-content-start flex-column`}>
        <div
          className={`${rightContent.rightContent} d-flex justify-content-start`}
        >
          <div
            className={`${rightContent.dataBoxContainer} m-2 d-flex flex-column`}
          >
            <div className={`d-flex justify-content-center align-items-center`}>
              신규 회원 지역 분포
            </div>
            <div
              className={`${rightContent.dataBox} d-flex justify-content-center align-items-center`}
            >
              <Pie data={locationOfUserData} />
            </div>
          </div>
          <div
            className={`${rightContent.dataBoxContainer} m-2 d-flex flex-column`}
          >
            <div className={`d-flex justify-content-center align-items-center`}>
              지역별 강아지 종류 분포
            </div>
            <div
              className={`${rightContent.dataBox} d-flex justify-content-center align-items-center`}
            >
              <Doughnut data={dogLocationData} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`${rightContent.rightContent2} d-flex justify-content-start`}
        >
          <div
            className={`${rightContent.dataBoxContainer} m-2 d-flex flex-column`}
          >
            <div className={`d-flex justify-content-center align-items-center`}>
              애견 성별에 따른 매칭 등록 건수
            </div>
            <div
              className={`${rightContent.dataBox} d-flex justify-content-center align-items-center`}
            >
              <Line data={MatchingOfdogSex} />
            </div>
          </div>
          <div
            className={`${rightContent.dataBoxContainer} m-2 d-flex flex-column`}
          >
            <div className={`d-flex justify-content-center align-items-center`}>
              매칭 완료 비율
            </div>
            <div
              className={`${rightContent.dataBox} d-flex justify-content-center align-items-center`}
            >
              <Bar data={matchingState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMainContent;

//--아래는 ai관리자 페이지를 시도하려했으나 시간상 생략한부분.
{
  /* <div className="d-flex flex-column justify-content-start">
          <img
            alt=""
            className={styles.mainBanner}
            src="/image/admin/openaiAutoMain.png"
          />

          <p
            className={`${rightContent.title}`}
            // onClick={testGo}
          >
            Ai 관리자 컨설팅 메뉴
          </p>

          <div className={` d-flex jsutify-content-between algin-items-center`}>
            <div
              className={`${styles.leftContainer} d-flex jsutify-content-center algin-items-center`}
            ></div>
          </div>

          <div className=" d-flex justify-content-start">
            <div className={`${styles.leftContainer}`}>
              <div>
                <div className="d-flex flex-column align-items-center">
                  <div className={`${styles.aiContents} ${styles.col12M1}`}>
                    <AiSupportList
                      subTitle="ai로 세부 작업을 제안합니다."
                      title="To Do List"
                    ></AiSupportList>
                  </div>

                  <div
                    className={`${styles.aiContentsContainer} d-flex justify-content-between align-items-center`}
                  >
                    <div className={`${styles.aiContents} ${styles.col4M1}`}>
                      <AiSupportList
                        subTitle="ai가 판단한"
                        title="현재 사업 단계"
                      ></AiSupportList>
                    </div>
                    <div className={`${styles.aiContents} ${styles.col4M1}`}>
                      <AiSupportList
                        subTitle="ai 추천"
                        title="사업 단계별 확장사업 추천"
                      ></AiSupportList>
                    </div>
                    <div className={`${styles.aiContents} ${styles.col4M1}`}>
                      {" "}
                      <AiSupportList
                        subTitle="ai 추천"
                        title="확장사업별 세부작업 추천"
                      ></AiSupportList>
                    </div>
                  </div>
                  <div
                    className={`${styles.aiOutput} ${styles.col12M1} d-flex justify-content-center align-items-center`}
                  >
                    <div
                      className={`d-flex justify-content-center align-items-center flex-column`}
                    >
                      {isContent ? (
                        <AiOutput aiDogProfileImgUrl={aiDogProfileImgUrl} />
                      ) : (
                        <>
                          <span className={`${styles.aiOutputTextExplain}`}>
                            컨텐츠 표시 화면
                          </span>
                          <span
                            className={`${styles.aiOutputText} ${styles.flicker}`}
                          >
                            I'll save your time.
                          </span>
                        </>
                      )}
                    </div>
                    <div>
                      <div
                        className={`d-flex justify-content-center align-items-start flex-column`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.leftContainerElement} p-3`}></div>
            </div>
            <div
              className={`${styles.rightContainer} d-flex flex-column justify-content-start`}
            >
              <div
                className={`${styles.rightContainerElement} ${styles.relative} mt-2`}
              >
                <Alert variant="warning">
                  메뉴 설명
                  <br></br>
                  1. 화면의 ai 컨설팅들을 통해 사업을 확장하세요.<br></br>2.
                  하단 채팅을 통해 세부 작업을 제안받으세요.{" "}
                </Alert>

                <div
                  className={`${styles.closeAd} d-flex justify-content-center align-items-center`}
                >
                  광고제거
                </div>
                <img
                  alt=""
                  src="/image/admin/aiAdminAdBanner.png"
                  style={{ width: "100%" }}
                ></img>
              </div>
              <div className={`${styles.rightContainerElement} mt-2`}>
                <Banner
                  imgSrc1="/image/admin/aiAdminAdBanner2.png"
                  imgSrc2="/image/admin/aiAdminAdBanner2.png"
                ></Banner>
              </div>
              <div className={`${styles.rightContainerElement} mt-2`}>
                <Banner
                  imgSrc1="/image/admin/aiAdminAdBanner3.png"
                  imgSrc2="/image/admin/aiAdminAdBanner3.png"
                ></Banner>
              </div>
            </div>
          </div>
          <ChatAi
            AiImageInputText={AiImageInputText}
            setAiImageInputText={setAiImageInputText}
          ></ChatAi>

          <div style={{ height: "300px" }}></div>
        </div> */
}
