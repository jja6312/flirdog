import React, { useEffect, useRef, useState } from 'react';

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { Button, Container, Modal } from 'react-bootstrap';

import styles from '../../../css/somoim/detail/SomoimPhotoModal_style.module.css';
import ImageModal from './ImageModal';
import axios from 'axios';
import ImageDetail from './ImageDetail';
import { useLocation } from 'react-router-dom';
// import Pin from './Pin';
// import Modal from './Modal';


const getItems = (nextGroupKey, count) => {
    const nextItems = [];
    const nextKey = nextGroupKey * count;
  
    for (let i = 0; i < count; ++i) {
      nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
  };
  

const SomoimDetailPhoto = ({ somoimId, user, isAdmin } ) => {

    // const updateItems = (newItem) => { // imageModal을 통한 아이템 상태 업데이트
    //     setItems([...items, newItem]);
    // }
    const [admin, setAdmin] = useState();
    const [somoimNum, setSomoimNum] = useState();

    const [items, setItems] = useState(() => getItems(0, 10));
    const [loading, setLoading] = useState(false); // 로딩 상태를 추적합니다.

    const [hasMoreImages, setHasMoreImages] = useState(true); // 이미지가 더 이상 없을 때 더 이상 요청하지 않도록 하는 state
    const [somoimPhotoList, setSomoimPhotoList] = useState([{}]); // 전체 소모임 목록
    const [firstPhotoArray, setFirstPhotoArray] = useState([]); // 첫번째 이미지만 추출한 배열
    const {createdAt, modifiedAt, id, photoTitle, photoContent, 
            photoLink, photoLike, hit, somoimPhoto, somoim} = somoimPhotoList
    const imageModalRef = useRef(); // 이미지 업로드를 위한 useRef

    useEffect(() => {
        console.log('소모임 사진첩에서 부르는 로그인 유저 아이디 :' + (user && user.id ? user.id : 'User 정보 없음'));
        console.log('소모임 사진첩에서 부르는 소모임 아이디 :' + somoimId)
    },[somoimId])
    
    const igRef = useRef();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const handleShow = () => {
      // 소모임 가입 여부를 확인
      if (isAdmin === 2) {
        alert("소모임에 먼저 가입하세요.");
        return;
      }
    
      // 가입되어 있다면 모달을 열기
      setShow(true);
    };
    // 상세보기 구현
    const [showModal, setShowModal] = useState(false);
    const [selectedPhotoInfo, setSelectedPhotoInfo] = useState({});
    const handleModalOpen = (num, isAdmin, somoimId) => {
      const selectedPhoto = somoimPhotoList[num];
      setSelectedPhotoInfo(selectedPhoto);
      setShowImageDetail(true); // 이미지 상세 모달 열기
      setAdmin(isAdmin);
      setSomoimNum(somoimId);
    };
    const [showImageDetail, setShowImageDetail] = useState(false);
    const [clickedPhotoIndex, setClickedPhotoIndex] = useState({});
    const handleImageClick = (num) => {
      const clickedPhoto = somoimPhotoList[num];
      setSelectedPhotoInfo(clickedPhoto); // 이미지 클릭 시 선택된 정보 설정
      setShowImageDetail(true);
      setShowModal(false); // 이미지 클릭 시 상세보기 모달은 닫히도록 설정
    };

    // SomoimDetailPhoto 컴포넌트 내에서 이미지 정보 추출
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const photoId = params.get('photoId');

    // 선택된 이미지 정보 저장
    useEffect(() => {
      if (!photoId || !somoimPhotoList) {
        return; // photoIndex가 없거나 somoimPhotoList가 없으면 종료
      }
    
      const selectedPhoto = somoimPhotoList.find(photo => photo.id === parseInt(photoId, 10));
      
      if (selectedPhoto) {
        setSelectedPhotoInfo(selectedPhoto);
        setShowImageDetail(true);
        setAdmin(isAdmin);
        setSomoimNum(somoimId);
      }
    }, [photoId, somoimPhotoList]);
    

    // 각 게시글의 첫번째 사진만 추출
    useEffect(() => {
        console.log(igRef.current.getItems());
      
        const fetchData = async () => {
          try {
            const response = await axios.get(`/somoim/somoimPhotoList?id=${somoimId}`);
            console.log('해당 소모임 사진첩 목록 : ', response.data);
      
            setSomoimPhotoList(response.data);
      
            const newFirstPhotoArray = [];
      
            if (Array.isArray(response.data) && response.data.length > 0) {
              response.data.forEach((item) => {
                if (item.somoimPhoto) {
                  const photoArray = item.somoimPhoto.replace(/"/g, '').split(',');
      
                  // 각 항목에 대해 첫 번째 사진 선택
                  if (photoArray.length > 0) {
                    const firstPhoto = photoArray[0];
                    newFirstPhotoArray.push(firstPhoto);
                  } else {
                    console.log('somoimPhotoList is not a valid array');
                  }
                } else {
                  console.log('somoimPhotoList is not available');
                }
              });
      
              setFirstPhotoArray(newFirstPhotoArray);
      
              // 이미지 개수가 10개 미만이면 추가 요청 중지
              if (newFirstPhotoArray.length < 10) {
                setHasMoreImages(false);
              }
            } else {
              console.log('somoimPhotoList is not a valid array or is empty');
              setHasMoreImages(false);
            }
          } catch (error) {
            console.error(error);
            setHasMoreImages(false);
          }
        };
      
        fetchData();
        console.log('somoimPhotoList 전체 : ', somoimPhotoList);
      }, [somoimId]);

    // const onRequestAppend = (e) => {
        
    //     if (!hasMoreImages) {
    //         // 이미지가 더 이상 없으면 추가 요청 중지
    //         return;
    //       }

    //     const nextGroupKey = (e.groupKey || 0) + 1;
    //     const currentKeys = items.map((item) => item.key);

    //     // 새로 추가할 이미지 중에서 현재까지 추가된 이미지와 중복되지 않은 것만 선택
    //     const newItems = getItems(nextGroupKey, firstPhotoArray.length).filter(
    //         (item) => !currentKeys.includes(item.key)
    //       );

    //     // 이미지가 더 이상 없다면 hasMoreItems를 false로 설정
    //     if (newItems.length === 0) {
    //       setHasMoreImages(false);
    //       return;
    //     }

    //     setItems([...items, ...newItems]);    
    // };
    const onRequestAppend = (e) => {
      const nextGroupKey = (e.groupKey || 0) + 1;
  
      // 로딩 중이면 추가 요청을 중단합니다.
      if (loading) {
        return;
      }
  
      // 로딩 상태를 true로 설정합니다.
      setLoading(true);
  
      // e.wait()를 호출하여 MasonryInfiniteGrid에게 로딩 중임을 알립니다.
      e.wait();
  
      // setTimeout을 사용하여 일정 시간 후에 로딩을 완료하고 이미지를 가져오도록 합니다.
      setTimeout(async () => {
        try {
          // 이미지 데이터를 가져오는 API 호출 (5개씩)
          const response = await axios.get(`/somoim/somoimPhotoList?id=${somoimId}&page=${nextGroupKey}`);
  
          // 가져온 이미지 데이터를 새로운 아이템으로 설정
          const newItems = response.data.map((item, index) => ({
            groupKey: nextGroupKey,
            key: items.length + index,
          }));
  
          // MasonryInfiniteGrid에게 로딩이 완료되었음을 알립니다.
          e.ready();
  
          // 현재 아이템 목록에 새로운 아이템을 추가합니다.
          setItems([...items, ...newItems]);
        } catch (error) {
          console.error(error);
          // 에러 처리를 원하는 대로 수행하세요.
        } finally {
          // 로딩 상태를 false로 설정합니다.
          setLoading(false);
        }
      }, 2000); // 3초의 지연 시간을 설정합니다.
    };

    // ImageModal에서 이미지 저장시 모달창 닫기
    const handleSaveAndAdd = (data) => {
        // 여기에서 데이터를 사용하거나 추가로 로직 수행
        console.log('이미지 업로드 후 처리:', data);
        handleClose();
    };

    // 이미지 리스트를 담을 Item 처리
    const Item = ({ num }) => {
      if (firstPhotoArray[num] === undefined) {
        return null; // undefined일 경우 이미지를 생성하지 않음
      }
    
      return (
        <div className={`${styles.item} mb-5`} style={{ width: "250px", marginBottom: '5rem' }}>
          <div className="thumbnail">
            <img
              className={`${styles.box}`}
              src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${firstPhotoArray[num]}`}
              alt={`egjs-${num}`}
              style={{ maxWidth: "250px" }}
              onClick={() => handleImageClick(num)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div className="info" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', 
                                              overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
                      <span style={{ marginRight: '0.5rem' }}>※ 제목:</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{somoimPhotoList[num].photoTitle}</span>
                  </div>
                  <div className="info">※ 작성자: {somoimPhotoList[num].user.name}</div>
                  <div className="info">※ 작성일: {formatDate(somoimPhotoList[num].createdAt)}</div>
              </div>
              <Button 
                  variant="danger" size="sm" 
                  onClick={() => handleModalOpen(num, isAdmin, somoimId)}>
                  상세 보기
              </Button>
          </div>
        </div>
      );
    };

    // 날짜 형식 변환
    function formatDate(dateString) {
      const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options);
      return formattedDate;
    }

    return (
        <>
            <Container className="mb-3">
              {/* (이즈머드민 : {isAdmin}) */}
              {/* {
                isAdmin === 2 && (
                    <div>
                        <div>(당신은 아직 미가입자 입니다.)</div><br/>
                    </div>
                )
              } */}
                <div className="navigation_bar d-flex justify-content-end">
                    <div
                        onClick={handleShow}
                        className={`${styles.pint_mock_icon_container} add_pin`}
                    >
                        <img src="/image/somoim/add.png" alt="add_pin" className={`${styles.pint_mock_icon}`} />
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>사진 업로드</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{height:'600px'}}>
                        <ImageModal ref={imageModalRef} onSavePin={handleSaveAndAdd} somoimId={somoimId} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button variant="danger" onClick={() => imageModalRef.current.savePin()}>
                            사진 저장 및 추가
                        </Button>
                    </Modal.Footer>
                </Modal>


                <MasonryInfiniteGrid
                    loading={<div className="loading">Loading...</div>}
                    //groupBy={(jsx) => jsx.props["data-grid-groupkey"]}
                    itemBy={(jsx) => jsx.key}
                      placeholder={<div className="placeholder">플레이스 홀더</div>}
                      className="container mt-3"
                      align="center"
                      gap={20} // margin
                      defaultDirection={"end"}
                      sizeWeight={2}
                      ratioWeight={1}
                      aspectRatio={1}
                      weightPriority={"custom"}
                      // frame={[[1, 1, 2, 3, 3], [1, 1, 4, 4, 5]]} // 한 행의 열크기
                      attributePrefix={"data-grid-"}
                      column={0}
                      ref={igRef}
                      columnCalculationThreshold={1}
                      // threshold={1000}
                      onRequestAppend={onRequestAppend}
                      onRenderComplete={(e) => { 
                          console.log(e);
                        }}
                      isEqualSize={false}
                      useResizeObserver={true}
                      outlineLength={0} 
                    >
                      {/* {items ? (
                          items.map((item, index) => (
                            <Item className="item" data-grid-groupkey={item.groupKey} key={item.key} num={item.key}></Item>
                          ))
                        ) : (
                          <div>아직 올라온 게시글이 없습니다.</div>
                        )} => 적용 안됌 */}
                        { items.map((item ,index) => {
                            return (
                                <Item className="item" data-grid-groupkey={item.groupKey} key={item.key} num={item.key}></Item>
                                )
                        })}
                </MasonryInfiniteGrid>
                {showImageDetail && (
                  <ImageDetail
                    show={showImageDetail}
                    onClose={() => {
                      setShowImageDetail(false);
                      setSelectedPhotoInfo(null);
                    }}
                    selectedPhotoInfo={selectedPhotoInfo}
                    isAdmin={admin}
                    somoimId={somoimNum}
                  />
                )}
                {showModal && (
                  <ImageDetail
                    show={showModal}
                    onClose={() => {
                      setShowModal(false);
                      setSelectedPhotoInfo(null);
                    }}
                    selectedPhotoInfo={selectedPhotoInfo}
                    isAdmin={admin}
                    somoimId={somoimNum}
                  />
                )}

            </Container>
        </>
    );
};

export default SomoimDetailPhoto;