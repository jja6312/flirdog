import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
// import { Editor, Viewer } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

// const ContentsViewer = ({ contents }) => (
//   <Viewer initialValue={contents || ""} />
// );

const EditorBox = () => {
  const editorRef = useRef();
  const editorGo = () => {
    const data = editorRef.current.getInstance().getHTML();
    console.log(data);
    alert(data);
  };

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    console.log(data);
  };

  const onUploadImage = async (blob, callback) => {
    console.log(blob);
    alert(blob);
  };

  //설명 : editorRef.current().getInstatnce() 로 에디터의 설정값을 가져올 수 있습니다!
  return (
    <>
      <Editor
        // initialValue=""
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        language="ko-KR"
        ref={editorRef}
        onChange={onChange}
        plugins={[colorSyntax]}
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
      />
      <button onClick={editorGo}>에디터 내용보기</button>
      <br></br>
      {/* <div>
        <ContentsViewer contents={editorRef.current?.getInstance().getHTML()} />
      </div> */}
    </>
  );
};

export default EditorBox;
