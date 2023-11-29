
import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Mypage from '../../css/main/100마이페이지/mypage.module.css';
import MypageSubHeader11 from './5공통/MypageSubHeader1_1';

import axios from 'axios';



const MypageMain = () => {

    
    const [userDTO, setUserDTO] = useState({
        name: '',
        passwd: '',
        email: '',
        nickname: '',
        userRole: '',
        point: 0,
        communityScore: 0,
        // 나머지 필드들에 대해서도 테이블의 컬럼에 따라 추가해주세요.
        // 예를 들면, dogsInfos, popularity, matching 등...
      });


    useEffect(() => {
        axios.get('http://localhost:8080/mypage/getUserProfileTest?userIdStr=1')
        .then((res) => {
            console.log(res.data);
            setUserDTO(res.data);
        })
        .catch((error) => {
            console.log(error);
            alert('실패')
        });
    }, []);

    const getEmailLogo = () => {
        if(userDTO.email.includes("@gmail.com")){
            return 'https://littledeep.com/wp-content/uploads/2019/03/google_logo_download_thumbnail.png';
        } else if (userDTO.email.includes("@daum.net")){
            return 'https://t1.daumcdn.net/cfile/tistory/99818D3F5C95936E0C';
        } else if (userDTO.email.includes("@naver.com")) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOW7USKibIUFj2meDeSG3T3XBoo43Yyv5UXIHFZR-2FyZI7v-cLOTR7etRdINAGgXavs&usqp=CAU';
        } else {
            return 'https://littledeep.com/wp-content/uploads/2019/03/google_logo_download_thumbnail.png';
        }
    }

    return (
        <div>
            <MypageSubHeader11/>
            <Container className='px-10 mt-8'> {/* 사진이미지부분 */}
                <Row>
                    <Col xs={5} md={4}>
                    </Col>
                    <Col xs={2} md={4} className={Mypage.Imagecenter}>
                        <Image src="https://cdn.eyesmag.com/content/uploads/sliderImages/2022/12/30/3-fb9fd982-6568-4662-8ed1-d16ceb53ada9.jpg" roundedCircle className={Mypage.RoundedCircle} />
                    </Col>
                    <Col xs={5} md={4}>
                    </Col>
                </Row>
            </Container>
            <Container className='px-10 mt-5'> {/* 마이페이지 내 프로필 내용부분 */}
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-right'> 
                        <div className={`row ${Mypage.Text}`}>
                            <div className={Mypage.Space3}>
                                <span>닉네임</span>
                                <span className={Mypage.Space}>{userDTO.nickname}</span> 
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-start'> 
                        <div className={`row ${Mypage.Text}`}>
                            <span className='col-6 d-flex justify-content-start' style={{marginTop:'10px'}}>{userDTO.email}</span>
                            <span className='col-6 d-flex justify-content-end'>
                            <img
                                alt='img'
                                className={Mypage.Email}
                                src={getEmailLogo()}
                            />
                        </span>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-right'> 
                        <div className={`row ${Mypage.Text}`}>
                            <div className={Mypage.Space3}>
                                <div className="d-grid gap-2">
                                <Link to='/mypage/MyprofileUpdate'>
                                    <Button variant="outline-danger" className={`col-md-4 ${Mypage.Btn}`} >
                                        회원 정보 수정
                                    </Button>{''} {/* <==여기 글자입력하면 밑에 글자나옴 */}
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-4 d-flex justify-content-center'></div>
                    <div className='col-sm-4 d-flex justify-content-right'> {/* offset 사용예시 */}
                        <Button variant="outline-danger" className={Mypage.Btn2}>로그아웃</Button>{''} 
                        {/* <button type="button" className={`btn btn-warning ${Mypage.Btn}`} >Warning</button>   */}
                        {/* 부트스트랩 이랑 className이랑 혼용예시 */}
                    </div>
                    <div className='col-sm-4 d-flex justify-content-center'></div>
                </div>
            </Container>
    </div>
    );
};

export default MypageMain;