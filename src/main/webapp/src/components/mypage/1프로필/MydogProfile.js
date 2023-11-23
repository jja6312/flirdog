import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Button from 'react-bootstrap/Button';
import MypageSubHeader1_2 from '../5공통/MypageSubHeader1_2';

const MydogProfile = () => {
    return (
        <div>
            <MypageSubHeader1_2/>
            <Container className='px-10 mt-6'> {/* 강아지정보 글씨 */}
                <div className='row '>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <span className={Mypage.PetInfoLetter}>반려견정보</span>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
            </Container>
            <Container className='px-10 mt-8'> {/* 추가하기 버튼 */}
                <div className='row '>
                    <div className='col-lg-3 d-flex justify-content-center'></div>
                    <div className='col-lg-6 d-flex justify-content-center'> 
                        <Link to='/mypage/MydogProfileRegister'> 
                            <Button variant="outline-danger" className={`col-lg-4 ${Mypage.Btn3}`} >
                                추가하기
                            </Button>{''} 
                        </Link>
                    </div>
                    <div className='col-lg-3 d-flex justify-content-center'></div>
                </div>
            </Container>
        </div>
    );
};

export default MydogProfile;