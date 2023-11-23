import React, { useRef } from "react";
import Button from "react-bootstrap/esm/Button";

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

  // const onUploadImage = async (blob, callback) => {
  //   console.log(blob);
  //   alert(blob);
  // };

  return (
    <>
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <Button
          style={{ backgroundColor: "#F56084", border: "none" }}
          onClick={editorGo}
        >
          에디터야, DB갈때 어떻게 가니?
        </Button>
      </div>
      <br></br>
    </>
  );
};

export default EditorBox;
