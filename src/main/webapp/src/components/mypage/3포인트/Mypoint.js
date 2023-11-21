import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import MypageSubHeader3_2 from '../5공통/MypageSubHeader3_2';


const Mypoint = () => {
    return (
        <div>
            <MypageSubHeader3_2/>
            <Container className='px-10'> {/* 포인트 내용 */}
                <div className='row mt-6'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'><h3 className={Mypage.Point1}>전체 보유 포인트</h3></div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'> {/* P글씨 */}
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                        <div className={Mypage.Point2}>
                            0<span className={Mypage.Point3}>P</span>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'><h3 className={Mypage.Point1}>소멸 예정 포인트 (7일 이내)</h3></div>
                    <div className='col-lg-2'></div>
                </div>
                <div className='row mt-2'> {/* P글씨 */}
                    <div className='col-lg-2'></div>
                    <div className='col-lg-8'>
                        <div className={Mypage.Point2}>
                            0<span className={Mypage.Point3}>P</span>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                </div>
            </Container>         
        </div>
    );
};

export default Mypoint;