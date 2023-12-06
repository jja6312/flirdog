import React, { useEffect, useRef,useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

const MydogUpdateForm2 = () => {  
    const { userId } = useParams();
    const [dogsInfoDTO, setDogsInfoDTO] = useState({
        name: '',
        id: userId,
        dogsInfo: '',
        image: '',
        gender: '',
        dogsBreed: '',
        dogsWeight: '',
        age: '',
        isNeutralized: '',
        score: '',
    })
    const [myUserId, setMyUserId] = useState('') //로그인한 유저의 아이디
    useEffect(() => {
        setMyUserId(userId)
    },[userId]) // userId 가 렌더링 되어야 setMyUserId(userId) 이걸 셋팅해주겠다고 하는것임.
    
    useEffect(() => {

        axios.get(`/mypage/getDogInfo?id=${userId}`)
             .then(res => {
                setDogsInfoDTO(res.data);
                     console.log(dogsInfoDTO);
    })
             .catch(error => console.log(error))
    }, [])

    
    
    useEffect(() => {
        document.getElementById('imgDelBefore').style.display = 'none'
        document.getElementById('imgDelBefore2').style.display = 'none'
    },[]) // 빈배열로 한번만 실행

    useEffect(() => {
        console.log(dogsInfoDTO)
        console.log(myUserId)
    },[dogsInfoDTO]) //dogsInfoDTO가 바뀔때마다 실행

    
      const { id,name, dogsInfo,image,gender,dogsBreed,dogsWeight,age,isNeutralized,score } = dogsInfoDTO;
    

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

    const onUploadSubmit = async (e) => {
        e.preventDefault()
        
        console.log(dogsInfoDTO);

        // 먼저 기존 데이터를 삭제합니다.
        // 삭제가 성공하면 업로드를 진행합니다.
        
        try {
            // First, delete the existing data
            //await axios.delete(`/mypage/deleteDogInfo?id=${myUserId}`);
            
            // If deletion is successful, proceed with the upload
            var formData = new FormData();
            formData.append('dogsInfoDTO', new Blob([JSON.stringify(dogsInfoDTO)], { type: 'application/json' }));

            Object.values(files).map((item, index) => {
                formData.append('img', item);
            });

            axios.post('/mypage/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // 비동기 방식이어서 순서상관없이 수행이된다. await써서 동기를 깨거나 , 다른 버튼 안에 담아서 수행해야한다.
            //이미지등록 헀을때 alert창 예쁘게 만들어줘
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: '수정이 완료되었습니다.',
                showConfirmButton: false,
                timer: 1500
                })
            navigate('/mypage/MydogProfile');

        } catch (error) {
            console.log(error);
        }

    };

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
            dogsWeight: '7.1',
        })

        setImgList([])
        imgRef.current.value = ''
        
        document.getElementById('imgDel').style.display = 'block'
        document.getElementById('imgDel2').style.display = 'block' 
    }
  
    
    const onDeleteSubmit = (e) => {
        e.preventDefault()

        //sweetAlert2 로 삭제 여부 확인
        Swal.fire({
            title: '정말로 삭제하시겠습니까?',
            text: "삭제하시면 복구가 불가능합니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f56084',
            cancelButtonColor: '#d3d3d3',
            confirmButtonText: '삭제하기',
            cancelButtonText: '취소하기'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/mypage/deleteDogInfo?id=${userId}`)
             .then(
                // alert창 예쁘게 만들어줘
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: '삭제가 완료되었습니다.',
                    showConfirmButton: false,
                    timer: 1500
                    }),
                navigate('/mypage/MydogProfile'))
             .catch(error => console.log(error))
            }

            })

        
    }

    return (
        <div>
            <Header></Header> 
            <Container className='px-10 mt-2'> {/* 회원 정보 수정 글씨 */}
                    <div className='row '>
                        <div className='col-lg-4 d-flex justify-content-center'></div>
                        <div className='col-lg-4 d-flex justify-content-center'>
                            <span className={Mypage.PageUpdateLetter}>반려견 정보수정</span>
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
                                {/* <Image id='imgDel' src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_pug_icon_130225.png" roundedCircle className={Mypage.RoundedCircle} style={{border:'1px solid'}} />                             */}
                                <Image id='imgDel' alt={name} src={`/storage/${encodeURIComponent(image)}`} roundedCircle className={Mypage.RoundedCircle} style={{  border: '1px solid #ddd' }} />
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
                            <Button variant="outline-danger" className={Mypage.Btn4} style={{color:'white'}} onClick={ onUploadSubmit }>수정하기</Button>{''} 
                            <Button variant="outline-danger" className={Mypage.Btn4} style={{color:'white'}} onClick={ onDeleteSubmit }>삭제하기</Button>{''} 
                            <Button variant="outline-danger" className={Mypage.Btn4} style={{color:'white'}} onClick={ back }>뒤로가기</Button>{''}              
                        </div>
                    </div>
                    <div>
                        <input type='hidden' name='id' value={id} />
                        <input type='hidden' name='dogsInfo' value={dogsInfo} />
                        <input type='hidden' name='score' value={score} />
                    </div>   
            </Container>        
        </div>
    );
};

export default MydogUpdateForm2;
