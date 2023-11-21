import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import {Link} from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Mypage from '../../css/main/100마이페이지/mypage.module.css';
import MypageHeader from './MypageHeader';

const MypageMain = () => {
    return (
        <div>
            <MypageHeader></MypageHeader>
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
            <hr className={Mypage.hr2}></hr>
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
                                <span className={Mypage.Space}>이름입력칸</span> 
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-start'> 
                        <div className={`row ${Mypage.Text}`}>
                            <span className='col-6 d-flex justify-content-start'>ci2288@naver.com</span>
                            <span className='col-6 d-flex justify-content-end'><img alt="email" className={Mypage.Email} src='https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5rH/image/aFrEyVpANu07FvoBZQbIB4aF_uc'></img></span>
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