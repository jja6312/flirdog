import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from '../../main/Header';
import Footer from '../../main/Footer';

import styles from '../../../css/somoim/detail/somoimDetailHeader.module.css'
import SomoimDetailCategoryBarContainer from './SomoimDetailCategoryBarContainer';
import SomoimDetailMain from './SomoimDetailMain';
import SomoimDetailBoard from './SomoimDetailBoard';
import SomoimDetailPhoto from './SomoimDetailPhoto';
import SomoimDetailSchedule from './SomoimDetailSchedule';
import SomoimDetailMember from './SomoimDetailMember';

const SomoimDetail = () => {
    // 스크롤 강제로 위로 올리기
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const { subMenu = 'detailMain' } = useParams();

    return (
        <>
        <Header></Header>

        <Container  className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}> 
            <div className='row'>
                <div className='col-sm-3 col-12 d-flex justify-content-left' style={{ textAlign: 'left', alignItems: 'center', border: '1px solid pink' }}>프로필 사진</div>
                <div className={`col-sm-9 col-12 d-flex justify-content-center ${styles.moimMainTitle}`} style={{border: '1px solid black'}}>세부정보</div>
            </div>
            =============================================
            {/* <div style={{height: '370px', position: 'relative' }}>
                <div className="Rectangle57" style={{ width: '1606px', height: '370px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4' }}></div>
                <img className="Adfdsafdsaf1" style={{ width: '460px', height: '289.82px', left: '33px', top: '20.97px', position: 'absolute', borderRadius: '5px' }} src="https://via.placeholder.com/460x290" alt="somoim-image1" />
                <img className="1" style={{ width: '42px', height: '142px', left: '169px', top: '111px', position: 'absolute' }} src="https://via.placeholder.com/42x142" alt="somoim-image2" />
                <div style={{ width: '1014px', height: '241px', left: '542px', top: '111px', position: 'absolute' }}>
                    <div className="20231116135994011It140018000212345678SulmukjaNaverCom" style={{ width: '855px', height: '228px', left: '159px', top: '0px', position: 'absolute', color: 'black', fontSize: '24px', fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>
                        ~ 2023-11-16(목) 13:59
                        <br />
                        <span style={{ color: '#726C69' }}>서울 강서구 강서로 정조길 940-11 (영화동) 연세IT미래교육원 빌딩<br />매주 목요일 14:00 ~ 18:00시 </span>
                        <br />
                        성인 이상의 반려견 보유자
                        <br />
                        <span style={{ color: '#726C69' }}>
                            <br />이름: 굿모임<br />연락처: 02-1234-5678<br />이메일: sulmukja@naver.com
                        </span>
                    </div>
                    <div style={{ width: '132px', height: '241px', left: '0px', top: '0px', position: 'absolute', textAlign: 'right', color: '#F56084', fontSize: '24px', fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>
                        신청마감<br />모임장소<br />모임일자<br />대상자<br /><br />개설자 정보<br /><br /><br /><br />
                    </div>
                </div>
                <div style={{ width: '1038px', height: '72px', left: '542px', top: '22px', position: 'absolute' }}>
                    <span style={{ color: 'black', fontSize: '36px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>어서오개 한잔하개</span>
                    <span style={{ color: 'black', fontSize: '24px', fontFamily: 'Inter', fontWeight: '100', wordWrap: 'break-word' }}>강아지와 술을 사랑하는 모임</span>
                    <span style={{ color: 'black', fontSize: '24px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}><br /></span>
                </div>
                <div className="Line12" style={{ width: '799px', height: '0px', left: '701px', top: '244px', position: 'absolute', border: '1px black solid' }}></div>
                <div className="Line13" style={{ width: '119px', height: '0px', left: '555px', top: '244px', position: 'absolute', border: '1px #F56084 solid' }}></div>
                <div style={{ width: '110px', height: '23px', left: '1386px', top: '143px', position: 'absolute' }}>
                    <div style={{ width: '99px', height: '23px', left: '5px', top: '0px', position: 'absolute', background: '#827878' }}></div>
                    <div style={{ width: '110px', height: '22px', left: '0px', top: '0px', position: 'absolute', textAlign: 'center', color: 'white', fontSize: '16px', fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>지도보기</div>
                </div>
                <div style={{ width: '280px', height: '60px', left: '1307px', top: '288px', position: 'absolute' }}>
                    <div className="Rectangle59" style={{ width: '280px', height: '60px', left: '0px', top: '0px', position: 'absolute', background: 'linear-gradient(180deg, #FB4B4B 0%, rgba(255, 208.25, 219.55, 0.66) 63%, rgba(255, 208.25, 219.55, 0.62) 80%, rgba(255, 208.25, 219.55, 0) 100%)', boxShadow: '0px 4px 4px rgba(217.10, 189.97, 189.97, 0.25)' }}></div>
                    <div style={{ width: '277px', height: '58px', left: '3px', top: '2px', position: 'absolute', textAlign: 'center', color: 'white', fontSize: '27px', fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>가입하기</div>
                </div>
            </div> */}
            =============================================
        </Container>
        <Container  className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}>
            <div className='row'>
                <div className='col-sm-9 col-12 d-flex justify-content-left' style={{ textAlign: 'center', alignSelf: 'flex-end', border: '1px solid green' }}>
                    <SomoimDetailCategoryBarContainer></SomoimDetailCategoryBarContainer>
                </div>
                <div className='col-sm-9 col-12 d-flex justify-content-left' style={{ textAlign: 'center', alignItems: 'center', border: '1px solid purple' }}>
                    
                    {subMenu === 'detailMain' && <SomoimDetailMain />}
                    {subMenu === 'detailBoard' && <SomoimDetailBoard />}
                    {subMenu === 'detailPhoto' && <SomoimDetailPhoto />}
                    {subMenu === 'detailSche' && <SomoimDetailSchedule />}
                    {subMenu === 'detailMem' && <SomoimDetailMember />}
                </div>
                <div className='col-sm-3 col-12 d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', border: '1px solid brown' }}>
                    채팅
                    =============================================
                    {/* <div style={{ width: '528px', height: '1307px', position: 'relative' }}>
                        <div className="Rectangle56" style={{ width: '528px', height: '1253.79px', left: '0px', top: '52.21px', position: 'absolute', background: '#FFF4F4' }}></div>
                        <div style={{ width: '492px', height: '1209px', left: '17px', top: '78px', position: 'absolute', background: 'white' }}></div>
                        <div style={{ width: '493px', height: '90px', left: '18px', top: '1217px', position: 'absolute' }}>
                            <div style={{ width: '493px', height: '60px', left: '0px', top: '12px', position: 'absolute', background: '#FFF4F4' }}></div>
                            <div style={{ width: '490px', height: '54px', left: '0px', top: '18px', position: 'absolute', background: 'white' }}></div>
                            <div style={{ width: '190px', height: '50px', left: '14px', top: '17px', position: 'absolute', color: '#BAB9AF', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>채팅하기...</div>
                            <div className="Chat" style={{ width: '90px', height: '90px', left: '200px', top: '0px', position: 'absolute' }}></div>
                            <img className="Sms" style={{ width: '45px', height: '45px', left: '390px', top: '22px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="Sms" />
                            <img className="Happy" style={{ width: '45px', height: '45px', left: '442px', top: '22px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="Happy" />
                        </div>
                        <div className="1" style={{ width: '431px', height: '154px', left: '16px', top: '105px', position: 'absolute' }}>
                            <div style={{ width: '379px', height: '106px', left: '52px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div className="2" style={{ width: '337px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>다음주에 저희 일요일날 가는 걸로 아는데 혹시 2차도 예정있나요?</div>
                            </div>
                            <div style={{ width: '49px', height: '59px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '2px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '49px', height: '14px', left: '0px', top: '45px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>술고래</div>
                            </div>
                        </div>
                        <div className="2" style={{ width: '443px', height: '153px', left: '4px', top: '273px', position: 'absolute' }}>
                        <div style={{ width: '379px', height: '106px', left: '64px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div style={{ width: '337px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>글쎄여...</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>코딩만세</div>
                        </div>
                        </div>
                        <div className="3" style={{ width: '444px', height: '164px', left: '67px', top: '463px', position: 'absolute' }}>
                        <div style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute', background: '#F68E8E', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div style={{ width: '337px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>저번주에도 했으니까 이번에도 하지 않을까요?</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '364px', top: '106px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>나</div>
                        </div>
                        </div>
                        <div className="4" style={{ width: '443px', height: '153px', left: '4px', top: '622px', position: 'absolute' }}>
                        <div style={{ width: '379px', height: '106px', left: '64px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div className="3" style={{ width: '337px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>공지 없어도 3번이나 자발적으로 모였으면 한다고 봐도 되지 않을까요?</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>주말야근</div>
                        </div>
                        </div>
                        <div className="5" style={{ width: '443px', height: '153px', left: '11px', top: '789px', position: 'absolute' }}>
                        <div style={{ width: '379px', height: '106px', left: '64px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div style={{ width: '337px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>아 역시 그렇군요ㅋㅋㅋ 기대되네요</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>코딩만세</div>
                        </div>
                        </div>
                        <div className="6" style={{ width: '444px', height: '164px', left: '84px', top: '972px', position: 'absolute' }}>
                        <div style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute' }}>
                            <div className="Rectangle60" style={{ width: '379px', height: '106px', left: '0px', top: '0px', position: 'absolute', background: '#F68E8E', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                            <div style={{ width: '337px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '20px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>저도 이번 모임 기대하고 있습니다ㅋㅋㅋ 아끼던 양주 가져갑니다</div>
                        </div>
                        <div style={{ width: '80px', height: '58px', left: '364px', top: '106px', position: 'absolute' }}>
                            <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                            <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>나</div>
                        </div>
                        </div>
                        <div style={{ width: '146px', height: '52.21px', left: '0px', top: '0.84px', position: 'absolute', background: '#FFF4F4' }}></div>
                        <div style={{ width: '146px', height: '43.79px', left: '0px', top: '0px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '32px', fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>채팅</div>
                    </div> */}
                    =============================================
                </div>
            </div>
        </Container>

        <div style={{ height: 50 }}></div>
        <Footer></Footer>
    </>
    );
};

export default SomoimDetail;