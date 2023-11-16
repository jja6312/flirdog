import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Header from '../../main/Header';


const MydogProfileUpdate = () => {
    return (
        <div>
        <Header></Header>            
        <Container className='px-10 mt-6'> {/* 회원 정보 수정 글씨 */}
                <div className='row '>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <span className={Mypage.PageUpdateLetter}>반려견 정보 수정</span>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
        </Container>
        </div>
    );
};

export default MydogProfileUpdate;