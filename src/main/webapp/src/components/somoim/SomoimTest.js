import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const SomoimTest = () => {
    const [isAdmin, setIsAdmin] = useState();
    const [somoimJoin, setSomoimJoin] = useState({});
    const navigate = useNavigate();
    const { subMenu = 'detailMain', somoimId } = useParams();
    const { user } = useContext(UserContext); // 유저 컨텍스트
    const { id, name } = user

    const joinSomoim = async (e) => { // 소모임 회원가입
        const confirmed = window.confirm('해당 소모임에 참여하시겠습니까?');
        if(!id) {
            alert('먼저 로그인해 주십시오.')
            navigate('/login')
        }
        if (confirmed) {
            await axios.post(`/somoim/joinSomoim`, {
              somoimId: somoimId,
              userId: id,
            }).then(res => {
                setSomoimJoin(res.data)
                console.log(somoimJoin)
                alert('소모임에 가입하셨습니다.');
            }).catch(e => console.log(e));
      
          } else {
            console.log("유저 id 또는 소모임 id가 없습니다.");
          }
    }

    return (
        <div>
            {isAdmin === 0 ? '가입자' : '미가입자'} / {isAdmin === 1 ? '가입자' : '미가입자'}
            {
                isAdmin !== 0 && isAdmin !== 1 && (
                    <Button variant="outline-danger" onClick={joinSomoim} style={{ alignSelf: 'center' }}>
                        가입하기
                    </Button>
                )
            }
        </div>
    );
};

export default SomoimTest;