import React from "react";
import styles from "../../../../css/admin/1상품관리/productPrimaryInfo.module.css";

import xBox from "../../../../css/admin/1상품관리/xBox.module.css";

const ProductThumnail = ({ imgRef, imgList, setImgList, setImgFiles }) => {
  const onReset = (e) => {
    e.preventDefault();

    setImgList([]);

    imgRef.current.value = "";
  };

  const onImgInput = (e) => {
    // 이미지 입력 이벤트 핸들러 함수
    const files = Array.from(e.target.files); // 이벤트에서 파일 목록 가져오기
    const imgArray = files.map((item) => URL.createObjectURL(item)); // 파일 목록을 URL 배열로 변환
    setImgList(imgArray); // 이미지 목록 업데이트
    setImgFiles(files); // 파일 목록 업데이트

    console.log(e.target.files);
    console.log(files);
  };

  return (
    <div className={styles.tableDiv}>
      <table className={styles.tableContainer}>
        <tr>
          <th className={styles.tableTh}>상품 등록</th>
          <td className={styles.tableTd}>
            <input
              className={styles.fontStyleGray08}
              type="file"
              name="img[]"
              ref={imgRef}
              onChange={onImgInput}
            />
          </td>
        </tr>
        <tr>
          <th
            id="imgPreview"
            className={`${styles.tableTh}`}
            style={{ height: "100px" }}
          >
            이미지 미리보기
          </th>
          <td className={`${styles.tableTd}`}>
            <div
              style={{
                position: "relative",
                width: "100px",
                height: "120px",
                overflow: "hidden",
              }}
            >
              {imgList.map((item, index) => (
                <img
                  alt=""
                  key={index}
                  src={item}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              ))}
              {/* imgRef의 input에 파일이 있다면, <div>생성</div> */}
              {imgList.length > 0 && (
                <div onClick={onReset} className={xBox.xBox}>
                  <span>ㅡ</span>
                </div>
              )}
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ProductThumnail;
