import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Button from 'react-bootstrap/Button';
import MypageSubHeader12 from '../5공통/MypageSubHeader1_2';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

const MydogProfile = () => {
    
    // const today = new Date();
    // 현재 날짜를 가져옵니다.
    
    // const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    // 원하는 형식으로 날짜를 설정합니다.

    const [list, setList] = useState([])
    
    useEffect(()=>{
        axios.get('/mypage/uploadList')
            .then((res)=>{
                setList(res.data)
                console.log(res.data)
            })
            .catch(error=>
            	console.log(error))
    },[])

    return (
        <div>
            <MypageSubHeader12/>
            {/* <div>
                {formattedDate}
            </div> */}
            <Container className='px-10 mt-6'> {/* 강아지정보 글씨 */}
                <div className='row '>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 d-flex justify-content-center'>
                        <span className={Mypage.PetInfoLetter}>반려견정보</span>
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
            </Container>
            
            <Container className='px-10 mt-6'> {/* 강아지정보 글씨 */}
                <div className='row '>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                    <div className='col-lg-4 justify-content-center'>
                        {list.map(item => (
                            
                            <Link className={Mypage.subjectA} to={`/mypage/MydogUpdateForm/${item.id}`}>
                                <div key={item.id} className={Mypage.MydogProfileMarging} style={{ marginBottom: '10px', border: '1px solid #f56084', padding: '10px', borderRadius: '100px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                        <div style={{ textAlign: 'start' }}>
                                            <Image alt={item.name} src={`../storage/${encodeURIComponent(item.image)}`} roundedCircle className={Mypage.RoundedCircle} style={{ width: 100, height: 100, border: '1px solid #ddd' }} />
                                        </div>
                                        <div style={{width:'220px'}}> 
                                            <div style={{ textAlign: 'end', marginTop: '10px',fontSize:'20px',fontWeight:'900' }}>
                                                    {item.name}
                                            </div>
                                            <div style={{ textAlign: 'end', marginTop: '10px',color:'#9F8FA5' }}>
                                                {item.dogsInfo} 
                                            </div>
                                        </div> 
                                    </div>    
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='col-lg-4 d-flex justify-content-center'></div>
                </div>
            </Container>
            <Container className='px-10 mt-8'> {/* 추가하기 버튼 */}
                <div className='row '>
                    <div className='col-lg-3 d-flex justify-content-center'></div>
                    <div className='col-lg-6 d-flex justify-content-center'> 
                        <Link to='/mypage/MydogProfileRegister2'> 
                            <Button variant="outline-danger" className={`col-lg-4 ${Mypage.Btn3}`} >
                                추가하기
                            </Button>{''} 
                        </Link>
                    </div>
                    <div className='col-lg-3 d-flex justify-content-center'></div>
                </div>
            </Container>
        </div>
    );
};

export default MydogProfile;