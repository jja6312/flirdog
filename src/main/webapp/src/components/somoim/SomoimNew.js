import React, { useState } from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import { Button, Col, Container, Form, FormCheck, InputGroup, Row } from 'react-bootstrap';

import styles from '../../css/somoim/main/somoimNew.module.css';

const SomoimNew = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <Header></Header>
            <div style={{ width: "100%", textAlign: "center", height: '1rem' }}>
            </div>
            
            <Container className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}>
                <div className='row'>
                    <div className='col-13 col-md-4' style={{ textAlign: 'left', alignSelf: 'flex-end' }}>소모임 개설입니다.</div>
                    <div className={`${styles.moimMainTitle} col-13 col-md-4 d-none d-md-block mb-2`}>소모임 개설</div>
                </div>
                <div className='row' style={{ marginTop: '1.5rem' }}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} className={`${styles.default} mb-4`} controlId="formPlaintextDetail">
                            <Col sm>
                                <Form.Label className={`${styles.defaultLayout}`} htmlFor="name">소모임 이름</Form.Label>
                                <Form.Control id='name' type="text" placeholder="소모임 이름을 입력해 주세요 (10자 이내)" />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className={`${styles.default} mb-4`} controlId="formPlaintextSub">
                            <Col sm>
                                <Form.Label className={`${styles.defaultLayout}`} htmlFor="introduceSub">소모임 한 줄 소개</Form.Label>
                                <Form.Control id='introduceSub' type="text" placeholder="소모임을 간단히 소개해 주세요 (100자 이내)" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className={`${styles.default} mb-4`} controlId="formPlaintextDetail">
                            <Col sm>
                                <Form.Label className={`${styles.defaultLayout}`} htmlFor="introduceDetail">상세 정보</Form.Label>
                                <Form.Control id='introduceDetail' as="textarea" rows={5} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className={`${styles.default} mb-4`} controlId="formPlaintextDetail">
                            <Form.Label column sm={2} className={`${styles.groupInfo}`} htmlFor="introduceDetail">
                                그룹 정보
                                <span  className={`${styles.badge}`}>필수</span>
                            </Form.Label>
                            {/* <div className= {`${styles.groupDetail}  ${styles.groupForm} `} style={{ border: '2px solid gray' }}> */}
                            <Col className= {`${styles.groupDetail}  ${styles.groupForm} mb-4`} style={{ border: '2px solid #dddddd',  padding: '25px 20px 31px 24px' }}>
                                <Row className='mb-2' style={{ display:'flex', gap: '0.5rem' }}>
                                    <Col className='col-8 col-md-4'>
                                        <InputGroup>
                                            <Form.Label className={` ${styles.defaultLayout} ${styles.groupDetailLabel}`} htmlFor="memberCount">모집정원</Form.Label>
                                            <Form.Control id='memberCount' type="text" placeholder="2~100명 사이" />
                                            <InputGroup.Text>명</InputGroup.Text>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col className='col-8 col-md-4 mb-4'>
                                        <InputGroup>
                                            <Form.Label className={`${styles.defaultLayout} ${styles.groupDetailLabel}`} htmlFor="cost" >참가비용</Form.Label>
                                            <Form.Control id='cost' type="text" placeholder="0~1,000,000원 사이" />
                                            <InputGroup.Text>원</InputGroup.Text>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                    <Col className='col-8 col-md-5'>
                                        <InputGroup>
                                            <Form.Label className={`${styles.defaultLayout} ${styles.groupDetailLabel}`} htmlFor="location">활동지역</Form.Label>
                                            <Form.Select aria-label="Default select example">
                                                <option>활동지역 선택</option>
                                                <option value="1">전국</option>
                                                <option value="2">서울</option>
                                                <option value="3">인천</option>
                                                <option value="4">경기</option>
                                                <option value="5">대전</option>
                                                <option value="6">대구</option>
                                                <option value="7">부산</option>
                                                <option value="8">광주</option>
                                                <option value="9">울산</option>
                                                <option value="10">세종</option>
                                                <option value="11">강원</option>
                                                <option value="12">충북</option>
                                                <option value="13">충남</option>
                                                <option value="14">전북</option>
                                                <option value="15">전남</option>
                                                <option value="16">경북</option>
                                                <option value="17">경남</option>
                                                <option value="18">제주</option>
                                            </Form.Select>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className='col-12 col-md-6' style={{marginTop: '-1.5rem' }}>
                                    <Col style={{ display: 'inline-block', marginRight: '1rem', marginTop: '2rem' }}>
                                        <Form.Label className={`${styles.defaultLayout} ${styles.groupDetailLabel}`} htmlFor="target"
                                            style={{ top: '10.6rem', left: '2rem' }}>가입 대상자</Form.Label>
                                        <Form.Control id='target' type="text" placeholder="그룹 상세정보를 입력하세요" />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Col>
                                </Row> 
                                <Row className='col-12 mb-4'>
                                    <Form.Label className='mt-4' htmlFor="target">주 모임장소 설정</Form.Label>
                                    <Col className={`${styles.address} col-md-7`}>
                                        <Form.Control id='target' type="text" placeholder="장소명 또는 주소를 입력해주세요." />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Col>
                                    <Col md='auto'>
                                        <Button variant="secondary" size="md">검색</Button>
                                    </Col>
                                    <Col className={`${styles.address} col-md-8 mt-2`}>
                                        <Form.Control id='target' type="text" placeholder="나머지 주소를 입력해 주세요." />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Col>
                            {/* </div> */}
                        </Form.Group>

                        <Form.Group as={Row} className={`${styles.default} mb-4`} controlId="formPlaintextDetail">
                            <Form.Label column sm={2} className={`${styles.groupInfo}`} htmlFor="introduceDetail">
                                개설자 정보
                                <span  className={`${styles.badge}`}>필수</span>
                            </Form.Label>
                            <Col className= {`${styles.groupDetail}  ${styles.groupForm} mb-4`} style={{ border: '2px solid #dddddd',  padding: '21px 20px 31px 24px' }}>
                                <Row className='col-12 mb-3 d-flex align-items-center'>
                                    <Form.Label className='col-1 mt-3' htmlFor="target" style={{ width: 'max-content' }}>아이디 : </Form.Label>
                                    <Col className={` col-md-5`}>
                                        <Form.Control id='target' type="text" placeholder="test01" readOnly/>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row className='col-12 mb-3 d-flex align-items-center'>
                                    <Form.Label className='col-1 mt-3' htmlFor="target" style={{ width: 'max-content' }}>이메일 : </Form.Label>
                                    <Col className={` col-md-5`}>
                                        <Form.Control id='target' type="text" placeholder="이메일 형식(예: xxx@xxx.xxx)에 맞게 기입해주세요" />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row className='col-12 mb-3 d-flex align-items-center'>
                                    <Form.Label className='col-1 mt-3' htmlFor="target" style={{ width: 'max-content' }}>연락처 : </Form.Label>
                                    <Col className={` col-md-5`}>
                                        <Form.Control id='target' type="number" placeholder="숫자만 입력해주세요('-' 입력x)" />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Col>
                                </Row> 
                            </Col>
                            {/* </div> */}
                        </Form.Group>
                        <br/>

                        <div className="d-grid gap-1">
                            <Button variant="secondary" type="submit" onClick={{ onSubmit }}>
                                소모임 개설하기
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>

            <div style={{ height: 50 }}></div>
            <Footer></Footer>
        </div>
    );
};

export default SomoimNew;