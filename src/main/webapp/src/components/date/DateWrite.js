import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../main/Header";
import Footer from "../main/Footer";
import Container from "react-bootstrap/esm/Container";
import TableCss from "../../css/date/dateWrite.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dogsBreedObject from "../login/join/dogsBreeds";
import { UserContext } from "../../contexts/UserContext";

const DateWrite = () => {
  const { user } = useContext(UserContext); // 유저 컨텍스트
  const { id } = user;

  //애견종선택에서 영어로 글자 들어오는것 한글로변경 - 지안1201-----------------------
  const getKoreanBreedName = (englishBreedName) => {
    const breed = dogsBreedObject.find((b) => b.value === englishBreedName);
    return breed ? breed.text : englishBreedName; // 만약 매핑되는 한글 이름이 없다면 영어 이름을 반환
  };

  //--------------------------------------------------------------------------------

  //글 등록 정보
  const [matchingDTO2, setMatchingDTO2] = useState({
    userId: "",
    title: "",
    content: "",
    dogName: "",
    dogAge: "",
    dogGender: "",
    isNeutralized: "",
    dogBreed: "",
    date: "", // 날짜 형식에 맞게 수정
    matchingState: "매칭대기",
    matchingAddress: "",
    matchingPurpose: "",
    averageScore: "",
    communityScore: "",
    hit: 0,
  });

  //애견 정보
  const [dogsDTO, setDogsDTO] = useState({
    id: "",
    dogName: "",
    dogAge: "",
    dogGender: "",
    dogsBreed: "",
    isNeutralized: "",
    image: "",
    score: "",
    owner: "",
  });

  const { title: dtoTitle, content } = matchingDTO2;
  const { dogName, dogAge, dogGender, dogsBreed, isNeutralized } = dogsDTO;

  const [dogsInfo, setDogsInfo] = useState([]);

  const [seq, setSeq] = useState(-1);
  const [selectDogName, setSelectDogName] = useState("애견 선택");
  const [purposeSelect, setPurposeSelect] = useState("글 분류");
  const [dogBreedSelect, setdogBreedSelect] = useState("애견 종 선택");
  const [daySelect, setDaySelect] = useState("날짜 선택");
  const [nowDate, setNowDate] = useState("날짜 선택");
  const [matchingAddress, setMatchingAddress] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [value, onChange] = useState(new Date());
  const moment = require("moment");

  //유효성 검사
  const [titleDiv, setTitleDiv] = useState("");
  const [matchingPurposeDiv, setMatchingPurposeDiv] = useState("");
  const [selectDogDiv, setSelectDogDiv] = useState("");
  const [daySelectDiv, setDaySelectDiv] = useState("");
  const [matchingAddressDiv, setMatchingAddressDiv] = useState("");
  const [contentDiv, setContentDiv] = useState("");

  //지안1201
  // useEffect(() => {
  //   setDogsInfo(() => ({
  //     ...dogsInfo,
  //     dogBreed: getKoreanBreedName(dogsInfo.dogBreed),
  //   }));
  // }, [setDogsInfo]);

  useEffect(() => {
    setDaySelect(nowDate);

    setMatchingDTO2((prevMatchingDTO2) => ({
      ...prevMatchingDTO2,
      date: nowDate,
    }));
  }, [nowDate]);

  const [swNum, setSwNum] = useState(0);

  useEffect(() => {
    console.log("SwNum:", swNum);
  }, [swNum]);

  //유저와 개정보를 받아옴---------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // id 값이 존재하는 경우에만 요청 보냄
          const res = await axios.get(
            `https://java.flirdog.store/date/getDogsInfoWithUserId?id=${id}`
          );
          const userRes = await axios.get(
            `https://java.flirdog.store/date/getUser?id=${id}`
          );

          console.log(res.data);
          console.log(userRes.data);
          console.log(id);

          setDogsInfo(res.data);

          setMatchingDTO2((prevMatchingDTO2) => ({
            ...prevMatchingDTO2,
            userId: userRes.data.id,
            communityScore: userRes.data.communityScore,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (dogsInfo.length > 0 && swNum === 1) {
      const data = dogsInfo[seq];

      setDogsDTO((prevDogsDTO) => ({
        ...prevDogsDTO,
        id: data.id,
        dogName: data.name,
        dogAge: data.age,
        dogGender: data.gender,
        dogsBreed: data.dogsBreed,
        isNeutralized: data.isNeutralized,
        image: data.image,
        score: data.score,
      }));

      setMatchingDTO2((prevMatchingDTO2) => ({
        ...prevMatchingDTO2,
        dogName: data.name,
        dogAge: data.age,
        dogGender: data.gender,
        dogBreed: data.dogsBreed,
        isNeutralized: data.isNeutralized,
        image: data.image,
        averageScore: data.score.averageScore,
      }));
    }
  }, [seq, dogsInfo, swNum]);

  //입력
  const onInput = (e) => {
    const { name, value } = e.target;

    setDogsDTO({ ...dogsDTO, [name]: value });

    setMatchingDTO2((prevMatchingDTO2) => ({
      ...prevMatchingDTO2,
      [name]: value,
    }));

    console.log("matchingDTO2:", matchingDTO2);
  };

  useEffect(() => {
    console.log("matchingDTO2:", matchingDTO2);
  }, [matchingDTO2]);

  const onInputMatchingAddress = (e) => {
    setMatchingAddress(e.target.value);
  };

  const navigate = useNavigate();

  const handlePurposeSelect = (purpose) => {
    setPurposeSelect(purpose);

    setMatchingDTO2({
      ...matchingDTO2,
      matchingPurpose: purpose,
    });
  };

  const handlePetSelect = (index) => {
    console.log("Selected Dog Index:", index);
    setSwNum(1);
    setSeq(index);

    // 해당 개의 이름 가져오기
    const selectedDogName = dogsInfo[index]?.name || "";
    const selectedDogBreed = dogsInfo[index]?.dogsBreed || "";
    const selectedDogBreedKorean = getKoreanBreedName(selectedDogBreed);
    setSelectDogName(selectedDogName);
    setdogBreedSelect(selectedDogBreedKorean);
  };

  // 등록된 애견이 있는지 여부를 확인
  const hasDogsInfo = dogsInfo.length > 0;

  // 드롭다운 아이템 생성
  const dropdownItems = hasDogsInfo ? (
    dogsInfo.map((dog, index) => (
      <Dropdown.Item
        key={index}
        onClick={() => handlePetSelect(index)}
        onChange={onInput}
      >
        {dog.name}
      </Dropdown.Item>
    ))
  ) : (
    // 등록된 애견이 없을 때의 처리
    <Dropdown.Item
      onClick={() => {
        alert("등록된 애견이 없습니다. 애견을 등록해주세요");
        // 페이지 이동 등의 처리
        navigate("/mypage/MydogProfile");
      }}
    >
      등록된 애견이 없습니다.
    </Dropdown.Item>
  );

  const handleDogBreedSelect = (selectedBreed) => {
    setdogBreedSelect(selectedBreed);

    setMatchingDTO2({
      ...matchingDTO2,
      dogsBreed: selectedBreed,
    });
  };

  const textareaStyle = {
    resize: "none", // 사용자가 크기를 조절하지 못하도록 설정
  };

  const handleSearchButtonClick = (event) => {
    // 검색 버튼 클릭 시에 실행되는 로직
    handleAddressSelection(matchingAddress);
    setButtonClicked(true);
  };

  const handleAddressSelection = (matchingAddress) => {
    setMatchingAddress(matchingAddress);

    setMatchingDTO2({
      ...matchingDTO2,
      matchingAddress: matchingAddress,
    });

    console.log("주소:", matchingDTO2.matchingAddress);
  };

  //사진 등록관련
  const imgRef = useRef();

  const [imgList, setImgList] = useState([]); //배열은 []
  const [imgFiles, setImgFiles] = useState("");

  const onCamera = () => {
    imgRef.current.click();
  };

  const onImgInput = (e) => {
    const imgfiles = Array.from(e.target.files);
    var imgArray = [];

    imgfiles.map((item) => {
      const objectURL = URL.createObjectURL(item);
      imgArray.push(objectURL);
      return imgArray;
    });

    setImgList(imgArray); //카메라 아이콘을 누르면 이미지 미리보기 용도
    setImgFiles(imgfiles);
  };

  const onUploadSubmit = (e) => {
    e.preventDefault();

    var sw = 1;

    if (matchingDTO2.title === "") {
      setTitleDiv(<div style={{ color: "red" }}>제목을 입력해주세요.</div>);
      sw = 0;
    }
    if (matchingDTO2.matchingPurpose === "") {
      setMatchingPurposeDiv(
        <div style={{ color: "red" }}>글 분류를 선택해주세요.</div>
      );
      sw = 0;
    }
    if (selectDogName === "애견 선택") {
      setSelectDogDiv(<div style={{ color: "red" }}>애견을 선택해주세요.</div>);
      sw = 0;
    }

    if (matchingDTO2.date === "날짜 선택") {
      setDaySelectDiv(<div style={{ color: "red" }}>날짜를 선택해주세요.</div>);
      sw = 0;
    }

    if (matchingDTO2.matchingAddress === "") {
      setMatchingAddressDiv(
        <div style={{ color: "red" }}>만남 장소를 입력해주세요.</div>
      );
      sw = 0;
    }

    if (matchingDTO2.content === "") {
      setContentDiv(
        <div style={{ color: "red" }}>상세 내용을 입력해주세요.</div>
      );
      sw = 0;
    }

    if (sw === 0) {
      Swal.fire({
        icon: "error",
        title: "글 등록 실패!",
        text: "필수 항목들을 입력하세요!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (sw === 1) {
      console.log("matchingDTO2:", matchingDTO2);

      const formData = new FormData();
      formData.append(
        "matchingDTO2",
        new Blob([JSON.stringify(matchingDTO2)], { type: "application/json" })
      );

      for (var i = 0; i < imgFiles.length; i++) {
        formData.append("imgFiles", imgFiles[i]);
      }
      if (imgFiles.length === 0) {
        formData.append("imgFiles", new File([], ""));
      }

      // Content-Type을 명시적으로 설정
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // 서버로 POST 요청 보내기
      axios
        .post(`/date/dateWriteTest`, formData, config)
        .then((response) => {
          console.log("서버 응답:", response.data);
          Swal.fire({
            icon: "success",
            title: "글 등록 성공!",
            text: "매칭 글이 등록되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/date/dateList");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "글 등록 실패!",
            text: "매칭 글 등록에 실패했습니다.",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  const onBack = () => {
    window.scrollTo(0, 0);
    navigate("/date/dateList");
  };

  return (
    <div>
      <Header></Header>
      <div>
        <Container>
          <div className={TableCss.DateTitle}>
            <div className={TableCss.DateTitleDiv}>매칭 글 작성</div>
          </div>
        </Container>
      </div>
      <hr className={TableCss.dateHr} />

      <Container>
        <div className={TableCss.formTable}>
          <div className={TableCss.formTableDiv}>
            <Form>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="formGridTitle">
                  <div
                    className={TableCss.FormTitleDiv}
                    style={{ marginBottom: "10px" }}
                  >
                    <div className={TableCss.FormTitleNameDiv}>제 목</div>
                    &nbsp;&nbsp;&nbsp;
                    <Form.Control
                      className={TableCss.FormSubjectTitleInput}
                      size="lg"
                      type="text"
                      name="title"
                      value={dtoTitle || ""}
                      onChange={onInput}
                      placeholder="제목을 입력해주세요. (20자 이내)"
                    />
                    &nbsp;&nbsp;&nbsp;
                  </div>
                  <div id="titleDiv">{titleDiv} </div>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTitle">
                  <div className={TableCss.FormTitleDiv}>
                    <div className={TableCss.FormTitleNameDiv}>애견 선택</div>
                    &nbsp;&nbsp;&nbsp;
                    <Dropdown>
                      <Dropdown.Toggle
                        className={TableCss.filterDropdownBtn}
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          border: "5px solid #F56084",
                          backgroundColor: "white",
                          color: "#F56084",
                          fontWeight: "bold",
                          fontSize: "1.3em",
                          borderRadius: "10px",
                        }}
                      >
                        {selectDogName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu scrollContainer"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        {dropdownItems || ""}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>{selectDogDiv}</div>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCheckPurpose">
                  <div className={TableCss.FormTitleDiv}>
                    <div className={TableCss.FormTitleNameDiv}>글 분류</div>
                    &nbsp;&nbsp;&nbsp;
                    <Dropdown>
                      <Dropdown.Toggle
                        className={TableCss.filterDropdownBtn}
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          border: "5px solid #F56084",
                          backgroundColor: "white",
                          color: "#F56084",
                          fontWeight: "bold",
                          fontSize: "1.3em",
                          borderRadius: "10px",
                        }}
                      >
                        {purposeSelect}
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu scrollContainer"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => handlePurposeSelect("연애")}
                        >
                          연 애
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={() => handlePurposeSelect("산책")}
                        >
                          산 책
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>{matchingPurposeDiv}</div>
                </Form.Group>

                <Form.Group as={Col} controlId="formDogName">
                  <div className={TableCss.FormTitleDiv}>
                    <div className={TableCss.FormTitleNameDiv}>애견 이름</div>
                    &nbsp;&nbsp;&nbsp;
                    <Form.Control
                      className={TableCss.FormTitleInput}
                      size="lg"
                      type="text"
                      name="dogName"
                      value={dogName || ""}
                      onChange={onInput}
                      placeholder="애견 이름 입력"
                    />
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </Form.Group>

                <Form.Group as={Col} controlId="formDogGender">
                  <div className={TableCss.FormTitleDiv}>
                    <div className={TableCss.FormTitleNameDiv}>성 별</div>
                    &nbsp;&nbsp;&nbsp;
                    <div className={`d-flex justify-content-left`}>
                      <input
                        id="genderBox1"
                        type="radio"
                        name="dogGender"
                        value={dogGender || ""}
                        onChange={onInput}
                        checked={dogGender === "Male" || "male"}
                      />
                      <label
                        className={TableCss.labelClass1}
                        htmlFor="genderBox1"
                      >
                        남 아
                      </label>
                      &nbsp;&nbsp;
                      <input
                        id="genderBox2"
                        type="radio"
                        name="dogGender"
                        value={dogGender || ""}
                        onChange={onInput}
                        checked={dogGender === "Female" || "Female"}
                      />
                      <label
                        className={TableCss.labelClass2}
                        htmlFor="genderBox2"
                      >
                        여 아
                      </label>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formDogAge">
                  <div className={TableCss.FormTitleDiv}>
                    <div className={TableCss.FormTitleNameDiv}>나 이</div>
                    &nbsp;&nbsp;&nbsp;
                    <Form.Control
                      className={TableCss.FormTitleInput}
                      size="lg"
                      type="text"
                      name="dogAge"
                      value={dogAge || ""}
                      onChange={onInput}
                      placeholder="나이 입력"
                    />
                  </div>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <div className={TableCss.FormTitleDiv}>
                    <div
                      className={TableCss.FormTitleNameDiv}
                      style={{ fontSize: "1em" }}
                    >
                      중성화 여부
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div className={`d-flex justify-content-left`}>
                      <input
                        id="neutralizationBox"
                        type="checkbox"
                        value={isNeutralized || ""}
                        onChange={onInput}
                        checked={isNeutralized}
                      />
                      <label
                        className={`${TableCss.neutralizationLabel} ${TableCss.labelClass3}`}
                        htmlFor="neutralizationBox"
                      ></label>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCheckPurpose">
                  <div className={TableCss.FormTitleDiv}>
                    <div
                      className={TableCss.FormTitleNameDiv}
                      style={{ fontSize: "1em" }}
                    >
                      애견종 선택
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <Dropdown>
                      <Dropdown.Toggle
                        className={TableCss.filterDropdownBtn}
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          border: "5px solid #F56084",
                          backgroundColor: "white",
                          color: "#F56084",
                          fontWeight: "bold",
                          borderRadius: "10px",
                        }}
                      >
                        {dogBreedSelect}
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu scrollContainer"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          요크셔테리어
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          리트리버
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-3"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          비숑
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-4"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          푸들
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-5"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          포메리안
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-6"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          허스키
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-7"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          치와와
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-8"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          닥스훈트
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-5"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          말티즈
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-6"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          비글
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-7"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          시츄
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-8"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          웰시코기
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-5"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          진돗개
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-6"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          보더콜리
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-7"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          섀퍼드
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-8"
                          onClick={() => handleDogBreedSelect(dogsBreed || "")}
                          onChange={onInput}
                        >
                          코커스패니얼
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formMatchingDate">
                  <div className={TableCss.FormTitleDiv}>
                    <div className={TableCss.FormTitleNameDiv}>매칭 날짜</div>
                    &nbsp;&nbsp;&nbsp;
                    <Dropdown>
                      <Dropdown.Toggle
                        className={TableCss.dayDropdownBtn}
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          width: "200px",
                          border: "5px solid #F56084",
                          backgroundColor: "white",
                          color: "#F56084",
                          fontWeight: "bold",
                          borderRadius: "10px",
                        }}
                      >
                        {daySelect}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu scrollContainer">
                        <Dropdown.Item href="#/action-1">
                          <Calendar
                            onChange={(e) => {
                              onChange();
                              setNowDate(moment(e).format("YYYY년 MM월 DD일"));
                            }}
                            value={value || ""}
                          />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>{daySelectDiv}</div>
                </Form.Group>
                <Form.Group as={Col} controlId="formMatchingNull"></Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formMatchingAddress">
                  <div className={TableCss.FormTitleDiv}>
                    <div className={TableCss.FormTitleNameDiv}>만남 장소</div>
                    &nbsp;&nbsp;&nbsp;
                    <div
                      style={{
                        width: "35%",
                      }}
                    >
                      <Form.Control
                        className={TableCss.FormAddressInput}
                        size="lg"
                        type="text"
                        value={matchingAddress || ""}
                        onChange={onInputMatchingAddress}
                        placeholder="주소 및 검색어 입력"
                      />
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      variant="primary"
                      style={{
                        borderColor: "#F56084",
                        fontWeight: "bold",
                        fontSize: "1.3em",
                        backgroundColor: "#F56084",
                        borderRadius: "10px",
                        width: "100px",
                      }}
                      onClick={handleSearchButtonClick}
                    >
                      검 색
                    </Button>
                  </div>
                  {buttonClicked && (
                    <div style={{ marginTop: "18px" }}>
                      <KakaoMap
                        matchingAddress={matchingAddress || ""}
                        onAddressSelected={handleAddressSelection}
                      ></KakaoMap>
                    </div>
                  )}
                  <div>{matchingAddressDiv}</div>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formUploadimage">
                  <div
                    className={TableCss.FormTitleDiv}
                    style={{
                      color: "gray",
                    }}
                  >
                    <div className={TableCss.FormTitleNameDiv}>사 진</div>
                    &nbsp;&nbsp;&nbsp; 사진 버튼클릭!
                    <img
                      src="/image/date/camera.jpg"
                      alt="카메라"
                      onClick={onCamera}
                      style={{
                        width: 70,
                        height: 50,
                        borderRadius: 20,
                        cursor: "pointer",
                      }}
                    />
                    <input
                      type="file"
                      name="img[]"
                      multiple="multiple"
                      onChange={onImgInput}
                      //setImgFiles={setImgFiles}
                      ref={imgRef}
                      style={{ visibility: "hidden" }}
                    />
                  </div>
                  <div
                    style={{
                      border: "5px solid #F56084",
                      marginTop: "20px",
                      borderRadius: "10px",
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {imgList.length === 0 && (
                      <div>
                        <span style={{ color: "gray", textAlign: "center" }}>
                          이미지 미리보기
                        </span>
                      </div>
                    )}
                    <div>
                      {imgList.map((item, index) => (
                        <img
                          key={index}
                          src={item}
                          alt=""
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "5px",
                            margin: "5px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formContent">
                  <div className={TableCss.FormTitleDiv}>
                    <div
                      className={TableCss.FormTitleNameDiv}
                      style={{ marginBottom: "18px" }}
                    >
                      상세 내용
                    </div>
                  </div>
                  <Form.Control
                    as="textarea"
                    rows={20}
                    style={textareaStyle}
                    name="content"
                    value={content || ""}
                    onChange={onInput}
                  />
                  <div>{contentDiv}</div>
                </Form.Group>
              </Row>
              <Button
                variant="primary"
                type="submit"
                style={{
                  borderColor: "#F56084",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                  backgroundColor: "#F56084",
                  borderRadius: "10px",
                  width: "100px",
                }}
                onClick={onUploadSubmit}
              >
                글 등록
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                style={{
                  borderColor: "#F56084",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                  backgroundColor: "#F56084",
                  borderRadius: "10px",
                  width: "100px",
                }}
                onClick={onBack}
              >
                뒤로
              </Button>
            </Form>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default DateWrite;
