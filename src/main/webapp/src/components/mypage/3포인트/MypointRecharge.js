import React, { useEffect, useRef, useState } from 'react';
import MypageSubHeader31 from '../5공통/MypageSubHeader3_1';
import Container from 'react-bootstrap/esm/Container';
import { Link, useNavigate } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import axios from 'axios';


const MypointRecharge = () => {
    
  const [userObject, setUserObject] = useState({});
  console.log(userObject); //아무의미없음.userObject빈객체 방지용
  //유저테이블
  const [userDTO, setUserDTO] = useState({
    id: '',
    addresses: '',
    communities:'',
    communityScore : '',
    dogsinfos: '',
    matching: '',
    name: '',
    phone: '',
    passwd: '',
    pointChargings: '',
    popularity: '',
    userRole: '',
    nickname: '',
    introduce : '',
    email: '',
    image : '',
    imgageFileName: '',
    point: 0,
    communityScore: 0,
    amount: 0,
    });
  const {id,nickname,introduce,email,image,phone,name,passwd,addresses,communities,communityScore,dogsinfos,matching,point,pointChargings,popularity,userRole,imgageFileName,amount} = userDTO;

  // 포인트 충전 테이블 [ 김찬영  2023-12-5 오후 04:52:45 ] 시간 되면 하시오. 안할거면 포인트 조회에 소멸 예정 포인트! 없애시오.
//    const [pointChargingDTO, setPointChargingDTO] = useState({
//      id: '',
//      price: '',
//      chargingPoint: '',
//      createdDate: '',
//      validDate: '',
//    });

    // useRef를 사용하여 버튼 엘리먼트를 참조
    const buttonRef = useRef(null);
    // const [merchantUidSuffix, setMerchantUidSuffix] = useState(10);
    const [amount2 , setAmount2] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {

      // 로컬스토리지에서 유저 아이디 가져오기
      const userJsonString = localStorage.getItem('user');
    
      const userObject = JSON.parse(userJsonString);
      // console.log(userObject);
      setUserObject(userObject);
      const userId = userObject.id;

      console.log("userId"+userId);
      // IMP 초기화
      const IMP = window.IMP;
      IMP.init("imp15772586");

      axios.get(`http://localhost:8080/mypage/getUserProfileTest?userIdStr=${userId}`)
      .then((res) => {
          //alert('성공')
          console.log('getUserProfileTest'+res.data);
          setUserDTO(res.data);
      })
      .catch((error) => {
          console.log(error);
      });
  
    //   axios.get(`http://localhost:8080/mypage/getPointCharging?userIdStr=${userId}`)
    //   .then((res) => {
    //       //alert('성공')
    //       console.log('getPointCharging'+res.data);
    //       setPointChargingDTO(res.data);
    //   })
    //   .catch((error) => {
    //       console.log(error);
    //   });

      // useRef로 참조한 버튼 엘리먼트를 사용
      const button = buttonRef.current;
  
      // onClickpay 함수 정의
      const onClickpay = async () => {
        //클릭할때 마다 merchant_uid 뒤에 숫자가 1씩 증가
        // setMerchantUidSuffix((prevSuffix) => prevSuffix + 1);
        //userDTO의 amount 값을  불러오고싶다
        if(amount2 === 0){
          Swal.fire({
            position: 'middle',
            icon: 'error',
            title: '충전금액을 입력해주세요.',
            showConfirmButton: false,
            timer: 1500
            })
          return;
        }
        console.log("어마운트ㅡㅡㅡㅡㅡㅡ"+{amount});
        console.log(userDTO.amount)
        IMP.request_pay({
          pg: "kakaopay",
          pay_method: "card",
          amount: `${amount2}`,
          name: `${amount2}원 포인트 충전`,
          merchant_uid: `ORD21231219-000${pointChargings}`,
        //   buyer_email: "",
        //   buyer_name: "",
        //   buyer_tel: "",
        //   buyer_addr: "",
        //   buyer_postcode: "", <== 이런 정보들도 넣을수있음.
        },function (response) {
            const {status, err_msg} = response;
            if(err_msg){
                alert(err_msg);
            }
            if(status === "paid"){
              
                //결제 성공시 user_table에 포인트 데이터 입력되게
                axios.post(`/mypage/writeUser`,userDTO) //[ 김찬영  2023-12-4 오후 09:46:33 ]
                                                //데이터 업데이트 되는걸로 바꿔야됨.
                .then((res) => {
                    // alert(`${amount2}`);
                    console.log(res.data);
                    setUserDTO(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
                
                // axios.post('/mypage/wrtitePointCharging' , pointChargingDTO)
                // .then((res) => {
                //     console.log(res.data);
                //     setPointChargingDTO(res.data);
                // })
                // .catch((error) => {
                //     console.log(error);
                // });

                const {imp_uid} = response;
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: `${amount2}포인트 충전이 완료 되었습니다.`,
                    showConfirmButton: false,
                    timer: 1500
                    
                    })
                navigate('/mypage/Mypoint');
              
            }
        }
        )};
        // end of onClickpay
  
      // 버튼이 정상적으로 찾아지면 클릭 이벤트를 할당
      if (button) {
        button.addEventListener("click", onClickpay);
      }

          // pointChargingDTO의 createdDate를 현재 날짜로 초기화
    //   setPointChargingDTO({
    //         ...pointChargingDTO,
    //         createdDate: new Date().toISOString(), // 현재 날짜를 ISO 형식의 문자열로 변환
    //         validDate: new Date().toISOString()+7, 
    //   });




      // cleanup 함수
      return () => {
        // 버튼이 정상적으로 찾아지면 이벤트 핸들러 제거
        if (button) {
          button.removeEventListener("click", onClickpay);
        }
      };
    }, [amount2],[]); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행
    //end of useEffect


    const onInput = (e) => {
      
      const { name, value } = e.target

      setUserDTO({
        ...userDTO,
          [name]: value
      });
      

      setAmount2(value);

      // console.log("s", str);
      // const comma = (str) => {
      //   str = String(str);
      //   return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
      // };
      // const uncomma = (str) => {
      //   str = String(str);
      //   return str.replace(/[^\d]+/g, "");
      // };
      // return comma(uncomma(str)); <===이거는 숫자사이사이에 콤마찍어주는건데 , 포인트 계산 해야되서 일단 이거는 안썼습니다.
    }; //참고. https://velog.io/@kingth/react-input-%EA%B0%80%EA%B2%A9%ED%91%9C%EC%8B%9C-3%EC%9E%90%EB%A6%AC-%EB%A7%88%EB%8B%A4-%EC%BD%A4%EB%A7%88 
    // end of onInput

    const amount2Reset = () => {  
      setAmount2(0);
    }

    return (
        <div>
            <MypageSubHeader31/>            
            <Container className={`px-10 ${Mypage.Margin0}`}> 
                <div className={`row ${Mypage.Margin1}`}>
                    <div className='col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center'></div>
                    <div className={`col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center ${Mypage.Margin1PointCHarge}`}>
                        충전 
                        <input type='hidden' name='point' value={point}/>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center'></div>
                </div>
                <Row className={`${Mypage.Margin2_2}`}>
                    <Col xs={3} md={4}>
                        <div className={Mypage.Myarticle2_2}>현재액수</div>
                    </Col>
                    <Col xs={3} md={4} className={Mypage.Imagecenter4}>
                      <input type='text' id='point' value={point} className={Mypage.input10}/> <span className={Mypage.span10}>포인트</span> 
                    </Col>
                    <Col xs={3} md={4}>
                    </Col>
                </Row>
                <Row className={`${Mypage.Margin2}`}>
                    <Col xs={3} md={4}>
                        <div className={Mypage.Myarticle2_1}>충전금액</div>
                    </Col>
                    <Col xs={6} md={4} className={Mypage.Imagecenter}>
                    </Col>
                    <Col xs={3} md={4}>
                    </Col>
                </Row>
                <Row className={`${Mypage.Margin2_1}`}>
                    <Col xs={3} md={4}>
                        <div className={Mypage.Myarticle5}>
                            <input type="text" name='amount' value={amount2} onChange={onInput}  className={Mypage.Myarticle5Input } />
                            <img src='https://assets.store.bemypet.kr/wp-content/plugins/mshop-diy-product/assets/images/delete.png' className={Mypage.ImgBorder} onClick={amount2Reset} />
                        </div>
                    </Col>
                    <Col xs={6} md={4} className={Mypage.Imagecenter}>
                    </Col>
                    <Col xs={3} md={4}>
                    </Col>
                </Row>


                <Row className={`${Mypage.Myarticle4}`}>
                    <Col xs={4} md={4}>
                    </Col>
                    <Col xs={4} md={4} className={Mypage.ImagecenterPoint}>
                        <Link to=''>
                            <Button variant="outline-danger" className={`col-lg-4 ${Mypage.Myarticle3}`}   id="naverPayBtn" value="네이버페이 결제 버튼" ref={buttonRef}  >
                                충전하기
                            </Button>{''} 
                        </Link>
                    </Col>
                    <Col xs={4} md={4}>
                    </Col>
                </Row>
                

                <Row className={`${Mypage.Myarticle4}`}>
                    <Col xs={4} md={4}>
                    </Col>
                    <Col xs={4} md={4} className={Mypage.ImagecenterPoint}>
                        {/* <input type='text' name='id' value={id} className={Mypage.input11}/> <span className={Mypage.span11}>아이디</span>
                        <input type='text' name='addresses' value={addresses} className={Mypage.input12}/> <span className={Mypage.span12}>주소</span>
                        <input type='text' name='communities' value={communities} className={Mypage.input13}/> <span className={Mypage.span13}>커뮤니티</span>
                        <input type='text' name='communityScore' value={communityScore} className={Mypage.input14}/> <span className={Mypage.span14}>커뮤니티점수</span> 
                        <input type='text' name='dogsinfos' value={dogsinfos} className={Mypage.input15}/> <span className={Mypage.span15}>반려견정보</span>
                        <input type='text' name='matching' value={matching} className={Mypage.input16}/> <span className={Mypage.span16}>매칭</span>
                        <input type='text' name='name' value={name} className={Mypage.input17}/> <span className={Mypage.span17}>이름</span>
                        <input type='text' name='phone' value={phone} className={Mypage.input18}/> <span className={Mypage.span18}>전화번호</span>
                        <input type='text' name='passwd' value={passwd} className={Mypage.input19}/> <span className={Mypage.span19}>비밀번호</span>
                        <input type='text' name='popularity' value={popularity} className={Mypage.input21}/> <span className={Mypage.span21}>인기</span>
                        <input type='text' name='userRole' value={userRole} className={Mypage.input22}/> <span className={Mypage.span22}>유저롤</span>
                        <input type='text' name='nickname' value={nickname} className={Mypage.input23}/> <span className={Mypage.span23}>닉네임</span>
                        <input type='text' name='introduce' value={introduce} className={Mypage.input24}/> <span className={Mypage.span24}>자기소개</span>
                        <input type='text' name='image' value={image} className={Mypage.input26}/> <span className={Mypage.span26}>이미지</span>
                        <input type='text' name='email' value={email} className={Mypage.input25}/> <span className={Mypage.span25}>이메일</span>
                      <input type='text' name='imgageFileName' value={imgageFileName} className={Mypage.input27}/> <span className={Mypage.span27}>이미지파일이름</span> */}
                        <input type='hidden' name='pointChargings' value={pointChargings} className={Mypage.input20}/>  {/* 카카오결제일련번호로 사용중. 백단의 UserDTO파일 이름과 동일해야함  */}
                        {/* 포인트충전 유효기간 부분  잘안되서 포기함.*/}
                        {/* <input type='text' name='pointChargingDTO[price]' value={pointChargingDTO.price} /> 
                        <input type='text' name='pointChargingDTO[id]' value={pointChargingDTO.id} />
                        <input type='text' name='pointChargingDTO[chargingPoint]' value={amount2} />
                        <input type='text' name='pointChargingDTO[createdDate]' value={pointChargingDTO.createdDate} />
                        <input type='text' name='pointChargingDTO[validDate]' value={pointChargingDTO.validDate} /> */}
                    </Col>
                    <Col xs={4} md={4}>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MypointRecharge;