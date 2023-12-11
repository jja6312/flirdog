import React, { useContext, useRef, useState } from 'react';

import styles from '../../../css/somoim/detail/modal_styles.module.css';
import { UserContext } from '../../../contexts/UserContext';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

const ImageModal = React.forwardRef((props, ref) => {
    const { user } = useContext(UserContext); // 유저 컨텍스트
    console.log('사진첩 모달창에서 부르는 로그인 유저 아이디 : ' + (user ? user.id : 'User 정보 없음'));
    //console.log('사진첩 모달창에서 부르는 로그인 유저 아이디 :' + (user && user.id ? user.id : 'User 정보 없음'));
    const { somoimId } = props;
    console.log('사진첩 somoimId : ', somoimId)
    const [pinDetails, setPinDetails] = useState({
        user : {
            id: user.id
        },
        photoTitle: '',
        photoContent: '',
        photoLink: '',
        hit: 0,
        photoLike: 0,
        somoim : {
            id : Number(somoimId)
        }
        // somoim: {
        //     "id": {somoimId},
        // },
    });
    const [showLabel, setShowLabel] = useState(true);
    const [showModalPin, setShowModalPin] = useState(false);

    const [images, setImages] = useState([]);  // (미리보기) 이미지배열
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // (미리보기) 현재 표시되는 이미지의 인덱스스
    const [imgFiles, setImgFiles] = useState([]); // (실제 업로드) 이미지 배열

    const imageRef = useRef(null); // 이미지 엘리먼트에 대한 참조를 만듦
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPinDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));

        console.log('pinDetails : ', pinDetails)
    };

    // 이미지 미리보기
    const uploadImg = (event) => {
        if (event.target.files && event.target.files.length > 0 && images.length < 5) {
            const newImages = [...images];
            const newImgFiles = [...imgFiles];

            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();

                reader.onload = function () {
                    newImages.push(reader.result);
                    // setImages(newImages);
                    // setImgFiles(newImages);
                    setCurrentImageIndex(newImages.length - 1);
                    setShowLabel(false);
                    setShowModalPin(true);
                };

                reader.readAsDataURL(event.target.files[i]);
                newImgFiles.push(event.target.files[i]);
            }//for

            setImages(newImages);
            setImgFiles(newImgFiles);
        }//if
    };

    // 이미지 전송
    const savePin = async () => {

        if (window.confirm("업로드 하시겠습니까?")) {

            // 이미지 배열과 상세 정보를 합쳐서 서버로 전송
            const formData = new FormData();
    
            // 이미지 배열을 formData에 추가
            for (var i = 0; i < imgFiles.length; i++) {
                formData.append("imgFiles", imgFiles[i]);
            }
    
            // 기타 필요한 데이터 추가
            // formData.append('writer', user.id);
            // formData.append('title', pinDetails.title);
            // formData.append('content', pinDetails.content);
            // formData.append('link', pinDetails.link);
            // formData.append('hit', pinDetails.hit);
            // formData.append('photoLike', pinDetails.photoLike);
    
            // 기타 필드를 JSON 문자열로 직렬화하여 추가
            // const photoFields = {
            //     writer: user.id,
            //     title: pinDetails.title,
            //     content: pinDetails.content,
            //     link: pinDetails.link,
            // };
            formData.append(
                "pinDetails",
                new Blob([JSON.stringify(pinDetails)], { type: "application/json" })
            );
    
            console.log('업로드 전 formData', formData)
    
            try {
                // Content-Type을 명시적으로 설정
                const config = {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                };
    
                // await axios.post('/somoim/somoimPhotoUpload', {
                //     photoFields: photoFields,
                //     imgFiles: imgFiles
                // })
                await axios.post('/somoim/somoimPhotoUpload', formData, config)
                    .then(res => {
                        console.log('업로드 후 formData', res.data)
                        alert('사진 업로드가 완료되었습니다.')
                        // 업로드 성공 시 onSavePin 콜백(사용자 정의 함수) 호출
                        props.onSavePin(res.data);
                    }).catch(e => console.log(e));
            } catch (error) {
                console.error('이미지 업로드 오류 : ', error);
            }//try-catch
        }

    };

    React.useImperativeHandle(ref, () => ({
        savePin: savePin,
    }));

    return (
        <div className={`${styles.add_pin_modal}`}>
            <div className={`${styles.add_pin_container}`}>
                <div className={`${styles.side}`} id={`${styles.left_side}`}>

                    <div className={`${styles.section2}`}>
                        <label htmlFor="upload_img" id={styles.upload_img_label} 
                            style={{ 
                                display: showLabel ? 'block' : 'none' 
                            }}>
                            <div className={`${styles.upload_img_container}`}>
                                <div id={`${styles.dotted_border}`}>
                                    <div className={`${styles.pint_mock_icon_container}`} 
                                            style={{ marginBottom: '20px' }}>
                                        <img src="/image/somoim/up-arrow.png" alt="upload_img" className={`${styles.pint_mock_icon}`} />
                                    </div>
                                    <div>클릭 후 업로드할 사진을 선택하세요.</div>
                                    <div>20M이하의 .jpg 확장자 파일만 가능합니다.</div>
                                    <div>(최대 5장까지 가능)</div>
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

                        <div className={`${styles.modals_pin}`}
                            style={{
                                display: showModalPin ? 'block' : 'none'
                            }}>
                            <Carousel
                                activeIndex={currentImageIndex}
                                onSelect={(selectedIndex) => setCurrentImageIndex(selectedIndex)}
                                interval={null} // 자동 스크롤 비활성화
                                style={{ textAlign: 'center' }} 
                            >
                                {images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                            <img className={`${styles.pin_image}`} src={image} alt={`slide-${index}`} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </div>

                    <div className={`${styles.section3}`}>
                        <div className={`${styles.save_from_site}`}>이미지 업로드</div>
                    </div>
                </div>

                <div className={`${styles.side}`} id={`${styles.right_side}`}>
                    업로드하는 유저의 이름 : {user.name} / id번호 : {user.id}

                    <div className={`${styles.section2} gap-3`}>
                        <input
                            placeholder="사진의 제목을 입력하세요"
                            type="text"
                            className={`${styles.new_pin_input} pin_title`}
                            id={`${styles.pin_title}`}
                            name="photoTitle" // name을 추가
                            value={pinDetails.title} // value를 상태 변수로 설정
                            onChange={handleChange} // onChange 이벤트 추가
                        />
                        <textarea
                            placeholder="사진에 대한 자세한 설명을 입력하세요"
                            type="text"
                            className={`${styles.new_pin_input} pin_description`}
                            id={`${styles.pin_description}`}
                            name="photoContent" // name을 추가
                            value={pinDetails.content} // value를 상태 변수로 설정
                            onChange={handleChange} // onChange 이벤트 추가
                            style={{ height: '15rem' }}
                        />
                        <input
                            placeholder="사진과 관련된 링크를 남겨주세요"
                            type="text"
                            className={`${styles.new_pin_input} pin_destination`}
                            id={`${styles.pin_destination}`}
                            name="photoLink" // name을 추가
                            value={pinDetails.link} // value를 상태 변수로 설정
                            onChange={handleChange} // onChange 이벤트 추가
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ImageModal;