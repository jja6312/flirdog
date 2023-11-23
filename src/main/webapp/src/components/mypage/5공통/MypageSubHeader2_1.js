import React, { useState,useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Header from '../../main/Header';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';

const MypageSubHeader2_1 = () => {
    const [showSubHeader1 , setShowSubHeader1] = useState(false);
    const [showSubHeader2 , setShowSubHeader2] = useState(false);
    const [showSubHeader3 , setShowSubHeader3] = useState(false);
    const [showSubHeader4 , setShowSubHeader4] = useState(false);
    const [changeColor1 , setChangeColor1] = useState(false);
    const [changeColor2 , setChangeColor2] = useState(false);
    const [changeColor3 , setChangeColor3] = useState(false);
    const [changeColor1_1 , setChangeColor1_1] = useState(false);
    const [changeColor1_2 , setChangeColor1_2] = useState(false);
    const [changeColor2_1 , setChangeColor2_1] = useState(false);

    useEffect(() => {   
        setChangeColor2(true);
        setChangeColor2_1(true);
        sub2();
    },[])

    const sub1 = () => {   
        setShowSubHeader1(true);
        setShowSubHeader2(false);
        setShowSubHeader3(false);
        setShowSubHeader4(false);
        setChangeColor1(true);
        setChangeColor2(false);
        setChangeColor3(false);
    }
    const sub2 = () => {   
        setShowSubHeader1(false);
        setShowSubHeader2(true);
        setShowSubHeader3(false);
        setShowSubHeader4(false);
        setChangeColor1(false);
        setChangeColor2(true);
        setChangeColor3(false);
    }
    const sub3 = () => {   
        setShowSubHeader1(false);
        setShowSubHeader2(false);
        setShowSubHeader3(true);
        setShowSubHeader4(false);
        setChangeColor1(false);
        setChangeColor2(false);
        setChangeColor3(true);
    }
    const sub4 = () => {   
        setShowSubHeader1(false);
        setShowSubHeader2(false);
        setShowSubHeader3(false);
        setShowSubHeader4(true);
        setChangeColor1(false);
        setChangeColor2(false);
        setChangeColor3(false);
    }
    const sub1_1 = () => {  
        sub1();
        setChangeColor1_1(true);
        setChangeColor1_2(false);
    }
    const sub1_2 = () => {  
        sub1();
        setChangeColor1_1(false);
        setChangeColor1_2(true);
    }


    return (
        <div>
            <Header></Header>
            <hr className={Mypage.hr1}></hr>
            <Container className='px-10'>{/* 마이페이지헤더상단부분 */}
                <div className='row'>{/* 원하는 애들을 수평배열할때 사용 */}
                    <div className='col-lg-2 col-md-2 col-sm-2 d-flex justify-content-center'>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 d-flex justify-content-center'>
                        <div className={` ${changeColor1 ? Mypage.borderbottomPink : Mypage.borderbottomPinkOff}`}>
                            <div className={`${Mypage.Link1}`}> 
                                <button onClick={ sub1 } className={Mypage.BackgroungWhite}>   
                                    <span className={` ${Mypage.Menu1}`} >
                                                프로필
                                    </span>    
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className='col-2-md d-fle justify-content-center'> */}
                    {/* 내가 작성한 글이 div칸 가운데에 오도록 코드 짜줘 */}
                    <div className='col-lg-2 col-md-3 col-sm-4 d-flex justify-content-center'>
                        {/* <Link to="/mypage/Myarticle"> */}
                        {/* <Link to="/mypage/Myarticle"> 를 쓰니까 해당 div 밑에 밑줄이 그이는데 이를 없애는 코드를 짜줘~*/}
                        <div className={` ${changeColor2 ? Mypage.borderbottomPink : Mypage.borderbottomPinkOff}`}>
                            <div className={Mypage.Link1} >                    
                                <button onClick={ sub2 } className={Mypage.BackgroungWhite}>
                                    <span className={Mypage.Menu1} >
                                            내가 작성한 글  
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 d-flex justify-content-center'>
                        <div className={` ${changeColor3 ? Mypage.borderbottomPink : Mypage.borderbottomPinkOff}`}>
                            <div className={Mypage.Link1}> 
                                <button onClick={ sub3 } className={Mypage.BackgroungWhite}>
                                    <span className={Mypage.Menu1} >
                                            포인트
                                    </span>
                                </button>
                            </div> 
                        </div>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 d-flex justify-content-start'>
                        <div className={` ${showSubHeader4 ? Mypage.borderbottomPink : Mypage.borderbottomPinkOff}`}>
                            <div className={Mypage.Link1}> 
                                <Link to="/mypage/Mysetting" className={Mypage.Link} onClick={sub4} > 
                                    <span className={Mypage.Menu1} >
                                        설정
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <hr className={Mypage.hr2}></hr>
            {/* 눌렀을때 보여지는 화면이 다르게 함. */}
            {showSubHeader1&&
                <div>
                    <Container className='px-10'>{/* 마이페이지헤더 하단부분 */}
                        <ul className='row m-0 p-0'>    
                            <li className='col-lg-2 col-md-2 col-sm-2 d-flex justify-content-center'></li>
                            <li className='col-lg-1 col-md-1 col-sm-1 d-flex justify-content-center'></li>
                            <li  className={`col-lg-2 col-md-2 col-sm-4 d-flex justify-content-center `} ><Link to="/mypage/MypageMain" className={Mypage.Link} ><span className={` Mypage.LiVisible ${changeColor1_1 ? Mypage.borderbottomPink : Mypage.borderbottomPinkOff}`} onClick={sub1_1}>내 프로필</span> </Link></li>
                            <li className='col-lg-2 col-md-3 col-sm-4 d-flex justify-content-center'><Link to="/mypage/MydogProfile" className={Mypage.Link}><span className={`Mypage.LiVisible ${changeColor1_2 ? Mypage.borderbottomPink : Mypage.borderbottomPinkOff}`} onClick={sub1_2}>반려견 프로필</span></Link></li>
                            <li className='col-lg-3 col-md-2 col-sm-2 d-flex justify-content-center'></li>
                        </ul>
                        
                    </Container>
                    <hr className={Mypage.hr2}></hr>
                </div>
            }
            {showSubHeader2&&
                <div>
                    <Container className='px-10'>{/* 마이페이지헤더 하단부분 */}
                        
                        <ul className='row m-0 p-0'>    
                            <li className='col-lg-3 col-md-3 col-md-3 col-sm-3 d-flex justify-content-center'></li>
                            <li className='col-lg-2 col-md-2 col-md-2 col-sm-2 d-flex justify-content-center'><Link to="/mypage/Myarticle" className={Mypage.Link}><span className={` Mypage.LiVisible ${changeColor2_1 ? Mypage.borderbottomPink : Mypage.borderbottomPinkOff}`}>Q&A</span> </Link></li>
                            <li className='col-lg-2 col-md-2 col-md-2 col-sm-2 d-flex justify-content-center'><Link to="/mypage/MyarticleRounge" className={Mypage.Link}><span className={` Mypage.LiVisible`}>라운지</span></Link></li>
                            <li className='col-lg-2 col-md-2 col-md-2 col-sm-2 d-flex justify-content-center'><Link to="/mypage/MyarticleRepl" className={Mypage.Link}><span className={` Mypage.LiVisible`}>댓글</span></Link></li>
                            <li className='col-lg-2 col-md-2 col-md-2 col-sm-2 d-flex justify-content-center'></li>
                        </ul>
                    </Container>
                    <hr className={Mypage.hr2}></hr>
                </div>
            }
            {showSubHeader3&&
                <div>
                    <Container className='px-10'>{/* 마이페이지헤더 하단부분 */}
                        <ul className='row m-0 p-0'>    
                            <li className='col-lg-3 col-md-3 col-sm-3 d-flex justify-content-center'></li>
                            <li className='col-lg-2 col-md-2 col-sm-3 d-flex justify-content-center'><Link to="/mypage/MypointRecharge" className={Mypage.Link}><span className={Mypage.LiVisible}>포인트 충전</span> </Link></li>
                            <li className='col-lg-2 col-md-2 col-sm-3 d-flex justify-content-center'> <Link to="/mypage/Mypoint" className={Mypage.Link}><span className={Mypage.LiVisible}>포인트 조회</span> </Link></li>
                            <li className='col-lg-2 col-md-2 col-sm-1 d-flex justify-content-center'></li>
                            <li className='col-lg-2 col-md-2 col-sm-1 d-flex justify-content-center'></li>
                        </ul>
                    </Container>
                    <hr className={Mypage.hr2}></hr>
                </div>
            }
        </div>
    );
};

export default MypageSubHeader2_1;