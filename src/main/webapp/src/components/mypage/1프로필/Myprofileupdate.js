import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Mypage from "../../../css/main/100마이페이지/mypage.module.css";
import Header from "../../main/Header";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";

const MyprofileUpdate = () => {
  const [userDTO, setUserDTO] = useState({
    id: "1",
    addresses: "Seoul, South Korea",
    communities: "Pet Lovers",
    communityScore: "100",
    dogsinfos: "Golden Retriever, Male, 2 years old",
    matching: "Yes",
    name: "John Doe",
    phone: "",
    passwd: "hashedpassword123",
    point_chargings: "kakaopay",
    popularity: "100",
    userRole: "User",
    nickname: "",
    introduce: "",
    email: "",
    image: "",
    imgageFileName: "",
    point: 0,
    communityScore: 0,
    amount: 0,
  });
  const {
    id,
    nickname,
    introduce,
    email,
    image,
    phone,
    name,
    passwd,
    addresses,
    communities,
    communityScore,
    dogsinfos,
    matching,
    point,
    point_chargings,
    popularity,
    userRole,
    imgageFileName,
    amount,
  } = userDTO;

  const [userObject, setUserObject] = useState({});
  const imgRef = useRef();
  const [imgList, setImgList] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const onInput = (e) => {
    const { name, value } = e.target;

    setUserDTO({
      ...userDTO,
      [name]: value,
    });
  };
  const onCamera = () => {
    imgRef.current.click();
  };

  const onImgInput = (e) => {
    //이미지를 선택하면 실행되는 함수
    const imgFiles = Array.from(e.target.files); //파일을 배열에 담는다.
    var imgArray = []; //임시배열의 변수를 잡아서

    imgFiles.map((item) => {
      const objectUrl = URL.createObjectURL(item);
      imgArray.push(objectUrl);
    }); //map 돌아가는거 안에 차곡차곡 담아라.

    setImgList(imgArray); //카메라 아이콘을 누르면 이미지 미리보기 용도
    setFiles(e.target.files); //formData에 넣어서 서버로(스프링 부트) 보내기 용도
    document.getElementById("imgDel").style.display = "none"; //기존 디폴트 이미지 삭제.
    document.getElementById("imgDel2").style.display = "none"; //기존 디폴트 이미지 삭제.
    document.getElementById("imgDelBefore").style.display = "block"; //새로운 이미지 보이게 하기
    document.getElementById("imgDelBefore2").style.display = "block";
  };

  useEffect(() => {
    // 로컬스토리지에서 유저 아이디 가져오기
    const userJsonString = localStorage.getItem("user");
    const userObject = JSON.parse(userJsonString);
    console.log(userObject);
    setUserObject(userObject);
    const userId = userObject.id;

    axios
      .get(
        `https://java.flirdog.store/mypage/getUserProfileTest?userIdStr=${userId}`
      )
      .then((res) => {
        //alert('성공')
        console.log(res.data);
        setUserDTO(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const onUploadSubmit = async (e) => {
    e.preventDefault();

    console.log(userDTO);

    // 먼저 기존 데이터를 삭제합니다.
    // 삭제가 성공하면 업로드를 진행합니다.

    try {
      // First, delete the existing data
      // await axios.delete(`/mypage/deleteDogInfo?id=${myUserId}`);

      // If deletion is successful, proceed with the upload
      var formData = new FormData();
      formData.append(
        "userDTO",
        new Blob([JSON.stringify(userDTO)], { type: "application/json" })
      );

      Object.values(files).map((item, index) => {
        formData.append("img", item);
      });

      axios.post("/mypage/uploadUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 비동기 방식이어서 순서상관없이 수행이된다. await써서 동기를 깨거나 , 다른 버튼 안에 담아서 수행해야한다.
      //이미지등록 헀을때 alert창 예쁘게 만들어줘
      Swal.fire({
        position: "middle",
        icon: "success",
        title: "수정이 완료되었습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/mypage/MypageMain");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header></Header>
      <Container className="px-10 mt-2">
        {" "}
        {/* 회원 정보 수정 글씨 */}
        <div className="row ">
          <div className="col-lg-4 d-flex justify-content-center"></div>
          <div className="col-lg-4 d-flex justify-content-center">
            <span className={Mypage.PageUpdateLetter}>회원 정보수정</span>
          </div>
          <div className="col-lg-4 d-flex justify-content-center"></div>
        </div>
      </Container>
      <Container className="px-10 mt-6">
        {" "}
        {/* 사진이미지부분 */}
        <Row>
          <Col xs={5} md={4}></Col>
          <Col
            xs={2}
            md={4}
            className={`${Mypage.Imagecenter} d-flex justify-content-center`}
          >
            <div className={Mypage.main_image}>
              {/* <Image id='imgDel' src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_pug_icon_130225.png" roundedCircle className={Mypage.RoundedCircle} style={{border:'1px solid'}} />                             */}
              <Image
                id="imgDel"
                alt={name}
                src={`/storage/${encodeURIComponent(image)}`}
                roundedCircle
                className={Mypage.RoundedCircle}
                style={{ border: "1px solid #ddd" }}
              />
              <h1 id="imgDel2" className={Mypage.main_image_text}>
                이미지를 선택해 주세요.
              </h1>
            </div>
            <div id="imgDelBefore">
              <span id="imgDelBefore2">
                {imgList.map((item, index) => (
                  //  <img key={ index } src={ item } 선생님이 한거 원래/>
                  <Image
                    key={index}
                    src={item}
                    roundedCircle
                    className={Mypage.RoundedCircle}
                  />
                ))}
              </span>
            </div>
          </Col>
          <Col xs={5} md={4}></Col>
        </Row>
        <br />
        <Row>
          <Col xs={5} md={4}></Col>
          <Col xs={2} md={4} className={Mypage.Imagecenter}>
            <Form.Group as={Col} controlId="formUploadimage">
              <div
                className={Mypage.FormTitleDiv}
                style={{
                  color: "gray",
                }}
              >
                <div className={Mypage.FormTitleNameDiv}>사 진</div>
                &nbsp;&nbsp;&nbsp;
                <img
                  src="/image/date/camera.jpg"
                  alt="카메라"
                  onClick={onCamera}
                  style={{ width: 70, height: 50, borderRadius: 20 }}
                />
                <input
                  type="file"
                  name="img[]"
                  multiple="multiple"
                  onChange={onImgInput}
                  ref={imgRef}
                  style={{ visibility: "hidden", width: "10px" }}
                />
              </div>
            </Form.Group>
          </Col>
          <Col xs={5} md={4}></Col>
        </Row>
        <Row>
          <Col xs={5} md={4}></Col>
          <Col xs={2} md={4} className={Mypage.Imagecenter}>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="inputGroup-sizing-default"
                style={{ color: "#f56084" }}
              >
                닉네임
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="nickname"
                value={nickname}
                onChange={onInput}
              />
            </InputGroup>
          </Col>
          <Col xs={5} md={4}></Col>
        </Row>
        <Row>
          <Col xs={5} md={4}></Col>
          <Col xs={2} md={4} className={Mypage.Imagecenter}>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="inputGroup-sizing-default"
                style={{ color: "#f56084" }}
              >
                전화번호
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="phone"
                value={phone}
                onChange={onInput}
              />
            </InputGroup>
          </Col>
          <Col xs={5} md={4}></Col>
        </Row>
        <Row>
          <Col xs={5} md={4}></Col>
          <Col xs={2} md={4} className={Mypage.Imagecenter}>
            <InputGroup className="mb-3">
              <InputGroup.Text
                id="inputGroup-sizing-default"
                style={{ color: "#f56084" }}
              >
                이메일
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                name="email"
                value={email}
                onChange={onInput}
              />
              <span className={Mypage.Space2_logo}>
                <img
                  alt="img"
                  style={{ width: "30px", marginTop: "5px" }}
                  className={Mypage.email}
                  src={getEmailLogo()}
                ></img>
              </span>
            </InputGroup>
          </Col>
          <Col xs={5} md={4}></Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col xs={5} md={4}></Col>
          <Col xs={2} md={4} className={Mypage.Imagecenter}>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="*간단 자기 소개를 입력하세요."
              style={{
                color: "#f56084",
                fontSize: "15px",
                height: "100%",
                width: "100%",
              }}
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100%", width: "100%", fontSize: "15px" }}
                name="introduce"
                value={introduce}
                onChange={onInput}
              />
            </FloatingLabel>
          </Col>
          <Col xs={5} md={4}></Col>
        </Row>
        <div className="row">
          <div className="col-sm-3 d-flex justify-content-center"></div>
          <div className="col-sm-6 d-flex justify-content-center">
            <Button
              variant="outline-danger"
              className={Mypage.Btn4}
              style={{ color: "white" }}
              onClick={onUploadSubmit}
            >
              수정하기
            </Button>
            {""}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3 d-flex justify-content-center"></div>
          <div className="col-sm-6 d-flex justify-content-center">
            <input
              type="hidden"
              name="id"
              value={id}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="passwd"
              value={passwd}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="addresses"
              value={addresses}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="communities"
              value={communities}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="communityScore"
              value={communityScore}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="dogsinfos"
              value={dogsinfos}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="matching"
              value={matching}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="point_chargings"
              value={point_chargings}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="point"
              value={point}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="popularity"
              value={popularity}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="userRole"
              value={userRole}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="imgageFileName"
              value={imgageFileName}
              style={{ width: "50px" }}
            />
            <input
              type="hidden"
              name="amount"
              value={amount}
              style={{ width: "50px" }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyprofileUpdate;
