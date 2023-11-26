import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Button from 'react-bootstrap/Button';
import MypageSubHeader12 from '../5공통/MypageSubHeader1_2';
import axios from 'axios';

const MydogProfile = () => {
    

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
                        {
                            list.map(item => {
                                return (
                                    <table key={item.id}  className={Mypage.MydogProfileMarging}  style={{ borderSpacing: '10px 0'  , borderCollapse: 'separate' }}>
                                        <tr key={ item.id }>
                                            <td align='center'>{ item.name }</td>
                                            
                                            <td align='center'>
                                                <Link className={Mypage.subjectA} to={ `/mypage/updateForm/${item.id}` }>{/* 반려견 상세보기 화면 만들어야됨.  */}
                                                    { item.id }
                                                </Link>
                                            </td>
                                            
                                            <td align='center'>
                                            <img src={`../storage/${encodeURIComponent(item.image)}`} 
                                            // 아미지 할때 한글이름 넣지마라.원래 encodeURIComponent이거 되야되는데 이걸로도 해결안되네
                                                alt={ item.imageName } 
                                                style={{ width: 100, height: 100 }} />

                                            </td>
                                        </tr>
                                    </table>
                                )
                            })
                        }
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