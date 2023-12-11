import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';
import axios from 'axios';

const ImageReply = ({ onSubmitComment, selectedPhotoInfo, onUpdateComments  }) => {
    const [photoComment, setPhotoComment] = useState({
        comment: '',
        userId: '',
        somoimId: '',
        photoId: '',
    });
    //const [comment, setComment] = useState('');
    const [comments, setComments] = useState([{}]);

    // 해당 글 정보
    const { createdAt, modifiedAt, id, photoTitle, photoContent, 
        photoLink, photoLike, hit, somoimPhoto, somoim } = selectedPhotoInfo || {};
    console.log('사진첩 댓글 somoimId : ', somoim?.id);
    
    // 해당 유저 정보
    const { user } = useContext(UserContext); // 유저 컨텍스트
    console.log('사진첩 댓글창에서 부르는 로그인 유저 아이디 : ' + (user ? user.id : 'User 정보 없음'));

    useEffect(() => {
        console.log('ImageReply - Selected Photo Info:', selectedPhotoInfo);
        if (selectedPhotoInfo) {
            setPhotoComment(prevComment => ({
                ...prevComment,
                userId: user?.id,
                somoimId: somoim?.id,
                photoId: id,
            }));
        }
    }, [selectedPhotoInfo, somoim?.id, id, user?.id]);

    console.log('photoComment:', photoComment);

    
    // 댓글목록 조회
    const fetchComments = useCallback(async () => {
    //const fetchComments = async () => {
        try {
            const response = await axios.get(`/somoim/somoimPhotoComments?photoId=${id}`);
            setComments(response.data);
            onUpdateComments(response.data);
            console.log('댓글 불러온 목록 : ', response.data)
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
   // };
}, [id, setComments]);

    useEffect(() => {
        // 최초 렌더링 시 댓글 목록을 가져옴
        fetchComments();
    }, [fetchComments]);


    // 댓글 submit
    const onSubmitPhotoComment = async () => {
        if(window.confirm('댓글을 등록하시겠습니까?')) {
            try {
                const postData = {
                    comment: photoComment.comment,
                    userId: photoComment.userId,
                    somoimId: photoComment.somoimId,
                    photoId: photoComment.photoId,
                };
                console.log('postData:', postData);
    
                await axios.post('/somoim/somoimPhotoComment', postData)
                .then(res => {
                    console.log('댓글이 등록되었습니다!')
                    // 댓글 등록 후 서버에서 최신 댓글 목록을 다시 받아옴
                    fetchComments();
                    onSubmitComment(photoComment.comment);
            
                    console.log('Submitted comment:', photoComment.comment);
            
                    setPhotoComment({
                        ...photoComment,
                        comment: '', // 댓글 입력 초기화
                    });
                })
                .catch(e => console.log(e))
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    // 입력값이 변경될 때마다 콘솔에 출력
    const handleCommentChange = (e) => {
        const newComment = e.target.value;
        console.log('Comment changed:', newComment);
        setPhotoComment({
            ...photoComment,
            comment: newComment,
        });
    };

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <InputGroup className="mb-1">
                <InputGroup.Text>댓글 작성</InputGroup.Text>
                <Form.Control type="text" 
                    placeholder="상대를 배려하는 댓글을 달아주세요."
                    aria-label="소모임 사진첩 댓글란" 
                    value={photoComment.comment} // 입력된 댓글을 표시
                    onChange={handleCommentChange}
                    />
                <Button variant="outline-secondary" onClick={onSubmitPhotoComment}>등록</Button>
            </InputGroup>
        </Form.Group>
    );
};

export default ImageReply;