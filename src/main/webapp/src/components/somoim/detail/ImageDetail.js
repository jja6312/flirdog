import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Carousel, Container, Form, InputGroup, Modal } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';
import ImageModify from './ImageModify';
import ImageReply from './ImageReply';

const ImageDetail = ({ show, onClose, selectedPhotoInfo, somoimId, isAdmin }) => {
    console.log('Selected Photo Info:', selectedPhotoInfo);
    console.log('selectedPhotoInfo.user.id', selectedPhotoInfo.user.id)
    
    const [activeIndex, setActiveIndex] = useState(0); // 이미지 캐러셀 구현
    const [maxHeight, setMaxHeight] = useState(null); // 캐러셀 크기 고정 구현
    const [hitCount, setHitCount] = useState(selectedPhotoInfo ? selectedPhotoInfo.hit : 0); // 조회수 상태 추가
    const [isLiked, setIsLiked] = useState(false); // 좋아요 구현
    const [likedCount, setLikeCount] = useState() // 좋아요 개수
    const [comments, setComments] = useState([{}]); // 댓글 목록 상태 변수

    const [isModifyMode, setIsModifyMode] = useState(false); // 수정 모드 추가
    const [modifiedPhotoInfo, setModifiedPhotoInfo] = useState(null); // 수정할 이미지 정보 추가

    const { user } = useContext(UserContext); // 유저 컨텍스트
    console.log('이미지디테일 user : ', user.id)
     // 선택된 이미지 게시글 정보
     const { createdAt, modifiedAt, id, photoTitle, photoContent, 
        photoLink, photoLike, hit, somoimPhoto, somoim } = selectedPhotoInfo;

    // console.log('사진첩 디테일 somoimId : ', somoim.id)
    
    useEffect(() => {
        console.log('ImageDetail - Selected Photo Info:', selectedPhotoInfo);
        console.log('ImageDetail - 해당 게시글의 댓글 목록 정보 :', comments);
      }, [selectedPhotoInfo, comments, comments.user]);

    //조회수 계산
    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때는 updateHitCount를 호출하지 않습니다.
        if (selectedPhotoInfo && show) {
            updateHitCount();
        }
    }, [show, selectedPhotoInfo]);

    // 해당 글의 가장 큰 이미지를 기준으로 모달창 높이 계산
    useEffect(() => {
      // 이미지의 최대 높이 계산
      const calculateMaxHeight = () => {
        const imageElements = document.querySelectorAll('.carousel-inner img');
        let maxImageHeight = 0;
  
        imageElements.forEach((img) => {
          maxImageHeight = Math.max(maxImageHeight, img.clientHeight);
        });
  
        setMaxHeight(maxImageHeight);
      };
  
      calculateMaxHeight();
  
      // 창 크기가 변경될 때마다 최대 높이 다시 계산
      const handleResize = () => {
        calculateMaxHeight();
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [show]);

    
    useEffect(() => {
        // 좋아요 여부 요청
        const LikeStatus = async () => {
          try {
            const response = 
                //await axios.get(`/somoim/somoimPhotoLikeStatus?userId=${user.id}&photoId=${id}`);
                await axios.post(`/somoim/somoimPhotoLikeStatus`, {
                    userId: user.id,
                    photoId: id
                  });
            setIsLiked(response.data.isLiked);
            console.log('사진첩 좋아요 등록 여부 확인 : ', response.data.isLiked)
          } catch (error) {
            console.error('Error fetching like status:', error);
          }
        };

        LikeStatus();
      }, [id, user]);

    useEffect(() => {
        // 좋아요 받은 개수 요청
        const ListCount = async () => {
            try {
                const res = await axios.get(`/somoim/somoimPhotoLikeCount?photoId=${id}`)
                setLikeCount(res.data);
                console.log('해당 게시글이 받은 좋와요 개수 : ', res.data)
            } catch(error) {
                console.error('좋아요 개수 조회 에러', error)
            }
        }

        ListCount();
    }, [id, isLiked]);
    
    // 좋아요 등록 및 취소
    const handleLikeToggle = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    userId: user.id,
                    photoId: id,
                },
            };
    
            if (isLiked) {
                // 좋아요 취소
                await axios.delete('/somoim/somoimPhotoLikes', config)
                    .then(res => 
                        console.log('좋아요 취소 확인 : ', res.data),
                        )
                    .catch(e => console.log(e));
            } else {
                // 좋아요 등록
                await axios.post('/somoim/somoimPhotoLikes', { 
                    userId: user.id,
                    photoId: selectedPhotoInfo.id
                }).then(res => console.log('좋아요 등록 확인 : ', res.data))
                  .catch(e => console.log(e));
            }
    
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    // 소모임 번호와 유저 권한 출력
    useEffect(() => {
        console.log('사진첩 디테일 somoimId : ', somoimId)
        console.log('사진첩 디테일 isAdmin : ', isAdmin)
        console.log('사진첩 디테일 photoId : ', id)
    },[isAdmin, somoimId, id])

    if (!selectedPhotoInfo) {
        // 선택된 이미지 정보가 없을 경우 모달을 렌더링하지 않음
        return null;
    }
    
    // 조회수 계산 axios
    const updateHitCount = async () => {
        try { // ?id=${id}
            const response = await axios
                    .post(`/somoim/somoimPhotoCount?id=${id}`);
            setHitCount(response.data.hit);
        } catch (error) {
            console.error('Failed to update hit count:', error);
        }
    };

    const photoArray = somoimPhoto.replace(/"/g, '').split(',');

    const handleSelect = (selectedIndex, e) => {
        setActiveIndex(selectedIndex);
    };

    // 수정 버튼 클릭 시 호출
    const handleModifyButtonClick = (selectedPhotoInfo) => {
        setModifiedPhotoInfo(selectedPhotoInfo);
        setIsModifyMode(true);
      };
    
    const handleClose = () => {
        setModifiedPhotoInfo(null);
        setIsModifyMode(false);
    };

    // 글삭제
    const onDeletePhoto = async () => {
        const confirm = window.confirm('정말로 삭제하시겠습니까?')
        if(confirm) {
            if(isAdmin !== 0 && isAdmin !== 1) {
                alert('삭제 권한이 없습니다.')
            } else {
                // await axios.delete('/somoim/somoimPhotoDelete', {
                //         data: {
                //             id: id,
                //             userId: user.id,
                //             somoimId: somoim.id
                //         }
                //     })
                await axios.delete(`/somoim/somoimPhotoDelete?id=${id}&userId=${user.id}&somoimId=${somoim.id}`)
                    .then((res) => {
                        console.log('삭제 응답:', res);
                        alert('해당 게시글이 삭제되었습니다.')
                        onClose();
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error('삭제시 에러', error);
                    });
            }//isAdmin if문
        }//confirm if문
    }

    // 댓글 등록 콜백 함수
    // const onSubmitComment = (comment) => {
    //     // 서버에 댓글 등록 요청 등의 로직 수행
    //     // 성공적으로 등록되면 서버에서 반환한 댓글 정보를 comments 상태에 추가
    //     const newComment = {
    //     id: comments.length + 1, // 적절한 방식으로 댓글 id 생성
    //     content: comment,
    //     // 추가적인 댓글 정보 필드 추가 가능
    //     };

    //     setComments([...comments, newComment]);
    // };


    // 댓글 목록 전달받기
    const updateComments = (newComments) => {
        const filteredComments = newComments
            .filter(comment => comment.somoimPhoto.id === selectedPhotoInfo.id)
            .map((comment, index) => ({ ...comment, sequence: index + 1 }));
    
        // sequence만 뒤집기
        const reversedComments = filteredComments.map((comment, index) => ({
            ...comment,
            sequence: filteredComments.length - index, // 역순으로 변경된 순서를 적용
        }));
    
        setComments(reversedComments);
    };


    // 댓글 삭제
    const onReplyDeleteBtn = (selectedReply) => {
        console.log('selectedReply', selectedReply)
        if(window.confirm('정말 삭제하시겠습니까?')) {
            axios.delete(`/somoim/photoReplyDelete?commentId=${selectedReply.id}&userId=${user.id}`)
              .then((response) => {
                console.log('댓글 삭제 응답:', response);
                alert('해당 댓글이 삭제되었습니다.')

                // 새로운 배열을 생성하여 삭제된 댓글을 제외한 댓글 목록을 만듭니다.
                const updatedComments = comments.filter(comment => comment.id !== selectedReply.id);
                
                // 새로운 배열을 상태로 설정합니다.
                setComments(updatedComments);
              })
              .catch((error) => {
                console.error('댓글 삭제 에러:', error);
              });
        }
    };

    // 게시글 날짜 형식 변환
    function formatDate(dateString) {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
      
        const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options)
          .replace('.', '년')
          .replace('.', '월')
          .replace('.', '일')
          .replace(' ', ' ')
          .replace(/(\d+:\d+:\d+)/, '$1');
          
        return formattedDate;
    }

    // 댓글 날짜 형식 변환
    function ReplyDate(dateString) {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
      
        const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options)
          .replace('.', '년')
          .replace('.', '월')
          .replace('.', '일')
          .replace(' ', ' ')
          .replace(/(\d+:\d+:\d+)/, '$1');
          
        return formattedDate;
    }

    return (
        <Modal className="carousel-container" show={show} onHide={onClose} size="lg">
            {isModifyMode ? (
                <ImageModify onClose={handleClose} modifiedPhotoInfo={modifiedPhotoInfo} />
            ) : (
            <div style={{border: '1px solid red'}}>
                <Modal.Header closeButton style={{ padding: '0.8rem', backgroundColor: 'pink', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                        <Modal.Title>
                        제목 : <strong>{photoTitle}</strong>
                        </Modal.Title>        
                        <span style={{ marginLeft: 'auto' }}>
                            <button 
                                onClick={ handleLikeToggle } 
                                style={{ marginLeft: 'auto', marginRight:'1rem', backgroundColor: 'pink' }}
                            >
                                { isLiked ? '❤️' : '🤍' }{ likedCount }
                            </button>
                            조회수 : {hitCount}</span>
                    </div>
                </Modal.Header>
                <Modal.Body
                className="d-flex justify-content-center m-5"
                style={{ height: maxHeight ? maxHeight : '50%', minHeight: '200px', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}
                >
                    <style>
                        {`
                            .carousel-indicators {
                                transform: translateY(30px);
                            }
                        `}
                    </style>
                    <div className="col-8" style={{ display: 'flex', flexWrap: 'wrap', maxHeight: '100%' }}>
                        <Carousel data-bs-theme="dark"activeIndex={activeIndex} onSelect={handleSelect} interval={null} style={{ width: '100%', textAlign: 'center', maxHeight: '100%' }}>
                            {photoArray.map((photo, index) => (
                                <Carousel.Item key={index}>
                                <img
                                    key={index}
                                    src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${photo}`}
                                    alt={`somoimPhoto-${index}`}
                                    style={{ width: '50%', marginBottom: '10px', maxHeight: '100%' }}
                                />
                            </Carousel.Item>
                        ))}
                        </Carousel>
                    </div>
                    <div className="col-4" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                        <strong style={{ lineHeight:'2.5' }}>내용 :</strong><br />
                        <div style={{ whiteSpace: 'pre-line' }}>{photoContent}</div>
                    </div>
                </Modal.Body>
                <div style={{ display: 'flex', marginRight: '1rem', marginLeft: '1rem', marginBottom: '0.5rem' }}>
                    <div style={{ marginRight: 'auto' }}>※ 작성자: {selectedPhotoInfo.user.name}</div>
                    {
                    modifiedAt ? (
                        <div style={{ marginLeft: 'auto' }}>
                            (수정일 : {formatDate(modifiedAt)})</div>
                    ) : (
                        <div style={{ marginLeft: 'auto' }}>
                            (작성일 : {formatDate(createdAt)})</div>
                    )
                }
                </div>
                <ImageReply selectedPhotoInfo={selectedPhotoInfo} onUpdateComments={updateComments} />
                { comments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '20px', marginBottom: '10px', color: 'gray' }}>
                        아직 댓글이 없습니다.
                    </div>
                ) : (
                    <>
                        {
                            comments.map((item, index) => { 
                                return (
                                <Container className='py-3 px-4' 
                                        key={index}
                                        style={{
                                            borderBottom: '1px solid pink',
                                            cursor: 'pointer', 
                                            transition: 'background-color 0.3s', 
                                        }}
                                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F0E6ED'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = ''; }}
                                    >
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                        <div className='col-1' style={{ textAlign: 'center' }}>{item.sequence}</div>
                                        <div className='col-7 px-4' style={{ overflowWrap: 'break-word' }}>{item.comment}</div>
                                        <div className='col-4' style={{ }}>
                                            {item.modifiedAt ? 
                                                <div className='col' style={{ marginBottom: '0.5rem' }}>{ReplyDate(item.modifiedAt)}</div>  : 
                                                <div className='col' style={{ marginBottom: '0.5rem' }}>{ReplyDate(item.createdAt)}</div>
                                            }
                                            <div className='col' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                <div style={{ alignSelf: 'flex-start' }}>작성자: {item.user ? item.user.name : '로딩중...'}</div>
                                                {
                                                    ( isAdmin === 1 || (user.id && comments[index]?.user?.id === user.id)) && (
                                                        <Button variant='danger' size='sm' onClick={() => onReplyDeleteBtn(comments[index])}>
                                                            삭제
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                            )})
                        }
                    </>
                )}
                <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'pink', color: 'white' }}>
                    <div>
                        링크 : <a href={photoLink} target="_blank" rel="noopener noreferrer">{photoLink}</a>
                    </div>
                    <div style={{ marginRight: '0.5rem', gap: '2' }}>
                    {isAdmin === 1 || ((selectedPhotoInfo.user && selectedPhotoInfo.user.id) === user?.id) && (
                        <>
                            <Button variant="danger" size="sm" onClick={() => handleModifyButtonClick(selectedPhotoInfo)}>수정</Button>
                            <Button variant="danger" size="sm" onClick={onDeletePhoto} style={{ marginLeft: '0.7rem' }}>삭제</Button>
                        </>
                    )}
                    </div>
                </Modal.Footer>
            </div>
            )}
        </Modal>
      );
    };

export default ImageDetail;