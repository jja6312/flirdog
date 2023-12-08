import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import CommentInput from './CommentInput';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import moment from 'moment';

const Comments = ({getBoardDTO}) => {
    const { user } = useContext(UserContext); // 유저 컨텍스트
    const { id } = user;

    const [commmetList, setCommmetList] = useState([]);
    //현재 로그인한 유저의 닉네임 가져오기
    const [loginUser, setLoginUser] = useState({ 
        id: "",
        nickname: "",
        content: "",
    });   

    // 작성한 댓글 목록 가져오기
    useEffect(() => {
        // boardDTO에 있는 id 값을 사용하여 해당 게시글의 댓글을 가져오기
        if (commmetList) {
            axios
                .get(`http://localhost:8080/boastBoard/getBoastBoardCommentList?boardId=${getBoardDTO.id}`)
                .then((res) => {
                    console.log(res.data);
                    setCommmetList(res.data);
                    console.log("commmetList");
                    console.log(commmetList);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [commmetList]);

        
    useEffect(() => {
        // 사용 전에 id가 정의되었는지 확인
        if (id) {
            // id를 이용한 컴포넌트 로직 처리
            console.log(id); // ----3
        }

        axios.get(`http://localhost:8080/boastBoard/getUser?id=${id}`)
        .then((res) => {
            console.log(res.data);
            setLoginUser(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    const [comments, setComments] = useState([]);
    
    const nextId = useRef(0);

    const onInsert = useCallback(
        (name, content) => {
            const comment = {
            id: nextId.current,
            name: loginUser.nickname,
            content
            };
            console.log("nextId.current");
            console.log(nextId.current);
            console.log("name");
            console.log(name);
            console.log("content");
            console.log(content);
            setComments(prevComments => [...prevComments, comment]);
            nextId.current += 1; //nextId 1씩 더하기
        },
        [comments, loginUser],
    );
    
    return (
        <div>
            <div style={{ marginBottom: comments.length ? "1rem" : "0", borderBottom: comments.length ? '1.5px solid #dddddd' : 'none' }}>
                {
                    commmetList.map((comment, index) => {
                        // 날짜 표현
                        const createdAtDate = moment(comment.createdAt).format('YYYY-MM-DD');
                        const createdAtTime = moment(comment.createdAt).format('HH:mm');

                        return (
                            <div key={index} style={{ marginBottom: '10px', borderBottom:'1px solid #eeeeee'}}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                    <img src='/image/boastBoard/dogUserImage.jpg' width={25} height={25} alt=''
                                        style={{ borderRadius: '50%', border: '2px solid pink' }} />&nbsp;&nbsp;
                                    <div><strong>{comment.userNickName}</strong></div>&nbsp;&nbsp;
                                    <div style={{ fontSize: '0.8em', fontWeight: 'bold', color: '#707070' }}>{createdAtDate}&nbsp;&nbsp;{createdAtTime}</div>&nbsp;&nbsp;
                                </div>
                                <div>
                                    <div style={{ color: '#707070', fontWeight: 'bold' }}>{comment.content}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div>
                <CommentInput getBoardDTO={getBoardDTO} onInsert={onInsert} loginUser={loginUser} />
            </div>
      </div>
    );
};

export default Comments;