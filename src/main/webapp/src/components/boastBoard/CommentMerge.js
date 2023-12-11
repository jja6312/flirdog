import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import moment from 'moment';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const CommentsMerge = ({getBoardDTO}) => {
    
    const { user } = useContext(UserContext); // 유저 컨텍스트
    const { id } = user;

    const [CommentList, setCommentList] = useState([]);
    const [showComments, setShowComments] = useState(false);
    //현재 로그인한 유저의 닉네임 가져오기
    const [loginUser, setLoginUser] = useState({ 
        id: "",
        nickname: "",
        content: "",
    });

    const [commentDTO, setCommentDTO] = useState({
      userId: "",
      boardId: getBoardDTO.id,
      userNickName: "",
      content: "",
    });

    useEffect(() => {
      if (id) {
        axios.get(`https://java.flirdog.store:8080/boastBoard/getUser?id=${id}`)
          .then((res) => {
            setLoginUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [id]);

    useEffect(() => {
        setCommentDTO((commentDTO) => ({
          ...commentDTO,
          userId: loginUser.id,
          boardId: getBoardDTO.id,
          userNickName: loginUser.nickname,
        }));
    }, [loginUser]);

    useEffect(() => {
      if(getBoardDTO && commentDTO.boardId) {
      console.log("getBoardDTO updated:", getBoardDTO);
      console.log("commentDTO:", commentDTO);
      }
    }, [ getBoardDTO, commentDTO ]);

    useEffect(() => {
      if (getBoardDTO && getBoardDTO.id) {
      axios
          .get(`https://java.flirdog.store:8080/boastBoard/getBoastBoardCommentList?boardId=${getBoardDTO.id}`)
          .then((res) => {
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

    const [buttonText, setButtonText] = useState('보기');
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        // 버튼을 클릭할 때마다 상태를 토글
        setShowComments(!showComments);
        setButtonText(showComments ? '닫기' : '보기');
    };

    const textareaStyle = {
        border: '2px solid #ccc',  // 테두리 스타일 지정
        borderRadius: '4px',  // 테두리 모서리 둥글게 지정
        padding: '8px',  // 내부 여백 지정
        resize: 'none', // 사용자가 크기를 조절하지 못하도록 설정
        fontSize: '1em',
    };

    // 입력이 변경될 때 호출되는 함수
    const onInput = (e) => {
      // 사용자가 입력한 내용을 상태에 업데이트
        setCommentDTO((prevCommentDTO) => {
          console.log('prevCommentDTO:', prevCommentDTO);
          return {
            ...prevCommentDTO,
            userId: loginUser.id,
            boardId: getBoardDTO.id,
            userNickName: loginUser.nickname,
            content: e.target.value,
          };
        });
    };

    // 댓글을 작성한 후 호출되는 함수
    const onSubmit = useCallback(async (e) => {
      e.preventDefault();
      // 댓글을 서버로 전송하는 등의 로직 수행
      if (commentDTO.userId && commentDTO.boardId && commentDTO.userNickName && commentDTO.content) {
        try {
          // 서버에 댓글 작성 요청
          const res = await axios.post('https://java.flirdog.store:8080/boastBoard/boastCommentWrite', commentDTO);
    
          // 서버 응답에서 전체 댓글 목록으로 갱신
          const newCommentList = res.data;
    
          // 전체 댓글 목록으로 상태 업데이트
          setCommentList(newCommentList);
    
        } catch (err) {
          console.log(err);
        }
      }

      // 댓글 작성 후 입력 폼 초기화
      setCommentDTO((prevCommentDTO) => ({
        ...prevCommentDTO,
        content: '',
      }));

    }, [commentDTO]);
    
    return (
      <>
        <div>
          <div>
            <div style={{fontWeight:'bold', color:'#505050', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize:'1.2em', fontWeight:'bold'}}>
                댓글 ({CommentList.length})
              </div>
              <div>
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
            </div>
          </div>
            {showComments && (
              <div style={{marginTop:'10px', borderTop:'2px solid #DDDDDD'}}>
                <div style={{marginTop:'10px'}}>
                  {
                    CommentList.map((comment, index) => {
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
                                    <div style={{ color: '#707070', fontWeight: 'bold', marginBottom:'5px' }}>{comment.content}</div>
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
                                  rows={4}  // 행의 크기
                                  cols={50}  // 열의 크기
                                  value={commentDTO.content}
                                  style={textareaStyle}
                                  onInput={onInput}
                              />
                              <Button variant="submit" style={{
                                  width: '70px',
                                  marginLeft: '20px',
                                  backgroundColor: '#F56084',
                                  borderColor: '#F56084',
                                  fontWeight: 'bold',
                                  color: 'white',
                                  }}
                                  onClick={onSubmit}
                                  >작성</Button>
                          </div>
                      </div>
                  </Form.Group>
              </Form>
                </div>
              </div>
            )}
        </div>  
      </>
    );
};

export default CommentsMerge;