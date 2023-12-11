import React, { useEffect, useRef,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Header from '../../main/Header';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Swal from 'sweetalert2';


const MydogProfileRegister2 = () => {
    const [email1, setEmail1] = useState('');
    const [dogsInfoDTO, setDogsInfoDTO] = useState({
        id: '',
        name: '',
        dogsInfo: '',
        image: '',
        age: '',
        gender: '',
        dogsBreed: '',
        isNeutralized: 'true',
        score: '100',
        imageFileName: '',
        dogsWeight: '',
        email:'',

    })  

    const {id,name ,age,gender,dogsBreed,isNeutralized,image,score,dogsInfo,imageFileName ,dogsWeight,email} = dogsInfoDTO
    
    const [userObject, setUserObject] = useState({});

    useEffect(() => {
        
        // 로컬스토리지에서 유저 아이디 가져오기
        const userJsonString = localStorage.getItem('user');
        
        const userObject = JSON.parse(userJsonString);

        let email = null;
        if(userObject.user){
            console.log(userObject.user);
            setUserObject(userObject.user);
            email = userObject.user.email;
            

        }else if(userObject){
            console.log(userObject);
            setUserObject(userObject);
            email = userObject.email;
        }
        console.log("email~~~~!!!!!!!!!!!!!!"+email);
        setEmail1(email);
        console.log("email1~~~~"+email1);
        console.log("email2~~~~"+dogsInfoDTO.email);

        document.getElementById('imgDelBefore').style.display = 'none'
        document.getElementById('imgDelBefore2').style.display = 'none'

    },[]) // 빈배열로 한번만 실행

    useEffect(() => {
        setDogsInfoDTO({
            ...dogsInfoDTO,
            email: email1
        })
        console.log(dogsInfoDTO);
    },[email1])

    const imgRef = useRef()



    const [imgList, setImgList] = useState([])
    const [files, setFiles] = useState([])

    const navigate = useNavigate()
    
    const back = () => {    
        navigate('/mypage/MydogProfile')
    }

    const onInput = (e) =>{
        const { name, value } = e.target
        
        setDogsInfoDTO({
            ...dogsInfoDTO,
            [name]: value
        })
        console.log(dogsInfoDTO);  
    }

    const onCamera = () => {
        imgRef.current.click()
    }

    const onImgInput = (e) => {  //이미지를 선택하면 실행되는 함수
        const imgFiles = Array.from(e.target.files)//파일을 배열에 담는다.
        var imgArray = [] //임시배열의 변수를 잡아서

        imgFiles.map(item => {
            const objectUrl = URL.createObjectURL(item)
            imgArray.push(objectUrl)
        }) //map 돌아가는거 안에 차곡차곡 담아라.

        setImgList(imgArray) //카메라 아이콘을 누르면 이미지 미리보기 용도
        setFiles(e.target.files) //formData에 넣어서 서버로(스프링 부트) 보내기 용도
        document.getElementById('imgDel').style.display = 'none' //기존 디폴트 이미지 삭제.
        document.getElementById('imgDel2').style.display = 'none' //기존 디폴트 이미지 삭제.
        document.getElementById('imgDelBefore').style.display = 'block' //새로운 이미지 보이게 하기
        document.getElementById('imgDelBefore2').style.display = 'block'
        }

    const onUploadSubmit = (e) => {
        
        console.log('이메일     '+email1);
        
        setDogsInfoDTO({
            ...dogsInfoDTO,
            email: email1
        })
        console.log(dogsInfoDTO);

        if(name === ''){
            Swal.fire({
                icon: 'error',
                title: '이름을 입력해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: '#f56084'
            })
            return
        }
        if(age === ''){
            Swal.fire({
                icon: 'error',
                title: '나이를 입력해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: '#f56084'
            })
            return
        }
        if(dogsWeight === ''){
            Swal.fire({
                icon: 'error',
                title: '무게를 입력해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: '#f56084'
            })
            return
        }
        if(dogsBreed === ''){
            Swal.fire({
                icon: 'error',
                title: '품종을 입력해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: '#f56084'
            })
            return
        }
        if(dogsInfo === ''){
            Swal.fire({
                icon: 'error',
                title: '반려견 소개를 입력해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: '#f56084'
            })
            return
        }
        if(files.length === 0){
            Swal.fire({
                icon: 'error',
                title: '이미지를 선택해주세요.',
                confirmButtonText: '확인',
                confirmButtonColor: '#f56084'
            })
            return
        }
        
        
        e.preventDefault()
        console.log(dogsInfoDTO);

        var formData = new FormData()
        formData.append('dogsInfoDTO', new Blob([JSON.stringify(dogsInfoDTO)], {type: 'application/json'}))
        // for(var i=0; i<files.length; i++) {
        //     formData.append('img', files[i])
        // }
        Object.values(files).map((item,index) => {
            formData.append('img', item)
        })

        axios.post('/mypage/upload', formData,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }) 
        .then(res=>{
            //sweet alert로 이미지 업로드 완료를 예쁘게 만들어줘
            Swal.fire({
                icon: 'success',
                title: '이미지 업로드 완료',
                text: '반려견 등록이 완료되었습니다.',
                confirmButtonText: '확인',
                confirmButtonColor: '#f56084'
            }).then((result) => {
                if (result.isConfirmed) {
                    // 마이페이지 반려견 프로필로 이동
                    //navigate('/mypage/MydogProfile');
                } 
            });
        })
        .catch(error=> console.log(error)) 
        navigate('/mypage/MydogProfile');
    }

    const onReset = (e) => {
        e.preventDefault()

        setDogsInfoDTO({
            name: '',
            age: '',
            gender: '',
            dogsBreed: '',
            isNeutralized: 'true',
            image: '',
            score: '',
            dogsInfo: '',
        })

        setImgList([])
        imgRef.current.value = ''
        
        document.getElementById('imgDel').style.display = 'block'
        document.getElementById('imgDel2').style.display = 'block' 
    }


    return (
        <div>
            <Header />
            <Container className='px-10 mt-2'> {/* 회원 정보 수정 글씨 */}
                    <div className='row '>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                        <div className='col-lg-4 d-flex justify-content-center'>
                            <span className={Mypage.PageUpdateLetter}>반려견 등록</span>
                        </div>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                    </div>
            </Container>
            <Container className='px-10 mt-6'> {/* 사진이미지부분 */}
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={`${Mypage.Imagecenter} d-flex justify-content-center`}>
                            <div className={Mypage.main_image}>
                                <Image id='imgDel' src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_pug_icon_130225.png" roundedCircle className={Mypage.RoundedCircle} style={{border:'1px solid'}} />                            
                                <h1  id='imgDel2' className={Mypage.main_image_text}>이미지를 선택해 주세요.</h1>
                            </div>
                            <div id='imgDelBefore'>
                                <span id='imgDelBefore2' >
                                            {
                                                imgList.map((item,index) =>
                                                //  <img key={ index } src={ item } 선생님이 한거 원래/>
                                                <Image key={ index } src={ item } roundedCircle className={Mypage.RoundedCircle} />
                                                )
                                            }
                                </span>
                            </div>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                                        <Form.Group as={Col} controlId="formUploadimage">
                                            <div className={Mypage.FormTitleDiv} style={{
                                            color:'gray',
                                            }}>
                                            <div className={Mypage.FormTitleNameDiv} >
                                                사 진
                                            </div>&nbsp;&nbsp;&nbsp;
                                            <img src='/image/date/camera.jpg' alt="카메라"
                                                        onClick={ onCamera }
                                                        style={{width:70, height:50, borderRadius:20}} />
                                            <input type="file"name="img[]"
                                                    multiple="multiple"
                                                    onChange={ onImgInput } 
                                                    ref={ imgRef } style={{visibility:'hidden' ,width:'10px'}} />
                                            </div>
                                        </Form.Group>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default" style={{color:'#f56084'}}>
                                이름
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default" name='name' value={name} onChange={onInput}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default" style={{color:'#f56084'}}>
                                나이
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default" name='age' value={age} onChange={onInput}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <InputGroup className="mb-3" >
                                <InputGroup.Text id="inputGroup-sizing-default" style={{color:'#f56084'}}>
                                무게
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default" name='dogsWeight' value={dogsWeight} onChange={onInput}
                                /><span style={{ marginLeft: '5px' }}>kg</span>
                            </InputGroup>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default" style={{color:'#f56084'}}>
                                품종
                                </InputGroup.Text>
                                <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"  name='dogsBreed' value={dogsBreed} onChange={onInput}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={`${Mypage.Imagecenter} d-flex justify-content-start `}>
                            <div>
                                <div className={Mypage.FormTitleNameDiv} 
                                            style={{fontSize:'0.8em'}}>
                                            성별
                                </div>&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className={Mypage.MyprofileUpdate_Text} style={{marginTop:'5px'}} >
                                &nbsp;&nbsp;&nbsp;
                                <div className={` d-flex justify-content-right`}>
                                                    <input id='genderBox1' type='radio' name='gender'  value='남아'  onChange={onInput} />
                                                    <label className={Mypage.labelClass1} htmlFor='genderBox1'>남 아</label>
                                                    &nbsp;&nbsp;
                                                    <input id='genderBox2' type='radio' name='gender'  value='여아' onChange={onInput} />
                                                    <label className={Mypage.labelClass2} htmlFor='genderBox2'>여 아</label>
                                </div>
                            </div>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={5} md={4}>
                        </Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <div className={Mypage.FormTitleDiv} >
                                    <div className={Mypage.FormTitleNameDiv} 
                                        style={{fontSize:'0.8em'}}
                                    >
                                        중성화 여부
                                    </div>&nbsp;&nbsp;&nbsp;
                                    <div className={`d-flex justify-content-left`}>
                                        <input id='neutralizationBox' type='checkbox' value='true'  name='isNeutralized' onChange={onInput}  />
                                        <label className={`${Mypage.neutralizationLabel} ${Mypage.labelClass3}`} htmlFor='neutralizationBox'></label>
                                    </div>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col xs={5} md={4}>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col xs={5} md={4}></Col>
                        <Col xs={2} md={4} className={Mypage.Imagecenter}>
                            <FloatingLabel controlId="floatingTextarea2" label="*반려견 소개를 입력하세요." style={{color:'#f56084',fontSize:'15px', height: '100%' ,width:'100%'}}>
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100%' ,width:'100%',fontSize:'15px'}}
                                name='dogsInfo' value={dogsInfo} onChange={onInput}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col xs={5} md={4}></Col>
                    </Row>
                    <div className='row'>
                        <div className='col-sm-3 d-flex justify-content-center'></div>
                        <div className='col-sm-6 d-flex justify-content-center'>
                            <Button variant="outline-danger" className={Mypage.Btn4} style={{color:'white'}} onClick={ onUploadSubmit }>등록하기</Button>{''} 
                            <Button variant="outline-danger" className={Mypage.Btn4} style={{color:'white'}} onClick={ onReset }>취소</Button>{''} 
                            <Button variant="outline-danger" className={Mypage.Btn4} style={{color:'white'}} onClick={ back }>뒤로가기</Button>{''} 
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 d-flex justify-content-center'></div>
                        <div className='col-sm-6 d-flex justify-content-center'>
                            <input type='hidden' name='email' value={userObject.email} /> 
                        </div>
                    </div>
            </Container>
        </div>
    );
};

export default MydogProfileRegister2;