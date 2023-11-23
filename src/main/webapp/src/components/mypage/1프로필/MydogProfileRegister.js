import React, {useRef } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Header from '../../main/Header';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const MydogProfileRegister = () => {
    const onCamera = () => {
        imgRef.current.click()
    }
  
    const onImgInput = (e) => {
        const imgfiles = Array.from(e.target.files)
        var imgArray = []
  
        imgfiles.map(item => {
            const objectURL = URL.createObjectURL(item)
            imgArray.push(objectURL)
            return imgArray;
        })
  
    // setImgList(imgArray) //카메라 아이콘을 누르면 이미지 미리보기 용도
        // setFiles(e.target.files) //formData에 넣어서 서버로(스프링 부트) 보내기 용도
    }
    // const [imgList, setImgList] = useState([]) //배열은 []
    // const [files, setFiles] = useState('')
  
    //사진 등록관련
    const imgRef = useRef()
  
    return (
        <div>
            <Header></Header>            
            <Container className='px-10 mt-6'> {/* 회원 정보 수정 글씨 */}
                    <div className='row '>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                        <div className='col-lg-4 d-flex justify-content-center'>
                            <span className={Mypage.PageUpdateLetter}>반려견 등록</span>
                        </div>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                    </div>
            </Container>
            <Container className='px-10 mt-6'> {/* 사진이미지부분 */}
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <Image src="data:image/jpeg;base64,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" roundedCircle className={Mypage.RoundedCircle} />
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 d-flex justify-content-center'></div>
                                <div className='col-lg-3 col-md-3 col-sm-3  d-flex justify-content-center' style={{marginLeft:'18px'}}>
                                    <Row>
                                        <Form.Group as={Col} controlId="formUploadimage">
                                            <div className={Mypage.FormTitleDiv} style={{
                                            color:'gray',
                                            }}>
                                            <div className={Mypage.FormTitleNameDiv} >
                                                사 진
                                            </div>&nbsp;&nbsp;&nbsp;
                                            <img src='/image/date/camera.jpg' alt="카메라"
                                                        onClick={ onCamera }
                                                        style={{width:70, height:50, borderRadius:20}} />
                                            <input type="file"name="img[]"
                                                    multiple="multiple"
                                                    onChange={ onImgInput } 
                                                    ref={ imgRef } style={{visibility:'hidden'}} />
                                            </div>
                                        </Form.Group>
                                    </Row> 
                                </div>
                            </div>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default" style={{color:'#f56084'}}>
                                이름
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default" style={{color:'#f56084'}}>
                                나이
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default" style={{color:'#f56084'}}>
                                품종
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <div className='row'>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                        <div className='col-lg-4 d-flex justify-content-right'> 
                            <div>
                                    <div className={Mypage.FormTitleNameDiv} 
                                                style={{fontSize:'0.8em'}}>
                                                성별
                                    </div>&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className={Mypage.MyprofileUpdate_Text} style={{marginTop:'5px'}} >
                                &nbsp;&nbsp;&nbsp;
                                <div className={` d-flex justify-content-right`} style={{marginLeft:'40px'}}>
                                                    <input id='genderBox1' type='radio' name='gender'  value='남아' />
                                                    <label className={Mypage.labelClass1} htmlFor='genderBox1'>남 아</label>
                                                    &nbsp;&nbsp;
                                                    <input id='genderBox2' type='radio' name='gender'  value='여아' />
                                                    <label className={Mypage.labelClass2} htmlFor='genderBox2'>여 아</label>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                        <div className='col-lg-4 d-flex justify-content-right'> 
                            <Form.Group as={Col} controlId="formGridEmail">
                                <div className={Mypage.FormTitleDiv} >
                                    <div className={Mypage.FormTitleNameDiv} 
                                        style={{fontSize:'0.8em'}}
                                    >
                                        중성화 여부
                                    </div>&nbsp;&nbsp;&nbsp;
                                    <div className={`d-flex justify-content-left`}>
                                        <input id='neutralizationBox' type='checkbox' value='neutralization' />
                                        <label className={`${Mypage.neutralizationLabel} ${Mypage.labelClass3}`} htmlFor='neutralizationBox'></label>
                                    </div>
                                </div>
                            </Form.Group>
                        </div>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 d-flex justify-content-center'></div>
                        <div className='col-sm-6 d-flex justify-content-center'>
                            <Button variant="outline-danger" className={Mypage.Btn4} style={{color:'white'}}>등록하기</Button>{''} 
                        </div>
                    </div>
            </Container>
        </div>
    );
};

export default MydogProfileRegister;