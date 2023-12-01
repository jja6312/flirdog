import React, { useRef, useState } from 'react';

import styles from '../../../css/somoim/detail/modal_styles.module.css';

const ImageModal = (props) => {
    const [pinDetails, setPinDetails] = useState({
        author: '',
        board: '',
        title: '',
        description: '',
        destination: '',
        img_blob: '',
        pin_size: '',
    });
    const [showLabel, setShowLabel] = useState(true);
    const [showModalPin, setShowModalPin] = useState(false);
    const imageRef = useRef(null); // 이미지 엘리먼트에 대한 참조를 만듦

    const uploadImg = (event) => {
        if (event.target.files && event.target.files[0]) {
            if (/image\/*/.test(event.target.files[0].type)) {
                const reader = new FileReader();

                reader.onload = function () {
                    setPinDetails({
                        ...pinDetails,
                        img_blob: reader.result
                    });
                    setShowLabel(false);
                    setShowModalPin(true);
                }

                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }

    const checkSize = () => {
        const image = imageRef.current; // 이미지 엘리먼트에 대한 참조 사용

        if (image) {
            const styles = window.getComputedStyle(image);
            const imageWidth = parseFloat(styles.width);
            const parentWidth = parseFloat(styles.getPropertyValue('--parent-width')); // 여기에 부모의 width 값을 가져오는 CSS 변수 이름을 넣으세요.
    
            if (imageWidth < parentWidth) {
                image.style.maxWidth = '100%';
            } else {
                image.style.maxHeight = '100%';
            }
    
            image.style.opacity = 1;
        }
    }

    const savePin = () => {
        const users_data = {
            ...pinDetails,
            author: 'Jack',
            board: 'default',
            title: document.querySelector('.pin_title').value,
            description: document.querySelector('.pin_description').value,
            destination: document.querySelector('.pin_destination').value,
            pin_size: document.querySelector('.pin_size').value,
        };

        props.add_pin(users_data);
    };

    return (
        <div className={`${styles.add_pin_modal}`}>
            <div className={`${styles.add_pin_container}`}>
                <div className={`${styles.side}`} id={`${styles.left_side}`}>
                    {/* <div className={`${styles.section1}`}>
                        <div className={`${styles.pint_mock_icon_container}`}>
                            <img src="/image/somoim/ellipse.png" alt="edit" className={`${styles.pint_mock_icon}`} />
                        </div>
                    </div> */}

                    <div className={`${styles.section2}`}>
                        <label htmlFor="upload_img" id={styles.upload_img_label}
                            style={{
                                display: showLabel ? 'block' : 'none'
                            }}>
                            <div className={`${styles.upload_img_container}`}>
                                <div id={`${styles.dotted_border}`}>
                                    <div className={`${styles.pint_mock_icon_container}`} style={{ marginBottom: '20px' }}>
                                        <img src="/image/somoim/up-arrow.png" alt="upload_img" className={`${styles.pint_mock_icon}`} />
                                    </div>
                                    <div>클릭 후 업로드할 사진을 선택하세요.</div>
                                    <div>20M이하의 .jpg 확장자 파일만 가능합니다.</div>
                                </div>
                            </div>

                            <input onChange={uploadImg} type="file" name="upload_img" id="upload_img" value="" />
                        </label>

                        <div className={`${styles.modals_pin}`}
                            style={{
                                display: showModalPin ? 'block' : 'none'
                            }}>
                            <div className={`${styles.pin_image}`}>
                                <img ref={imageRef} onLoad={checkSize} src={pinDetails.img_blob} alt="pin_image" />
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.section3}`}>
                        <div className={`${styles.save_from_site}`}>Save from site</div>
                    </div>
                </div>

                <div className={`${styles.side}`} id={`${styles.right_side}`}>
                    <div className={`${styles.section1}`}>
                        <div className={`${styles.select_size}`}>
                            <select defaultValue="Select" name="pin_size" className='pin_size' id={`${styles.pin_size}`}>
                                <option value="">썸네일 사이즈</option>
                                <option value="small">small</option>
                                <option value="medium">medium</option>
                                <option value="large">large</option>
                            </select>
                            <div onClick={savePin} className={`${styles.save_pin}`}>크기 선택</div>
                        </div>
                    </div>

                    <div className={`${styles.section2}`}>
                        <input placeholder="사진의 제목을 입력하세요" type="text" className={`${styles.new_pin_input} pin_title`} id={`${styles.pin_title}`} />
                        <input placeholder="사진에 대한 자세한 설명을 입력하세요" type="text" className={`${styles.new_pin_input} pin_description`} id={`${styles.pin_description}`} />
                        <input placeholder="사진과 관련된 링크를 남겨주세요" type="text" className={`${styles.new_pin_input} pin_destination`} id={`${styles.pin_destination}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;