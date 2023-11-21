import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Slider from "react-slick";
import '../../../css/somoim/detail/slick.css';
import '../../../css/somoim/detail/slick-theme.css';
import SomoimMainList from './SomoimMainList';
import SomoimMainFilter from './SomoimMainFilter';

import styles from '../../../css/somoim/main/somoimHighlightCard.module.css'
import slideStyles from '../../../css/somoim/main/SomoimSliderStyles.module.css';
import { Link } from 'react-router-dom';

const SomoimMainBody = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const settings = {
        //rows: 1,                    //이미지를 몇 줄로 표시할지 개수
        dots: true,                //슬라이더 아래에 도트 네비게이션 버튼 표시 여부(true or false) ▶기본값 false
        //appendDots: $('selector'),  //네비게이션 버튼 변경
        //dotsClass: 'custom-dots',   //네비게이션 버튼 클래스 변경
        infinite: true,             //무한반복(true or false) 기본값 true
        slidesToShow: 4,            //한번에 보여줄 슬라이드 아이템 개수
        slidesToScroll: 4,          //한번에 넘길 슬라이드 아이템 개수
        //slidesPerRow: 1,            //보여질 행의 수 (한 줄, 두 줄 ... )
        //autoplay: true,             //슬라이드 자동 시작(true or false) ▶기본값 false
        autoplaySpeed: 3000,        //슬라이드 자동 넘기기 시간(1000ms = 1초) 곧, 슬라이드 하나당 머무는 시간
        //variableWidth: true,        //사진마다 width의 크기가 다른가?(true or false) ▶기본값 false
        //draggable: false,           //슬라이드 드래그 가능여부 (true or false) ▶기본값 true
        arrows: true,               //이전 다음 버튼 표시 여부(true or false) ▶기본값 true
        pauseOnFocus: true,         //마우스 클릭 시 슬라이드 멈춤 ▶기본값 true
        pauseOnHover: true,         //마우스 호버 시 슬라이드 멈춤 ▶기본값 true
        //pauseOnDotsHover: true,     //네이게이션버튼 호버 시 슬라이드 멈춤 ▶기본값 false
        //vertical: true,             //세로 방향 여부(true or false) ▶기본값 false
        //verticalSwiping: true,      //세로 방향 스와이프 여부(true or false) ▶기본값 false
        //accessibility: true,        //접근성 여부(true or false) 기본값 false
        //appendArrows: $('#arrows'), //좌우 화살표 변경
        //prevArrow: $('#prevArrow'), //이전 화살표만 변경
        //nextArrow: $('#nextArrow'), //다음 화살표만 변경
        initialSlide: 1,            //처음 보여질 슬라이드 번호 ▶기본값 0
        //centerMode: true,           //중앙에 슬라이드가 보여지는 모드 ▶기본값 false
        //centerPadding: '70px',      //중앙에 슬라이드가 보여지는 모드에서 패딩 값
        // fade: true,                 //크로스페이드 모션 사용 여부 ▶기본값 false
        speed: 2000,                //모션 시간 (얼마나 빠른속도로 넘어가는지)(1000ms = 1초) 곧, 슬라이드 사이에 넘어가는 속도
        //waitForAnimate: true,       //애니메이션 중에는 동작을 제한함 ▶기본값 true
        // ▼ 반응형 브레이크포인트 옵션
        // breakpoint: 숫자를 제작자의 환경에 맞게 조정함 ex) breakpoint: 1280
        // 각 브레이크포인트 내에 settings 안에 위의 모든 옵션을 다르게 적용할 수 있음
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    arrows:false
                }
            }
        ]
    };

    const handleSlideHover = (index) => {
        setHoveredIndex(index);
      };
    
      const handleSlideLeave = () => {
        setHoveredIndex(null);
      };

      const slideItems = [
        {
            image: '/image/somoim/highlight1.png',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        }, 
        {   
            image: '/image/main/dog1.jpg',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        },
        {
            image: '/image/somoim/highlight1.png',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        }, 
        {   
            image: '/image/main/dog1.jpg',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        },
        {
            image: '/image/somoim/highlight1.png',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        }, 
        {   
            image: '/image/main/dog1.jpg',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        },
        {
            image: '/image/somoim/highlight1.png',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        }, 
        {   
            image: '/image/main/dog1.jpg',
            description: '우리 동네 강아지 자랑해요',
            eventName: '반려견 친목모임'
        }
      ]

    return (
        <>
            {/* <Container className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}> */}
            <Container className='px-10 py-3' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='row'>
                    <div className='col-13 col-md-4' style={{ textAlign: 'left', alignSelf: 'flex-end' }}>모임 하이라이트</div>
                    <div className={`${styles.moimMainTitle} col-13 col-md-4 d-none d-md-block mb-2`}>애견 소모임</div>
                </div>
                <div className='row d-flex'>
                    <div>
                        <Slider {...settings}>
                        {slideItems.map((item, index) => (
                            <div
                            key={index}
                            className={`${styles.moimHighlight} col-md-6 col-lg-3
                                        ${hoveredIndex === index ? slideStyles.hovered : ''}`}
                            onMouseEnter={() => handleSlideHover(index)}
                            onMouseLeave={handleSlideLeave}
                            >
                                <Link to='/somoim/detail'>
                                    <img className={`${styles.moimHighlightImgDivImg} 
                                                    ${hoveredIndex === index ? slideStyles.hoveredImg : ''}
                                                    mb-4`} 
                                                        src={item.image} alt={`Slide ${index + 1}`}/>
                                    <div className={`${styles.highlightShortDetail}`}>
                                        {item.description} - {item.eventName}
                                    </div>
                                </Link>
                            </div>
                        ))}
                            {/* <div className={`${styles.moimHighlight} col-md-6 col-lg-3`}>
                                <img className={`${styles.moimHighlightImgDivImg} mb-4`} src='/image/somoim/highlight1.png' alt='somoimHighlight'/>
                                <div className={`${styles.highlightShortDetail}`}>
                                    우리 동네 강아지 자랑해요 - 반려견 친목모임
                                </div>
                            </div> */}
                        </Slider>
                    </div>
                </div>
            </Container>         
            <SomoimMainFilter></SomoimMainFilter>
            <SomoimMainList></SomoimMainList>
        </>
    );
};

export default SomoimMainBody;