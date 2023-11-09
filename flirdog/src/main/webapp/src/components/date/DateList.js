import React, { useState } from 'react';
import Header from '../main/Header';
import Container from 'react-bootstrap/esm/Container';
import "../../css/reset.css"
import dateList from "../../css/date/dateList.module.css";
import dateCheck from "../../css/date/dateCheck.module.css";
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import Footer from '../main/Footer';
import { Link } from 'react-router-dom';

const DateList = () => {
    const [selectedRegion, setSelectedRegion] = useState('지역 선택');

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
    };

    return (
        <div>
            <Header></Header>
            <br />
            <br />

            {/* 메인 타이틀 */}
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <div className="Group66" style={{width: "14.5vw", height: "7vh", background: '#F56084', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{width: "9.5vw", color: 'white', fontSize: "1.7vw", fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>애견 매칭</div>   
                </div>
                &emsp;&emsp;<img src='/image/date/image1.jpg' style={{width:'70%'}}></img>
                <img src='/image/date/image2.png' style={{width:'10%'}}></img>
            </div>
            <br/>

            {/* 메인 이미지 */}
            <Container className='px-10'>
                <div style={{display: 'flex', justifyContent:'center'}}>
                        <img src='/image/date/image3.png' className="d-block w-100" style={{width:'100%'}}></img>
                </div>
            </Container>
            <br /><br />
            
            <hr className={dateList.dateHr}/>
            <br /><br />
            
            {/* 캐러셀 */}
            <Container className='px-11'>
            <Carousel data-bs-theme="dark">
                <Carousel.Item className={dateList.carouselItem}>
                    <div>
                        <div className={dateList.carouselItemDiv}>
                            <div className='d-flex justify-content-center'
                                >
                                <div className={dateList.carouselItemDivImg}>
                                    <div className='d-flex flex-column'
                                        style={{
                                            backgroundColor:'white',
                                            borderRadius: 20,
                                            padding: '3vw',
                                            marginRight: '5%',
                                            width: '60vw'
                                        }}>
                                    
                                        <img
                                            className="d-block col-lg-4 dogCarousel"
                                            src="/image/date/starDog1.jpg"
                                            alt="First slide"
                                            style={{width:'100%',
                                            minWidth:250, 
                                            height:'40vh', 
                                            objectFit: 'cover',
                                            borderRadius: 20,
                                        }}
                                        />

                                        <div className={`${dateList.starScore} d-flex justify-content-center`}>
                                            <span>별 점</span>
                                        </div>
                                    </div>
                                    <div className={dateList.carouselContent} >
                                        <div
                                        style={{
                                            backgroundColor:'white',
                                            borderRadius: 20,
                                            padding: '2vw',
                                            height: '100%',
                                            marginRight: '5%',
                                        }}>
                                        <div className={dateList.carouselDogName}>강아지1</div>
                                            <p className={dateList.carouselDogContent}>
                                                귀엽당<br/>
                                                영어로는 큐트<br/>
                                                일본어로는 카와이<br/>
                                                중국어로는 크아이<br/>
                                                하와이어로는 오루오루<br/>
                                                왜 줄바꿈이 안될까여<br/>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
            </Container>

            <br /><br />
            <hr className={dateList.dateHr}/>
            <br /><br />

            <Container className='px-10'>
                <div className={dateList.filterList}>
                    <div className={dateList.filters}>
                        <div className={dateList.filterDiv}>
                            <div style={{
                                 backgroundColor:'#F56084',
                                 borderRadius: '20px',
                                 padding:'5%',
                            }}>
                                <div className={dateList.filterTitle}>
                                필 터
                                </div>

                                <br/>
                                <div className={dateList.filterContent}>
                                    <div className='genderCheck'>성 별
                                    <div className={`${dateCheck.genderCheckBox} d-flex justify-content-left`}>
                                        <input id='checkbox1' type='checkbox' value='남 아' />
                                        <label htmlFor='checkbox1'>남 아</label>
                                        &nbsp;&nbsp;
                                        <input id='checkbox2' type='checkbox' value='여 아' />
                                        <label htmlFor='checkbox2'>여 아</label>
                                    </div>

                                    </div>
                                    <div className='neutralizationCheck' style={{
                                        marginTop:'10px' }}>중성화 여부 &nbsp;&nbsp;
                                        <div className={`${dateCheck.neutralizationCheckBox} d-flex justify-content-left`}>
                                            <input id='checkbox3' type='checkbox' value='중성화' />
                                            <label className={dateCheck.neutralizationLabel} htmlFor='checkbox3'></label>
                                        </div>
                                    </div>
                                    <div className='sizeCheck' style={{
                                        marginTop:'10px' }}>애견 사이즈 &nbsp;&nbsp;
                                        <div className={`${dateCheck.sizeCheckBox} d-flex justify-content-left`}>
                                            <input id='checkbox4' type='checkbox' value='대' />
                                            <label htmlFor='checkbox4'>대</label>
                                            &nbsp;&nbsp;
                                            <input id='checkbox5' type='checkbox' value='중' />
                                            <label htmlFor='checkbox5'>중</label>
                                            &nbsp;&nbsp;
                                            <input id='checkbox6' type='checkbox' value='소' />
                                            <label htmlFor='checkbox6'>소</label>
                                        </div>
                                    </div>
                                    <div className='filterAddress' style={{
                                        marginTop:'10px',
                                        marginBottom:'10px'
                                         }}>지 역 &nbsp;&nbsp;
                                        <div className={`${dateCheck.filterAddressBtn} d-flex justify-content-left`}>
                                        <Dropdown>
                                            <Dropdown.Toggle className={dateCheck.filterDropdownBtn} variant="success" id="dropdown-basic"
                                                style={{
                                                    border:'2px solid white',
                                                    backgroundColor: '#F56084',
                                                    fontWeight:'bold',
                                                    opacity: 1
                                                }}
                                            >
                                            {selectedRegion}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className='dropdown-menu scrollContainer' 
                                            style={{ maxHeight: '200px', overflowY: 'auto' }}
                                                
                                                >
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-1" onClick={() => handleRegionSelect('서울특별시')} >서울특별시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-2" onClick={() => handleRegionSelect('부산광역시')}>부산광역시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-3" onClick={() => handleRegionSelect('대구광역시')}>대구광역시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-4" onClick={() => handleRegionSelect('인천광역시')}>인천광역시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-5" onClick={() => handleRegionSelect('광주광역시')}>광주광역시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-6" onClick={() => handleRegionSelect('대전광역시')}>대전광역시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-7" onClick={() => handleRegionSelect('울산광역시')}>울산광역시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-8" onClick={() => handleRegionSelect('세종특별자치시')}>세종특별자치시</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-9" onClick={() => handleRegionSelect('경기도')}>경기도</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-10" onClick={() => handleRegionSelect('충북')}>충북</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-11" onClick={() => handleRegionSelect('충남')}>충남</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-12" onClick={() => handleRegionSelect('전북')}>전북</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-13" onClick={() => handleRegionSelect('전남')}>전남</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-14" onClick={() => handleRegionSelect('경북')}>경북</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-15" onClick={() => handleRegionSelect('경남')}>경남</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-16" onClick={() => handleRegionSelect('강원도')}>강원도</Dropdown.Item>
                                                <Dropdown.Item style={{ opacity: 1 }} href="#/action-17" onClick={() => handleRegionSelect('제주도')}>제주도</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />
                        <div className={dateList.dogMBTI}>
                            <div className={dateList.MBTIDiv}>
                                <img src='/image/date/dogMBTI.png'
                                style={{width:'15vw',
                                        borderRadius: '10px' 
                                        }} 
                                alt="DogMBTI"
                                />
                            </div>
                        </div>
                        
                        <br />
                        <Link to="/date/dateWrite" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className={dateList.matchingWriteBtn}>
                            <div className={dateList.matchingNullDiv}></div>
                                매칭 글 작성
                            <img
                                src='/image/date/heart.png'
                                style={{
                                width: '4vw',
                                }}
                                alt="Heart"
                            />
                        </div>
                        </Link>
                    </div>
                    
                    <div className={dateList.filterDateList}>
                        <div className={dateList.filterDateListDiv}>
                        <div className={dateList.filterDate}
                                 style={{marginBottom:'3%'}}>
                                <div className={dateList.filterDateImg}>
                                    <div style={{
                                        display:'flex',
                                        flexDirection: 'column', // 세로로 나열하도록 변경
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius:'10px',
                                             width:275,
                                             height:200,
                                             overflow:'hidden'
                                        }}>
                                            <img src='/image/date/starDog1.jpg'
                                                    style={{
                                                    width:'100%',
                                                    objectFit:'cover'
                                                    }}
                                                    
                                            />
                                        </div>
                                        
                                        <div className={dateList.listStarScore}>
                                        <div style={{
                                                fontWeight: 'bold',
                                                height: '40px',
                                                display: 'flex',
                                                justifyContent: 'center', /* 세로 중앙 정렬 */
                                                alignItems: 'center' /* 가로 중앙 정렬 */
                                                }}>
                                                    {[1, 2, 3, 4, 5].map((index) => (
                                                        <img key={index} src='/image/date/starScore.png' width={25} alt="별"
                                                        style={{ marginRight: index === 5 ? '0' : '10px' }} />
                                                    ))}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={dateList.filterDateContent}
                                     style={{ 
                                     }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                                           <div className={dateList.filterDateContentDogname}>
                                              강아지 이름
                                            </div>
                                            <div className={dateList.filterDateContentDogTitle}>
                                              강아지 설명
                                            </div>
                                            <div className={dateList.filterDateContentSiteScore}>
                                                <img src='/image/main/likeBone.png' width={20}/>
                                              커뮤니티 활동점수
                                            </div> 
                                        </div>
                                </div>
                            </div>
                            
                            {/* 2번강아지 */}
                            <div className={dateList.filterDate}
                                 style={{marginBottom:'3%'}}>
                                <div className={dateList.filterDateImg}>
                                    <div style={{
                                        display:'flex',
                                        flexDirection: 'column', // 세로로 나열하도록 변경
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius:'10px',
                                             width:275,
                                             height:200,
                                             overflow:'hidden'
                                        }}>
                                            <img src='/image/date/starDog2.jpg'
                                                    style={{
                                                    width:'100%',
                                                    objectFit:'cover'
                                                    }}
                                                    
                                            />
                                        </div>
                                        
                                        <div className={dateList.listStarScore}>
                                        <div style={{
                                                fontWeight: 'bold',
                                                height: '40px',
                                                display: 'flex',
                                                justifyContent: 'center', /* 세로 중앙 정렬 */
                                                alignItems: 'center' /* 가로 중앙 정렬 */
                                                }}>
                                                    {[1, 2, 3, 4, 5].map((index) => (
                                                        <img key={index} src='/image/date/starScore.png' width={25} alt="별"
                                                        style={{ marginRight: index === 5 ? '0' : '5px' }} />
                                                    ))}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={dateList.filterDateContent}
                                     style={{ 
                                     }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                                           <div className={dateList.filterDateContentDogname}>
                                              강아지 이름
                                            </div>
                                            <div className={dateList.filterDateContentDogTitle}>
                                              강아지 설명
                                            </div>
                                            <div className={dateList.filterDateContentSiteScore}>
                                                <img src='/image/main/likeBone.png' width={20}/>
                                              커뮤니티 활동점수
                                            </div> 
                                        </div>
                                </div>
                            </div>
                            
                            {/* 3번강아지 */}
                            <div className={dateList.filterDate}
                                 style={{marginBottom:'3%'}}>
                                <div className={dateList.filterDateImg}>
                                    <div style={{
                                        display:'flex',
                                        flexDirection: 'column', // 세로로 나열하도록 변경
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius:'10px',
                                             width:275,
                                             height:200,
                                             overflow:'hidden'
                                        }}>
                                            <img src='/image/date/Dog4.jpg'
                                                    style={{
                                                    width:'100%',
                                                    objectFit:'cover'
                                                    }}
                                                    
                                            />
                                        </div>
                                        
                                        <div className={dateList.listStarScore}>
                                        <div style={{
                                                fontWeight: 'bold',
                                                height: '40px',
                                                display: 'flex',
                                                justifyContent: 'center', /* 세로 중앙 정렬 */
                                                alignItems: 'center' /* 가로 중앙 정렬 */
                                                }}>
                                                    {[1, 2, 3, 4, 5].map((index) => (
                                                        <img key={index} src='/image/date/starScore.png' width={25} alt="별"
                                                        style={{ marginRight: index === 5 ? '0' : '5px' }} />
                                                    ))}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={dateList.filterDateContent}
                                     style={{ 
                                     }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                                           <div className={dateList.filterDateContentDogname}>
                                              강아지 이름
                                            </div>
                                            <div className={dateList.filterDateContentDogTitle}>
                                              강아지 설명
                                            </div>
                                            <div className={dateList.filterDateContentSiteScore}>
                                                <img src='/image/main/likeBone.png' width={20}/>
                                              커뮤니티 활동점수
                                            </div> 
                                        </div>
                                </div>
                            </div>
                            
                            {/* 4번강아지 */}
                            <div className={dateList.filterDate}
                                 style={{marginBottom:'3%'}}>
                                <div className={dateList.filterDateImg}>
                                    <div style={{
                                        display:'flex',
                                        flexDirection: 'column', // 세로로 나열하도록 변경
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                             borderRadius:'10px',
                                             width:275,
                                             height:200,
                                             overflow:'hidden'
                                        }}>
                                            <img src='/image/date/Dog5.jpg'
                                                    style={{
                                                    width:'100%',
                                                    objectFit:'cover'
                                                    }}
                                                    
                                            />
                                        </div>
                                        
                                        <div className={dateList.listStarScore}>
                                        <div style={{
                                                fontWeight: 'bold',
                                                height: '40px',
                                                display: 'flex',
                                                justifyContent: 'center', /* 세로 중앙 정렬 */
                                                alignItems: 'center' /* 가로 중앙 정렬 */
                                                }}>
                                                    {[1, 2, 3, 4, 5].map((index) => (
                                                        <img key={index} src='/image/date/starScore.png' width={25} alt="별"
                                                        style={{ marginRight: index === 5 ? '0' : '5px' }} />
                                                    ))}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={dateList.filterDateContent}
                                     style={{ 
                                     }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                                           <div className={dateList.filterDateContentDogname}>
                                              근 육 견
                                            </div>
                                            <div className={dateList.filterDateContentDogTitle}>
                                              3대30 거뜬함
                                            </div>
                                            <div className={dateList.filterDateContentSiteScore}>
                                                <img src='/image/main/likeBone.png' width={20}/>
                                              커뮤니티 활동점수
                                            </div> 
                                        </div>
                                </div>
                            </div>

                        </div>
                    </div>        
                </div>
            </Container>

            <Footer></Footer>
        </div>
    );
};

export default DateList;