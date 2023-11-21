import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import MypageSubHeader4_1 from '../5공통/MypageSubHeader4_1';

const Mysetting = () => {
    return (
        <div>
            
            <MypageSubHeader4_1/>
            <Container className='px-10 mt-6'> {/* 설정창 */}
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center'>
                        <h1 className={Mypage.MySetting1}>알림 설정</h1>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center'></div>
                </div>
                <div className='row mt-4'>
                    <div className='col-lg-4 col-md-3 col-sm-3 col-xs-12 d-flex justify-content-end'></div>
                    <div className={`col-lg-2 col-md-3 col-sm-3 col-xs-12 d-flex justify-content-start ${Mypage.MySetting2} `}>
                            <span  style={{width:'100%'}}>마케팅 동의</span>
                    </div>
                    <div className='col-lg-2 col-md-3 col-sm-3 col-xs-12 d-flex justify-content-start'>
                            <label className={Mypage.switch}>
                                <input type="checkbox"/>
                                <span className={`${Mypage.slider} ${Mypage.round}`} round></span>
                            </label>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-lg-4 col-md-3 col-sm-3 col-xs-12 d-flex justify-content-end'></div>
                    <div className={`col-lg-2 col-md-3 col-sm-3 col-xs-12 d-flex justify-content-end ${Mypage.MySetting2} `}>
                            <span style={{width:'100%'}}>Q&A 알림 동의</span>
                    </div>
                    <div className='col-lg-2 col-md-3 col-sm-3 col-xs-12 d-flex justify-content-start'>
                        <label className={Mypage.switch}>
                                    <input type="checkbox"/>
                                    <span className={`${Mypage.slider} ${Mypage.round}`} round></span>
                        </label>
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Mysetting;