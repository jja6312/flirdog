import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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


const SomoimDetail = () => {
    // 스크롤 강제로 위로 올리기
    // const location = useLocation();
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [location.pathname]);
    const [formData, setFormData] = useState({});
    const { subMenu = 'detailMain', somoimId } = useParams();
    //const [somoimIdState, setSomoimId] = useState('1');
    const [isAdmin, setIsAdmin] = useState();
    const [somoimJoin, setSomoimJoin] = useState({});
    const [, forceUpdate] = useState({}); // 컴포넌트 강제 리렌더링을 위한 state
    
    const location = useLocation(); // 리스트로부터 아이디값 정보 받아옴
    const { state } = location;

    // state에 전달된 user 정보 확인
    console.log('state에 전달된 user 정보 확인' + state.user.id);

    const navigate = useNavigate();

    const imageUrl = 'https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/somoim/';

    // const { user } = useContext(UserContext); // 유저 컨텍스트
    // const { id } = user
    
    const { somoimName, introduceSub, address, address2, memberCount, target, accountName, accountEmail, accountPhone, introducePhoto, introducePhotoUUID } = formData
    //const { isAdmin } = somoimJoin || {};
    //const { somoim, user } = somoimJoin

    // 해당 소모임 정보 출력
    useEffect(() => {
        const isJoin = async () => {
        
        await axios.get(`/somoim/getSomoimForm?id=${somoimId}`)
            .then(res => {
                setFormData(res.data)
                console.log('소모임 정보 전체 : ', res.data)
            }).catch(error => console.log(error))
        }
        isJoin();
    },[])

    //가입 여부 확인 및 초기 데이터 로딩
    useEffect(() => {
        console.log('user객체 id정보 : ' + state.user.id)
        //console.log('somoimId : ' + somoimId)
        const isJoin = async () => {
            await axios.get(`/somoim/isSomoimMember?somoimId=${somoimId}&userId=${state.user.id}`)
            .then(res => {
                console.log('해당 소모임에 대한 권한 : ' + res.data)
                setIsAdmin(res.data)
                // 강제 리렌더링
                forceUpdate({});
            })
            .catch(e => console.error('가입 여부 확인 중 오류:' + e))
        };

        isJoin();
    }, [somoimId, state.user.id]);

    const joinSomoim = async (e) => { // 소모임 회원가입
        const confirmed = window.confirm('해당 소모임에 참여하시겠습니까?');
        if(!state.user.id) {
            alert('먼저 로그인해 주십시오.')
            navigate('/login')
        }
        if (confirmed) {
            await axios.post(`/somoim/joinSomoim`, {
              somoimId: somoimId,
              userId: state.user.id,
            }).then(res => {
                setSomoimJoin(res.data)
                console.log(somoimJoin)
                alert('소모임에 가입하셨습니다.');
            }).catch(e => console.log(e));
      
          } else {
            console.log("유저 id 또는 소모임 id가 없습니다.");
          }
    }

    return (
        <>
        <Header></Header>
        
        <Container  className='px-10 py-3' style={{display: 'flex', flexDirection: 'column' }}> 
            <div className='row'>
                <div className='col-lg-3 col-12 d-flex justify-content-left' style={{ justifyContent:'center', textAlign: 'left', padding: 0, alignItems: 'center', background: '#FFF4F4'}}>
                    <img className="responsive-image" style={{ width: '90%', borderRadius: '5px', objectFit: 'cover' }} 
                        src={introducePhoto ? imageUrl + introducePhotoUUID : "https://via.placeholder.com/460x390"} alt="somoim-image1" />
                </div>
                <div className={`col-lg-9 col-12 d-flex justify-content-center ${styles.moimMainTitle}`} style={{ background: '#FFF4F4' }}>
                    <div className="container">
                        <div className={`${styles.header}`}>
                            <h1>{ somoimName }</h1>
                            <p className='col-lg-8 d-none d-md-block' style={{ textAlign: 'bold' }}>{ introduceSub }</p>
                            
                        </div>
                        <div className="content d-flex">
                            <div className="flex-row col-lg-2 d-none d-md-block" style={{ position: 'relative', lineHeight: '0.8rem', textAlign:'right', paddingRight: '30px', color: '#F56084', marginTop:'2px' }}>
                                <p className='info'>모임장소</p>
                                <p className='info'>총 인원</p>
                                <p className='info'>대상자</p>
                                <hr className="Line12" style={{ justifyContent: 'center', width: '90%', height: '0px', marginLeft: 10, position: 'relative', border: '1.5px black solid', opacity: 1 }} />
                                <p className='info'>개설자 정보</p>
                            </div>
                            <div className="flex-row col-lg-10" style={{ position: 'relative', lineHeight: '0.6rem' }}>
                                <div className='detail d-flex' style={{ height: '2.1rem' }}>
                                    <p style={{ lineHeight: '1.3', color:'#726C69' }}>{ address} {address2 }</p>
                                    <Button className='col-2' variant="secondary" size="sm" style={{ width: '70px', height: '25px', alignSelf:'start', marginLeft: '4px' }}>지도보기</Button>
                                </div>
                                <p className='detail' style={{ color:'#726C69', marginBottom: '17px' }}>{ memberCount } 명</p>
                                <p className='detail'>{ target }</p>
                                <hr className="Line13" style={{ width: '100%', height: '0px', position: 'relative', border: '1.5px #F56084 solid', opacity: 1 }} />
                                <div className='detail d-flex' style={{ lineHeight: '0.4rem' }}>
                                    <div style={{ flex: 1, color:'#726C69' }}>
                                        <p className='detail'>이름 : { accountName }</p>
                                        <p className='detail'>연락처 : { accountPhone }</p>
                                        <p className='detail'>이메일 : { accountEmail }</p>
                                    </div>
                                    {isAdmin === 0 ? '가입자' : '미가입자(0이 아닐 경우)'} / {isAdmin === 1 ? '개설자' : '미가입자 혹은 비로그인'}
                                    {
                                        isAdmin !== 0 && isAdmin !== 1 && (
                                            <Button variant="outline-danger" onClick={joinSomoim} style={{ alignSelf: 'center' }}>
                                                가입하기
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
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
                <div className='col-lg-9 col-12 d-flex justify-content-center' style={{ textAlign: 'center', alignItems: 'center', border: '1px solid purple', padding: '20px', minHeight:'600px', height:'fit-content' }}>
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