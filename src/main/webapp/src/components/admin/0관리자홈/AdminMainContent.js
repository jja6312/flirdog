import React, { useState, useEffect } from "react";
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
import dogsBreed from "../../login/join/dogsBreeds";

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

//---------------------------------

const AdminMainContent = () => {
  const [aiDogProfileImgUrl, setAiDogProfileImgUrl] = useState("");
  const [AiImageInputText, setAiImageInputText] = useState("");
  const [isContent, setIsContent] = useState(false);
  const [address, setAddress] = useState([]);

  const [locationOfUserData, setLocationOfUserData] = useState({
    labels: [
      "서울",
      "부산",
      "대구",
      "인천",
      "광주",
      "대전",
      "울산",
      "세종",
      "경기",
      "강원",
      "충북",
      "충남",
      "전북",
      "전남",
      "경북",
      "경남",
      "제주특별자치도",
    ],
    datasets: [
      {
        label: "인원수",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // 빨간색
          "rgba(54, 162, 235, 0.2)", // 파란색
          "rgba(255, 206, 86, 0.2)", // 노란색
          "rgba(75, 192, 192, 0.2)", // 청록색
          "rgba(153, 102, 255, 0.2)", // 보라색
          "rgba(255, 159, 64, 0.2)", // 주황색
          "rgba(201, 203, 207, 0.2)", // 회색
          "rgba(255, 99, 255, 0.2)", // 분홍색
          "rgba(255, 159, 132, 0.2)", // 살구색
          "rgba(54, 162, 132, 0.2)", // 청록색 변형
          "rgba(255, 206, 175, 0.2)", // 연노랑
          "rgba(75, 192, 255, 0.2)", // 하늘색
          "rgba(153, 102, 132, 0.2)", // 자주색
          "rgba(255, 99, 64, 0.2)", // 다크오렌지
          "rgba(54, 162, 192, 0.2)", // 다크블루
          "rgba(255, 206, 132, 0.2)", // 연주황
          "rgba(75, 192, 132, 0.2)", // 연청록
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 255, 1)",
          "rgba(255, 159, 132, 1)",
          "rgba(54, 162, 132, 1)",
          "rgba(255, 206, 175, 1)",
          "rgba(75, 192, 255, 1)",
          "rgba(153, 102, 132, 1)",
          "rgba(255, 99, 64, 1)",
          "rgba(54, 162, 192, 1)",
          "rgba(255, 206, 132, 1)",
          "rgba(75, 192, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  //-----지역별 강아지 종류 분포---------------
  const [dogsData, setDogsData] = useState({
    labels: dogsBreed.map((breed) => breed.text), // 한글 이름을 라벨로 사용
    datasets: [
      {
        label: "Dog Breed Count",
        data: Array(dogsBreed.length).fill(0), // 데이터 초기화 (각 품종의 개수를 저장할 배열)
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
  });

  //---------------------------------

  //-----------애견 성별에 따른 매칭 건수----------
  const [dogSexData, setDogSexData] = useState({
    labels: [0],
    datasets: [
      {
        label: "여아",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "남아",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "중성견",
        data: [],
        borderColor: "rgb(87, 255, 87)",
        backgroundColor: "rgb(87, 255, 87)",
      },
    ],
  });

  ///--------------매칭 완료 비율--------------------
  const [matchingState, setMatchingState] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "매칭 완료 비율",
        data: [60, 60, 70, 60, 80, 87, 90],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  //------------신규 회원 지역 분포 ----------------

  useEffect(() => {
    axios
      .get("https://java.flirdog.store/admin/getAddress")
      .then((res) => {
        setAddress(res.data);

        const countByCity = res.data.reduce((acc, item) => {
          const city = item.address.split(" ")[0]; // 주소에서 첫 번째 단어(도시)를 추출
          acc[city] = (acc[city] || 0) + 1; // 도시별 카운트
          return acc;
        }, {});

        // 레이블 순서에 맞게 데이터 배열 생성
        const dataForChart = locationOfUserData.labels.map((label) => {
          return label === "전체" ? res.data.length : countByCity[label] || 0;
        });

        // 차트 데이터 업데이트
        setLocationOfUserData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: dataForChart,
            },
          ],
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://java.flirdog.store/admin/getDogList")
      .then((res) => {
        console.log("개품종");
        console.log(res.data);
        const countByBreed = res.data.reduce((acc, item) => {
          const breed = item.dogsBreed; // 강아지 품종 추출
          acc[breed] = (acc[breed] || 0) + 1; // 품종별 카운트
          return acc;
        }, {});

        // 레이블 순서에 맞게 데이터 배열 생성
        const dataForChart = dogsData.labels.map((label) => {
          return countByBreed[label] || 0;
        });

        // 차트 데이터 업데이트
        setDogsData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: dataForChart,
            },
          ],
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("https://java.flirdog.store/admin/getDogList").then((res) => {
      const dogsData = res.data;
      const recentDates = [];

      // 오늘 날짜를 기준으로 과거 7일의 날짜 생성
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        recentDates.push(date.toISOString().split("T")[0]);
      }

      // 날짜별 데이터 초기화
      const dateCounts = recentDates.reduce((acc, date) => {
        acc[date] = { male: 0, female: 0, neutralized: 0 };
        return acc;
      }, {});

      // 날짜별로 각 개의 성별 및 중성화 여부 카운트
      dogsData.forEach((dog) => {
        const date = dog.createdAt.split("T")[0];
        if (recentDates.includes(date)) {
          if (dog.isNeutralized) {
            dateCounts[date].neutralized++;
          } else if (dog.gender === "Male") {
            dateCounts[date].male++;
          } else if (dog.gender === "Female") {
            dateCounts[date].female++;
          }
        }
      });

      setDogSexData((prevData) => ({
        labels: recentDates, // 과거 7일의 날짜를 라벨로 설정 (최신 날짜가 먼저 오도록)
        datasets: [
          {
            ...prevData.datasets[0],
            data: recentDates.map((date) => dateCounts[date].female),
          },
          {
            ...prevData.datasets[1],
            data: recentDates.map((date) => dateCounts[date].male),
          },
          {
            ...prevData.datasets[2],
            data: recentDates.map((date) => dateCounts[date].neutralized),
          },
        ],
      }));

      axios
        .get("https://java.flirdog.store/admin/getMatchingList")
        .then((res) => {
          console.log("매칭리스트");
          console.log(res.data);
          const recentDates = [];

          // 오늘 날짜를 기준으로 과거 7일의 날짜 생성
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            recentDates.push(date.toISOString().split("T")[0]);
          }

          // 날짜별 데이터 초기화
          const dateCounts = recentDates.reduce((acc, date) => {
            acc[date] = { total: 0, completed: 0 };
            return acc;
          }, {});

          // 날짜별로 매칭 완료여부 카운트
          res.data.forEach((item) => {
            const date = item.createdAt.split("T")[0];
            if (recentDates.includes(date)) {
              dateCounts[date].total++;
              if (item.matchingState !== "매칭대기") {
                dateCounts[date].completed++;
              }
            }
          });

          // 매칭 완료 비율 계산
          const completionRates = recentDates.map((date) => {
            const { total, completed } = dateCounts[date];
            return total > 0 ? (completed / total) * 100 : 0;
          });

          setMatchingState((prevData) => ({
            ...prevData,
            labels: recentDates,
            datasets: [
              {
                ...prevData.datasets[0],
                data: completionRates,
              },
            ],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  useEffect(() => {
    console.log("dogSexData");
    console.log(dogSexData);
  }, [dogSexData]);

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
              회원 강아지 종류 분포
            </div>
            <div
              className={`${rightContent.dataBox} d-flex justify-content-center align-items-center`}
            >
              <Doughnut data={dogsData} />
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
              <Line data={dogSexData} />
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
