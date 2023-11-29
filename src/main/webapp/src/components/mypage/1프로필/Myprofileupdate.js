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
        Image : '',
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
    
        const getEmailLogo = () => {
            if(userDTO.email.includes("@gmail.com")){
                return 'data:image/png;base64,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';
            } else if (userDTO.email.includes("@daum.net")){
                return 'data:image/jpeg;base64,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';
            } else if (userDTO.email.includes("@naver.com")) {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOW7USKibIUFj2meDeSG3T3XBoo43Yyv5UXIHFZR-2FyZI7v-cLOTR7etRdINAGgXavs&usqp=CAU';
            } else {
                return 'data:image/png;base64,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';
            }
        }
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
                            <span className={Mypage.Space2_logo}>
                                <img alt='img' style={{width:'30px', marginLeft:'150px'}} className={Mypage.email} 
                                src={getEmailLogo()}></img>
                            </span>  
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