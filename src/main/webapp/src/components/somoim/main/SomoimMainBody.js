import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Slider from "react-slick";
import '../../../css/somoim/detail/slick.css';
import '../../../css/somoim/detail/slick-theme.css';
import SomoimMainList from './SomoimMainList';
import SomoimMainFilter from './SomoimMainFilter';

import styles from '../../../css/somoim/main/somoimHighlightCard.module.css'
import slideStyles from '../../../css/somoim/main/SomoimSliderStyles.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SomoimMainBody = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null); // 캐러셀 호버 이벤트
    const { somoimId } = useParams();
    const [selectedLocation, setSelectedLocation] = useState(null); // 필터링
    const [searchList, setSearchList] = useState([]); // 검색

    const [somoimPhotoListAll, setSomoimPhotoListAll] = useState([{}]); // 전체 소모임 사진첩 목록
    const [firstPhotoArray, setFirstPhotoArray] = useState([]); // 첫번째 이미지만 추출한 배열
    const {createdAt, modifiedAt, id, photoTitle, photoContent, 
        photoLink, photoLike, hit, somoimPhoto, somoim} = somoimPhotoListAll
    console.log('somoim', somoim)

    const handleSelectLocation = (location) => {
        setSelectedLocation(location);
    };

    const handleSearch = (searchData) => {
        setSearchList({searchData})
        //console.log('somoimMainBody searchData :' + JSON.stringify(searchData));
        const { search } = searchData;
        console.log('somoimMainBody search:', search);
    }

    const settings = {
        dots: true,                 //슬라이더 아래에 도트 네비게이션 버튼 표시 여부(true or false) ▶기본값 false
        infinite: true,             //무한반복(true or false) 기본값 true
        slidesToShow: 4,            //한번에 보여줄 슬라이드 아이템 개수
        slidesToScroll: 4,          //한번에 넘길 슬라이드 아이템 개수
        autoplay: true,             //슬라이드 자동 시작(true or false) ▶기본값 false
        autoplaySpeed: 3000,        //슬라이드 자동 넘기기 시간(1000ms = 1초) 곧, 슬라이드 하나당 머무는 시간
        arrows: true,               //이전 다음 버튼 표시 여부(true or false) ▶기본값 true
        pauseOnFocus: true,         //마우스 클릭 시 슬라이드 멈춤 ▶기본값 true
        pauseOnHover: true,         //마우스 호버 시 슬라이드 멈춤 ▶기본값 true
        initialSlide: 1,            //처음 보여질 슬라이드 번호 ▶기본값 0
        speed: 2000,                //모션 시간 (얼마나 빠른속도로 넘어가는지)(1000ms = 1초) 곧, 슬라이드 사이에 넘어가는 속도
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
      
    useEffect(() => {
        // 소모임 전체 사진첩 조회
        const photoAll = async () => {
            try {
            const response = await axios.get(`/somoim/somoimPhotoListAll`);
            console.log('전체 소모임 사진첩 목록 : ', response.data);
        
            setSomoimPhotoListAll(response.data);
    
            } catch (error) {
                console.error(error);
            }//try-cath문
        };

        photoAll();
    }, [])

      // somoimPhotoListAll이 변경될 때마다 firstPhotoArray 업데이트
    useEffect(() => {
        const newFirstPhotoArray = [];

        if (Array.isArray(somoimPhotoListAll) && somoimPhotoListAll.length > 0) {
            somoimPhotoListAll.forEach((item) => {
                if (item.somoimPhoto) {
                    const photoArray = item.somoimPhoto.replace(/"/g, '').split(',');
                    // 각 항목에 대해 첫 번째 사진 선택
                    if (photoArray.length > 0) {
                        const firstPhoto = photoArray[0];
                        newFirstPhotoArray.push(firstPhoto);
                        console.log('소모임 메인 캐러셀용 이미지들 : ', firstPhoto)
                    } else {
                        console.log('somoimPhotoList is not a valid array');
                    }
                } else {
                    console.log('somoimPhotoList is not available');
                }
            });

            setFirstPhotoArray(newFirstPhotoArray);
            console.log('firstPhotoArray :', newFirstPhotoArray);
        } else {
            console.log('somoimPhotoList is not a valid array or is empty');
        }
    }, [somoimPhotoListAll]);
      
    const slideItems = somoimPhotoListAll.map((item, index) => {
        const firstPhoto = item.somoimPhoto ? item.somoimPhoto.replace(/"/g, '').split(',')[0] : '';
        return {
            image: `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${firstPhoto}`,
            description: item.photoTitle,
            eventName: item.somoim ? item.somoim.somoimName : '',
            somoimId: item.somoim ? item.somoim.id : null,
            photoId: item.id,
        };
    });

    // 슬라이드 아이템이 설정한 슬라이드 수를 충족하지 못하면 더미 슬라이드를 추가
    const totalSlides = Math.max(settings.slidesToShow, slideItems.length);
    const dummySlides = Array.from({ length: totalSlides - slideItems.length }, (_, index) => index);

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
                                {/* <Link to={`/somoim/detailMain/${somoimPhotoListAll[index].somoim.id}`}> */}
                                {/* <Link to={item.somoimId ? `/somoim/detailMain/${item.somoimId}` : '#'}> */}
                                {/* <Link to={item.somoimId ? `/somoim/detailPhoto/${item.somoimId}` : '#'}> */}
                                <Link to={`/somoim/detailPhoto/${item.somoimId}?photoId=${item.photoId}`}>
                                    <img className={`${styles.moimHighlightImgDivImg} 
                                                    ${hoveredIndex === index ? slideStyles.hoveredImg : ''}
                                                    mb-4`} 
                                        //src={item.image} alt={`Slide ${index + 1}`}/>
                                        src={item.image} 
                                        alt={`Slide ${index + 1}`}/>
                                    <div className={`${styles.highlightShortDetail}`}>
                                        {item.description} - {item.eventName}
                                    </div>
                                </Link>
                            </div>
                        ))}
                        {dummySlides.map((_, index) => (
                            <div key={index} className={`${styles.moimHighlight} col-md-6 col-lg-3`}></div>
                        ))}
                        </Slider>
                    </div>
                </div>
            </Container>         
            <SomoimMainFilter onSelectLocation={handleSelectLocation} onSearch={ handleSearch } ></SomoimMainFilter>
            {/* <SomoimMainList></SomoimMainList> */}
            <SomoimMainList selectedLocation={selectedLocation} searchList={ searchList } 
                setSelectedLocation={setSelectedLocation} setSearchList={setSearchList}
                 />
        </>
    );
};

export default SomoimMainBody;