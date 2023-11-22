import React, {  useEffect, useRef, useState } from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import Container from 'react-bootstrap/esm/Container';
import TableCss from '../../css/date/dateWrite.module.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import KakaoMap from './KakaoMap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

const DateWrite = () => {
  //글 등록 정보
  const [matchingDTO, setMatchingDTO] = useState({
    title : '',
    content : '',
    matchingPurpose : '',
    matchingState : 'PENDING',
    user : '',
    dogsInfo : '',
    matchingDate : '',
    matchingAddress : ''
  })

  //애견정보
  const [dogsDTO, setDogsDTO] = useState({
    id : '',
    dogName : '',
    dogAge : '',
    dogGender : '',
    dogsBreed : '',
    dogMBTI : '',
    isNeutralized : '',
    image : '',
    score : '',
    owner : ''
  })

  const { dogName, dogAge, dogGender, dogsBreed, dogMBTI, isNeutralized } = dogsDTO
  const { title, content, matchingPurpose } = matchingDTO

  const [dogsInfo, setDogsInfo] = useState([]);

  const [titleDiv, setTitleDiv] = useState('')
  const [matchingPurposeDiv, setMatchingDivPurpose] = useState('')
  const [contentDiv, setContentDiv] = useState('')
  const [dogNameDiv, setDogNameDiv] = useState('')
  const [dogAgeDiv, setDogAgeDiv] = useState('')
  const [dogGenderDiv, setDogGenderDiv]  = useState('')
  const [dogsBreedDiv, setDogsBreedDiv] = useState('')
  const [dogMBTIDiv, setDogMBTIDiv] = useState('')
  const [matchingDateDiv, setMatchingDateDiv] = useState('')
  const [matchingAddressDiv, setMatchingAddressDiv] = useState('')
  const [imageDiv, setImageDiv] = useState('')
  const [matchingState, setMatchingState] = useState('')

  const [seq, setSeq] = useState(0);
  const [selectDogName, setSelectDogName] = useState('애견 선택');
  const [purposeSelect, setPurposeSelect] = useState('글 분류');
  const [dogBreedSelect, setdogBreedSelect] = useState('애견 종 선택');
  const [daySelect, setDaySelect] = useState('날짜 선택');
  const [matchingAddress, setMatchingAddress] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [value, onChange] = useState(new Date());
  const moment = require('moment');

  const [imgFiles, setImgFiles] = useState("");

  //유저와 개정보를 받아옴---------------------------
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res  = await axios.get(`http://localhost:8080/date/getDogsInfoWithUserId?userId=1`);

        console.log(res.data);     
        setDogsInfo(res.data);

        } catch (error){
          console.error('Error fetching data:', error);
        }
      }
    fetchData();  
  },[])

  useEffect(()=>{
    if (dogsInfo.length > 0) {
                const data = dogsInfo[seq];
                setDogsDTO({
                    id: data.id,
                    dogName: data.name,
                    dogAge: data.age,
                    dogGender: data.gender,
                    dogsBreed: data.dogsBreed,
                    isNeutralized: data.isNeutralized,
                    image: data.image,
                });
            }
  }, [seq, dogsInfo]);

  //입력
  const onInput = (e) =>{
    const {name, value} = e.target;

    setMatchingDTO({...matchingDTO,
      [name]:value
    })

    setDogsDTO({...dogsDTO,
      [name]:value
    })
  }

  const navigate = useNavigate()


  const handlePurposeSelect = (purpose) => {
    setPurposeSelect(purpose);
    if(purpose==='연 애'){
      setMatchingDTO({
        ...matchingDTO,
        [matchingPurpose]:'DATE'
      })
    }else if(purpose==='산 책'){
      setMatchingDTO({
        ...matchingDTO,
        [matchingPurpose]:'WALK'
      })
    }
  };
  
  console.log(imageDiv);

  const handlePetSelect = (index) => {
    console.log('Selected Dog Index:', index);
    setSeq(index);

    // 해당 개의 이름 가져오기
    const selectedDogName = dogsInfo[index]?.name || '';
    const selectedDogBreed = dogsInfo[index]?.dogsBreed || '';
    setSelectDogName(selectedDogName)
    setdogBreedSelect(selectedDogBreed);
  };

  // 드롭다운 아이템 생성
  const dropdownItems = dogsInfo.map((dog, index) => (
    <Dropdown.Item key={index} onClick={() => handlePetSelect(index)} onChange={onInput}>
        {dog.name}
    </Dropdown.Item>
));

  const handleDogBreedSelect = (selectedBreed) => {
    setdogBreedSelect(selectedBreed);
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

  const handleSearchButtonClick = (event) => {
    // 검색 버튼 클릭 시에 실행되는 로직
    handleAddressSelection(matchingAddress);
    setButtonClicked(true);
  };

  const handleAddressSelection = (matchingAddress) => {
    setMatchingAddress(matchingAddress);
  };
  
  //사진 등록관련
  const imgRef = useRef()

  const [imgList, setImgList] = useState([]) //배열은 []
  const [files, setFiles] = useState('')

  console.log(files);

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

      setImgList(imgArray) //카메라 아이콘을 누르면 이미지 미리보기 용도
      setImgFiles(imgfiles)
      setFiles(e.target.files) //formData에 넣어서 서버로(스프링 부트) 보내기 용도
  }

    const onUploadSubmit = (e) => {
      e.preventDefault()

      var sw = 1

      /*
      //유효성 검사
      if(!title){
        setTitleDiv('제목 입력')
        sw = 0
      }
      if(purposeSelect === '글 분류'){
        setMatchingDivPurpose('목적을 선택하세요.')
        sw = 0
      }
      if(!dogName){
        setDogNameDiv('애견 이름 입력')
        sw = 0
      }
      if(!dogGender){
        setDogGenderDiv('애견 성별 선택')
        sw = 0
      }
      if(!dogAge){
        setDogAgeDiv('애견 나이 입력')
        sw = 0
      }
      if(dogBreedSelect === '애견 종 선택'){
        console.log(dogsBreedDiv)
        setDogsBreedDiv('애견 종을 선택하세요.')
        sw = 0
      }
      if(!dogMBTI){
        setDogMBTIDiv('애견 MBTI 입력')
        sw = 0
      }
      if(daySelect === '날짜 선택'){
        console.log(matchingDateDiv)
        setMatchingDateDiv('날짜를 선택하세요.')
        sw = 0
      }
      if(!matchingAddress){
        console.log(matchingAddressDiv)
        setMatchingAddressDiv('만남 장소를 선택하세요.')
        sw = 0
      }
      if(!imgList){
        setImageDiv('애견 이미지를 등록하세요.')
        sw = 0
      }
      if(!content){
        setContentDiv('내용을 작성하세요.')
        sw = 0
      }
    */

      //글 등록---------------------------
      if(sw === 1 ){
        setMatchingState('PENDING');

        const formData = new FormData();

        formData.append("matchingDTO", JSON.stringify(matchingDTO))
        formData.append("dogsDTO", JSON.stringify(dogsDTO))
        formData.append("matchingPurpose", matchingPurpose)
        formData.append("matchingState", matchingState)

        for (var i = 0; i < imgFiles.length; i++) {
          formData.append("imgFiles", imgFiles[i]);
        }
        if (imgFiles.length === 0) {
          formData.append("imgFiles", new File([], ""));
        }

        console.log(formData.entries());
        console.log(formData.get('matchingDTO'))
        console.log(formData.get('dogsDTO'))
        console.log(formData.get('matchingPurpose'))
        console.log(formData.get('matchingState'))

        axios.post(`/date/dateWrite`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(
          (res) => {
            setTimeout(() => {
              Swal.fire({
                position: "top",
                icon: "success",
                title: "매칭 글 등록",
                showConfirmButton: false,
                timer: 1500,
              });
            }, 1000);
    
            setTimeout(() => {
              navigate('/date/dateList')
            }, 1600);
          }
            
        ).catch(error => console.log(error))       
      }
  }
  
  const onBack = () => {
    window.scrollTo(0, 0);
    navigate('/date/dateList')
  }

    return (
        <div>
            <Header></Header>
            <div>
              <Container><div className={TableCss.DateTitle}>
                  <div className={TableCss.DateTitleDiv}>
                  매칭 글 작성
                  </div>
                </div>
              </Container>
            </div>
            <hr className={TableCss.dateHr}/>

            <Container>
              <div className={TableCss.formTable}>
                <div className={TableCss.formTableDiv}>
                <Form>
                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="formGridTitle">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            제 목
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormSubjectTitleInput} size="lg" type="text" name='title' value={title || ''} onChange={onInput} placeholder="제목을 입력해주세요." />
                          &nbsp;&nbsp;&nbsp;
                          <div id="titleDiv">{ titleDiv} </div>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridTitle">
                      <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            애견 선택
                          </div>&nbsp;&nbsp;&nbsp;
                          <Dropdown>
                              <Dropdown.Toggle className={TableCss.filterDropdownBtn} variant="success" id="dropdown-basic"
                                  style={{
                                      border:'5px solid #F56084',
                                      backgroundColor: 'white',
                                      color:'#F56084',
                                      fontWeight:'bold',
                                      fontSize:'1.3em',
                                      borderRadius:'10px'
                                  }}
                              >
                              {selectDogName}
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='dropdown-menu scrollContainer' 
                              style={{ maxHeight: '200px', overflowY: 'auto' }}    
                                  >
                                  {dropdownItems || ''}
                              </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCheckPurpose">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            글 분류
                          </div>&nbsp;&nbsp;&nbsp;
                          <Dropdown>
                              <Dropdown.Toggle className={TableCss.filterDropdownBtn} variant="success" id="dropdown-basic"
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
                                  <Dropdown.Item href="#/action-1" onClick={() => handlePurposeSelect('연 애')} name='matchingPurpose' value={purposeSelect || ''} onChange={onInput}>연 애</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={() => handlePurposeSelect('산 책')} name='matchingPurpose' value={purposeSelect || ''} onChange={onInput}>산 책</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <div>{matchingPurposeDiv}</div>  
                      </Form.Group>

                      <Form.Group as={Col} controlId="formDogName">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            애견 이름
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" name='dogName' value={dogName || ''} onChange={onInput} placeholder="애견 이름 입력" />
                          &nbsp;&nbsp;&nbsp;<div>{dogNameDiv}</div>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formDogGender">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            성 별
                          </div>&nbsp;&nbsp;&nbsp;
                          <div className={`d-flex justify-content-left`}>
                                            <input id='genderBox1' type='radio' name='dogGender' value={dogGender || ''} onChange={onInput} checked={dogGender === 'Male'}/>
                                            <label className={TableCss.labelClass1} htmlFor='genderBox1'>남 아</label>
                                            &nbsp;&nbsp;
                                            <input id='genderBox2' type='radio' name='dogGender' value={dogGender || ''} onChange={onInput} checked={dogGender === 'Female'}/>
                                            <label className={TableCss.labelClass2} htmlFor='genderBox2'>여 아</label>
                          </div>&nbsp;&nbsp;&nbsp;
                          <div>{dogGenderDiv}</div>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formDogAge">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            나 이
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" name='dogAge' value={dogAge || ''} onChange={onInput} placeholder="나이 입력" />
                        </div>&nbsp;&nbsp;&nbsp;
                        <div>{dogAgeDiv}</div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridEmail">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} 
                               style={{fontSize:'1em'}}
                          >
                            중성화 여부
                          </div>&nbsp;&nbsp;&nbsp;
                          <div className={`d-flex justify-content-left`}>
                            <input id='neutralizationBox' type='checkbox' value={isNeutralized || ''} onChange={onInput} checked={isNeutralized}/>
                            <label className={`${TableCss.neutralizationLabel} ${TableCss.labelClass3}`} htmlFor='neutralizationBox'></label>
                          </div>
                        </div>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formDogMBTI">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            멍BTI
                          </div>&nbsp;&nbsp;&nbsp;
                          <Form.Control className={TableCss.FormTitleInput} size="lg" type="text" name='dogMBTI' value={dogMBTI || ''} onChange={onInput} placeholder="애견 MBTI 입력" />
                          &nbsp;&nbsp;&nbsp;
                          <div>{dogMBTIDiv}</div>
                        </div>
                      </Form.Group>
                    </Row>
                    
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCheckPurpose">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} 
                           style={{fontSize:'1em'}}>
                            애견종 선택
                          </div>&nbsp;&nbsp;&nbsp;
                          <Dropdown>
                              <Dropdown.Toggle className={TableCss.filterDropdownBtn} variant="success" id="dropdown-basic"
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
                                  <Dropdown.Item href="#/action-1" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>요크셔테리어</Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>리트리버</Dropdown.Item>
                                  <Dropdown.Item href="#/action-3" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>비숑</Dropdown.Item>
                                  <Dropdown.Item href="#/action-4" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>푸들</Dropdown.Item>
                                  <Dropdown.Item href="#/action-5" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>포메리안</Dropdown.Item>
                                  <Dropdown.Item href="#/action-6" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>허스키</Dropdown.Item>
                                  <Dropdown.Item href="#/action-7" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>치와와</Dropdown.Item>
                                  <Dropdown.Item href="#/action-8" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>닥스훈트</Dropdown.Item>
                                  <Dropdown.Item href="#/action-5" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>말티즈</Dropdown.Item>
                                  <Dropdown.Item href="#/action-6" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>비글</Dropdown.Item>
                                  <Dropdown.Item href="#/action-7" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>시츄</Dropdown.Item>
                                  <Dropdown.Item href="#/action-8" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>웰시코기</Dropdown.Item>
                                  <Dropdown.Item href="#/action-5" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>진돗개</Dropdown.Item>
                                  <Dropdown.Item href="#/action-6" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>보더콜리</Dropdown.Item>
                                  <Dropdown.Item href="#/action-7" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>섀퍼드</Dropdown.Item>
                                  <Dropdown.Item href="#/action-8" onClick={() => handleDogBreedSelect(dogsBreed|| '')} onChange={onInput}>코커스패니얼</Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                        </div>  
                      </Form.Group>
                      <Form.Group as={Col} controlId="formMatchingDate">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            매칭 날짜
                          </div>&nbsp;&nbsp;&nbsp;

                          <Dropdown>
                              <Dropdown.Toggle className={TableCss.dayDropdownBtn} variant="success" id="dropdown-basic"
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
                                  <Dropdown.Item href="#/action-1" onClick={() => handleDaySelect(moment(value).format("YYYY년 MM월 DD일"))} ><Calendar onChange={onChange} value={value|| ''} /></Dropdown.Item>
                              </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formMatchingNull">
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formMatchingAddress">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} >
                            만남 장소
                          </div>&nbsp;&nbsp;&nbsp;
                          <div style={{
                            width:'35%'
                          }}>
                            <Form.Control className={TableCss.FormAddressInput} size="lg" type="text" 
                            value={matchingAddress|| ''}
                            onChange={handleInputChange}
                            placeholder="주소 및 검색어 입력" />
                          </div>&nbsp;&nbsp;&nbsp;
                          <Button variant="primary"
                            style={{
                              borderColor:'#F56084',
                              fontWeight:'bold',
                              fontSize:'1.3em',
                              backgroundColor:'#F56084',
                              borderRadius:'10px',
                              width:'100px'
                              }}
                              onClick={handleSearchButtonClick}
                              >
                              검 색
                            </Button>
                        </div>
                        {buttonClicked && (
                          <div style={{ marginTop: '18px' }}>
                            <KakaoMap
                              matchingAddress={matchingAddress|| ''}
                              onAddressSelected={handleAddressSelection}
                            ></KakaoMap>
                          </div>
                        )}
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formUploadimage">
                        <div className={TableCss.FormTitleDiv} style={{
                          color:'gray',
                        }}>
                          <div className={TableCss.FormTitleNameDiv} >
                            사 진
                          </div>&nbsp;&nbsp;&nbsp;
                          사진 버튼클릭!
                          <img src='/image/date/camera.jpg' alt="카메라"
                                    onClick={ onCamera }
                                    style={{width:70, height:50, borderRadius:20}} />
                          <input type="file"name="img[]"
                                  multiple="multiple"
                                  onChange={ onImgInput }
                                  //setImgFiles={setImgFiles}
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
                                                              alt=''
                                                              style={{ width:'100px', height:'100px', borderRadius:'5px',
                                                              margin:'5px'}} />)
                          }
                          </div>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formContent">
                        <div className={TableCss.FormTitleDiv} >
                          <div className={TableCss.FormTitleNameDiv} 
                          style={{marginBottom:'18px'}}>
                            상세 내용
                          </div>
                        </div>
                        <Form.Control as="textarea" rows={20} style={textareaStyle} name='content' value={content|| ''} onChange={onInput}/>
                        <div>{contentDiv}</div>
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
            <Footer></Footer>
        </div>
    );
};

export default DateWrite;