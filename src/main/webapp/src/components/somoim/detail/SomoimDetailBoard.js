import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SomoimDetailBoard = ({ somoimId, user, isAdmin }) => {
    const [formData, setFormData] = useState({});
    const { introduceDetail } = formData;

    useEffect(() => {
        console.log('소모임 보드에서 부르는 로그인 유저 아이디 :' + (user && user.id ? user.id : 'User 정보 없음'));
        console.log('소모임 보드에서 부르는 소모임 아이디 :' + somoimId)

        //if (user && user.id) {
            axios.get(`/somoim/getSomoimForm?id=${somoimId}`)
                .then(res => {
                    setFormData(res.data)
                })
                .catch(error => console.log(error))
        //}
    },[somoimId, user])

    return (
        <div>
            소모임 게시판 페이지 입니다.<br/>
            (이즈머드민 : {isAdmin})
            {
                isAdmin === 2 && (
                    <div>
                        <div>(당신은 아직 미가입자 입니다.)</div><br/>
                        {introduceDetail}
                    </div>
                )
            }
        </div>
    );
};

export default SomoimDetailBoard;