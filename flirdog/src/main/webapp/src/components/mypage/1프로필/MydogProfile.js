import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Button from 'react-bootstrap/Button';

const MydogProfile = () => {
    return (
        <div>
            <MypageHeader />
            <Container className='px-10'>{/* 마이페이지헤더 하단부분 */}
            <ul className='row m-0 p-0'>    
                <li className='col-lg-2 d-flex justify-content-center'></li>
                <li className='col-lg-1 d-flex justify-content-center'></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="/mypage/MypageMain" className={Mypage.Link}><span className={Mypage.LiVisible}>내 프로필</span> </Link></li>
                <li className='col-lg-2 d-flex justify-content-center'><Link to="/mypage/MydogProfile" className={Mypage.Link}><span className={Mypage.LiVisible}>반려견 프로필</span></Link></li>
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