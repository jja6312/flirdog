import React, { useEffect, useRef, useState } from 'react';
import MypageSubHeader31 from '../5공통/MypageSubHeader3_1';
import Container from 'react-bootstrap/esm/Container';
import { Link, useNavigate } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';


const MypointRecharge = () => {
    // useRef를 사용하여 버튼 엘리먼트를 참조
    const buttonRef = useRef(null);
    // const [merchantUidSuffix, setMerchantUidSuffix] = useState(10);
    const [amount , setAmount] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {
      // IMP 초기화
      const IMP = window.IMP;
      IMP.init("imp15772586");
  
      // useRef로 참조한 버튼 엘리먼트를 사용
      const button = buttonRef.current;
  
      // onClickpay 함수 정의
      const onClickpay = async () => {
        //클릭할때 마다 merchant_uid 뒤에 숫자가 1씩 증가
        // setMerchantUidSuffix((prevSuffix) => prevSuffix + 1);

        IMP.request_pay({
          pg: "kakaopay",
          pay_method: "card",
          amount: `${amount}`,
          name: `${amount}원 포인트 충전`,
          merchant_uid: `ORD20231203-000028`,
        //   buyer_email: "",
        //   buyer_name: "",
        //   buyer_tel: "",
        //   buyer_addr: "",
        //   buyer_postcode: "",
        },function (response) {
            const {status, err_msg} = response;
            if(err_msg){
                alert(err_msg);
            }
            if(status === "paid"){
                const {imp_uid} = response;
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: `${amount}포인트 충전이 완료 되었습니다.`,
                    showConfirmButton: false,
                    timer: 1500
                    
                    })
                    navigate('/mypage/Mypoint');
    
            }
        }
        )};
  
      // 버튼이 정상적으로 찾아지면 클릭 이벤트를 할당
      if (button) {
        button.addEventListener("click", onClickpay);
      }
  
      // cleanup 함수
      return () => {
        // 버튼이 정상적으로 찾아지면 이벤트 핸들러 제거
        if (button) {
          button.removeEventListener("click", onClickpay);
        }
      };
    }, [amount]); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행
  

    const [num, setNum] = useState(0);

    const inputPriceFormat = (str) => {
      setAmount(str);
      console.log("s", str);
      const comma = (str) => {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
      };
      const uncomma = (str) => {
        str = String(str);
        return str.replace(/[^\d]+/g, "");
      };
      return comma(uncomma(str));
    }; //참고. https://velog.io/@kingth/react-input-%EA%B0%80%EA%B2%A9%ED%91%9C%EC%8B%9C-3%EC%9E%90%EB%A6%AC-%EB%A7%88%EB%8B%A4-%EC%BD%A4%EB%A7%88 

    return (
        <div>
            <MypageSubHeader31/>            
            <Container className={`px-10 ${Mypage.Margin0}`}> 
                <div className={`row ${Mypage.Margin1}`}>
                    <div className='col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center'></div>
                    <div className={`col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center ${Mypage.Margin1PointCHarge}`}>
                        충전
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center'></div>
                </div>
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
                            <input type="text" value={num} onChange={(e) => setNum(inputPriceFormat(e.target.value))}  className={Mypage.Myarticle5Input } />
                            <img src='https://assets.store.bemypet.kr/wp-content/plugins/mshop-diy-product/assets/images/delete.png' className={Mypage.ImgBorder}/>
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
                
            </Container>
        </div>
    );
};

export default MypointRecharge;