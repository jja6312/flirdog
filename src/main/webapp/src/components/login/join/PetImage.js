import React, { useRef, useState } from "react";
import productPrimaryInfo from "../../../css/admin/1상품관리/productPrimaryInfo.module.css";

const PetImage = ({ imgFiles, setImgFiles, login, onAcceptImage }) => {
  const fileInputRef = useRef();
  const [imgList, setImgList] = useState([]); //미리보기 이미지

  const onImgInput = (e) => {
    // 이미지 입력 이벤트 핸들러 함수
    const files = Array.from(e.target.files); // 이벤트에서 파일 목록 가져오기
    const imgArray = files.map((item) => URL.createObjectURL(item)); // 파일 목록을 URL 배열로 변환
    setImgList(imgArray); // 이미지 목록 업데이트
    setImgFiles(files); // 파일 목록 업데이트

    console.log(e.target.files);
    console.log(files);
  };

  const handleImgClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div
        onClick={handleImgClick}
        className="d-flex justify-content-center align-items-center mt-5"
        style={{
          width: 300,
          height: 300,
          backgroundColor: "black",
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {imgList.length > 0 ? (
          imgList.map((item, index) => (
            <img
              key={index}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={item}
              alt="dogProfileImg"
            />
          ))
        ) : (
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="/image/nullImage/nullImage1.png"
            alt="dogProfileImg"
          />
        )}
      </div>
      <input
        ref={fileInputRef}
        className={productPrimaryInfo.fontStyleGray08}
        type="file"
        name="img[]"
        onChange={onImgInput}
        hidden
      />
    </>
  );
};

export default PetImage;
