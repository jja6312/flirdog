import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "@looop/quill-image-resize-module-react";

import axios from "axios";

Quill.register("modules/ImageResize", ImageResize);

const TextEditor = ({ setContentUseState, name }) => {
  const quillElement = useRef();
  const onInput = (content) => {
    // setContentUseState가 객체인 경우
    if (typeof setContentUseState === "object") {
      setContentUseState((prev) => {
        return { ...prev, [name]: content };
      });
    }
    // setContentUseState가 배열인 경우
    else if (Array.isArray(setContentUseState)) {
      setContentUseState((prev) => {
        return [...prev, content];
      });
    }
    // setContentUseState가 텍스트인 경우
    else {
      setContentUseState(content);
    }
  };

  //   const imageHandler = () => {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.setAttribute("accept", "image/*");
  //     input.click();

  //     input.onchange = async () => {
  //       const file = input.files[0];
  //       const formData = new FormData();
  //       formData.append("image", file);

  //       try {
  //         // 서버에 이미지 업로드
  //         const response = await axios.post(
  //           "https://java.flirdog.store:8080/admin/uploadImage",
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           }
  //         );

  //         // 서버로부터 받은 이미지 URL
  //         const imageUrl = response.data.imageUrl; // 서버에서 반환하는 이미지 URL
  //         const editor = quillElement.current.getEditor();
  //         const range = editor.getSelection();
  //         editor.insertEmbed(range.index, "image", imageUrl);
  //       } catch (error) {
  //         console.error("이미지 업로드 실패:", error);
  //       }
  //     };
  //   };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        // ["link", "image"],
        ["link"],
        [{ align: [] }, { color: [] }, { background: [] }],
        ["clean"],
      ],
      //   handlers: {
      //     image: imageHandler,
      //   },
    },
    ImageResize: { modules: ["Resize"] },
  };

  const formats = [
    // 'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <>
      <div
        sx={{
          "  .ql-editor": {
            padding: "30px",
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.5)",
            margin: "2px",
            width: "100%",
            maxHeight: "75vh",
            minHeight: "75vh",
            backgroundColor: "white",
          },
          "  .ql-container.ql-snow": {
            border: "none",
            display: "flex",
            justifyContent: "center",
          },
        }}
        ref={quillElement}
      >
        <ReactQuill
          className="form-control text-editor"
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={onInput}
          style={{ width: "100%", height: "300px" }}
          placeholder="내용을 입력하세요."
          //---------------아래 내용에 대해 props를 받아서 처리해야함----------------
          name={name}
        />
      </div>
    </>
  );
};

export default TextEditor;
