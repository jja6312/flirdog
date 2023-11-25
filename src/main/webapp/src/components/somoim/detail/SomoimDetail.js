import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import Header from '../../main/Header';
import Footer from '../../main/Footer';

import SomoimDetailCategoryBarContainer from './SomoimDetailCategoryBarContainer';
import SomoimDetailMain from './SomoimDetailMain';
import SomoimDetailBoard from './SomoimDetailBoard';
import SomoimDetailPhoto from './SomoimDetailPhoto';
import SomoimDetailSchedule from './SomoimDetailSchedule';
import SomoimDetailMember from './SomoimDetailMember';
import SomoimDetailChat from './SomoimDetailChat';
import styles from '../../../css/somoim/detail/somoimDetailHeader.module.css'
import { UserContext } from '../../../contexts/UserContext';


const SomoimDetail = () => {
    // 스크롤 강제로 위로 올리기
    // const location = useLocation();
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [location.pathname]);
    const [formData, setFormData] = useState({});
    const { subMenu = 'detailMain', somoimId } = useParams();
    //const [somoimIdState, setSomoimId] = useState('1');

    const { user } = useContext(UserContext); // 유저 컨텍스트
    //const {passwd, email} = user;
    
    const { somoimName, introduceSub, address, address2, cost, memberCount, target, accountEmail, accountPhone } = formData

    useEffect(() => {
        // if (somoimId) {
        //     setSomoimId(somoimId);
        // }
        
        axios.get(`/somoim/getSomoimForm?id=${somoimId}`)
            .then(res => {
                setFormData(res.data)
            }).catch(error => console.log(error))
        // axios.get(`/somoim/getSomoimForm?id=${user_id}`)
        // .then(res => {
        //     setFormData(res.data)
        // }).catch(error => console.log(error))
    },[somoimId])

    return (
        <>
        <Header></Header>
        
        {/* <Container  className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}>  */}
        <Container  className='px-10 py-3' style={{display: 'flex', flexDirection: 'column' }}> 
            <div className='row'>
                {/* <div className='col-lg-3 col-12 d-flex justify-content-left' style={{ justifyContent:'center', textAlign: 'left', padding: 0, alignItems: 'center', background: '#FFF4F4', border: '1px solid pink' }}> */}
                <div className='col-lg-3 col-12 d-flex justify-content-left' style={{ justifyContent:'center', textAlign: 'left', padding: 0, alignItems: 'center', background: '#FFF4F4'}}>
                    <img className="responsive-image" style={{ width: '90%', borderRadius: '5px', objectFit: 'cover' }} src="https://via.placeholder.com/460x390" alt="somoim-image1" />
                </div>
                {/* <div className={`col-lg-9 col-12 d-flex justify-content-center ${styles.moimMainTitle}`} style={{ background: '#FFF4F4', border: '1px solid black' }}> */}
                <div className={`col-lg-9 col-12 d-flex justify-content-center ${styles.moimMainTitle}`} style={{ background: '#FFF4F4' }}>
                    <div className="container">
                        <div className={`${styles.header}`}>
                            {/* <h1>어서오개 한잔하개</h1> */}
                            <h1>{ somoimName }</h1>
                            {/* <p className='col-lg-8 d-none d-md-block' style={{ textAlign: 'bold' }}>강아지와 술을 사랑하는 모임</p> */}
                            <p className='col-lg-8 d-none d-md-block' style={{ textAlign: 'bold' }}>{ introduceSub }</p>
                            
                        </div>
                        <div className="content d-flex">
                            <div className="flex-row col-lg-2 d-none d-md-block" style={{ position: 'relative', lineHeight: '0.8rem', textAlign:'right', paddingRight: '30px', color: '#F56084', marginTop:'2px' }}>
                                <p className='info'>모임장소</p>
                                <p className='info'>참가비용</p>
                                <p className='info'>대상자</p>
                                <hr className="Line12" style={{ justifyContent: 'center', width: '90%', height: '0px', marginLeft: 10, position: 'relative', border: '1.5px black solid', opacity: 1 }} />
                                <p className='info'>개설자 정보</p>
                            </div>
                            <div className="flex-row col-lg-10" style={{ position: 'relative', lineHeight: '0.6rem' }}>
                                <div className='detail d-flex' style={{ height: '2.1rem' }}>
                                    {/* <p style={{ lineHeight: '1.3', color:'#726C69' }}>서울 강서구 강서로 정조길 940-11 (영화동) 연세IT미래교육원 빌딩</p> */}
                                    <p style={{ lineHeight: '1.3', color:'#726C69' }}>{ address} {address2 }</p>
                                    <Button className='col-2' variant="secondary" size="sm" style={{ width: '70px', height: '25px', alignSelf:'start', marginLeft: '4px' }}>지도보기</Button>
                                </div>
                                {/* <p className='detail' style={{ color:'#726C69' }}>매주 목요일 14:00 ~ 18:00시</p> */}
                                <p className='detail' style={{ color:'#726C69', marginBottom: '17px', position:'absolute' }}>{ cost } 원</p>
                                <p className='info' style={{ color:'#726C69', position:'relative' , paddingLeft: '2.5rem', marginLeft:'7%' }}> |&nbsp;&nbsp;&nbsp;가입가능인원 총 { memberCount } 명</p>
                                {/* <p className='detail'>성인 이상의 반려견 보유자</p> */}
                                <p className='detail'>{ target }</p>
                                <hr className="Line13" style={{ width: '100%', height: '0px', position: 'relative', border: '1.5px #F56084 solid', opacity: 1 }} />
                                <div className='detail d-flex' style={{ lineHeight: '0.4rem' }}>
                                    <div style={{ flex: 1, color:'#726C69' }}>
                                        <p className='detail'>이름 : 굿모임</p>
                                        {/* <p className='detail'>연락처: 02-1234-5678</p> */}
                                        <p className='detail'>연락처 : { accountPhone }</p>
                                        {/* <p className='detail'>이메일: sulmukja@naver.com</p> */}
                                        <p className='detail'>이메일 : { accountEmail }</p>
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
                    <SomoimDetailCategoryBarContainer somoimId={somoimId}></SomoimDetailCategoryBarContainer>
                </div>
                {/* <div className='col-lg-3 d-none d-lg-block d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', border: '1px solid green', wordWrap:'break-word', whiteSpace:'nowrap', padding: 0, height: '40px' }}></div> */}
                <div className='col-lg-3 d-none d-lg-block d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', wordWrap:'break-word', whiteSpace:'nowrap', padding: 0, height: '40px' }}>
                    <div className='col-4 d-flex' style={{ height: '41px', justifyContent: 'center', alignItems : 'center', fontSize: '1.2rem', backgroundColor: '#FFF4F4', color: 'black' }}>채팅</div>
                </div>
                <div className='col-lg-9 col-12 d-flex justify-content-left' style={{ textAlign: 'center', alignItems: 'center', border: '1px solid purple', padding: '20px', minHeight:'600px', height:'fit-content' }}>
                    
                    {subMenu === 'detailMain' && <SomoimDetailMain somoimId={somoimId} />}
                    {subMenu === 'detailBoard' && <SomoimDetailBoard somoimId={somoimId}  />}
                    {subMenu === 'detailPhoto' && <SomoimDetailPhoto somoimId={somoimId}  />}
                    {subMenu === 'detailSche' && <SomoimDetailSchedule somoimId={somoimId}  />}
                    {subMenu === 'detailMem' && <SomoimDetailMember somoimId={somoimId}  />}
                </div>
                <SomoimDetailChat />
            </div>
        </Container>

        <div style={{ height: 50 }}></div>
        <Footer></Footer>
    </>
    );
};

export default SomoimDetail;