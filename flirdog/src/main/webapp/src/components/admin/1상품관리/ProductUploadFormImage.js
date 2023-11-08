import React, { useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import axios from "axios";

const ProductUploadFormImage = () => {
  const imgRef = useRef();
  const [userUploadDTO, setUserUploadDTO] = useState({
    imageName: "",
    imageContent: "",
    imageFileName: "",
    imageOriginalFileName: "",
  });
  const [imgList, setImgList] = useState([]);
  const [file, setFile] = useState("");
  const [showImgSrc, setShowImgSrc] = useState("");
  const [showImg, setShowImg] = useState(false);

  const onUploadSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userUploadDTO", userUploadDTO);
    formData.append("img[]", imgList);
    console.log("아래는 formData");
    console.log(formData);

    axios
      .post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => alert("업로드 성공"))
      .catch((error) => {
        console.log(error);
        alert("업로드 실패");
      });
  };

  const { imageName, imageContent, imageFileName, imageOriginalFileName } =
    userUploadDTO;
  const onInput = (e) => {
    const { name, value } = e.target;
    setUserUploadDTO({
      ...userUploadDTO,
      [name]: value,
    });
  };

  const onReset = (e) => {
    e.preventDefault();

    setUserUploadDTO({
      imageName: "",
      imageContent: "",
      imageFileName: "",
      imageOriginalFileName: "",
    });

    setImgList([]);

    imgRef.current.value = "";
  };

  const onCamera = () => {
    imgRef.current.click();
  };

  const onImgInput = (e) => {
    // 이미지 입력 이벤트 핸들러 함수
    const files = Array.from(e.target.files); // 이벤트에서 파일 목록 가져오기
    const imgArray = files.map((item) => URL.createObjectURL(item)); // 파일 목록을 URL 배열로 변환
    setImgList(imgArray); // 이미지 목록 업데이트
  };

  // const readUrl = (input) => {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = function (e) {
  //       var img = document.createElement("img");
  //       img.setAttribute("src", e.target.result);
  //       img.setAttribute("width", "100%");
  //       img.setAttribute("height", "100%");
  //       img.setAttribute("alt", "상품 이미지");
  //       document.querySelector(".imageContainer").appendChild(img);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // };
  return (
    <div>
      <form>
        <table style={{ border: "1px solid black" }}>
          <tr style={{ border: "1px solid black" }}>
            <th>상품명</th>
            <td>
              <input
                type="text"
                name="imageName"
                size={35}
                onChange={onInput}
                value={imageName}
              />
            </td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <td colSpan={2} align="center">
              <textarea
                name="imageContent"
                rows={10}
                cols={50}
                onChange={onInput}
                value={imageContent}
              ></textarea>
            </td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <td colSpan={2}>
              <div className="d-flex">
                {imgList.map((item, index) => (
                  <img key={index} src={item} style={{ width: 100 }} />
                ))}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                onClick={onCamera}
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              <input
                type="file"
                name="img[]"
                ref={imgRef}
                // onChange={(e) => readUrl(e.target)}
                onChange={onImgInput}
                multiple
                hidden
              />
            </td>
          </tr>
          <div className="imageContainer"></div>

          <tr>
            <td colSpan={2} align="center">
              <Button variant="success" onClick={onUploadSubmit}>
                파일 업로드
              </Button>{" "}
              <Button variant="info" onClick={onReset}>
                취소
              </Button>{" "}
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default ProductUploadFormImage;
