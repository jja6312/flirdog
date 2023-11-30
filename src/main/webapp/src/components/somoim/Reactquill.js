import React, { useRef, useState } from 'react';
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import '../../css/somoim/main/quill.snow.css';
import Quill from 'quill';
import ImageResize from '@looop/quill-image-resize-module-react';


//Quill.register('modules/ImageResize', ImageResize);

const Reactquill = ({onContentChange, isDisable}) => {
    const quillElement = useRef();

    const [quillValue, setQuillValue] = useState("");

    //const handleQuillChange = (content, delta, source, editor) => {
    const handleQuillChange = (e) => {
        //setQuillValue(editor.getHTML()); // HTML 코드 가져오기
        //const htmlContent = editor.getHTML();
        //setQuillValue(editor.getContents());
        //setQuillValue(content);
        //onContentChange(quillValue); // HTML 코드를 부모 컴포넌트로 전달
        setQuillValue(e);
        onContentChange(quillValue); 
        console.log('상세정보: ' +  quillValue );
    };

    const modules = {        
        toolbar: [            
            // [{ 'font': [] }],            
            [{ 'header': [1, 2, 3, false] }],            
            ['bold', 'italic', 'underline','strike', 'blockquote'],            
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],            
            //['link','image'],
            ['link'],                  
            [{ 'align': [] }, { 'color': [] }, { 'background': [] }],  // dropdown with defaults from theme            
            ['clean']        
        ],        
        //ImageResize: { modules: ['Resize'] },    
    }        
    
    const formats = [        
        // 'font',        
        'header', 
        'bold', 'italic', 'underline', 'strike', 'blockquote', 
        'list', 'bullet','indent', 
        'link', 'image',
        //'image',
        'align', 'color', 'background'            
    ]

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
                    theme = 'snow'            
                    modules = {modules}            
                    formats = {formats}            
                    value = {quillValue || ''}       
                    //onChange = {() => handleQuillChange} 
                    onChange={handleQuillChange}         
                    style = {{ width: '100%', height: '300px' }}        
                    placeholder='소모임에 대한 상세정보를 입력해주세요.'    
                    readOnly={isDisable}        
                />
            </div>
        </>
    );
};

export default Reactquill;