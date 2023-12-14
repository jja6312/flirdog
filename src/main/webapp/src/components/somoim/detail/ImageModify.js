import React, { useContext, useEffect, useRef, useState } from 'react';

import styles from '../../../css/somoim/detail/modal_styles.module.css';
import { UserContext } from '../../../contexts/UserContext';
import { Button, Carousel, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ImageModify = ({ modifiedPhotoInfo }) => {
    console.log('Selected Photo Info - Modify :', modifiedPhotoInfo);

    const { user } = useContext(UserContext); // 유저 컨텍스트
    console.log('사진첩 수정창에서 부르는 로그인 유저 아이디 : ' + (user ? user.id : 'User 정보 없음'));

    // 이미지 정보
    const { createdAt, modifiedAt, id, photoTitle, photoContent, 
        photoLink, photoLike, hit, somoimPhoto, somoim } = modifiedPhotoInfo;
    console.log('사진첩 수정페이지 somoimId : ', somoim.id)

    const [pinDetails, setPinDetails] = useState({
        id: id,
        user : {
            id: user.id
        },
        photoTitle: modifiedPhotoInfo.photoTitle || '',
        photoContent: modifiedPhotoInfo.photoContent || '',
        photoLink: modifiedPhotoInfo.photoLink || '',
        hit: hit,
        photoLike: photoLike,
        somoim : {
            id : Number(somoim.id)
        }
    });

    const [images, setImages] = useState([]);  // (미리보기) 이미지배열
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // (미리보기) 현재 표시되는 이미지의 인덱스스
    const [imgFiles, setImgFiles] = useState([]); // (실제 업로드) 이미지 배열

    const [newImages, setNewImages] = useState([]);  // 새로 업로드한 (미리보기) 이미지 배열
    const [newImgFiles, setNewImgFiles] = useState([]); // 새로 업로드한 (실제 업로드) 이미지 배열

    const [somoimPhotoList, setSomoimPhotoList] = useState([]); // 소모임 사진 목록

    const imageRef = useRef(null); // 이미지 엘리먼트에 대한 참조를 만듦
    const navigate = useNavigate(); // 저장 후 새로고침 및 취소 후 뒤로가기
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPinDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        console.log('pinDetails : ', pinDetails)
    };

    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        if (modifiedPhotoInfo && modifiedPhotoInfo.somoimPhoto) {
            const photoArray = modifiedPhotoInfo.somoimPhoto.replace(/"/g, '').split(',');
            setSomoimPhotoList(photoArray);
            setImagesLoaded(true);
          }
    }, [modifiedPhotoInfo, newImages]);


    // 이미지 미리보기
    // const uploadImg = (event) => {
    //     if (event.target.files && event.target.files.length > 0 && newImages.length < 5) {
    //         const newImagesArray = [];

    //         for (let i = 0; i < event.target.files.length; i++) {
    //             const reader = new FileReader();

    //             reader.onload = function () {
    //                 newImagesArray.push(reader.result);
    //             };

    //             reader.readAsDataURL(event.target.files[i]);
    //         }

    //         // 새 이미지로 대체
    //         //setSomoimPhotoList(newImagesArray)
    //         setNewImages(newImagesArray);
    //     }
    // };

    const uploadImg = (event) => {
        if (event.target.files && event.target.files.length > 0 && newImages.length < 5) {
          setImagesLoaded(false);
        
          const newImagesArray = [];
          const newImgFilesArray = [];
        
          for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
        
            reader.onload = function () {
              setSomoimPhotoList([])
              newImagesArray.push(reader.result);
              setCurrentImageIndex(newImagesArray.length - 1);
            };
        
            reader.readAsDataURL(event.target.files[i]);
            newImgFilesArray.push(event.target.files[i]);
          }
        
            // 새 이미지로 대체
            setSomoimPhotoList(newImagesArray);
            setNewImages(newImagesArray);
            setNewImgFiles(newImgFilesArray);

            // 이미지 로딩 상태 업데이트
            setImagesLoaded(true);
            }
      };

    const getFullNCloudStorageURL = (imagePath) => {
        // 여기에 ncloud storage URL을 추가하는 로직을 작성
        if (imagePath.startsWith('data:image/')) {
            // 새로 업로드한 이미지의 경우 URL을 생성하지 않음
            return imagePath;
        } else {
            // 기존 이미지의 경우 URL을 생성
            return `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imagePath}`;
        }
    };

    //const [somoimPhotoValue, setSomoimPhotoValue] = useState('');

    useEffect(() => {
        if (somoimPhotoList.length > 0) {
            //setSomoimPhotoValue(somoimPhotoList.join(','));
        }
    }, [somoimPhotoList]);


    // 이미지 전송
    const savePin = async () => {
        if (!imagesLoaded) {
            alert('이미지가 아직 로딩 중입니다. 기다려주세요.');
            return;
        }

        if (window.confirm("저장 하시겠습니까?")) {
            const formData = new FormData();

            // 기존 이미지를 추가
            for (let i = 0; i < somoimPhotoList.length; i++) {
                formData.append("imgFiles", somoimPhotoList[i]);
            }

            // 새 이미지를 추가
            for (let i = 0; i < newImgFiles.length; i++) {
                formData.append("newImgFiles", newImgFiles[i]);
            }

            // pinDetails를 추가
            formData.append(
                "pinDetails",
                new Blob([JSON.stringify(pinDetails)], { type: "application/json" })
            );

            // formData 내용 확인
            for (let pair of formData.entries()) {
                const [key, value] = pair;
    
                if (value instanceof File) {
                    console.log(key, value.name);
                } else {
                    console.log(key, value);
                }
            }

            try {
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };
   
                await axios.post('/somoim/somoimPhotoUpdate', formData, config)
                    .then(res => {
                        console.log('업로드 후 formData', res.data);
                        alert('사진 업로드가 완료되었습니다.');
                        //<Link to={`/somoim/detailPhoto/${somoim.id}?photoId=${id}`}>돌아가기</Link>
                        // navigate(`/somoim/detailPhoto/${somoim.id}?photoId=${id}`);
                        // console.log('navigate 호출 확인');
                        window.location.href = `/somoim/detailPhoto/${somoim.id}?photoId=${id}`;
                    }).catch(e => console.log(e));
                } catch (error) {
                    console.error('이미지 업로드 오류 : ', error);
                    
                }
            }
           
    };
    // 이미지 전송
    // const savePin = async () => {
    //     if (!imagesLoaded) {
    //         alert('이미지가 아직 로딩 중입니다. 기다려주세요.');
    //         return;
    //     }

    //     if (window.confirm("저장 하시겠습니까?")) {
    //         const formData = new FormData();

    //         // 기존 이미지를 추가
    //         for (let i = 0; i < somoimPhotoList.length; i++) {
    //             formData.append("imgFiles", somoimPhotoList[i]);
    //         }

    //         // 새 이미지를 추가
    //         for (let i = 0; i < newImgFiles.length; i++) {
    //             formData.append("imgFiles", newImgFiles[i]);
    //         }

    //         // pinDetails를 추가
    //         formData.append(
    //             "pinDetails",
    //             new Blob([JSON.stringify(pinDetails)], { type: "application/json" })
    //         );

    //         try {
    //             const config = {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             };

    //             await axios.post('/somoim/somoimPhotoUpdate', formData, config)
    //                 .then(res => {
    //                     console.log('업로드 후 formData', res.data);
    //                     alert('사진 업로드가 완료되었습니다.');
    //                     // 업로드 성공 시 onSavePin 콜백(사용자 정의 함수) 호출
    //                 }).catch(e => console.log(e));
    //         } catch (error) {
    //             console.error('이미지 업로드 오류 : ', error);
    //         }
    //     }
    // };


    // 데이터 URI를 Blob으로 변환하는 함수
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' }); // 이미지 타입에 맞게 변경
    };
    
    // 이미지 미리보기 캐러셀
    const generateCarouselItems = () => {
        // 기존 이미지와 새 이미지를 합친 배열 생성
        const allImages = [...somoimPhotoList, ...newImages];
      
        // 해당 배열을 기반으로 Carousel의 items 생성
        const carouselItems = allImages.map((image, index) => (
            <Carousel.Item key={`image-${index}`}>
                <img className={`${styles.pin_image}`} src={getFullNCloudStorageURL(image)} alt={`slide-${index}`} />
            </Carousel.Item>
        ));
        
      
        return carouselItems;
    };


    // 취소 후 뒤로가기
    const handleCancel = () => {
        //navigate(`/somoim/detailPhoto/${somoim.id}?photoId=${id}`);
        window.location.href = `/somoim/detailPhoto/${somoim.id}?photoId=${id}`;
    };

    return (
        <>
            <div className={`${styles.add_pin_modal} `}>
            <Modal.Header closeButton style={{ padding: '0.8rem', backgroundColor: 'pink', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '95%' }}>
                        <Modal.Title>
                        제목 : <strong>{photoTitle}</strong>
                        </Modal.Title>        
                        <span style={{ marginLeft: 'auto' }}>
                            <button style={{ marginLeft: 'auto', marginRight:'1rem', backgroundColor: 'pink' }}>

                            </button>
                            조회수 : </span>
                    </div>
                </Modal.Header>
                <div className={`${styles.add_pin_container}`}>
                    <Modal.Body
                    className="d-flex justify-content-center"
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'row', paddingBottom: '0px' }}
                    >
                        <div className={`${styles.side}`} id={`${styles.left_side}`}>
                            <div className={`${styles.section2}`}>
                                
                                <div className={`${styles.modals_pin} mb-5`}
                                    style={{display: 'block', height: 'fit-content' }}>
                                        {imagesLoaded && (
                                    <Carousel
                                        data-bs-theme="dark"
                                        activeIndex={currentImageIndex}
                                        onSelect={(selectedIndex) => setCurrentImageIndex(selectedIndex)}
                                        interval={null}
                                        style={{ textAlign: 'center' }}
                                    >
                                    {generateCarouselItems()}
                                    </Carousel>
                                    )}
                                </div>
                            </div>
                            
                            <div className={`${styles.section2}`}>
                                <label htmlFor="upload_img" id={styles.upload_img_label} 
                                    style={{ display: 'block' }}>
                                    <div className={`${styles.upload_img_container}`} style={{ height: 'fit-content' }}>
                                        <div id={`${styles.dotted_border}`} style={{ height: 'fit-content' }}>
                                            <div className={`${styles.pint_mock_icon_container}`} 
                                                    style={{ marginBottom: '0px' }}>
                                                <img src="/image/somoim/up-arrow.png" alt="upload_img" className={`${styles.pint_mock_icon}`} />
                                            </div>
                                            <div className={`${styles.save_from_site}`}>이미지 업로드</div>
                                        </div>
                                    </div>

                                    <input
                                        onChange={uploadImg}
                                        type="file"
                                        name="upload_img"
                                        id="upload_img"
                                        value=""
                                        multiple
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={`${styles.side}`} id={`${styles.right_side}`}>
                            업로드하는 유저의 이름 : {user.name} / id번호 : {user.id}

                            <div className={`${styles.section2} gap-3`}>
                                <input
                                    type="text"
                                    className={`${styles.new_pin_input} pin_title`}
                                    id={`${styles.pin_title}_title`}
                                    name="photoTitle" // name을 추가
                                    value={pinDetails.photoTitle} // value를 상태 변수로 설정
                                    onChange={handleChange} // onChange 이벤트 추가
                                />
                                <textarea
                                    type="text"
                                    className={`${styles.new_pin_input} pin_description`}
                                    id={`${styles.pin_description}_content`}
                                    name="photoContent" // name을 추가
                                    value={pinDetails.photoContent} // value를 상태 변수로 설정
                                    onChange={handleChange} // onChange 이벤트 추가
                                    style={{ height: '15rem' }}
                                />
                                <input
                                    type="text"
                                    className={`${styles.new_pin_input} pin_destination`}
                                    id={`${styles.pin_destination}_link`}
                                    name="photoLink" // name을 추가
                                    value={pinDetails.photoLink} // value를 상태 변수로 설정
                                    onChange={handleChange} // onChange 이벤트 추가
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </div>
                    <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'pink', color: 'white' }}>
                        <div></div>
                        <div style={{ marginRight: '0.5rem', gap: '2' }}>
                                <Button variant="danger" size="sm" onClick={savePin}>저장</Button>
                                <Button variant="danger" size="sm" onClick={handleCancel}
                                                    style={{ marginLeft: '0.7rem' }}>취소</Button>
                        </div>
                    </Modal.Footer>
            </div>
        </>
    );
};

export default ImageModify;