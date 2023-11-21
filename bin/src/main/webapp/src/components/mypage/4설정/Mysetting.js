import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';

const Mysetting = () => {
    return (
        <div>
            
            <MypageHeader/>
            <Container className='px-10'>{/* 마이페이지헤더 하단부분 */}
            <ul className='row m-0 p-0'>    
                <li className='col-lg-2 d-flex justify-content-center'></li>
                <li className='col-lg-1 d-flex justify-content-center'></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="/mypage/MypageMain" className={Mypage.Link}><span className={Mypage.LiHidden}>내 프로필</span> </Link></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="/mypage/MydogProfile" className={Mypage.Link}><span className={Mypage.LiHidden}>반려견 프로필</span></Link></li>
                <li className='col-lg-3 d-flex justify-content-center'></li>
            </ul>
            
            <ul className='row m-0 p-0'>    
                <li className='col-lg-3 d-flex justify-content-center'></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>Q&A</span> </Link></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>라운지</span></Link></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>댓글</span></Link></li>
                <li className='col-lg-2 d-flex justify-content-center'></li>
            </ul>
            
            <ul className='row m-0 p-0'>    
                <li className='col-lg-3 d-flex justify-content-center'></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>포인트 충전</span> </Link></li>
                <li className='col-lg-2 d-flex justify-content-center'> <Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>포인트 조회</span> </Link></li>
                <li className='col-lg-2 d-flex justify-content-center'></li>
                <li className='col-lg-2 d-flex justify-content-center'></li>
            </ul>
            
            <ul className='row m-0 p-0'>    
                <li className='col-lg-3 d-flex justify-content-center'></li>
                <li className='col-lg-3 d-flex justify-content-center'></li>
                <li className='col-lg-4 d-flex justify-content-center'></li>
                <li className='col-lg-2 d-flex justify-content-center'></li>
                <li className='col-lg-2 d-flex justify-content-center'></li>
            </ul>
            </Container>
            <Container className='px-10 mt-6'>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <h1 className={Mypage.MySetting1}>알림 설정</h1>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-lg-4 d-flex justify-content-end'></div>
                    <div className={`col-lg-4 d-flex justify-content-start ${Mypage.MySetting2} `}>
                            <span style={{marginLeft:'10.5%'}}>마케팅 동의</span>
                            <label className={Mypage.switch0}>
                                <input type="checkbox" style={{marginLeft:'3px'}}/>
                                <span className={`${Mypage.slider} ${Mypage.round}`} round></span>
                            </label>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-lg-4 d-flex justify-content-end'></div>
                    <div className={`col-lg-4 d-flex justify-content-center ${Mypage.MySetting2} `}>
                            <span>Q&A 알림 동의</span>
                            <label className={Mypage.switch}>
                                <input type="checkbox"/>
                                <span className={`${Mypage.slider} ${Mypage.round}`} round></span>
                            </label>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
            </Container>

        </div>
    );
};

export default Mysetting;