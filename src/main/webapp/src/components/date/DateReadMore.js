import React, { useEffect, useState } from 'react';
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

const DateReadMore = () => {
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
    dogMBTI:'',
    dogName:'',
    matchingState:'',
    matchingAddress:'',
    matchingPurpose:'',
    content:'',
    averageScore:'',
    communityScore:'',
    hit:'',
    id:'',
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
      try{
        const res = await axios.get(`http://localhost:8080/date/dateReadMore?seq=${seq}`)
        const userRes = await axios.get(`http://localhost:8080/date/getUser?userId=1`)
        console.log(res.data);
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
      } catch(error) {
        console.log(error);
      }
    };
    fetchData();
  }, [seq]);

 
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

  //날짜 표현
  const createdAtDate =moment(matchingDTO.createdAt).format('YYYY-MM-DD');
  const createdAtTime =moment(matchingDTO.createdAt).format('HH:mm');
  
  console.log(createdAtDate);

  const navigate = useNavigate();
  
  const onUploadSubmit = (e) => {
    e.preventDefault()

    navigate('/date/dateList')
  }

  const onBack = () => {
    window.scrollTo(0, 0);
    navigate(`/date/dateList`)
  }

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
                                      src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-95/${matchingDTO.image}`}
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
                                          src={`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-95/${item}`}
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
                              {matchingDTO.dogBreed}
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
                                                starImage = 'star0';
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
                      <Link to={`/date/dateUpdate/${matchingDTO.id}`} variant="primary"
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
                        borderRadius:'10px'
                     }}>
                      나 이&nbsp;&nbsp;&nbsp;
                      <div style={{
                        backgroundColor:'lightgray',
                        borderRadius:'10px',
                        width:'25%',
                        height:'50px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center'
                      }}>
                        <div>{matchingDTO.dogAge}</div>
                      </div>&nbsp;&nbsp;&nbsp;
                      성 별&nbsp;&nbsp;&nbsp;
                      <div style={{
                        backgroundColor:'lightgray',
                        borderRadius:'10px',
                        width:'25%',
                        height:'50px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center'
                      }}>
                        <div>{matchingDTO.dogGender}</div>
                      </div>&nbsp;&nbsp;&nbsp;
                      멍BTI&nbsp;&nbsp;&nbsp;
                      <div style={{
                        backgroundColor:'lightgray',
                        borderRadius:'10px',
                        width:'25%',
                        height:'50px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center'
                      }}>
                        <div>{matchingDTO.dogMBTI}</div>
                      </div>
                     </div>

                     <div style={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems: 'center',
                        backgroundColor:'white',
                        fontSize:'1.3em',
                        padding:'2%',
                        fontWeight:'bold'
                     }}>
                      중성화&nbsp;&nbsp;&nbsp;
                      <div className={`${ReadMoreCSS.neutralizationCheckBox} d-flex justify-content-left`}>
                          <input id='checkbox5' type='checkbox' value='중성화' 
                          checked={matchingDTO.isNeutralized === 1}
                          readOnly={matchingDTO.isNeutralized !== 1}
                          />
                          <label className={`${ReadMoreCSS.neutralizationLabel} ${ReadMoreCSS.labelClass}`} htmlFor='checkbox5'></label>
                      </div>&nbsp;&nbsp;&nbsp;
                      만남장소&nbsp;&nbsp;&nbsp;
                      <div style={{
                        backgroundColor:'lightgray',
                        borderRadius:'10px',
                        width:'50%',
                        height:'50px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center'
                      }}>
                        <div>{matchingDTO.matchingAddress}</div>
                      </div>&nbsp;&nbsp;&nbsp;
                      날 짜&nbsp;&nbsp;&nbsp;
                      <div style={{
                        backgroundColor:'lightgray',
                        borderRadius:'10px',
                        width:'20%',
                        height:'50px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        textAlign:'center'
                      }}>
                        <div>{matchingDTO.date}</div>
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
                  <Button variant="primary" type="submit"
                    style={{
                      borderColor:'#F56084',
                      fontWeight:'bold',
                      fontSize:'1.5em',
                      backgroundColor:'#F56084',
                      borderRadius:'10px',
                      width:'40%',
                      marginRight:'5%',
                      height:'70px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.6)', /* 그림자 효과 설정 */
                      }}
                      onClick={ onUploadSubmit }>
                      <img src='/image/date/chat.png' alt="chat" style={{width:50, height:50,
                      }}/>&nbsp;&nbsp;플러팅 하러가기&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                    
                    <Button
                    style={{
                      borderColor:'lightgray',
                      fontWeight:'bold',
                      fontSize:'1.5em',
                      backgroundColor:'lightgray',
                      borderRadius:'10px',
                      width:'40%',
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