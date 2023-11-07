import React, { useRef, useState } from "react";

import Button from "react-bootstrap/Button";

const ProductUploadFormImage = () => {
  const imgRef = useRef();
  const onCamera = () => {
    imgRef.current.click();
  };
  const [file, setFile] = useState("");
  const [showImgSrc, setShowImgSrc] = useState("");
  const readUrl = (input) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var img = document.createElement("img");
        img.setAttribute("src", e.target.result);
        img.setAttribute("width", "100%");
        img.setAttribute("height", "100%");
        img.setAttribute("alt", "상품 이미지");
        document.querySelector(".imageContainer").appendChild(img);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  return (
    <div>
      <form>
        <table style={{ border: "1px solid black" }}>
          <tr style={{ border: "1px solid black" }}>
            <th>상품명</th>
            <td>
              <input type="text" name="imageName" size={35} />
            </td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <td colSpan={2} align="center">
              <textarea name="imageContent" rows={10} cols={50}></textarea>
            </td>
          </tr>

          <tr style={{ border: "1px solid black" }}>
            <td colSpan={2}>
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
                onChange={(e) => readUrl(e.target)}
                multiple
                hidden
              />
            </td>
          </tr>
          <div className="imageContainer"></div>

          <tr>
            <td colSpan={2} align="center">
              <Button variant="success">파일 업로드</Button>{" "}
              <Button variant="info">취소</Button>{" "}
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default ProductUploadFormImage;
