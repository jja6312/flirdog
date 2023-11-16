import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';

const MypageSubHeader1 = () => {
    return (
        <div>
            <Container className='px-10'>{/* 마이페이지헤더 하단부분 */}
                <ul className='row m-0 p-0'>    
                    <li className='col-lg-2 col-md-2 col-sm-2 d-flex justify-content-center'></li>
                    <li className='col-lg-1 col-md-1 col-sm-1 d-flex justify-content-center'></li>
                    <li className='col-lg-2 col-md-2 col-sm-4 d-flex justify-content-center'><Link to="/mypage/MypageMain" className={Mypage.Link}><span className={Mypage.LiVisible}>내 프로필</span> </Link></li>
                    <li className='col-lg-2 col-md-3 col-sm-4 d-flex justify-content-center'><Link to="/mypage/MydogProfile" className={Mypage.Link}><span className={Mypage.LiVisible}>반려견 프로필</span></Link></li>
                    <li className='col-lg-3 col-md-2 col-sm-2 d-flex justify-content-center'></li>
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
            <hr className={Mypage.hr2}></hr>
        </div>
    );
};

export default MypageSubHeader1;