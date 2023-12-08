import moment from "moment";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Comments from "./Comments";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import CommentsMerge from "./CommentMerge";

const BoastBoardRead = ({ boardDTO, closeModal }) => {
  const { user } = useContext(UserContext); // 유저 컨텍스트
  const { id } = user;
  // 사용 전에 id가 정의되었는지 확인
  if (id) {
    // id를 이용한 컴포넌트 로직 처리
    console.log(id); // ----3
  }

  const [boardNumber, setBoardNumber] = useState(boardDTO.id); // 게시글 번호
  const [getBoardDTO, setGetBoardDTO] = useState([]); // 게시글 DTO

  useEffect(() => {
    // boardDTO의 상세 내용 가져오기
    if (boardDTO && boardDTO.id) {
      axios
        .get(
          `https://java.flirdog.store:8080/boastBoard/getBoastBoard?boardId=${boardDTO.id}`
        )
        .then((res) => {
          console.log(res.data);
          setBoardNumber(res.data.id);
          setGetBoardDTO(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (getBoardDTO.length > 0) {
      console.log("getBoardDTO updated:", getBoardDTO);
    }
  }, [getBoardDTO]);

  const [show, setShow] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [buttonText, setButtonText] = useState("보기");

  const handleClose = () => {
    setShow(false);
    closeModal(); // 모달이 닫힐 때 closeModal을 호출하여 부모 컴포넌트에서 showModal 상태를 false로 업데이트
  };

  const handleButtonClick = () => {
    // 버튼을 클릭할 때마다 상태를 토글
    setShowComments(!showComments);
    // 버튼을 누를 때마다 showModal 상태를 토글
    setShowModal(!showModal);
    setButtonText(showModal ? "보기" : "닫기");
  };

  //이미지가 여러개있는지 확인하고 저장하는 배열
  const [isMoreThanOneImage, setIsMoreThanOneImage] = useState([]);

  // 사진이 여러 개인 경우
  useEffect(() => {
    const handleImagePaths = () => {
      if (getBoardDTO && getBoardDTO.image && getBoardDTO.image.includes(",")) {
        const imagePaths = getBoardDTO.image
          .split(",")
          .map((path) => path.trim());
        setIsMoreThanOneImage(imagePaths);
      } else if (getBoardDTO && getBoardDTO.image) {
        setIsMoreThanOneImage([getBoardDTO.image]);
      }
    };

    handleImagePaths();
  }, [getBoardDTO]);

  useEffect(() => {
    // setIsMoreThanOneImage 의 변동사항을 추적
    if (isMoreThanOneImage.length > 0) {
      console.log("isMoreThanOneImage:", isMoreThanOneImage);
    }
  }, [isMoreThanOneImage]);

  const createdAt = moment(getBoardDTO.createdAt);
  const isToday = createdAt.isSame(new Date(), "day");
  const displayDate = isToday
    ? `${createdAt.format(
        "YYYY. MM. DD"
      )}${"\u00A0\u00A0\u00A0"}${createdAt.format("HH:mm")}`
    : createdAt.format("YYYY. MM. DD");

  const customModalStyle = {
    maxHeight: "830px",
    overflowY: "scroll", // 세로 스크롤 적용
  };

  const boastBoardDelete = () => {
    Swal.fire({
      icon: "error",
      title: "정말 삭제하시겠습니까?",
      text: false,
      showConfirmButton: true,
      showCancelButton: true, // 추가된 옵션
      timer: false,
    }).then((result) => {
      // result.value가 true면 확인 버튼이 눌림, false면 취소 버튼이 눌림
      if (result.value) {
        axios
          .delete(
            `https://java.flirdog.store:8080/boastBoard/getBoastBoardDelete?boardId=${boardDTO.id}`
          )
          .then((res) => {
            console.log(res);

            Swal.fire({
              icon: "success",
              title: "삭제 되었습니다.",
              text: false,
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // 사용자가 취소 버튼을 눌렀을 때 실행할 코드
        // 이 부분은 비워두거나 필요한 작업을 추가하세요.
      }
    });
  };

  return (
    <Modal
      show={true}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      size="lg"
      centered
      style={customModalStyle}
    >
      <Modal.Title
        style={{ fontWeight: "bold", borderBottom: "6px solid #FFC0CB" }}
      >
        <div
          style={{
            padding: "2%",
            fontWeight: "bold",
            color: "#505050",
            paddingBottom: "5px",
          }}
        >
          {getBoardDTO.title}
        </div>
      </Modal.Title>
      <Modal.Body
        style={{
          backgroundColor: "#FFEEEE",
          borderBottom: "6px solid #FFC0CB",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
            fontSize: "1.1em",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#505050" }}>
            {getBoardDTO.userNickName}
          </div>
          <div
            style={{
              paddingRight: "30px",
              fontWeight: "bold",
              color: "#505050",
            }}
          >
            {displayDate}
          </div>
          <div
            style={{
              paddingRight: "30px",
              fontWeight: "bold",
              color: "#505050",
            }}
          >
            조회: {getBoardDTO.hit}
          </div>
        </div>
      </Modal.Body>
      <Modal.Body>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 캐러셀 */}
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
          >
            <div className="carousel-indicators">
              {isMoreThanOneImage.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              <div>
                {isMoreThanOneImage.length === 0 &&
                getBoardDTO.image &&
                !getBoardDTO.image.includes(",") ? (
                  <div key={0} className={`carousel-item active`}>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        width: "700px",
                        height: "470px",
                      }}
                    >
                      <img
                        src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${getBoardDTO.image}`}
                        alt=""
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {isMoreThanOneImage.map((item, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: "700px",
                            height: "470px",
                          }}
                        >
                          <img
                            src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${item}`}
                            alt=""
                            style={{ height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ width: "700px" }}>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
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
                data-bs-target="#carouselExampleDark"
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
        </div>
      </Modal.Body>
      <Modal.Body
        style={{
          borderTop: "2px solid #EEEEEE",
          borderBottom: "2px solid #EEEEEE",
        }}
      >
        <div
          style={{ fontWeight: "bold", color: "#505050", fontSize: "1.3em" }}
        >
          {getBoardDTO.content}
        </div>
      </Modal.Body>
      {/* <div style={{fontWeight:'bold', color:'#505050', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>댓글 ({commentCount})*/}
      {/* 댓글 버튼 */}
      {/*  <Button
                        variant="primary"
                        style={{
                        backgroundColor: '#F56084',
                        borderColor: '#F56084',
                        fontWeight: 'bold',
                        }}
                        onClick={handleButtonClick}>
                        {buttonText}
                    </Button>
                </div> */}
      {/* 댓글 영역 */}
      <Modal.Body style={{ marginLeft: "10px" }}>
        <div>
          {/* 댓글 영역 */}
          {/* <Comments getBoardDTO={getBoardDTO} onInsert={handleInsertComment}/> */}

          <CommentsMerge getBoardDTO={getBoardDTO} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* 글 수정 버튼 렌더링 */}
        {getBoardDTO.userId === id && (
          <Button
            variant="primary"
            style={{
              backgroundColor: "#F56084",
              borderColor: "#F56084",
              fontWeight: "bold",
            }}
          >
            글 수정
          </Button>
        )}
        {/* 글 삭제 버튼 */}
        {getBoardDTO.userId === id && (
          <Button
            variant="primary"
            style={{
              backgroundColor: "#F56084",
              borderColor: "#F56084",
              fontWeight: "bold",
            }}
            onClick={boastBoardDelete}
          >
            글 삭제
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BoastBoardRead;
