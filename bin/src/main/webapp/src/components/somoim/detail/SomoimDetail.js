import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Header from '../../main/Header';
import Footer from '../../main/Footer';

import SomoimDetailCategoryBarContainer from './SomoimDetailCategoryBarContainer';
import SomoimDetailMain from './SomoimDetailMain';
import SomoimDetailBoard from './SomoimDetailBoard';
import SomoimDetailPhoto from './SomoimDetailPhoto';
import SomoimDetailSchedule from './SomoimDetailSchedule';
import SomoimDetailMember from './SomoimDetailMember';
import styles from '../../../css/somoim/detail/somoimDetailHeader.module.css'


const SomoimDetail = () => {
    // 스크롤 강제로 위로 올리기
    // const location = useLocation();
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [location.pathname]);

    const { subMenu = 'detailMain' } = useParams();

    return (
        <>
        <Header></Header>

        {/* <Container  className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}>  */}
        <Container  className='px-10 py-3' style={{display: 'flex', flexDirection: 'column' }}> 
            <div className='row'>
                {/* <div className='col-lg-3 col-12 d-flex justify-content-left' style={{ justifyContent:'center', textAlign: 'left', padding: 0, alignItems: 'center', background: '#FFF4F4', border: '1px solid pink' }}> */}
                <div className='col-lg-3 col-12 d-flex justify-content-left' style={{ justifyContent:'center', textAlign: 'left', padding: 0, alignItems: 'center', background: '#FFF4F4'}}>
                    <img className="responsive-image" style={{ width: '90%', borderRadius: '5px', objectFit: 'cover' }} src="https://via.placeholder.com/460x460" alt="somoim-image1" />
                </div>
                {/* <div className={`col-lg-9 col-12 d-flex justify-content-center ${styles.moimMainTitle}`} style={{ background: '#FFF4F4', border: '1px solid black' }}> */}
                <div className={`col-lg-9 col-12 d-flex justify-content-center ${styles.moimMainTitle}`} style={{ background: '#FFF4F4'}}>
                    <div className="container">
                        <div className={`${styles.header}`}>
                            <h1>어서오개 한잔하개</h1>
                            <p className='col-lg-8 d-none d-md-block' style={{ textAlign: 'bold' }}>강아지와 술을 사랑하는 모임</p>
                            
                        </div>
                        <div className="content d-flex">
                            <div className="flex-row col-lg-2 d-none d-md-block" style={{ position: 'relative', lineHeight: '0.8rem', textAlign:'right', paddingRight: '30px', color: '#F56084' }}>
                                <p className='info'>신청마감</p>
                                <p className='info'>모임장소</p>
                                <p className='info'>모임일자</p>
                                <p className='info'>대상자</p>
                                <hr className="Line12" style={{ justifyContent: 'center', width: '90%', height: '0px', marginLeft: 10, position: 'relative', border: '1.5px black solid', opacity: 1 }} />
                                <p className='info'>개설자 정보</p>
                            </div>
                            <div className="flex-row col-lg-10" style={{ position: 'relative', lineHeight: '0.6rem' }}>
                                <p className='detail'>~ 2023-11-16(목) 13:59</p>
                                <div className='detail d-flex'>
                                    <p style={{ lineHeight: '1.3', color:'#726C69' }}>서울 강서구 강서로 정조길 940-11 (영화동) 연세IT미래교육원 빌딩</p>
                                    <Button className='col-2' variant="secondary" size="sm" style={{ width: '70px', height: '25px', alignSelf:'start', marginLeft: '4px' }}>지도보기</Button>
                                </div>
                                <p className='detail' style={{ color:'#726C69' }}>매주 목요일 14:00 ~ 18:00시</p>
                                <p className='detail'>성인 이상의 반려견 보유자</p>
                                <hr className="Line13" style={{ width: '100%', height: '0px', position: 'relative', border: '1.5px #F56084 solid', opacity: 1 }} />
                                <div className='detail d-flex' style={{ lineHeight: '0.4rem' }}>
                                    <div style={{ flex: 1, color:'#726C69' }}>
                                        <p className='detail'>이름: 굿모임</p>
                                        <p className='detail'>연락처: 02-1234-5678</p>
                                        <p className='detail'>이메일: sulmukja@naver.com</p>
                                    </div>
                                    <Button variant="outline-danger" style={{ alignSelf: 'center'}}>가입하기</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        {/* <Container  className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}> */}
        <Container  className='px-10 py-3' style={{display: 'flex', flexDirection: 'column' }}>
            <div className='row'>
                {/* <div className='col-sm-9 col-12 d-flex justify-content-left' style={{ textAlign: 'center', alignSelf: 'flex-end', border: '1px solid green', wordWrap:'break-word', whiteSpace:'nowrap' }}> */}
                <div className='col-sm-9 col-12 d-flex justify-content-left' style={{ textAlign: 'center', alignSelf: 'flex-end', wordWrap:'break-word', whiteSpace:'nowrap' }}>
                    <SomoimDetailCategoryBarContainer></SomoimDetailCategoryBarContainer>
                </div>
                {/* <div className='col-lg-3 d-none d-lg-block d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', border: '1px solid green', wordWrap:'break-word', whiteSpace:'nowrap', padding: 0, height: '40px' }}></div> */}
                <div className='col-lg-3 d-none d-lg-block d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', wordWrap:'break-word', whiteSpace:'nowrap', padding: 0, height: '40px' }}>
                    <div className='col-4 d-flex' style={{ height: '41px', justifyContent: 'center', alignItems : 'center', fontSize: '1.2rem', backgroundColor: '#FFF4F4', color: 'black' }}>채팅</div>
                </div>
                <div className='col-lg-9 col-12 d-flex justify-content-left' style={{ textAlign: 'center', alignItems: 'center', border: '1px solid purple' }}>
                    
                    {subMenu === 'detailMain' && <SomoimDetailMain />}
                    {subMenu === 'detailBoard' && <SomoimDetailBoard />}
                    {subMenu === 'detailPhoto' && <SomoimDetailPhoto />}
                    {subMenu === 'detailSche' && <SomoimDetailSchedule />}
                    {subMenu === 'detailMem' && <SomoimDetailMember />}
                </div>
                
                {/* <div className='col-lg-3 col-12 d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', border: '1px solid brown', padding: 0 }}> */}
                <div className='col-lg-3 col-12 d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', padding: 0 }}>
                   
                    <div style={{ width: '290px', height: '964px', position: 'relative', paddingRight: '90%' }}>
                        <div className="Rectangle56" style={{ width: '308px', height: '965.79px', left: '0px', position: 'absolute', background: '#FFF4F4' }}></div>
                        <div style={{ width: '278px', height: '924px', left: '17px', top: '14px', position: 'absolute', background: 'white' }}></div>
                        <div style={{ width: '287px', height: '90px', left: '18px', top: '935px', position: 'absolute' }}>
                            <div style={{ width: '287px', height: '60px', left: '0px', top: '12px', position: 'absolute', background: '#FFF4F4' }}></div>
                            <div style={{ width: '288px', height: '54px', left: '0px', top: '18px', position: 'absolute', background: 'white' }}></div>
                            <div style={{ width: '190px', height: '50px', left: '14px', top: '17px', position: 'absolute', color: '#BAB9AF', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>채팅하기...</div>
                            <div className="Chat" style={{ width: '90px', height: '90px', left: '200px', top: '0px', position: 'absolute' }}></div>
                            <img className="Sms" style={{ width: '45px', height: '45px', left: '237px', top: '22px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="Sms" />
                            <img className="Happy" style={{ width: '45px', height: '45px', left: '186px', top: '22px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="Happy" />
                        </div>
                        <div className="1" style={{ width: '385px', height: '154px', left: '16px', top: '22px', position: 'absolute' }}>
                            <div style={{ width: '215px', height: '82px', left: '52px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div className="2" style={{ width: '193px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>다음주에 저희 일요일날 가는 걸로 아는데 혹시 2차도 예정있나요?</div>
                            </div>
                            <div style={{ width: '49px', height: '59px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '2px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '49px', height: '14px', left: '0px', top: '45px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>술고래</div>
                            </div>
                        </div>
                        <div className="2" style={{ width: '385px', height: '153px', left: '4px', top: '150px', position: 'absolute' }}>
                        <div style={{ width: '215px', height: '82px', left: '64px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>글쎄여...</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>코딩만세</div>
                        </div>
                        </div>
                        <div className="3" style={{ width: '385px', height: '164px', left: '59px', top: '300px', position: 'absolute' }}>
                        <div style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#F68E8E', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomLeftRadius: '40px' }}></div>
                            <div style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>저번주에도 했으니까 이번에도 하지 않을까요?</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '173px', top: '82px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>나</div>
                        </div>
                        </div>
                        <div className="4" style={{ width: '385px', height: '153px', left: '4px', top: '450px', position: 'absolute' }}>
                        <div style={{ width: '215px', height: '82px', left: '64px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div className="3" style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>공지 없어도 3번이나 자발적으로 모였으면 한다고 봐도 되지 않을까요?</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>주말야근</div>
                        </div>
                        </div>
                        <div className="5" style={{ width: '385px', height: '153px', left: '11px', top: '590px', position: 'absolute' }}>
                        <div style={{ width: '215px', height: '82px', left: '64px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>아 역시 그렇군요ㅋㅋㅋ 기대되네요</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>코딩만세</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

        <div style={{ height: 50 }}></div>
        <Footer></Footer>
    </>
    );
};

export default SomoimDetail;