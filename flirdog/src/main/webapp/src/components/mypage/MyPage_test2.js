import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Header from '../main/Header';
import Nav from 'react-bootstrap/Nav';
import Mypage from '../../css/main/100마이페이지/mypage.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
    return (
      <button
        type="button"
        style={{ backgroundColor: 'white' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

const Mypage_test = () => {
    return (
        <div>
            <Header></Header>
            <hr className={Mypage.hr1}></hr>
            <Container className='px-10'>
            <div className='row'>{/* 원하는 애들을 수평배열할때 사용 */}
                <div className='col-3 d-flex justify-content-center'></div>
                <div className='col-1 d-flex justify-content-center'><span className={Mypage.Menu1 }>프로필</span></div>
                <div className='col-2 d-flex justify-content-center'><span className={Mypage.Menu1 }>내가 작성한 글</span></div>
                <div className='col-1 d-flex justify-content-center'><span className={Mypage.Menu1 }>포인트</span></div>
                <div className='col-1 d-flex justify-content-center'><span className={Mypage.Menu1 }>설정</span></div>
                <div className='col-3 d-flex justify-content-center'/>
            </div>
            <Accordion defaultActiveKey="0" className="bg-white">
                <Card  className="border-0 bg-white">
                    <Card.Header  className="border-0 bg-white">
                        <CustomToggle eventKey="0" className="bg-white p-2 d-flex justify-content-center">프로필</CustomToggle>
                        <CustomToggle eventKey="1" className='bg-white p-2 d-flex justify-content-center'>내가 작성한 글</CustomToggle>
                        <CustomToggle eventKey="2">포인트</CustomToggle>
                        <CustomToggle eventKey="3">설정</CustomToggle>
                    </Card.Header>
                    
                    <hr className={Mypage.hr2}></hr>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body > 
                            <button>
                                <ul className='row m-0 p-0 bg-white'>    
                                    <li className='col-2 d-flex justify-content-center'></li>
                                    <li className='col-1 d-flex justify-content-center'></li>
                                    <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiVisible}>내 프로필</span> </Link></li>
                                    <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiVisible}>반려동물 프로필</span></Link></li>
                                    <li className='col-3 d-flex justify-content-center'></li>
                                </ul>
                            </button>
                         </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body> <button>안녕2</button> </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body> <button>안녕2</button> </Card.Body>
                    </Accordion.Collapse>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body> <button>안녕2</button> </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>


            </Container>
            <hr className={Mypage.hr2}></hr>
            <Container className='px-10'>
            <ul className='row m-0 p-0'>    
                <li className='col-2 d-flex justify-content-center'></li>
                <li className='col-1 d-flex justify-content-center'></li>
                <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiVisible}>내 프로필</span> </Link></li>
                <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiVisible}>반려동물 프로필</span></Link></li>
                <li className='col-3 d-flex justify-content-center'></li>
            </ul>
            
            <ul className='row m-0 p-0'>    
                <li className='col-3 d-flex justify-content-center'></li>
                <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>Q&A</span> </Link></li>
                <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>라운지</span></Link></li>
                <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>댓글</span></Link></li>
                <li className='col-2 d-flex justify-content-center'></li>
            </ul>
            
            <ul className='row m-0 p-0'>    
                <li className='col-3 d-flex justify-content-center'></li>
                <li className='col-2 d-flex justify-content-center'><Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>포인트 충전</span> </Link></li>
                <li className='col-2 d-flex justify-content-center'> <Link to="" className={Mypage.Link}><span className={Mypage.LiHidden}>포인트 조회</span> </Link></li>
                <li className='col-2 d-flex justify-content-center'></li>
                <li className='col-2 d-flex justify-content-center'></li>
            </ul>
            
            <ul className='row m-0 p-0'>    
                <li className='col-3 d-flex justify-content-center'></li>
                <li className='col-3 d-flex justify-content-center'></li>
                <li className='col-4 d-flex justify-content-center'></li>
                <li className='col-2 d-flex justify-content-center'></li>
                <li className='col-2 d-flex justify-content-center'></li>
            </ul>
            </Container>
            <hr className={Mypage.hr2}></hr>
            <Container className='px-10 mt-8'> 
                <Row>
                    <Col xs={5} md={4}>
                    </Col>
                    <Col xs={2} md={4} className={Mypage.Imagecenter}>
                        <Image src="https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg" roundedCircle className={Mypage.RoundedCircle} />
                    </Col>
                    <Col xs={5} md={4}>
                    </Col>
                </Row>
            </Container>
            <Container className='px-10 mt-5'>
                <div className='row'>
                    <div className='col-4 d-flex justify-content-center'></div>
                    <div className='col-4 d-flex justify-content-right'> 
                        <div className={Mypage.Text}>
                            <div className={Mypage.Space3}>
                                <span>닉네임</span>
                                <span className={Mypage.Space}>이름입력칸</span> 
                            </div>
                        </div>
                    </div>
                    <div className='col-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-4 d-flex justify-content-center'></div>
                    <div className='col-4 d-flex justify-content-right'> 
                        <div className={Mypage.Text}>
                            <span>ci2288@naver.com</span>
                            <span className={Mypage.Space2_logo}><img className={Mypage.Email} src='https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5rH/image/aFrEyVpANu07FvoBZQbIB4aF_uc'></img></span> 
                        </div>
                    </div>
                    <div className='col-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-4 d-flex justify-content-center'></div>
                    <div className='col-4 col-sm-4 d-flex justify-content-right'> 
                        <div className={Mypage.Text}>
                            <div className={Mypage.Space3}>
                                <div className="d-grid gap-2">
                                    <Button variant="outline-danger" className={Mypage.Btn}>회원 정보 수정</Button>{''} {/* <==여기 글자입력하면 밑에 글자나옴 */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 offset-lg-4 d-flex justify-content-right'> {/* offset 사용예시 */}
                        <Button variant="outline-danger" className={Mypage.Btn2}>로그아웃</Button>{''} 
                        {/* <button type="button" className={`btn btn-warning ${Mypage.Btn}`} >Warning</button>   */}
                        {/* 부트스트랩 이랑 className이랑 혼용예시 */}
                    </div>
                </div>
            </Container>


        </div>
    );
};


export default Mypage_test;