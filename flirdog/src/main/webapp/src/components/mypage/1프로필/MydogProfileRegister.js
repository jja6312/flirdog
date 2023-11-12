import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Header from '../../main/Header';
import Button from 'react-bootstrap/esm/Button';


const MydogProfileRegister = () => {
    return (
        <div>
        <Header></Header>            
        <Container className='px-10 mt-8'> {/* 회원 정보 수정 글씨 */}
                <div className='row '>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <span className={Mypage.PageUpdateLetter}>반려견 등록</span>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
        </Container>
        <Container className='px-10 mt-4'> {/* 강아지이미지부분 */}
                <Row>
                    <Col xs={5} md={4}>
                    </Col>
                    <Col xs={2} md={4} className={Mypage.Imagecenter}>
                        <Image src="data:image/png;base64,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" roundedCircle className={Mypage.RoundedCircle} />
                    </Col>
                    <Col xs={5} md={4}>
                    </Col>
                </Row>
        </Container>
        <Container className='px-10 mt-4'> {/* 사진선택 및 내용 란 */}
            <div className='row'> 
                <div className='col-lg-4 d-flex justify-content-center'></div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterText}>
                        <label className={Mypage.UploadFileLabel} for='uploadFile'>
                            <img style={{width:'30px',height:'30px'}} src='/image/mypage/cameramypage.png'></img>
                            <span style={{fontSize:'12px'}}>사진선택</span>
                        </label>
                        <input type="file" id="uploadFile" className={Mypage.UploadFile} style={{display:'none'}}></input>                 
                        <span className={Mypage.MydogProfileRegisterTextInner}>등록 사진은 1개만 첨부 가능합니다.</span>
                    </div>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'></div>
            </div>
            <div className='row mt-2'> {/* 이름 입력란  */}
                <div className='col-lg-4 d-flex justify-content-end'>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterText}>
                        <span style={{color:'red'}}>*</span>
                        <input  type='text' placeholder='이름' style={{padding:'6px 10px',width:'99%'}}></input> 
                    </div>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'></div>
            </div>
            <div className='row mt-2'> {/* 이름 체크란  */}
                <div className='col-lg-4 d-flex justify-content-end'>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterTextCheck}>
                        ex 닉네임은 숫자와 문자를 사용해 1-10자를 입력해 주세요.
                    </div>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'></div>
            </div>
            <div className='row mt-2'> {/* 생년월일 입력란  */}
                <div className='col-lg-4 d-flex justify-content-end'>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterText}>
                        <div>
                            <span style={{color:'red'}}>*</span>
                            <input type='text' pattern="[0-9]*" maxLength='8' placeholder='반려동물의 생년월일 8자리를 입력해주세요' style={{padding:'6px 10px',width:'99%'}}/>
                        </div>
                    </div>{/*과제 숫자만 입력되게 소스수정필요 */}
                </div>
                <div className='col-lg-4 d-flex justify-content-center'></div>
            </div>
            <div className='row mt-2'> {/* 품종 입력란  */}
                <div className='col-lg-4 d-flex justify-content-end'>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterText}>
                        <span style={{color:'red'}}>*</span>
                        <select className={Mypage.MydogProfileRegisterText5} size="1" aria-label="size 1 select example" style={{padding:'6px 6px',width:'99%'}}>
                            <option selected>품종</option>
                            <option value="1">웰시코기</option>
                            <option value="2">말티즈</option>
                            <option value="3">시츄</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'></div>
            </div>
            
            <div className='row mt-2'> {/* 남아 여아 체크박스 위에 필수별표 */}
                <div className='col-lg-4 d-flex justify-content-center'>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterText4}>
                        <div className={``}>
                            <span style={{color:'red'}}>*</span>
                            <span style={{padding:'6px'}}>{' '}성별</span>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                </div>
            </div>
            <div className='row mt-2'> {/* 남아 여아 체크박스 부분 */}
                <div className='col-lg-4 d-flex justify-content-center'>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterText4}>
                        <div className={``}>
                            <div class='form-check form-check-inline' style={{marginRight:'13%', marginLeft:'25%'}}>
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label class="form-check-label" for="inlineRadio1">남아</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label class="form-check-label" for="inlineRadio2">여아</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-lg-4 d-flex justify-content-center'>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <div className={Mypage.MydogProfileRegisterText4}>
                        <p><label><input type="checkbox" name="nb[]" value="01"/>{" "}<span style={{marginLeft:'5%'}}> 중성화여부  </span></label></p>
                    </div>
                </div>
                <div className='col-lg-4 d-flex justify-content-center'>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col-lg-4 d-flex justify-content-center'></div>
                <div className='col-lg-4 d-flex justify-content-center'>
                    <Button variant="outline-danger" className={`${Mypage.Btn4}`} >
                                        추가하기
                    </Button>{''}</div>
                <div className='col-lg-4 d-flex justify-content-center'></div>
            </div>
        </Container>
        </div>
    );
};

export default MydogProfileRegister;