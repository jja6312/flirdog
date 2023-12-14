import React, {  useEffect, useRef, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import dogsBreedObject from "../login/join/dogsBreeds";

const DateUpdate = () => {
  const { seq } = useParams();
    // id 값 사용 가능
  console.log(seq);

  //글 등록 정보
  const[matchingDTO2, setMatchingDTO2] = useState({
    title: '',
    createdAt:'',
    date:'',
    image:'',
    dogAge:'',
    dogGender:'',
    dogBreed:'',
    isNeutralized:'',
    dogMBTI:'',
    dogName:'',
    matchingState:'',
    matchingAddress:'',
    matchingPurpose:'',
    content:'',
    averageScore : '',
    communityScore:'',
    hit:'',
    id:'',
  });

  const[userDTO, setUserDTO] = useState({
    id : '',
    nickname : ''
  });

  //애견 정보
  const [dogsDTO, setDogsDTO] = useState({
    id : '',
    dogName : '',
    dogAge : '',
    dogGender : '',
    dogsBreed : '',
    isNeutralized : '',
    image : '',
    score : '',
    owner : '',
  })

  //const { title, content, dogMBTI} = matchingDTO
  const { title : dtoTitle, content, dogMBTI : dtoDogMBTI, 
          date : dateDTO, matchingAddress : matchingAddressDTO,
          matchingPurpose : matchingPurposeDTO, dogName : dogNameDTO,
          dogAge : dogAgeDTO, dogGender : dogGenderDTO, dogBreed : dogBreedDTO,
          matchingState : matchingStateDTO,
          isNeutralized : isNeutralizedDTO, image : imageDTO,
        } = matchingDTO2

  const [dogsInfo, setDogsInfo] = useState([]);
  
  const [seqNum, setSeqNum] = useState(-1);
  const [selectDogName, setSelectDogName] = useState(dogNameDTO);
  // eslint-disable-next-line no-unused-vars
  const [purposeSelect, setPurposeSelect] = useState(matchingPurposeDTO);
  // eslint-disable-next-line no-unused-vars
  const [stateSelect, setStateSelect] = useState(matchingStateDTO);
  // eslint-disable-next-line no-unused-vars
  const [dogBreedSelect, setdogBreedSelect] = useState(dogBreedDTO);
  //애견종선택에서 영어로 글자 들어오는것 한글로변경 - 지안1201-----------------------
  const [koreanBreedName, setKoreanBreedName] = useState(dogBreedDTO);

  const updateKoreanBreedName = (englishBreedName) => {
    const matchingBreed = dogsBreedObject.find((breed) => breed.value === englishBreedName);
    const newKoreanBreedName = matchingBreed ? matchingBreed.text : englishBreedName;
    setKoreanBreedName(newKoreanBreedName);
  };

  // eslint-disable-next-line no-unused-vars
  const [daySelect, setDaySelect] = useState(dateDTO);
  const [nowDate, setNowDate] = useState("날짜 선택");
  const [matchingAddress, setMatchingAddress] = useState(matchingAddressDTO);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [value, onChange] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [imagePrev, setImagePrev] = useState(`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageDTO}`);
  const moment = require('moment');
  //이미지가 여러개있는지 확인하고 저장하는 배열
  const [isMoreThanOneImage, setIsMoreThanOneImage] = useState([]);

  //유효성 검사
  const [titleDiv, setTitleDiv] = useState('');
  const [matchingPurposeDiv, setMatchingPurposeDiv] = useState('');
  const [selectDogDiv, setSelectDogDiv] = useState('');
  const [daySelectDiv, setDaySelectDiv] = useState('');
  const [matchingAddressDiv, setMatchingAddressDiv] = useState('');
  const [contentDiv, setContentDiv] = useState('');


  useEffect(() => {
    setDaySelect(nowDate);
  
    setMatchingDTO2(prevMatchingDTO2 => ({
      ...prevMatchingDTO2,
      date: nowDate,
    }));
  }, [nowDate]);

  const [swNum, setSwNum] = useState(0);

  useEffect(() => {
    console.log('SwNum:', swNum);
  }, [swNum]);

  

  //유저와 개정보를 받아옴---------------------------
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8080/date/dateReadMore?seq=${seq}`)
        
        console.log(res.data);
        
        const userRes = await axios.get(`http://localhost:8080/date/getUserInfo?userId=${res.data.userId}`)
        const dogRes = await axios.get(`http://localhost:8080/date/getDogsInfoUserId?userId=${res.data.userId}`);
        console.log(userRes.data);
        console.log(dogRes.data);
        console.log(res.data.dogName);

        setDogsInfo(dogRes.data);

        setUserDTO(prevUserDTO => ({
          ...prevUserDTO,
          id: userRes.data.id,
          nickname: userRes.data.nickname
        }));

        setMatchingDTO2(prevMatchingDTO2 => ({
              ...prevMatchingDTO2,
              title: res.data.title,
              createdAt: res.data.createdAt,
              date: res.data.date,
              image: res.data.image,
              dogAge: res.data.dogAge,
              dogGender: res.data.dogGender,
              dogBreed: res.data.dogBreed,
              isNeutralized: res.data.isNeutralized,
              dogMBTI: res.data.dogMBTI,
              dogName: res.data.dogName,
              matchingState: res.data.matchingState,
              matchingAddress: res.data.matchingAddress,
              matchingPurpose: res.data.matchingPurpose,
              content: res.data.content,
              averageScore: res.data.averageScore,
              communityScore: res.data.communityScore,
              hit: res.data.hit,
              id: res.data.id
        }));

        setDogsDTO(prevDogsDTO => ({
          ...prevDogsDTO,
          id: dogRes.data.id,
          dogName: dogRes.data.name,
          dogAge: dogRes.data.age,
          dogGender:dogRes.data.gender,
          dogsBreed: dogRes.data.dogsBreed,
          isNeutralized: dogRes.data.isNeutralized,
          image: dogRes.data.image,
          score: dogRes.data.score,
          owner: dogRes.data.owner,
        }));

        updateKoreanBreedName(res.data.dogBreed);

      } catch(error) {
        console.log(error);
      }
    };
    fetchData();
  }, [seq]);   

  useEffect(() => {
    if (dogsInfo.length > 0 && swNum === 1) {
      const data = dogsInfo[seqNum];
      
      setDogsDTO(prevDogsDTO => ({
        ...prevDogsDTO,
        id: data.id,
        dogName: data.name,
        dogAge: data.age,
        dogGender: data.gender,
        dogsBreed: data.dogsBreed,
        isNeutralized: data.isNeutralized,
        image: data.image,
        score: data.score,
      }));
  
      setMatchingDTO2(prevMatchingDTO2 => ({
        ...prevMatchingDTO2,
        dogName: data.name,
        dogAge: data.age,
        dogGender: data.gender,
        dogBreed: data.dogsBreed,
        isNeutralized: data.isNeutralized,
        image: data.image,
        averageScore: data.score.averageScore,
      }));

    }
  }, [seqNum, dogsInfo, swNum]);
 
  useEffect(() => {
    setMatchingDTO2(prevMatchingDTO => ({
      ...prevMatchingDTO,
    }));

    setUserDTO(prevUserDTO => ({
      ...prevUserDTO,
      id: userDTO.id,
      nickname: userDTO.nickname
    }));

  }, [userDTO.id, userDTO.nickname]);

  //입력
  const onInput = (e) =>{
    const {name, value} = e.target;

    setDogsDTO({...dogsDTO,
      [name]:value
    })

    setMatchingDTO2((prevMatchingDTO2) => ({
      ...prevMatchingDTO2,
      [name]: value,
    }));

    console.log('matchingDTO2:', matchingDTO2);
  }

  useEffect(() => {
    console.log('matchingDTO2:', matchingDTO2);
  }, [matchingDTO2]);

  const onInputMatchingAddress = (e) =>{
    setMatchingAddress(e.target.value);
  }
  
  const navigate = useNavigate()

  const handlePurposeSelect = (purpose) => {
    setPurposeSelect(purpose);

    setMatchingDTO2({
      ...matchingDTO2,
      matchingPurpose: purpose,
    });
  };

  const handleStateSelect = (state) => {
    setStateSelect(state);

    setMatchingDTO2({
      ...matchingDTO2,
      matchingState: state,
    });
  };


  const handlePetSelect = (index) => {
    console.log('Selected Dog Index:', index);
    setSwNum(1);
    setSeqNum(index);
    
    const selectedDog = dogsInfo.find(dog => dog.name === dogNameDTO);
    // 해당 개의 이름 가져오기
    const selectedDogName = dogsInfo[index]?.name || "";
    const selectedDogBreed = dogsInfo[index]?.dogsBreed || "";
    const selectedDogBreedKorean = setKoreanBreedName(selectedDogBreed);
    setSelectDogName(selectedDogName);
    setdogBreedSelect(koreanBreedName);

    if (selectedDog) {
      // dogNameDTO 값을 사용하여 input 값을 설정
      setDogsDTO({
        ...dogsDTO,
        dogName: selectedDog.name,
        score: selectedDog.score,
        // 다른 필요한 속성도 여기에 추가
      });

      setMatchingDTO2((prevMatchingDTO2) => ({
        ...prevMatchingDTO2,
        dogName: selectedDog.name,
        dogBreed: selectedDog.dogBreed,
        averageScore: selectedDog.score.averageScore,
        // 다른 필요한 속성도 여기에 추가
      }));

      setSelectDogName(selectedDog.name);
    }
  };

  // 드롭다운 아이템 생성
  const dropdownItems = dogsInfo.map((dog, index) => (
    <Dropdown.Item key={index} onClick={() => handlePetSelect(index)} onChange={onInput}>
      {dog.name}
    </Dropdown.Item>
  ));

  const handleDogBreedSelect = (selectedBreed) => {
    setdogBreedSelect(selectedBreed);

    setMatchingDTO2({
      ...matchingDTO2,
      dogBreed: selectedBreed,
    })

    setKoreanBreedName(selectedBreed);
    updateKoreanBreedName(selectedBreed);
  };



  const textareaStyle = {
    resize: 'none', // 사용자가 크기를 조절하지 못하도록 설정
    fontSize: '1.3em',
  };

  const handleSearchButtonClick = (event) => {
    // 검색 버튼 클릭 시에 실행되는 로직
    handleAddressSelection(matchingAddress);
    setButtonClicked(true);
  };

  const handleAddressSelection = (matchingAddress) => {
    setMatchingAddress(matchingAddress);

    setMatchingDTO2({
      ...matchingDTO2,
      matchingAddress: matchingAddress
    })

    console.log('주소:', matchingDTO2.matchingAddress);
  };

  //사진 등록관련
  const imgRef = useRef()

  const [imgList, setImgList] = useState([imageDTO]) //배열은 []
  const [imgFiles, setImgFiles] = useState([]);

  const onCamera = () => {
      imgRef.current.click()
  }
  console.log('imgFiles:', imgFiles);

  const onImgInput = (e) => {
    const imgfiles = Array.from(e.target.files);
    const imgArray = imgfiles.map((item) => URL.createObjectURL(item));
  
    setImgList(imgArray);
    // 이미지가 교체될 때 ','로 구분된 이미지 배열 초기화
    setImgFiles(imgfiles);
    setIsMoreThanOneImage([]);
    setImagePrev(imgArray[0]);
  }

  useEffect(() => {
      // matchingDTO2가 정의되어 있고 image 속성이 있는지 확인
      if (matchingDTO2 && matchingDTO2.image) {
          // image 값이 ','로 구분되어 있는지 확인
          if (matchingDTO2.image.includes(',')) {
              setIsMoreThanOneImage(matchingDTO2.image.split(','));
          } else {
              // 이미지가 하나인 경우 배열을 초기화
              setIsMoreThanOneImage([]);
          }
      }
  }, [matchingDTO2]);

  useEffect(() => {
    //setIsMoreThanOneImage 의 변동사항을 추적
    console.log('isMoreThanOneImage:', isMoreThanOneImage);
  }, [isMoreThanOneImage]);
  

  useEffect(() => {
    // 이미지가 교체될때 is...배열을 초기화
    setIsMoreThanOneImage([]);

      // 이미지가 교체될 때 초기 이미지 주소를 설정
    setImagePrev(imgList[0]);
  }, [imgList]);

  const onUpDateSubmit = (e) => {
    e.preventDefault()

    var sw = 1;

      if (matchingDTO2.title === '') {
        setTitleDiv(<div style={{color:'red'}}>제목을 입력해주세요.</div>);
        sw = 0;
      }
      if (matchingDTO2.matchingPurpose === '') {
        setMatchingPurposeDiv(<div style={{color:'red'}}>글 분류를 선택해주세요.</div>);
        sw = 0;
      }
      if (selectDogName === '애견 선택') {
        setSelectDogDiv(<div style={{color:'red'}}>애견을 선택해주세요.</div>);
        sw = 0;
      } 
      
      if (matchingDTO2.date === '날짜 선택'){
        setDaySelectDiv(<div style={{color:'red'}}>날짜를 선택해주세요.</div>);
        sw = 0;
      }

      if (matchingDTO2.matchingAddress === ''){
        setMatchingAddressDiv(<div style={{color:'red'}}>만남 장소를 입력해주세요.</div>);
        sw = 0;
      }

      if (matchingDTO2.content === ''){
        setContentDiv(<div style={{color:'red'}}>상세 내용을 입력해주세요.</div>);
        sw = 0;
      }
      
      if(sw === 0){
        Swal.fire({
          icon: 'error',
          title: '글 등록 실패!',
          text: '필수 항목들을 입력하세요!',
          showConfirmButton: false,
          timer: 1500
        })
      }

      if(sw === 1){
        console.log('matchingDTO2:', matchingDTO2);

        const formData = new FormData();
        formData.append("matchingDTO2", new Blob([JSON.stringify(matchingDTO2)], {type: 'application/json'}))


        if (imgFiles.length === 0) {
            // Content-Type을 명시적으로 설정
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };
            
            axios.post(`/date/dateUpdate2`, formData, config)
            .then((response) => {
              console.log('서버 응답:', response.data);
              Swal.fire({
                icon: 'success',
                title: '글 수정 성공!',
                text: '매칭 글이 수정되었습니다.',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/date/dateList')
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: '글 수정 실패!',
                text: '매칭 글 수정에 실패했습니다.',
                showConfirmButton: false,
                timer: 1500
              })
            });
        } else {
            for (var i = 0; i < imgFiles.length; i++) {
              formData.append("imgFiles", imgFiles[i]);
            }
            if (imgFiles.length === 0) {
              formData.append("imgFiles", new File([], ""));
            }

            // Content-Type을 명시적으로 설정
              const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              };

              // 서버로 POST 요청 보내기
              axios.post(`/date/dateUpdate`, formData, config)
                .then((response) => {
                  console.log('서버 응답:', response.data);
                  Swal.fire({
                    icon: 'success',
                    title: '글 수정 성공!',
                    text: '매칭 글이 수정되었습니다.',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/date/dateList')
                })
                .catch((error) => {
                  Swal.fire({
                    icon: 'error',
                    title: '글 수정 실패!',
                    text: '매칭 글 수정에 실패했습니다.',
                    showConfirmButton: false,
                    timer: 1500
                  })
                });
              }
          }
      }   


  const onBack = () => {
    window.scrollTo(0, 0);
    navigate(`/date/dateReadMore/${seq}`);
  }

return (
    <div>
        <Header></Header>
        <div>
          <Container><div className={DateUpdateCss.DateTitle}>
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
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridTitle">
                    <div className={DateUpdateCss.FormTitleDiv} 
                        style={{
                          marginBottom:'10px'
                        }}
                    >
                      <div className={DateUpdateCss.FormTitleNameDiv} >
                        제 목
                      </div>&nbsp;&nbsp;&nbsp;
                      <Form.Control className={DateUpdateCss.FormSubjectTitleInput} size="lg" type="text" name='title' value={dtoTitle || ''} onChange={onInput} placeholder="제목을 입력해주세요." />
                      &nbsp;&nbsp;&nbsp;
                    </div>
                    <div id="titleDiv">{ titleDiv} </div>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridTitle">
                  <div className={DateUpdateCss.FormTitleDiv} >
                      <div className={DateUpdateCss.FormTitleNameDiv} >
                        애견 선택
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
                          {dogNameDTO}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className='dropdown-menu scrollContainer' 
                          style={{ maxHeight: '200px', overflowY: 'auto' }}    
                              >
                              {dropdownItems || ''}
                          </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div>{selectDogDiv}</div>
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
                          {matchingPurposeDTO}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className='dropdown-menu scrollContainer' 
                          style={{ maxHeight: '200px', overflowY: 'auto' }}    
                              >
                              <Dropdown.Item href="#/action-1" onClick={() => handlePurposeSelect('연애')}>연 애</Dropdown.Item>
                              <Dropdown.Item href="#/action-2" onClick={() => handlePurposeSelect('산책')}>산 책</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div>{matchingPurposeDiv}</div>  
                  </Form.Group>

                  <Form.Group as={Col} controlId="formDogName">
                    <div className={DateUpdateCss.FormTitleDiv} >
                      <div className={DateUpdateCss.FormTitleNameDiv} >
                        애견 이름
                      </div>&nbsp;&nbsp;&nbsp;
                      <Form.Control 
                      className={DateUpdateCss.FormTitleInput} 
                      size="lg" type="text" name='dogName' value={dogNameDTO || ''} onChange={onInput} placeholder="애견 이름 입력" />
                      &nbsp;&nbsp;&nbsp;
                    </div>  
                  </Form.Group>

                  <Form.Group as={Col} controlId="formDogGender">
                    <div className={DateUpdateCss.FormTitleDiv} >
                      <div className={DateUpdateCss.FormTitleNameDiv} >
                        성 별
                      </div>&nbsp;&nbsp;&nbsp;
                      <div className={`d-flex justify-content-left`}>
                                        <input id='genderBox1' type='radio' name='dogGender' value={dogGenderDTO || ''} onChange={onInput} checked={dogGenderDTO === 'Male'}/>
                                        <label className={DateUpdateCss.labelClass1} htmlFor='genderBox1'>남 아</label>
                                        &nbsp;&nbsp;
                                        <input id='genderBox2' type='radio' name='dogGender' value={dogGenderDTO || ''} onChange={onInput} checked={dogGenderDTO === 'Female'}/>
                                        <label className={DateUpdateCss.labelClass2} htmlFor='genderBox2'>여 아</label>
                      </div>&nbsp;&nbsp;&nbsp;
                    </div>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formDogAge">
                    <div className={DateUpdateCss.FormTitleDiv} >
                      <div className={DateUpdateCss.FormTitleNameDiv} >
                        나 이
                      </div>&nbsp;&nbsp;&nbsp;
                      <Form.Control className={DateUpdateCss.FormTitleInput} size="lg" type="text" name='dogAge' value={dogAgeDTO || ''} onChange={onInput} placeholder="나이 입력" />
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
                        <input id='neutralizationBox' type='checkbox' value={isNeutralizedDTO || ''} onChange={onInput} checked={isNeutralizedDTO}/>
                        <label className={`${DateUpdateCss.neutralizationLabel} ${DateUpdateCss.labelClass3}`} htmlFor='neutralizationBox'></label>
                      </div>
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCheckPurpose">
                    <div className={DateUpdateCss.FormTitleDiv} >
                      <div className={DateUpdateCss.FormTitleNameDiv} 
                       style={{fontSize:'1em'}}>
                        애견종 선택
                      </div>&nbsp;&nbsp;&nbsp;
                      <Dropdown>
                      <Dropdown.Toggle
                        className={DateUpdateCss.filterDropdownBtn}
                        variant="success"
                        id="dropdown-basic"
                        style={{
                          border: "5px solid #F56084",
                          backgroundColor: "white",
                          color: "#F56084",
                          fontWeight: "bold",
                          borderRadius: "10px",
                        }}
                      >
                        {koreanBreedName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className="dropdown-menu scrollContainer"
                        style={{ maxHeight: "200px", overflowY: "auto" }}
                      >
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          요크셔테리어
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          리트리버
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-3"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          비숑
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-4"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          푸들
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-5"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          포메리안
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-6"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          허스키
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-7"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          치와와
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-8"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          닥스훈트
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-5"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          말티즈
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-6"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          비글
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-7"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          시츄
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-8"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          웰시코기
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-5"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          진돗개
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-6"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          보더콜리
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-7"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          섀퍼드
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-8"
                          onClick={() => handleDogBreedSelect(dogBreedDTO || "")}
                          onChange={onInput}
                        >
                          코커스패니얼
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>  
                  </Form.Group>
                </Row>
                
                <Row className="mb-3">
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
                      {dateDTO}
                      </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu scrollContainer">
                            <Dropdown.Item href="#/action-1">
                              <Calendar
                                onChange={(e) => {
                                  onChange();
                                  setNowDate(moment(e).format("YYYY년 MM월 DD일"));
                                }}
                                value={value || ""}
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div>{daySelectDiv}</div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCheckPurpose">
                    <div className={DateUpdateCss.FormTitleDiv} >
                      <div className={DateUpdateCss.FormTitleNameDiv} >
                        매칭 목적
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
                          {matchingStateDTO}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className='dropdown-menu scrollContainer' 
                          style={{ maxHeight: '200px', overflowY: 'auto' }}    
                              >
                              <Dropdown.Item href="#/action-1" onClick={() => handleStateSelect('매칭대기')}>매칭대기</Dropdown.Item>
                              <Dropdown.Item href="#/action-2" onClick={() => handleStateSelect('매칭완료')}>매칭완료</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridCheckPurpose">
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
                        <Form.Control className={DateUpdateCss.FormAddressInput} size="lg" type="text" 
                        value={matchingAddressDTO|| ''}
                        onChange={onInputMatchingAddress}
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
                    <div>{matchingAddressDiv}</div>
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
                                style={{width:70, height:50, borderRadius:20, cursor: 'pointer'}} 
                                />
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
                      {isMoreThanOneImage.length === 0 ? (
                        imgList.map((item, index) => 
                        <img
                          key={index}
                          src={item === '' ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageDTO}` : item}
                          alt=""
                          style={{ width: '100px', height: '100px', borderRadius: '5px', margin: '5px' }}
                        />)
                      ) : (
                        isMoreThanOneImage.map((item, index) => (
                          <img
                            key={index}
                            src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${item}`}
                            alt=""
                            style={{ width: '100px', height: '100px', borderRadius: '5px', margin: '5px' }}
                          />
                        ))
                      )}

                        {/*
                      {imgList.map((item, index) => 
                        <img
                          key={index}
                          // src={item === '' ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-95/${imageDTO}` : item}
                          alt=""
                          style={{ width: '100px', height: '100px', borderRadius: '5px', margin: '5px' }}
                        />
                      )}*/}
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
                    <Form.Control as="textarea" rows={20} style={
                      textareaStyle} name='content' value={content|| ''} onChange={onInput}/>
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
                  onClick={ onUpDateSubmit }>
                  글 수정
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

export default DateUpdate;