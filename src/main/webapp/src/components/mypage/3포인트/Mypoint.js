import React, { useEffect, useState }  from 'react';
import Container from 'react-bootstrap/esm/Container';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import MypageSubHeader32 from '../5공통/MypageSubHeader3_2';

import axios from 'axios';

const Mypoint = () => {

    const [userObject, setUserObject] = useState({});
    console.log(userObject); //아무의미없음.userObject빈객체 방지용

    const [userDTO, setUserDTO] = useState({
        name: '',
        passwd: '',
        email: '',
        nickname: '',
        userRole: '',
        point: '디비연결안됨',
        communityScore: '',
        // 나머지 필드들에 대해서도 테이블의 컬럼에 따라 추가해주세요.
        // 예를 들면, dogsInfos, popularity, matching 등...
      });
      
    const [pointChargingDTO, setPointChargingDTO] = useState({
		price: '디비연결안됨',
		
      });
      
    useEffect(() => {

        // 로컬스토리지에서 유저 아이디 가져오기
        const userJsonString = localStorage.getItem('user');
      
        const userObject = JSON.parse(userJsonString);
        console.log(userObject);
        setUserObject(userObject);
        const userId = userObject.id;
  
        console.log("userId"+userId);

        axios.get(`http://localhost:8080/mypage/getUserProfileTest?userIdStr=${userId}`)
        .then((res) => {
            console.log(res.data);
            setUserDTO(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        
        axios.get('http://localhost:8080/mypage/getPointCharging?userIdStr=1')
        .then((res) => {
            console.log(res.data);
            setPointChargingDTO(res.data);
            //alert('성공')
        })
        .catch((error) => {
            console.log(error);
            //alert('실패')
        });
    }, []);

    return (
        <div>
            <MypageSubHeader32/>
            <Container className='px-10'> {/* 포인트 내용 */}
                <div className='row mt-6'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'><h3 className={Mypage.Point1}>전체 보유 포인트</h3></div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'> {/* P글씨 */}
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                        <div className={Mypage.Point2}>
                            {userDTO.point}<span className={Mypage.Point3}>P</span>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'><h3 className={Mypage.Point1}>소멸 예정 포인트! (7일 이내)</h3></div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'> {/* P글씨 */}
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                        <div className={Mypage.Point2}>
                            {pointChargingDTO.price}<span className={Mypage.Point3}>P</span>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
            </Container>         
        </div>
    );
};

export default Mypoint;