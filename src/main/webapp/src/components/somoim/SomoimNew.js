    import React, { useContext, useState } from 'react';
    import Header from '../main/Header';
    import Footer from '../main/Footer';
    import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';

    import styles from '../../css/somoim/main/somoimNew.module.css';
    import { UserContext } from '../../contexts/UserContext';
    
    const SomoimNew = () => {
        const [formData, setFormData] = useState({
            somoimName: '',
            introduceSub: '',
            introduceDetail: '',
            memberCount:'',
            cost:'',
            location:'',
            target:'',
            address:'',
            address2:'',
            accountEmail:'',
            accountPhone:''
        });
        

        //const [createdId, setCreatedId] = useState('John Doe')
        const [validated, setValidated] = useState(false);
        //const [showAlert, setShowAlert] = useState(false);

        const navigate = useNavigate();

        const {somoimName, introduceSub, introduceDetail, memberCount, 
                cost, target, address, address2, accountEmail, accountPhone } = formData

        const { user } = useContext(UserContext); // 유저 컨텍스트
        const {name} = user;

        const handleChange = (e) => {
            const { name, value } = e.target;
            //console.log(`Name: ${name}, Value: ${value}`);
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const handleLocationChange = (e) => {
            const text = e.target.options[e.target.selectedIndex].text;

            setFormData({
                ...formData,
                location: text,
            });

            console.log('Selected Location:', text);
        }
            
        const handleSubmit = async (e) => {
            e.preventDefault();
            const form = e.currentTarget;

            console.log('Form Data:', formData);
            //console.log('Created ID:', createdId);

            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }

            setValidated(true);

            try {

                window.confirm('정말 소모임을 개설하시겠습니까?');
                // const shouldSubmit = window.confirm('정말 소모임을 개설하시겠습니까?');
                // if (!shouldSubmit) {
                //     e.preventDefault();
                //     e.stopPropagation();
                //     setValidated(false); 
                //     return;
                // }

                //const updatedFormData = { ...formData, createdId };
                const response = await axios.post('/somoim/somoimNewWrite', null, {
                    params : formData
                }).then(res =>  {
                        alert('소모임 개설이 완료되었습니다');
                        //setShowAlert(true);
                        navigate('/somoim');
                    })
                    .catch(error => console.log(error));
                console.log('서버 응답 오류:', response);
            } catch(e) {
                console.error('서버 요청 에러:', e);
            }
        };

        // useEffect(() => {
        //     if (showAlert) {
        //       alert('소모임 개설이 완료되었습니다');
        //     }
        //   }, [showAlert]);

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
                        <Form noValidate validated={validated} className="form-signup" onSubmit={handleSubmit}>
                            {/* <Form.Group as={Row} className={`${styles.default} mb-4`} controlId="formPlaintextDetail"> */}
                            <Form.Group as={Row} className={`${styles.default} mb-4`} >
                                <Col sm>
                                    <Form.Label className={`${styles.defaultLayout}`} htmlFor="name">소모임 이름</Form.Label>
                                    <Form.Control 
                                            id='somoimName' 
                                            name='somoimName' 
                                            type="text" 
                                            value={somoimName}
                                            onChange={handleChange}
                                            placeholder="소모임 이름을 입력해 주세요 (10자 이내)" required />
                                    <Form.Control.Feedback type="invalid">소모임 이름을 입력해주세요!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className={`${styles.default} mb-4`} >
                                <Col sm>
                                    <Form.Label className={`${styles.defaultLayout}`} htmlFor="introduceSub">소모임 한 줄 소개</Form.Label>
                                    <Form.Control 
                                            id='introduceSub' 
                                            name='introduceSub' 
                                            type="text" 
                                            value={introduceSub}
                                            onChange={handleChange}
                                            placeholder="소모임을 간단히 소개해 주세요 (100자 이내)" required />
                                    <Form.Control.Feedback type="invalid">소모임에 대한 한 줄정보를 입력해주세요!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className={`${styles.default} mb-4`} >
                                <Col sm>
                                    <Form.Label className={`${styles.defaultLayout}`} htmlFor="introduceDetail">상세 정보</Form.Label>
                                    <Form.Control 
                                            id='introduceDetail' 
                                            name='introduceDetail' 
                                            value={introduceDetail}
                                            onChange={handleChange}
                                            as="textarea" rows={5} required />
                                    <Form.Control.Feedback type="invalid">소모임에 대한 상세정보를 입력해주세요!</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row} className={`${styles.default} mb-4`} >
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
                                                <Form.Control 
                                                        id='memberCount' 
                                                        name='memberCount' 
                                                        type="number" 
                                                        value={memberCount}
                                                        onChange={handleChange}
                                                        placeholder="2~100명 사이" required />
                                                <InputGroup.Text>명</InputGroup.Text>
                                                <Form.Control.Feedback type="invalid">모집 희망인원을 입력해주세요!</Form.Control.Feedback>
                                            </InputGroup>
                                        </Col>
                                        <Col className='col-8 col-md-4 mb-4'>
                                            <InputGroup>
                                                <Form.Label className={`${styles.defaultLayout} ${styles.groupDetailLabel}`} htmlFor="cost" >참가비용</Form.Label>
                                                <Form.Control 
                                                        id='cost' 
                                                        name='cost' 
                                                        type="number" 
                                                        value={cost}
                                                        onChange={handleChange}
                                                        placeholder="0~1,000,000원 사이" />
                                                <InputGroup.Text>원</InputGroup.Text>
                                                <Form.Control.Feedback type="invalid">활동비용을 입력해주세요!</Form.Control.Feedback>
                                            </InputGroup>
                                        </Col>
                                        <Col className='col-8 col-md-5'>
                                            <InputGroup>
                                                <Form.Label className={`${styles.defaultLayout} ${styles.groupDetailLabel}`} htmlFor="location">활동지역</Form.Label>
                                                <Form.Select 
                                                        name="location"
                                                        onChange={handleLocationChange}
                                                        aria-label="Default select example" required>
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
                                                <Form.Control.Feedback type="invalid">주활동 지역을 선택해주세요!</Form.Control.Feedback>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className='col-12 col-md-6' style={{marginTop: '-1.5rem' }}>
                                        <Col style={{ display: 'inline-block', marginRight: '1rem', marginTop: '2rem' }}>
                                            <Form.Label className={`${styles.defaultLayout} ${styles.groupDetailLabel}`} htmlFor="target"
                                                style={{ top: '10.6rem', left: '2rem' }}>가입 대상자</Form.Label>
                                            <Form.Control 
                                                    id='target' 
                                                    name='target' 
                                                    type="text" 
                                                    value={target}
                                                    onChange={handleChange}
                                                    placeholder="가입 대상자를 입력하세요" required />
                                            <Form.Control.Feedback type="invalid">가입 대상자를 입력해주세요!</Form.Control.Feedback>
                                        </Col>
                                    </Row> 
                                    <Row className='col-12 mb-4'>
                                        <Form.Label className='mt-4' htmlFor="target">주 모임장소 설정</Form.Label>
                                        <Col className={`${styles.address} col-md-7`}>
                                            <Form.Control 
                                                    id='address' 
                                                    name='address' 
                                                    type="text" 
                                                    value={address}
                                                    onChange={handleChange}
                                                    placeholder="장소명 또는 주소를 입력해주세요." required />
                                            <Form.Control.Feedback type="invalid">주 모임장소를 입력해주세요!</Form.Control.Feedback>
                                        </Col>
                                        <Col md='auto'>
                                            <Button variant="secondary" size="md">검색</Button>
                                        </Col>
                                        <Col className={`${styles.address} col-md-8 mt-2`}>
                                            <Form.Control 
                                                    id='address2' 
                                                    name='address2' 
                                                    type="text" 
                                                    value={address2}
                                                    onChange={handleChange}
                                                    placeholder="나머지 주소를 입력해 주세요." required />
                                            <Form.Control.Feedback type="invalid">나머지 장소를 입력해주세요!</Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Col>
                                {/* </div> */}
                            </Form.Group>

                            <Form.Group as={Row} className={`${styles.default} mb-4`} >
                                <Form.Label column sm={2} className={`${styles.groupInfo}`} htmlFor="introduceDetail">
                                    개설자 정보
                                    <span  className={`${styles.badge}`}>필수</span>
                                </Form.Label>
                                <Col className= {`${styles.groupDetail}  ${styles.groupForm} mb-4`} style={{ border: '2px solid #dddddd',  padding: '21px 20px 31px 24px' }}>
                                    <Row className='col-12 mb-3 d-flex align-items-center'>
                                        <Form.Label className='col-1 mt-3' htmlFor="createdId" style={{ width: 'max-content' }}>아이디 : </Form.Label>
                                        <Col className={`col-md-6`}>
                                            <Form.Control 
                                                    id='createdId' 
                                                    name='createdId'
                                                    type="text" 
                                                    value={name}
                                                    placeholder="John Doe" readOnly/>
                                        </Col>
                                    </Row>
                                    <Row className='col-12 mb-3 d-flex align-items-center'>
                                        <Form.Label className='col-1 mt-3' htmlFor="accountEmail" style={{ width: 'max-content' }}>이메일 : </Form.Label>
                                        <Col className={`col-md-6`}>
                                            <Form.Control 
                                                    id='accountEmail' 
                                                    name='accountEmail'
                                                    type="email" 
                                                    value={accountEmail}
                                                    onChange={handleChange}
                                                    placeholder="이메일 형식(예: xxx@xxx.xxx)에 맞게 기입해주세요" required />
                                            <Form.Control.Feedback type="invalid">이메일 주소를 입력해주세요!</Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                    <Row className='col-12 mb-3 d-flex align-items-center'>
                                        <Form.Label className='col-1 mt-3' htmlFor="accountPhone" style={{ width: 'max-content' }}>연락처 : </Form.Label>
                                        <Col className={`col-md-6`}>
                                            <Form.Control 
                                                    id='accountPhone' 
                                                    name='accountPhone'
                                                    type="number"
                                                    value={accountPhone}
                                                    onChange={handleChange}
                                                    placeholder="숫자만 입력해주세요('-' 입력x)" required />
                                            <Form.Control.Feedback type="invalid">연락처를 입력해주세요!</Form.Control.Feedback>
                                        </Col>
                                    </Row>
                                </Col>
                                {/* </div> */}
                            </Form.Group>
                            <br/>

                            <div className="d-grid gap-1">
                                <Button variant="secondary" type="submit">
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