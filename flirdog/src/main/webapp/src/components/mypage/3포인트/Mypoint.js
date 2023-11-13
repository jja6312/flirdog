import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';


const Mypoint = () => {
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
                <li className='col-lg-2 d-flex justify-content-center'><Link to="/mypage/MypointRecharge" className={Mypage.Link}><span className={Mypage.LiVisible}>포인트 충전</span> </Link></li>
                <li className='col-lg-2 d-flex justify-content-center'> <Link to="/mypage/Mypoint" className={Mypage.Link}><span className={Mypage.LiVisible}>포인트 조회</span> </Link></li>
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
                            0<span className={Mypage.Point3}>P</span>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'><h3 className={Mypage.Point1}>소멸 예정 포인트 (7일 이내)</h3></div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'> {/* P글씨 */}
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                        <div className={Mypage.Point2}>
                            0<span className={Mypage.Point3}>P</span>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
            </Container>         
        </div>
    );
};

export default Mypoint;