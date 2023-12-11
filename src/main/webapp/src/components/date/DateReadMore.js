import React, { useContext, useEffect, useState } from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import { Container } from 'react-bootstrap';
import ReadMoreCSS from '../../css/date/dateReadMore.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
//import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import { UserContext } from '../../contexts/UserContext';
import dogsBreedObject from "../login/join/dogsBreeds";
import Swal from 'sweetalert2';
import DateMessageRoom from './DateMessageRoom';

const DateReadMore = () => {
  const { user } = useContext(UserContext); // 유저 컨텍스트
  const { id } = user;
  console.log(id);

  const [getUserId, setGetUserId] = useState('');

  const { seq } = useParams();
    // id 값 사용 가능
  console.log(seq);

  const[matchingDTO, setMatchingDTO] = useState({
    title: '',
    createdAt:'',
    date:'',
    image:'',
    dogAge:'',
    dogGender:'',
    dogBreed:'',
    isNeutralized:'',
    dogName:'',
    matchingState:'',
    matchingAddress:'',
    matchingPurpose:'',
    content:'',
    averageScore:'',
    communityScore:'',
    hit:'',
    id:'',
    userId:''
  });

  const[userDTO, setUserDTO] = useState({
    id : '',
    nickname : ''
  });

  //이미지가 여러개있는지 확인하고 저장하는 배열
  const [isMoreThanOneImage, setIsMoreThanOneImage] = useState([]);

  const textareaStyle = {
    resize: 'none', // 사용자가 크기를 조절하지 못하도록 설정
  };
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            if (seq) {
                const res = await axios.get(`https://java.flirdog.store:8080/date/dateReadMore?seq=${seq}`);
                console.log(res.data);

              
                const userRes = await axios.get(`https://java.flirdog.store:8080/date/getUser?id=${res.data.userId}`);
                console.log(userRes.data);

                setUserDTO(prevUserDTO => ({
                    ...prevUserDTO,
                    id: userRes.data.id,
                    nickname: userRes.data.nickname
                }));


                setMatchingDTO(prevMatchingDTO2 => ({
                    ...prevMatchingDTO2,
                    title: res.data.title,
                    createdAt: res.data.createdAt,
                    date: res.data.date,
                    image: res.data.image,
                    dogAge: res.data.dogAge,
                    dogGender: res.data.dogGender,
                    dogBreed: res.data.dogBreed,
                    isNeutralized: res.data.isNeutralized,
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

                setGetUserId(res.data.userId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();
}, [seq, id]);

 
  useEffect(() => {
    setMatchingDTO(prevMatchingDTO => ({
      ...prevMatchingDTO,
    }));

    setUserDTO(prevUserDTO => ({
      ...prevUserDTO,
      id: userDTO.id,
      nickname: userDTO.nickname
    }));

  }, [userDTO.id, userDTO.nickname]);

   // seq와 matchingDTO.id가 같지 않은지 확인
   const shouldHideLink = id !== getUserId;
   console.log("id:", id);
   console.log("matchingDTO.userId:", getUserId);
   console.log("shouldHideLink:", shouldHideLink);

  //날짜 표현
  const createdAtDate =moment(matchingDTO.createdAt).format('YYYY-MM-DD');
  const createdAtTime =moment(matchingDTO.createdAt).format('HH:mm');

  
  console.log(createdAtDate);

  const navigate = useNavigate();
  
  //채팅관련
  const [showMessageRoomModal, setShowMessageRoomModal] = useState(false);

  const onFlirting = () => {
    setShowMessageRoomModal(true);
  };

  const onHideMessageRoomModal = () => {
    setShowMessageRoomModal(false);
  };



  const onBack = () => {
    window.scrollTo(0, 0);
    navigate(`/date/dateList`)
  }

  //애견 종이름 한글로 변경
  const selectedDogBreed = matchingDTO.dogBreed || "";

  //애견종선택에서 영어로 글자 들어오는것 한글로변경 - 지안1201-----------------------
  const getKoreanBreedName = (selectedDogBreed) => {
    const breed = dogsBreedObject.find((b) => b.value === selectedDogBreed);
    return breed ? breed.text : selectedDogBreed; // 만약 매핑되는 한글 이름이 없다면 영어 이름을 반환
  };

  const selectedDogBreedKorean = getKoreanBreedName(selectedDogBreed);

  //사진이 여러개인 경우
  useEffect(() => {
    // setMatchingDTO2 가 되면 image 스트링값에 ','가 있으면 isMoreThanOneImage useState 배열에 저장하기.
    if (matchingDTO.image.includes(',')) {
      setIsMoreThanOneImage(matchingDTO.image.split(','));
    } else {
      // 이미지가 하나인 경우 배열을 초기화
      setIsMoreThanOneImage([matchingDTO.image]);
    }
  }, [matchingDTO.image]);

  useEffect(() => {
    //setIsMoreThanOneImage 의 변동사항을 추적
    console.log('isMoreThanOneImage:', isMoreThanOneImage);
  }, [isMoreThanOneImage]);

  const onDelete = () => {
      Swal.fire({
        icon: "error",
        title: "정말 삭제하시겠습니까?",
        text: false,
        showConfirmButton: true,
        showCancelButton: true, // 추가된 옵션
        timer: false,
        }).then((result) => {
            // result.value가 true면 확인 버튼이 눌림, false면 취소 버튼이 눌림
            if (result.value) {
              axios
              .delete(`https://java.flirdog.store:8080/date/dateDelete?seq=${seq}`)
              .then((res) => {
                  Swal.fire({
                    icon: "success",
                    title: "삭제 되었습니다.",
                    text: false,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(`/date/dateList`);
              })
              .catch((err) => {
                console.log(err);
              });
            } else {
                // 사용자가 취소 버튼을 눌렀을 때 실행할 코드
                // 이 부분은 비워두거나 필요한 작업을 추가하세요.
            }
    });

  }

    return (
        <div>
            {/* 헤더 */}
            <Header></Header>
            {/* 내용 */}
            <Container>
                <div className={ReadMoreCSS.ReadMoreTitle}>
                  <div className={ReadMoreCSS.ReadMoreTitleDiv}>
                    매칭 글 상세보기
                  </div>&nbsp;&nbsp;&nbsp;
                  <div style={{marginTop:'20px', width:'50%',
                  height:'70px',
                  border:'10px solid #F56084',
                  borderRadius:'10px',
                  marginLeft:'20px',
                  display:'flex',
                  justifyContent:'center',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems: 'center',
                    fontSize:'1.5em'
                  }}>{matchingDTO.title}</div>
                  </div>
                </div>
            </Container>

            <hr className={ReadMoreCSS.dateHr}/>

            <Container>
              <div className={ReadMoreCSS.formTable}>
                <div className={ReadMoreCSS.formTableDiv}>
                  <div style={{}}>
                    <div className={ReadMoreCSS.ReadMoreHeader}>
                      <div style={{marginLeft:'5%',
                      height:'60px',
                      display:'flex',
                      justifyItems:'center',
                      alignItems:'center',
                      fontSize:'1.3em',
                    }}>
                      <span style={{fontWeight:'bold'}}>작성자 : {userDTO.nickname}</span></div>
                    <div style={{height:'40px',
                      display:'flex',
                      justifyItems:'center',
                      alignItems:'center',
                      fontSize:'1.3em'
                    }}><span style={{fontWeight:'bold'}}>작성일 : {createdAtDate}&nbsp;&nbsp;&nbsp;{createdAtTime}</span></div>
                    <div style={{marginRight:'5%',
                            height:'40px',
                            display:'flex',
                            justifyItems:'center',
                            alignItems:'center',
                            fontSize:'1.3em'
                    }}><span style={{fontWeight:'bold'}}>조회수 : {matchingDTO.hit}</span></div>
                    </div>
                  </div>
                  <div style={{display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            margin:'1.5%',
                            border:'15px solid pink',
                            borderRadius:'20px',
                            }}>
                    <div style={{width:'70%'}}>
                      <div className={ReadMoreCSS.CarouselDiv}
                      style={{width:'100%',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center',
                    }}
                      >
                        <div id="carouselExample" className="carousel slide"
                        style={{
                        }}>
                          <div className="carousel-inner" style={{
                              borderRadius: '20px',
                          }}>
                            <div>
                              {isMoreThanOneImage.length === 0 ? (
                                <div key={0} className={`carousel-item active`}
                                >
                                  <div className='d-flex justify-content-center align-items-center'
                                    style={{
                                      width: '700px',
                                      height: '470px',
                                    }}
                                  > 
                                    <img
                                      src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${matchingDTO.image}`}
                                      alt=""
                                      style={{ borderRadius: '20px', height: '100%', objectFit: 'cover' }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  {isMoreThanOneImage.map((item, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                      style={{
                                        borderRadius: '20px',
                                      }}
                                    >
                                      <div className='d-flex justify-content-center align-items-center'
                                        style={{
                                          width: '700px',
                                          height: '470px',
                                          borderRadius: '20px',
                                        }}
                                      > 
                                        <img
                                          src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${item}`}
                                          alt=""
                                          style={{ borderRadius: '20px', height: '100%', objectFit: 'cover' }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  <div style={{width:'30%',
                  marginRight:'5%',
                  padding:'2%'
                }}>
                    <div className={ReadMoreCSS.filterDateContent}
                                     style={{height:'100%', display: 'flex', justifyContent: 'center'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '400px', width:'300px',
                        backgroundColor:'white', borderRadius:'10px', padding:'2.5%',
                        border:'10px solid pink'
                      }}>
                            <div className={ReadMoreCSS.filterDateContentDogname}>
                              {matchingDTO.dogName}
                            </div>
                            <div className={ReadMoreCSS.filterDateContentDogBreed}>
                              {selectedDogBreedKorean}
                            </div>
                            <div className={ReadMoreCSS.filterDateContentSiteScore}>
                                <img src='/image/main/likeBone2.png' width={20} alt="별"/>
                              &nbsp;&nbsp;{matchingDTO.communityScore}
                            </div>
                            <div className={ReadMoreCSS.matchingState}
                             style={{
                              backgroundColor:
                                matchingDTO.matchingState === '매칭중'
                                ? '#ffc107'
                                : matchingDTO.matchingState === '매칭완료'
                                ? 'darkgray'
                                : matchingDTO.matchingState === '매칭대기' &&
                                matchingDTO.matchingPurpose === '연애'
                                ? '#FFB6C1'
                                : matchingDTO.matchingState === '매칭대기' &&
                                matchingDTO.matchingPurpose === '산책'
                                ? '#ADD8E6'
                                : 'initial', // 기본값은 initial로 설정
                            }}
                            >
                              <div>
                                {matchingDTO.matchingState}
                              </div>
                            </div>
                            <div className={ReadMoreCSS.listStarScore}>
                              <div style={{
                                      fontWeight: 'bold',
                                      height: '40px',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center' 
                                      }}>
                                          {[1, 2, 3, 4, 5].map((starIndex) => {
                                            let starImage;
                                            const score = matchingDTO.averageScore;
                                          
                                            if (starIndex <= Math.floor(score)) {
                                                starImage = 'star1';
                                              } else if (score % 1 > 0 && score % 1 <= 0.5 && starIndex === Math.round(score)) {
                                                starImage = 'halfstar';
                                              } else if (score % 1 > 0 && score % 1 < 0.5 && starIndex === Math.round(score)) {
                                                starImage = 'halfstar';
                                              } else {
                                                starImage = 'star0';
                                              }

                                            return (
                                                <img
                                                key={starIndex}
                                                src={`/image/date/${starImage}.png`}
                                                width={25}
                                                alt="별"
                                                style={{ marginRight: starIndex === 5 ? '0' : '10px' }}
                                                />
                                            );
                                          })}
                              </div>
                            </div>
                        </div>
                      </div>
                      <div className='goDateUpdate'
                            style={{
                              width:'100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}
                      >
                        {shouldHideLink ? null : (
                          <Link to={`/date/dateUpdate/${seq}`} variant="primary"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderColor:'#F56084',
                              fontWeight:'bold',
                              fontSize:'1.5em',
                              backgroundColor:'#F56084',
                              borderRadius:'10px',
                              width:'300px',
                              marginTop:'20px',
                              height:'50px',
                              textDecoration:'none',
                              color:'white',
                              boxShadow: '0 0 5px rgba(0, 0, 0, 0.6)', /* 그림자 효과 설정 */
                              }}>
                                <div
                                style={{
                                  fontSize: '1em',
                                  fontWeight: 'bold',
                                }}>
                                  글 수정
                                </div>
                            </Link>
                         )}
                          </div>
                        </div>   
                      </div>
                  <div style={{color:'black',
                        backgroundColor:'pink',
                        padding:'1%',
                        borderRadius:'20px',
                        margin:'1.5%',
                        }}>
                    <div style={{
                      backgroundColor:'white',
                      borderRadius:'20px',
                      padding:'1%'
                    }}>
                     <div style={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems: 'center',
                        backgroundColor:'white',
                        fontSize:'1.3em',
                        padding:'2%',
                        fontWeight:'bold',
                        borderRadius:'10px',
                     }}>
                      <div>
                        <div style={{fontWeight:"bold",
                        width:'100px'
                        }}>나 이</div>
                          <div style={{fontWeight:"bold",
                               borderRadius:'10px',
                               padding:'1%',
                               backgroundColor:'white',
                               border:'10px solid pink',
                               textAlign: 'center',  // 텍스트를 가운데 정렬하는 스타일
                               fontSize:'1.2em',
                               color:'#404040'
                               }}>{matchingDTO.dogAge}살</div>
                        </div>
                      <div style={{width:'50px'}}></div>
                      <div>
                        <div style={{fontWeight:"bold",
                        width:'100px'}}>성 별</div>
                          <div style={{fontWeight:"bold",
                                borderRadius:'10px',
                                padding:'1%',
                                backgroundColor:'white',
                                border:'10px solid pink',
                                textAlign: 'center',  // 텍스트를 가운데 정렬하는 스타일
                                fontSize:'1.2em',
                                color:'#404040'
                                }}>{matchingDTO.dogGender === 'Male' ? '남 아' : '여 아'}</div>
                      </div>
                      <div style={{width:'50px'}}></div>
                      <div>
                        <div style={{fontWeight:"bold",
                        width:'100px',
                        textAlign:'center'
                        }}>
                          중성화
                        </div>
                        <div className={`${ReadMoreCSS.neutralizationCheckBox} d-flex justify-content-left`}
                            style={{
                              display:'flex',
                              justifyContent:'center',
                              alignItems:'center',
                              height:'56px',
                            }}>
                            <input id='checkbox5' type='checkbox' value='중성화' 
                            checked={matchingDTO.isNeutralized === 1}
                            readOnly={matchingDTO.isNeutralized !== 1}
                            />
                            <label className={`${ReadMoreCSS.neutralizationLabel} ${ReadMoreCSS.labelClass}`} htmlFor='checkbox5'></label>
                        </div>
                      </div>
                      <div style={{width:'50px'}}></div>
                      <div>
                        <div style={{
                          fontWeight:"bold",
                          width:'250px',
                        }}>
                        날 짜
                        </div>
                        <div style={{
                          fontWeight:"bold",
                          borderRadius:'10px',
                          padding:'1%',
                          backgroundColor:'white',
                          border:'10px solid pink',
                          textAlign: 'center',  // 텍스트를 가운데 정렬하는 스타일
                          fontSize:'1em',
                          color:'#404040'
                        }}>
                          <div>{matchingDTO.date}</div>
                        </div>
                      </div>

                      <div style={{width:'50px'}}></div>
                      <div>
                        <div style={{
                          fontWeight:"bold",
                          width:'100%',
                        }}>
                          만남장소
                        </div>
                        <div style={{
                          fontWeight:"bold",
                          borderRadius:'10px',
                          padding:'1%',
                          backgroundColor:'white',
                          border:'10px solid pink',
                          textAlign: 'center',  // 텍스트를 가운데 정렬하는 스타일
                          fontSize:'1em',
                          color:'#404040',
                          width:'300px'
                        }}>
                          <div>{matchingDTO.matchingAddress}</div>
                        </div>
                      </div>
                     </div>
                     
                     <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        marginBottom:'2%'
                     }}>
                      <div style={{
                        border:'10px solid pink',
                        borderRadius:'20px',
                        padding:'1%',
                        width:'90%',
                        justifyContent:'center',
                        alignItems:'center',
                      }}>
                        <textarea 
                          rows="10"
                          style={{ 
                          fontSize: '1.3em',
                          width:'100%',
                          outline: 'none',
                          ...textareaStyle
                          }}
                          value={matchingDTO.content}
                          readOnly
                        >
                        </textarea>
                        </div>
                    </div>
                    </div>
                  </div>
                  <div style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    background:'white',
                    paddingBottom:'2%',
                  }}>
                    {showMessageRoomModal && (
                      <DateMessageRoom userId={1} topic={"messageRoom1"} nickName={"Jongin"} roomNo={1}  profileImage={"null"}
                        onHide={onHideMessageRoomModal}
                      />
                    )}
                  <Button variant="primary" type="submit"
                    style={{
                      borderColor:'#F56084',
                      fontWeight:'bold',
                      fontSize:'1.5em',
                      backgroundColor:'#F56084',
                      borderRadius:'10px',
                      width:'30%',
                      marginRight:'3%',
                      height:'70px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)', /* 그림자 효과 설정 */
                      }}
                      onClick={ onFlirting }>
                      <img src='/image/date/chat.png' alt="chat" style={{width:50, height:50,
                      }}/>&nbsp;&nbsp;플러팅 하러가기&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                    {shouldHideLink ? null : (
                    <Button variant="primary" type="submit"
                    style={{
                      borderColor:'#F56084',
                      fontWeight:'bold',
                      fontSize:'1.5em',
                      backgroundColor:'#F56084',
                      borderRadius:'10px',
                      width:'20%',
                      marginRight:'3%',
                      height:'70px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)', /* 그림자 효과 설정 */
                      }}
                      onClick={ onDelete }>
                     글 삭제
                    </Button>
                    )}
                    <Button
                      style={{
                        borderColor:'lightgray',
                        fontWeight:'bold',
                        fontSize:'1.5em',
                        backgroundColor:'lightgray',
                        borderRadius:'10px',
                        width:'30%',
                        height:'70px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)', /* 그림자 효과 설정 */
                        }}
                        onClick={ onBack }>
                     <img src='/image/date/text.png' alt="text" style={{width:50, height:50}} />&nbsp;&nbsp;목록으로&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                  </div>
                  </div>
                </div>
              </Container>
            {/* 푸터 */}
            <Footer></Footer>
        </div>
    );
};

export default DateReadMore;