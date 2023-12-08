import { useContext, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BoastBoardListCss from "../../css/boastBoard/boastBoardList.module.css";
import { UserContext } from '../../contexts/UserContext';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import axios from 'axios';

const BoastBoardWrite = () => {

    const { user } = useContext(UserContext); // 유저 컨텍스트
    const { id } = user;
    // 사용 전에 id가 정의되었는지 확인
    if (id) {
    // id를 이용한 컴포넌트 로직 처리
    console.log(id); // ----3
    }

    //글작성DTO
    const[boardWriteDTO, setBoardWriteDTO] = useState({
        title: "",
        content: "",
        userId: "",
        image: "",
        communityScore: "",
        userNickName:"",
        hit: 0,
        likeScore: 0,
        commentCount: 0,
    });

    useEffect(() => {
        // user 객체가 로드된 후에 실행되는 코드
        if (id) {
          // user 객체가 존재하고 id가 존재하는 경우에만 실행
          setBoardWriteDTO(prevState => ({
            ...prevState,
            userId: id,
          }));
        }
      }, [id]);

    //모달관련
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //유효성 검사
    const [titleDiv, setTitleDiv] = useState("");
    const [contentDiv, setContentDiv] = useState("");
    const [imageDiv, setImageDiv] = useState("");

    //입력
    const onInput = (e) => {
        const { name, value } = e.target;

        setBoardWriteDTO((prevBoardWriteDTO) => ({
        ...prevBoardWriteDTO,
        [name]: value,
    }));

    console.log("boardWriteDTO:", boardWriteDTO);
    };

    const textareaStyle = {
        resize: 'none', // 사용자가 크기를 조절하지 못하도록 설정
        fontSize: '1.3em',
        marginBottom: '2%',
    };
    
    //사진등록
    const imgRef = useRef();
    const [imgFiles, setImgFiles] = useState("");

    const onImgInput = (e) => {
        const imgfiles = Array.from(e.target.files);
        
         // 파일 이름을 설정
        const filenames = imgfiles.map((item) => item.name);
        setBoardWriteDTO((prev) => ({ ...prev, image: filenames.join(', ') }));

        // 이미지 화면에 표시

        // eslint-disable-next-line no-unused-vars
        const imgArray = imgfiles.map((item) => {
            const objectURL = URL.createObjectURL(item);
            return <img key={objectURL} src={objectURL} alt={item.name} />;
        });
    
        setImgFiles(imgfiles);
    };

    //제출
    const onUploadSubmit = (e) => {
        e.preventDefault();

        var sw = 1;

        if (boardWriteDTO.title === "") {
            setTitleDiv(<div style={{ color: "red" }}>제목을 입력해주세요.</div>);
            sw = 0;
        }
        if (boardWriteDTO.content === "") {
            setContentDiv(
            <div style={{ color: "red" }}>상세 내용을 입력해주세요.</div>
            );
            sw = 0;
        }
        if (boardWriteDTO.image === "") {
            setImageDiv(<div style={{ color: "red" }}>이미지를 등록해주세요.</div>);
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
            console.log("boardWriteDTO:", boardWriteDTO);

            const formData = new FormData();
            formData.append(
            "boardWriteDTO",
            new Blob([JSON.stringify(boardWriteDTO)], { type: "application/json" })
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
            .post(`/boastBoard/boastBoardWrite`, formData, config)
            .then((response) => {
                console.log("서버 응답:", response.data);
                Swal.fire({
                icon: "success",
                title: "글 등록 성공!",
                text: "매칭 글이 등록되었습니다.",
                showConfirmButton: false,
                timer: 2000,
                });
                handleClose();
                window.location.reload(); // 새로고침
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


  return (
    <>
        <div style={{
                width: '100px',
                fontWeight: 'bold',
                color: '#404040',
            }}
            onClick={handleShow}>
            <button className={BoastBoardListCss.boardWriteBtn}>
            글 작성</button>
        </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Form>
            <Modal.Title style={{
                fontWeight: 'bold',
            }}>
                <div style={{padding:'2%',}}
                >제 목</div>
            </Modal.Title>
                <Form.Group as={Col} controlId="formGridTitle"
                style={{
                    height: '50px',
                }}>
                  <div className={BoastBoardListCss.FormTitleDiv}
                  style={{ paddingLeft: "2%"}}>
                    <Form.Control
                      className={BoastBoardListCss.FormSubjectTitleInput}
                      size="lg"
                      type="text"
                      name="title"
                      value={boardWriteDTO.title || ""}
                      onChange={onInput}
                      placeholder="제목을 입력해주세요. (20자 이내)"
                    />
                    &nbsp;&nbsp;&nbsp;
                  </div>
                  <div id="titleDiv">{titleDiv} </div>
                </Form.Group>
            <Modal.Body>
                <div style={{
                    fontSize: '1.5em',
                    paddingBottom: '2%',
                }}>내 용</div>
                <Form.Group as={Col} controlId="formGridContent">
                    <div className={BoastBoardListCss.FormContentDiv}>
                        <Form.Control
                            className={BoastBoardListCss.FormContentInput}
                            as="textarea"
                            rows={10}
                            name="content"
                            value={boardWriteDTO.content || ""}
                            onChange={onInput}
                            placeholder="내용을 입력해주세요."
                            style={textareaStyle}
                        />
                    </div>
                    <div id="contentDiv">{contentDiv} </div>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridImage">
                    <div style={{
                        fontSize: '1.5em',
                        paddingBottom: '2%',
                    }}>이미지</div>
                    <Form.Control
                        className={BoastBoardListCss.FormImageInput}
                        type="file"
                        name="img[]"
                        multiple="multiple"
                        ref={imgRef}
                        onChange={onImgInput}
                    />
                    <div id="imageDiv">{imageDiv} </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" style={{
                    backgroundColor: '#F56084',
                    borderColor: '#F56084',
                    fontWeight: 'bold',
                }}
                onClick={onUploadSubmit}
                >글 작성</Button>
            <Button variant="secondary" onClick={handleClose}
                style={{fontWeight: 'bold',}}
                >
                닫기
            </Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default BoastBoardWrite;