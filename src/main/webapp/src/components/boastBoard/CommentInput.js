import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const CommentInput = ({ getBoardDTO, onInsert, loginUser }) => {
  const [getBoardDTO2, setGetBoardDTO2] = useState({});

  const [commmetDTO, setCommentDTO] = useState({
    userId: "",
    boardId: getBoardDTO.id,
    userNickName: "",
    content: "",
  });

  const [value, setValue] = useState({
    name: loginUser.nickname,
    content: "",
  });

  useEffect(() => {
    if (loginUser && loginUser.id) {
      setCommentDTO((commentDTO) => ({
        ...commentDTO,
        userId: loginUser.id,
        boardId: getBoardDTO.id,
        userNickName: loginUser.nickname,
      }));
    }
  }, [loginUser]);

  const onChangeContent = useCallback((e) => {
    setValue((value) => ({
      ...value,
      content: e.target.value,
    }));
  }, []);

  const onInput = useCallback((e) => {
    const { name, value } = e.target;
    setCommentDTO((commmetDTO) => ({
      ...commmetDTO,
      [name]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      onInsert(value.name, value.content);

      try {
        const updatedCommentDTO = {
          ...commmetDTO,
          content: value.content,
        };

        setCommentDTO(updatedCommentDTO);

        const response = await axios.post(
          "https://java.flirdog.store/boastBoard/boastCommentWrite",
          updatedCommentDTO
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }

      setGetBoardDTO2((prevBoardDTO) => ({
        ...prevBoardDTO,
        commentCount: prevBoardDTO.commentCount + 1,
      }));

      setValue((prevValue) => ({
        ...prevValue,
        content: "",
      }));
    },
    [onInsert, value, commmetDTO, setGetBoardDTO2]
  );

  const textareaStyle = {
    border: "2px solid #ccc", // 테두리 스타일 지정
    borderRadius: "4px", // 테두리 모서리 둥글게 지정
    padding: "8px", // 내부 여백 지정
    resize: "none", // 사용자가 크기를 조절하지 못하도록 설정
    fontSize: "1em",
  };

  return (
    <Form className="CommentInsert">
      <Form.Group>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ fontWeight: "bold" }}>{loginUser.nickname}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Control
              as="textarea"
              placeholder="댓글을 작성하세요"
              name="content"
              value={value.content}
              onChange={(e) => {
                onChangeContent(e);
                onInput(e);
              }}
              rows={4} // 행의 크기
              cols={50} // 열의 크기
              style={textareaStyle}
            />
            <Button
              variant="submit"
              style={{
                width: "70px",
                marginLeft: "20px",
                backgroundColor: "#F56084",
                borderColor: "#F56084",
                fontWeight: "bold",
                color: "white",
              }}
              onClick={onSubmit}
            >
              작성
            </Button>
          </div>
        </div>
      </Form.Group>
    </Form>
  );
};

export default CommentInput;
