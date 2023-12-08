import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import moment from "moment";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const CommentsMerge = ({ getBoardDTO }) => {
  const { user } = useContext(UserContext); // 유저 컨텍스트
  const { id } = user;

  const [CommentList, setCommentList] = useState([]);
  //현재 로그인한 유저의 닉네임 가져오기
  const [loginUser, setLoginUser] = useState({
    id: "",
    nickname: "",
    content: "",
  });

  useEffect(() => {
    if (getBoardDTO && getBoardDTO.id) {
      console.log("getBoardDTO updated:", getBoardDTO);
    }
  }, [getBoardDTO]);

  useEffect(() => {
    if (getBoardDTO && getBoardDTO.id) {
      axios
        .get(
          `https://java.flirdog.store:8080/boastBoard/getBoastBoardCommentList?boardId=${getBoardDTO.id}`
        )
        .then((res) => {
          console.log(res.data);
          setCommentList(res.data); // 여기서 변수명을 올바르게 수정
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getBoardDTO]);

  useEffect(() => {
    if (CommentList.length > 0) {
      console.log("CommentList updated:", CommentList);
    }
  }, [CommentList]);

  /*

    // 작성한 댓글 목록 가져오기
    

        
    useEffect(() => {
        // 사용 전에 id가 정의되었는지 확인
        if (id) {
            // id를 이용한 컴포넌트 로직 처리
            console.log(id); // ----3
        }

        axios.get(`https://java.flirdog.store:8080/boastBoard/getUser?id=${id}`)
        .then((res) => {
            console.log(res.data);
            setLoginUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    const [comments, setComments] = useState([]);
    
    const nextId = useRef(0);

    const onInsert = useCallback(
        (name, content) => {
            const comment = {
            id: nextId.current,
            name: loginUser.nickname,
            content
            };
            console.log("nextId.current");
            console.log(nextId.current);
            console.log("name");
            console.log(name);
            console.log("content");
            console.log(content);
            setComments(prevComments => [...prevComments, comment]);
            nextId.current += 1; //nextId 1씩 더하기
        },
        [comments, loginUser],
    );

    const [getBoardDTO2, setGetBoardDTO2] = useState({});

    const [commmetDTO, setCommentDTO] = useState({
      userId: "",
      boardId: getBoardDTO.id,
      userNickName: "",
      content: "",
    });
  
    const [value, setValue] = useState({
      name: loginUser.nickname,
      content: '',
    });
  
    useEffect(() => {
      if (loginUser && loginUser.id) {
        setCommentDTO((commentDTO) => ({
          ...commentDTO,
          userId: loginUser.id,
          boardId: getBoardDTO.id,
          userNickName: loginUser.nickname,
        }));
      }
    }, [loginUser]);
  
    const onChangeContent = useCallback(
      (e) => {
        setValue((value) => ({
          ...value,
          content: e.target.value,
        }));
      },
      []
    );
    
    const onInput = useCallback(
      (e) => {
        const { name, value } = e.target;
        setCommentDTO((commmetDTO) => ({
          ...commmetDTO,
          [name]: value,
        }));
      },
      []
    );

    const onSubmit = useCallback(
      async (e) => {
        e.preventDefault();
  
        onInsert(value.name, value.content);
  
        try {
          const updatedCommentDTO = {
            ...commmetDTO,
            content: value.content,
          };
  
          setCommentDTO(updatedCommentDTO);
  
          const response = await axios.post(
            'https://java.flirdog.store:8080/boastBoard/boastCommentWrite',
            updatedCommentDTO
          );
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
  
        setGetBoardDTO2((prevBoardDTO) => ({
          ...prevBoardDTO,
          commentCount: prevBoardDTO.commentCount + 1,
        }));
  
        setValue((prevValue) => ({
          ...prevValue,
          content: '',
        }));
      },
      [onInsert, value, commmetDTO, setGetBoardDTO2]
    );
  
    const textareaStyle = {
        border: '2px solid #ccc',  // 테두리 스타일 지정
        borderRadius: '4px',  // 테두리 모서리 둥글게 지정
        padding: '8px',  // 내부 여백 지정
        resize: 'none', // 사용자가 크기를 조절하지 못하도록 설정
        fontSize: '1em',
    };

    const [showComments, setShowComments] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [buttonText, setButtonText] = useState('보기');
    const [commentCount, setCommentCount] = useState(getBoardDTO.commentCount);

    

    //실시간으로 댓글의 갯수를 가져오기
    useEffect(() => {
        axios
            .get(`https://java.flirdog.store:8080/boastBoard/getBoardCommentCount?boardId=${getBoardDTO.id}`)
            .then((res) => {
                console.log(res.data);
                setCommentCount(res.data);
                console.log("commentCount");
                console.log(commentCount);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [getBoardDTO.id, commentCount]); // getBoardDTO.id를 의존성 배열에 추가


    const handleButtonClick = () => {
        // 버튼을 클릭할 때마다 상태를 토글
        setShowComments(!showComments);
        // 버튼을 누를 때마다 showModal 상태를 토글
        setShowModal(!showModal);
        setButtonText(showModal ? '보기' : '닫기');
    };
    */

  return (
    <>
      {/*  
        <div style={{fontWeight:'bold', color:'#505050', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>댓글 ({commentCount})
                    <Button
                        variant="primary"
                        style={{
                        backgroundColor: '#F56084',
                        borderColor: '#F56084',
                        fontWeight: 'bold',
                        }}
                        onClick={handleButtonClick}>
                        {buttonText}
                    </Button>
        </div>
        {showComments && ( 
        <div>
            <div style={{ marginBottom: comments.length ? "1rem" : "0", borderBottom: comments.length ? '1.5px solid #dddddd' : 'none' }}>
                {
                    commmetList.map((comment, index) => {
                        // 날짜 표현
                        const createdAtDate = moment(comment.createdAt).format('YYYY-MM-DD');
                        const createdAtTime = moment(comment.createdAt).format('HH:mm');

                        return (
                            <div key={index} style={{ marginBottom: '10px', borderBottom:'1px solid #eeeeee'}}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                    <img src='/image/boastBoard/dogUserImage.jpg' width={25} height={25} alt=''
                                        style={{ borderRadius: '50%', border: '2px solid pink' }} />&nbsp;&nbsp;
                                    <div><strong>{comment.userNickName}</strong></div>&nbsp;&nbsp;
                                    <div style={{ fontSize: '0.8em', fontWeight: 'bold', color: '#707070' }}>{createdAtDate}&nbsp;&nbsp;{createdAtTime}</div>&nbsp;&nbsp;
                                </div>
                                <div>
                                    <div style={{ color: '#707070', fontWeight: 'bold' }}>{comment.content}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div>
            <Form className="CommentInsert">
                <Form.Group>
                    <div>
                        <div style={{marginBottom:'10px'}}><span style={{fontWeight:'bold'}}>{loginUser.nickname}</span></div>
                        <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Form.Control
                                as="textarea"
                                placeholder="댓글을 작성하세요"
                                name="content"
                                value={value.content}
                                onChange={(e) => {
                                    onChangeContent(e);
                                    onInput(e);
                                }}
                                rows={4}  // 행의 크기
                                cols={50}  // 열의 크기
                                style={textareaStyle}

                            />
                            <Button variant="submit" style={{
                                width: '70px',
                                marginLeft: '20px',
                                backgroundColor: '#F56084',
                                borderColor: '#F56084',
                                fontWeight: 'bold',
                                color: 'white',
                            }} onClick={onSubmit}>작성</Button>
                        </div>
                    </div>
                </Form.Group>
            </Form>
            </div>
      </div>
      )}
        */}
    </>
  );
};

export default CommentsMerge;
