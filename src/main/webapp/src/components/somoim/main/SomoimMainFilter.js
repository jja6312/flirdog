import React, {useContext, useEffect, useState} from 'react';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import SomoimMainCategoryVarContainer from './SomoimMainCategoryVarContainer';
import MoimMainCategoryBtn from './MoimMainCategoryBtn';

import SomoimMainFilterCategory from '../../../css/somoim/main/SomoimMainFilter.module.css';

import {CustomMenu, CustomToggle} from './SomoimMainCategoryToggle';
import {Dropdown} from 'react-bootstrap';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const SomoimMainFilter = ({ onSelectLocation, onSearch }) => {
    const [categoryToggle, setCategoryToggle] = useState(false);
    const locations = ["전국", "서울", "인천", "경기", "대전", "대구", "부산", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];

    const { user } = useContext(UserContext); // 유저 컨텍스트
    const { id } = user;
    const navigate = useNavigate();
    useEffect(() => {
        console.log('소모임 리스트 id : ', id)
    },[id, user])

    const handleSearch  = (searchData) => {
        const { search } = searchData;
        console.log("Search term:", search);
        onSearch(searchData)
    }

    useEffect(() => {
        const handleResize = () => {
            setCategoryToggle(window.innerWidth >= 768);
        };

        // 초기화 및 리사이즈 이벤트 추가
        handleResize();
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시 리사이즈 이벤트 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //(() => { ... })()로 함수를 정의하고 즉시 실행
    const preLogin = () => {
        id ? navigate('/somoim/somoimNew') : (() => {
          alert('먼저 로그인 하세요');
          navigate('/login');
        })();
      }

    // const preLogin = () => {
    //     navigate('/somoim/somoimNew')
    // }

    return (
        <div>
            {/* <Container className="px-8" style={{border: '1px solid blue'}}> */}
            <Container className="px-8">
                <div className="row mt-4 d-flex justify-content-center align-items-center">
                    {/* <SomoimMainCategoryVarContainer></SomoimMainCategoryVarContainer> */}
                    <div style={{ width: '78%' ,height: '60px', borderBottom: '3px solid #F0AAAA' }}></div>
                </div>
                {/* <hr className='col-12' style={{ border:'4px solid pink', width:'70%', margin: '33px 202px 0px' }}/> */}
                <div className="row mt-4 d-flex justify-content-center align-items-center" >
                    {
                        categoryToggle && (
                        <>
                            <div className='col-2 d-flex justify-content-end category' style={SomoimMainFilterCategory}>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        지역선택
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as={CustomMenu} style={{ width: '210px'}}>
                                        {locations.map((location, index) => (
                                            <Dropdown.Item 
                                                key={index}
                                                eventkey={index} 
                                                onClick={() => onSelectLocation(location)}
                                                active={index === 0}
                                            >
                                                {location}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </>
                    )}
                    <div className='col-md-8 col-9 d-flex justify-content-center'>
                        <MoimMainCategoryBtn onSearch={ handleSearch } ></MoimMainCategoryBtn>
                    </div>
                    <div className='col-3 col-md-2 d-flex justify-content-center'>
                        <Button variant="outline-secondary" className='text-nowrap btn-sm w-100' onClick={preLogin}>모임 개설하기</Button>
                    </div>
                    
                    {/* <div className='col-md-12 col-4 d-flex justify-content-center' style={{width: 1332.53, height: 279.20, position: 'relative'}}>
                        <SomoimMainList></SomoimMainList>
                    </div> */}
                </div>
            </Container>
        </div>
    );
};

export default SomoimMainFilter;