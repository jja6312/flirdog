import React,{useState,useEffect} from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link, useNavigate, useParams } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Button from 'react-bootstrap/Button';
import MypageSubHeader12 from '../5공통/MypageSubHeader1_2';
import axios from 'axios';

const MydogProfile = () => {
    
    const { page } = useParams()
    console.log('page = ' + page)

    const [list, setList] = useState([])
    const [pagingArray, setPagingArray] = useState([])

    const [columnName, setColumnName] = useState('name')
    const [keyword, setKeyword] = useState('')
    const [searchList, isSearchList] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        keyword === '' ?
            //axios.get('http://localhost:8080/user/getUserList?page=${page}')
            axios.get(`/mypage/getDogInfoList?page=${page}`)
                .then(res => {
                    setList(res.data.content)
                    setPagingArray(Array.from({ length: res.data.totalPages }, (_, index) => index + 1))
                    console.log(res.data)
                })
                .catch(error => console.log(error))
        :
            axios.get(`/user/getUserSearchList?page=${page}`, {
                params: {
                    columnName: columnName,
                    keyword: keyword 
                }
            })
            .then(res => {
                setList(res.data.content)
                setPagingArray(Array.from({ length: res.data.totalPages }, (item, index) => index + 1))
                console.log(res.data)
            })
            .catch(error => console.log(error))
            
    }, [page, searchList])
        
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
                                            
                                            <td align='center'>{ item.image }</td>
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
                        <Link to='/mypage/MydogProfileRegister'> 
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