import React from "react";
import Header from "../main/Header";
import Footer from "../main/Footer";
import { Container } from "react-bootstrap";
import ReadMoreCSS from "../../css/date/dateReadMore.module.css";
import { useNavigate } from "react-router-dom";
//import Dropdown from 'react-bootstrap/Dropdown';
import Button from "react-bootstrap/Button";

const DateReadMore = () => {
  const navigate = useNavigate();

  // const textareaStyle = {
  //   resize: 'none', // 사용자가 크기를 조절하지 못하도록 설정
  // };

  //사진 등록관련

  // const [userUploadDTO, setUserUploadDTO] = useState({
  //     imageName: '',
  //     imageContent: '',
  //     imageFileName: '',
  //     imageOriginalName:'',
  // }) //객체는 {}
  // console.log(userUploadDTO)
  // setUserUploadDTO()

  //const { imageName, imageContent, imageFileName, imageOriginalName } = userUploadDTO

  // const [imgList, setImgList] = useState([]) //배열은 []
  // console.log(imgList)
  // const [files, setFiles] = useState('')

  const onUploadSubmit = (e) => {
    e.preventDefault();

    navigate("/date/dateList");
  };

  const goDateUpdate = () => {
    window.scrollTo(0, 0);
    navigate("/date/dateUpdate");
  };

  const onBack = () => {
    window.scrollTo(0, 0);
    navigate("/date/dateList");
  };

  return (
    <div>
      {/* 헤더 */}
      <Header></Header>
      {/* 내용 */}
      <Container>
        <div className={ReadMoreCSS.ReadMoreTitle}>
          <div className={ReadMoreCSS.ReadMoreTitleDiv}>매칭 글 상세보기</div>
          &nbsp;&nbsp;&nbsp;
          <div
            style={{
              marginTop: "20px",
              width: "50%",
              height: "70px",
              border: "10px solid #F56084",
              borderRadius: "10px",
              marginLeft: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5em",
              }}
            >
              제목이다 이자시가
            </div>
          </div>
        </div>
      </Container>

      <hr className={ReadMoreCSS.dateHr} />

      <Container>
        <div className={ReadMoreCSS.formTable}>
          <div className={ReadMoreCSS.formTableDiv}>
            <div style={{}}>
              <div className={ReadMoreCSS.ReadMoreHeader}>
                <div
                  style={{
                    marginLeft: "5%",
                    height: "40px",
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    fontSize: "1.3em",
                  }}
                >
                  <span>작성자 : 인풋빌런</span>
                </div>
                <div
                  style={{
                    height: "40px",
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    fontSize: "1.3em",
                  }}
                >
                  <span>작성일 : 2023.11.13</span>
                </div>
                <div
                  style={{
                    marginRight: "5%",
                    height: "40px",
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    fontSize: "1.3em",
                  }}
                >
                  <span>조회수 : 6000</span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "2%",
              }}
            >
              <div className={ReadMoreCSS.CarouselDiv}>
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="/image/date/starDog1.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/image/date/starDog1.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="/image/date/starDog1.jpg"
                        className="d-block w-100"
                        alt="..."
                        style={{ borderRadius: "20px" }}
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              <div className={ReadMoreCSS.dogScore}>
                <div
                  className={ReadMoreCSS.filterDateContent}
                  style={{ height: "100%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "400px",
                      width: "300px",
                      backgroundColor: "white",
                      marginLeft: "20px",
                      borderRadius: "10px",
                      padding: "2.5%",
                      border: "10px solid pink",
                    }}
                  >
                    <div className={ReadMoreCSS.filterDateContentDogname}>
                      강아지 이름
                    </div>
                    <div className={ReadMoreCSS.filterDateContentDogBreed}>
                      강아지 종
                    </div>
                    <div className={ReadMoreCSS.filterDateContentSiteScore}>
                      <img src="/image/main/likeBone.png" width={20} alt="별" />
                      커뮤니티 활동점수
                    </div>
                    <div className={ReadMoreCSS.matchingState}>
                      <div>매칭상태 : 기다림</div>
                    </div>
                    <div className={ReadMoreCSS.listStarScore}>
                      <div
                        style={{
                          fontWeight: "bold",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((index) => (
                          <img
                            key={index}
                            src="/image/date/starScore.png"
                            width={25}
                            alt="별"
                            style={{ marginRight: index === 5 ? "0" : "10px" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="goDateUpdate"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginLeft: "10px",
                  }}
                >
                  <Button
                    variant="primary"
                    style={{
                      borderColor: "#F56084",
                      fontWeight: "bold",
                      fontSize: "1.5em",
                      backgroundColor: "#F56084",
                      borderRadius: "10px",
                      width: "300px",
                      marginTop: "20px",
                      height: "50px",
                    }}
                    onClick={goDateUpdate}
                  >
                    글 수정
                  </Button>
                </div>
              </div>
            </div>
            <div
              style={{
                color: "black",
                backgroundColor: "pink",
                padding: "1%",
                borderRadius: "10px",
                margin: "1.5%",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  padding: "1%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    fontSize: "1.3em",
                    padding: "2%",
                    fontWeight: "bold",
                    borderRadius: "10px",
                  }}
                >
                  나 이&nbsp;&nbsp;&nbsp;
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "10px",
                      width: "25%",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div>2살</div>
                  </div>
                  &nbsp;&nbsp;&nbsp; 성 별&nbsp;&nbsp;&nbsp;
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "10px",
                      width: "25%",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div>남 아</div>
                  </div>
                  &nbsp;&nbsp;&nbsp; 멍BTI&nbsp;&nbsp;&nbsp;
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "10px",
                      width: "25%",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div>ISFJ</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    fontSize: "1.3em",
                    padding: "2%",
                    fontWeight: "bold",
                  }}
                >
                  중성화&nbsp;&nbsp;&nbsp;
                  <div
                    className={`${ReadMoreCSS.neutralizationCheckBox} d-flex justify-content-left`}
                  >
                    <input id="checkbox5" type="checkbox" value="중성화" />
                    <label
                      className={`${ReadMoreCSS.neutralizationLabel} ${ReadMoreCSS.labelClass}`}
                      htmlFor="checkbox5"
                    ></label>
                  </div>
                  &nbsp;&nbsp;&nbsp; 만남장소&nbsp;&nbsp;&nbsp;
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "10px",
                      width: "50%",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div>강남역 12번출구 비트캠프</div>
                  </div>
                  &nbsp;&nbsp;&nbsp; 날 짜&nbsp;&nbsp;&nbsp;
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "10px",
                      width: "20%",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div>23년 11월 25일</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      border: "5px solid pink",
                      borderRadius: "20px",
                      padding: "1%",
                      width: "90%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.3em" }}>쏼라쏼라쏼라</div>
                    <div style={{ fontSize: "1.3em" }}>
                      가나다라마바사아자차카타파하
                    </div>
                    <div style={{ fontSize: "1.3em" }}>
                      아야어여오요우유으이
                    </div>
                    <div style={{ fontSize: "1.3em" }}>
                      abcdefghijklmnopqrstuvwxyz
                    </div>
                    <div style={{ fontSize: "1.3em" }}>wqr</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                paddingBottom: "2%",
              }}
            >
              <Button
                variant="primary"
                type="submit"
                style={{
                  borderColor: "#F56084",
                  fontWeight: "bold",
                  fontSize: "1.5em",
                  backgroundColor: "#F56084",
                  borderRadius: "10px",
                  width: "40%",
                  marginRight: "5%",
                  height: "70px",
                }}
                onClick={onUploadSubmit}
              >
                <img
                  src="/image/date/chat.png"
                  alt="chat"
                  style={{ width: 50, height: 50 }}
                />
                &nbsp;&nbsp;플러팅 하러가기&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>

              <Button
                style={{
                  borderColor: "lightgray",
                  fontWeight: "bold",
                  fontSize: "1.5em",
                  backgroundColor: "lightgray",
                  borderRadius: "10px",
                  width: "40%",
                  height: "70px",
                }}
                onClick={onBack}
              >
                <img
                  src="/image/date/text.png"
                  alt="text"
                  style={{ width: 50, height: 50 }}
                />
                &nbsp;&nbsp;목록으로&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
            </div>
          </div>
        </div>
      </Container>
      {/* 푸터 */}
      <Footer></Footer>
    </div>
  );
};

export default DateReadMore;
