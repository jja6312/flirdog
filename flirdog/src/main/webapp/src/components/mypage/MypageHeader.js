import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Header from '../main/Header';
import Mypage from '../../css/main/100마이페이지/mypage.module.css';

const MypageHeader = () => {
    return (
        <div>
            <Header></Header>
            <hr className={Mypage.hr1}></hr>
            <Container className='px-10'>{/* 마이페이지헤더상단부분 */}
                <div className='row'>{/* 원하는 애들을 수평배열할때 사용 */}
                    <div className='col-lg-2  d-flex justify-content-center'>
                    </div>
                    <div className='col-lg-2  d-flex justify-content-center'>
                        <Link to="/mypage/MypageMain" className={Mypage.Link}>   
                            <span className={Mypage.Menu1} >프로필</span>
                        </Link>
                    </div>
                    {/* <div className='col-2-md d-fle justify-content-center'> */}
                    {/* 내가 작성한 글이 div칸 가운데에 오도록 코드 짜줘 */}
                    <div className='col-lg-2 d-flex justify-content-center'>
                        {/* <Link to="/mypage/Myarticle"> */}
                        {/* <Link to="/mypage/Myarticle"> 를 쓰니까 해당 div 밑에 밑줄이 그이는데 이를 없애는 코드를 짜줘~*/}
                        <Link to="/mypage/Myarticle" className={Mypage.Link}>                    
                            <span className={Mypage.Menu1} >내가 작성한 글</span>
                        </Link>
                    </div>
                    <div className='col-lg-2 d-flex justify-content-center'>
                        <Link to="/mypage/Mypoint" className={Mypage.Link}> 
                            <span className={Mypage.Menu1} >포인트</span>
                        </Link> 
                    </div>
                    <div className='col-lg-2 d-flex justify-content-center'>
                        <Link to="/mypage/Mysetting" className={Mypage.Link}> 
                            <span className={Mypage.Menu1} >설정</span>
                        </Link>
                    </div>
                </div>
            </Container>
            <hr className={Mypage.hr2}></hr>
        </div>
    );
};

export default MypageHeader;