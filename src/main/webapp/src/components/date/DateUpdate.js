import React, {  useRef, useState } from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import Container from 'react-bootstrap/esm/Container';
import DateUpdateCss from '../../css/date/dateUpdate.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import KakaoMap from './KakaoMap';
import { useNavigate } from 'react-router-dom';

const DateUpdate = () => {
    const [purposeSelect, setPurposeSelect] = useState('글 분류');
  const [dogBreedSelect, setdogBreedSelect] = useState('애견 종 선택');
  const [daySelect, setDaySelect] = useState('날짜 선택');
  const [matchingAddress, setMatchingAddress] = useState('');
  const [value, onChange] = useState(new Date());
  const moment = require('moment');

  const navigate = useNavigate()


  const handlePurposeSelect = (purpose) => {
    setPurposeSelect(purpose);
  };
  
  const handleDogBreedSelect = (breed) => {
    setdogBreedSelect(breed);
  };

  const handleDaySelect = (day) => {
    setDaySelect(day);
  };

  const textareaStyle = {
    resize: 'none', // 사용자가 크기를 조절하지 못하도록 설정
  };

  const handleInputChange = (event) => {
    // 입력값이 변경될 때마다 matchingAddress 상태를 업데이트
    setMatchingAddress(event.target.value);
  };
  
  //사진 등록관련
  const imgRef = useRef()

  const [userUploadDTO, setUserUploadDTO] = useState({
      imageName: '',
      imageContent: '',
      imageFileName: '',
      imageOriginalName:'',
  }) //객체는 {}

  const { imageName, imageContent, imageFileName, imageOriginalName } = userUploadDTO

  const [imgList, setImgList] = useState([]) //배열은 []
  // const [files, setFiles] = useState('')

  const onCamera = () => {
      imgRef.current.click()
  }

  const onImgInput = (e) => {
      const imgfiles = Array.from(e.target.files)
      var imgArray = []

      imgfiles.map(item => {
          const objectURL = URL.createObjectURL(item)
          imgArray.push(objectURL)
      })

      setImgList(imgArray) //카메라 아이콘을 누르면 이미지 미리보기 용도
      // setFiles(e.target.files) //formData에 넣어서 서버로(스프링 부트) 보내기 용도
  }

    const onUploadSubmit = (e) => {
      e.preventDefault()

      alert('이미지 업로드 완료')
      navigate('/date/dateList')
  }
  
  const onBack = () => {
    window.scrollTo(0, 0);
    navigate('/date/dateList')
  }

    return (
        <div>
            {/* 헤더 */}
            <Header></Header>
            {/* 내용 */}
            <div>
              <Container>
              <div className={DateUpdateCss.DateTitle}>
                  <div className={DateUpdateCss.DateTitleDiv}>
                  매칭 글 수정
                  </div>
                </div>
              </Container>
            </div>
            <hr className={DateUpdateCss.dateHr}/>

            <Container>
              <div className={DateUpdateCss.formTable}>
                <div className={DateUpdateCss.formTableDiv}>
                <Form>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridTitle">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            제 목
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={DateUpdateCss.FormSubjectTitleInput} size="lg" type="text" placeholder="제목을 입력해주세요." />
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCheckPurpose">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            글 분류
                          </div>&nbsp;&nbsp;&nbsp;
                          <Dropdown>
                              <Dropdown.Toggle className={DateUpdateCss.filterDropdownBtn} variant="success" id="dropdown-basic"
                                  style={{
                                      border:'5px solid #F56084',
                                      backgroundColor: 'white',
                                      color:'#F56084',
                                      fontWeight:'bold',
                                      fontSize:'1.3em',
                                      borderRadius:'10px'
                                  }}
                              >
                              {purposeSelect}
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='dropdown-menu scrollContainer' 
                              style={{ maxHeight: '200px', overflowY: 'auto' }}    
                                  >
                                  <Dropdown.Item href="#/action-1" onClick={() => handlePurposeSelect('연 애')} >연 애</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={() => handlePurposeSelect('산 책')}>산 책</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                        </div>  
                      </Form.Group>

                      <Form.Group as={Col} controlId="formDogName">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            애견 이름
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={DateUpdateCss.FormTitleInput} size="lg" type="text" placeholder="애견 이름 입력" />
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formDogGender">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            성 별
                          </div>&nbsp;&nbsp;&nbsp;
                          <div className={`d-flex justify-content-left`}>
                                            <input id='genderBox1' type='radio' name='gender'  value='남아' />
                                            <label className={DateUpdateCss.labelClass1} htmlFor='genderBox1'>남 아</label>
                                            &nbsp;&nbsp;
                                            <input id='genderBox2' type='radio' name='gender'  value='여아' />
                                            <label className={DateUpdateCss.labelClass2} htmlFor='genderBox2'>여 아</label>
                          </div>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formDogAge">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            나 이
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={DateUpdateCss.FormTitleInput} size="lg" type="text" placeholder="나이 입력" />
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} 
                               style={{fontSize:'1em'}}
                          >
                            중성화 여부
                          </div>&nbsp;&nbsp;&nbsp;
                          <div className={`d-flex justify-content-left`}>
                            <input id='neutralizationBox' type='checkbox' value='neutralization' />
                            <label className={`${DateUpdateCss.neutralizationLabel} ${DateUpdateCss.labelClass3}`} htmlFor='neutralizationBox'></label>
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formDogMBTI">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            멍BTI
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={DateUpdateCss.FormTitleInput} size="lg" type="text" placeholder="애견 MBTI 입력" />
                        </div>
                      </Form.Group>
                    </Row>
                    
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCheckPurpose">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} 
                           style={{fontSize:'1em'}}>
                            애견종 선택
                          </div>&nbsp;&nbsp;&nbsp;
                          <Dropdown>
                              <Dropdown.Toggle className={DateUpdateCss.filterDropdownBtn} variant="success" id="dropdown-basic"
                                  style={{
                                      border:'5px solid #F56084',
                                      backgroundColor: 'white',
                                      color:'#F56084',
                                      fontWeight:'bold',
                                      borderRadius:'10px'
                                  }}
                              >
                              {dogBreedSelect}
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='dropdown-menu scrollContainer' 
                              style={{ maxHeight: '200px', overflowY: 'auto' }}    
                                  >
                                  <Dropdown.Item href="#/action-1" onClick={() => handleDogBreedSelect('요크셔테리어')} >요크셔테리어</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={() => handleDogBreedSelect('리트리버')}>리트리버</Dropdown.Item>
                                  <Dropdown.Item href="#/action-1" onClick={() => handleDogBreedSelect('비숑')} >비숑</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={() => handleDogBreedSelect('푸들')}>푸들</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                        </div>  
                      </Form.Group>
                      <Form.Group as={Col} controlId="formMatchingDate">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            매칭 날짜
                          </div>&nbsp;&nbsp;&nbsp;

                          <Dropdown>
                              <Dropdown.Toggle className={DateUpdateCss.dayDropdownBtn} variant="success" id="dropdown-basic"
                                  style={{
                                      width:'200px',
                                      border:'5px solid #F56084',
                                      backgroundColor: 'white',
                                      color:'#F56084',
                                      fontWeight:'bold',
                                      borderRadius:'10px'
                                  }}
                              >
                              {daySelect}
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='dropdown-menu scrollContainer'>
                                  <Dropdown.Item href="#/action-1" onClick={() => handleDaySelect(moment(value).format("YYYY년 MM월 DD일"))} ><Calendar onChange={onChange} value={value} /></Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formMatchingAddress">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            만남 장소
                          </div>&nbsp;&nbsp;&nbsp;
                          <div style={{
                            width:'35%'
                          }}>
                            <Form.Control className={DateUpdateCss.FormAddressInput} size="lg" type="text" onChange={handleInputChange}  value={matchingAddress} placeholder="주소 및 검색어 입력" />
                          </div>
                        </div>
                        <div style={{
                          marginTop:'18px'
                        }}>
                        <KakaoMap matchingAddress={matchingAddress} ></KakaoMap>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formUploadimage">
                        <div className={DateUpdateCss.FormTitleDiv} style={{
                          color:'gray',
                        }}>
                          <div className={DateUpdateCss.FormTitleNameDiv} >
                            사 진
                          </div>&nbsp;&nbsp;&nbsp;
                          사진 버튼클릭!
                          <img src='/image/date/camera.jpg' alt="카메라"
                                    onClick={ onCamera }
                                    style={{width:70, height:50, borderRadius:20}} />
                          <input type="file"name="img[]"
                                  multiple="multiple"
                                  onChange={ onImgInput } 
                                  ref={ imgRef } style={{visibility:'hidden'}} />
                        </div>
                        <div
                          style={{
                            border: '5px solid #F56084',
                            marginTop: '20px',
                            borderRadius: '10px',
                            height: '120px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', 
                          }}
                        >
                          {imgList.length === 0 && (
                            <div><span style={{ color: 'gray', textAlign:'center' }}>이미지 미리보기</span></div>
                          )}
                          <div>
                          {
                            imgList.map((item, index) => <img key={ index } 
                                                              src={ item } 
                                                              style={{ width:'100px', height:'100px', borderRadius:'5px',
                                                              margin:'5px'}} />)
                          }
                          </div>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formContent">
                        <div className={DateUpdateCss.FormTitleDiv} >
                          <div className={DateUpdateCss.FormTitleNameDiv} 
                          style={{marginBottom:'18px'}}>
                            상세 내용
                          </div>
                        </div>
                        <Form.Control as="textarea" rows={20} style={textareaStyle} />
                      </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit"
                    style={{
                      borderColor:'#F56084',
                      fontWeight:'bold',
                      fontSize:'1.3em',
                      backgroundColor:'#F56084',
                      borderRadius:'10px',
                      width:'100px'
                      }}
                      onClick={ onUploadSubmit }>
                      글 등록
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                    style={{
                      borderColor:'#F56084',
                      fontWeight:'bold',
                      fontSize:'1.3em',
                      backgroundColor:'#F56084',
                      borderRadius:'10px',
                      width:'100px'
                      }}
                      onClick={ onBack }>
                    뒤로</Button>
                  </Form>
                  </div>
              </div>
              </Container>
                
            {/* 푸터 */}
            <Footer></Footer>
        </div>
    );
};

export default DateUpdate;