import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Header from '../../main/Header';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const MyprofileUpdate = () => {

    const [userDTO, setUserDTO] = useState({
        name: '',
        passwd: '',
        email: '',
        nickname: '',
        userRole: '',
        point: 0,
        communityScore: 0,
        introduce : '',

        });

        useEffect(() => {
            axios.get('http://localhost:8080/mypage/getUserProfileTest?userIdStr=1')
            .then((res) => {
                //alert('성공')
                console.log(res.data);
                setUserDTO(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }, []);
    
    return (
        <div>
        <Header></Header>            
        <Container className='px-10 mt-6'> {/* 회원 정보 수정 글씨 */}
                <div className='row '>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <span className={Mypage.PageUpdateLetter}>회원 정보 수정</span>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
        </Container>
        <Container className='px-10 mt-6'> {/* 사진이미지부분 */}
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
        <Container className='px-10 mt-3'>{/* 사진 변경 버튼 , 삭제 버튼 */}
            <div className='row'> 
                <div className='col-lg-4   d-flex justify-content-center'>
                </div>
                <div className={`col-lg-2 col-md-12 d-flex justify-content-end`}>
                    <Button variant="danger" className={`${Mypage.MyprofileUpdate_button}`}>사진변경</Button>{' '}
                </div>
                <div className='col-lg-1 col-md-12 d-flex justify-content-end'>
                    <Button variant="danger" className={`${Mypage.MyprofileUpdate_button}`}>삭제</Button>{' '}
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                </div>
            </div>
        </Container>
        <Container className='px-10 mt-5'> {/* 회원정보 수정 밑에 내용부분 */}
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-right'> 
                        <div className={Mypage.Text}>
                            <div className={Mypage.Space3}>
                                <span style={{color:'#f56084'}}>닉네임</span>
                                <span className={Mypage.Space}>{userDTO.nickname}</span> 
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-right'> 
                        <div className={Mypage.Text}>
                            <span style={{color:'#f56084'}}>전화번호</span>
                            <span style={{marginLeft:'17px'}}>{userDTO.phone}</span>
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-right'> 
                        <div className={Mypage.MyprofileUpdate_Text} >
                            <span style={{color:'#f56084'}}>간단 소개</span> 
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className={`col-lg-4 d-flex justify-content-center` }>
                        <div className={Mypage.Text}> 
                            <textarea className={`${Mypage.TextArea} `} placeholder='자기소개 &#13; (1~200자)'
                            value={userDTO.introduce}>
                            </textarea>
                        </div>
                    </div>  
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-right'> 
                        <div className={Mypage.Text}>
                            <span>{userDTO.email}</span>
                            <span className={Mypage.Space2_logo}><img alt='' style={{width:'30px', marginLeft:'150px'}} className={Mypage.email} src='https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5rH/image/aFrEyVpANu07FvoBZQbIB4aF_uc'></img></span>  
                        </div>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
                <div className='row'>
                    <div className='col-sm-3 d-flex justify-content-center'></div>
                    <div className='col-sm-6 d-flex justify-content-center'>
                        <Button variant="outline-danger" className={Mypage.Btn4}>수정하기</Button>{''} 
                    </div>
                </div>
        </Container>
        </div>
    );
};

export default MyprofileUpdate;