import React, { useEffect, useRef, useState } from 'react';

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { Button, Container, Modal } from 'react-bootstrap';

import styles from '../../../css/somoim/detail/SomoimPhotoModal_style.module.css';
import ImageModal from './ImageModal';
import axios from 'axios';
import ImageDetail from './ImageDetail';
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


    const [items, setItems] = useState(() => getItems(0, 10));
    const igRef = useRef();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 상세보기 구현
    const [showModal, setShowModal] = useState(false);
    const [selectedPhotoInfo, setSelectedPhotoInfo] = useState(null);
    const handleModalOpen = (num) => {
        const selectedPhoto = somoimPhotoList[num];
        setSelectedPhotoInfo(selectedPhoto);
        setShowModal(true);
    };
    
    

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

    const onRequestAppend = (e) => {
        
        if (!hasMoreImages) {
            // 이미지가 더 이상 없으면 추가 요청 중지
            return;
          }

        const nextGroupKey = (e.groupKey || 0) + 1;
        const currentKeys = items.map((item) => item.key);

        // 새로 추가할 이미지 중에서 현재까지 추가된 이미지와 중복되지 않은 것만 선택
        const newItems = getItems(nextGroupKey, firstPhotoArray.length).filter(
            (item) => !currentKeys.includes(item.key)
          );

        // 이미지가 더 이상 없다면 hasMoreItems를 false로 설정
        if (newItems.length === 0) {
          setHasMoreImages(false);
          return;
        }

        setItems([...items, ...newItems]);    
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
                src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${firstPhotoArray[num]}`}
                alt={`egjs-${num}`}
                style={{ maxWidth: "250px" }}
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

                <Button variant="danger" size="sm" onClick={() => handleModalOpen(num)}>
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
                (이즈머드민 : {isAdmin})
                {
                isAdmin === 2 && (
                    <div>
                        <div>(당신은 아직 미가입자 입니다.)</div><br/>
                    </div>
                )
            }
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
                        { items.map((item ,index) => {
                            return (
                                <Item className="item" data-grid-groupkey={item.groupKey} key={item.key} num={item.key}></Item>
                                )
                        })}
                </MasonryInfiniteGrid>
                <ImageDetail
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    selectedPhotoInfo={selectedPhotoInfo}
                />
            </Container>
        </>
    );
};

export default SomoimDetailPhoto;


// const [photoArray, setPhotoArray] = useState([]); // 이미지 리스트 배열
    // const [formData, setFormData] = useState({});
    // const [somoimPhotoDTO, setSomoimPhotoDTO] = useState({})
    // const [isMoreThanOneImage, setIsMoreThanOneImage] = useState([]); //이미지가 여러개있는지 확인하고 저장하는 배열
    

// 상태 업데이트
// setSomoimPhotoList(prevsomoimPhotoList => ({
//     ...prevsomoimPhotoList,
//     id: response.data.id,
//     photoTitle: response.data.photoTitle,
//     photoContent: response.data.photoContent,
//     photoLink: response.data.photoLink,
//     photoLike: response.data.photoLike,
//     hit: response.data.hit,
//     somoimPhoto: response.data.somoimPhoto,
//     user: response.data.user ? response.data.user.id : null,
//     somoim: response.data.somoim ? response.data.somoim.id : null,
//     createdAt: response.data.createdAt,
//     modifiedAt: response.data.modifiedAt,
// }));


  // //사진이 여러개인 경우
    // useEffect(() => {
    //     // setMatchingDTO2 가 되면 image 스트링값에 ','가 있으면 isMoreThanOneImage useState 배열에 저장하기.
    //     if (somoimPhotoList.somoimPhoto.includes(',')) {
    //         setIsMoreThanOneImage(somoimPhotoList.somoimPhoto.split(','));
    //     } else {
    //         // 이미지가 하나인 경우 배열을 초기화
    //         setIsMoreThanOneImage([somoimPhotoList.somoimPhoto]);
    //     }
    // }, [somoimPhotoList.somoimPhoto]);