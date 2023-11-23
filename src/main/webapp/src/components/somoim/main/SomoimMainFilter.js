import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import SomoimMainCategoryVarContainer from './SomoimMainCategoryVarContainer';
import MoimMainCategoryBtn from './MoimMainCategoryBtn';

import SomoimMainFilterCategory from '../../../css/somoim/main/SomoimMainFilter.module.css';

import {CustomMenu, CustomToggle} from './SomoimMainCategoryToggle';
import {Dropdown} from 'react-bootstrap';

const SomoimMainFilter = () => {
    const [categoryToggle, setCategoryToggle] = useState(false);

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

    return (
        <div>
            {/* <Container className="px-8" style={{border: '1px solid blue'}}> */}
            <Container className="px-8">
                <div className="row mt-4 d-flex justify-content-center align-items-center">
                    <SomoimMainCategoryVarContainer></SomoimMainCategoryVarContainer>
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
                                        <Dropdown.Item eventKey="1" active>전국</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">서울</Dropdown.Item>
                                        <Dropdown.Item eventKey="3" >인천</Dropdown.Item>
                                        <Dropdown.Item eventKey="4">경기</Dropdown.Item>
                                        <Dropdown.Item eventKey="5">대전</Dropdown.Item>
                                        <Dropdown.Item eventKey="6">대구</Dropdown.Item>
                                        <Dropdown.Item eventKey="7">부산</Dropdown.Item>
                                        <Dropdown.Item eventKey="8">광주</Dropdown.Item>
                                        <Dropdown.Item eventKey="9">울산</Dropdown.Item>
                                        <Dropdown.Item eventKey="10">세종</Dropdown.Item>
                                        <Dropdown.Item eventKey="11">강원</Dropdown.Item>
                                        <Dropdown.Item eventKey="12">충북</Dropdown.Item>
                                        <Dropdown.Item eventKey="13">충남</Dropdown.Item>
                                        <Dropdown.Item eventKey="14">전북</Dropdown.Item>
                                        <Dropdown.Item eventKey="15">전남</Dropdown.Item>
                                        <Dropdown.Item eventKey="16">경북</Dropdown.Item>
                                        <Dropdown.Item eventKey="17">경남</Dropdown.Item>
                                        <Dropdown.Item eventKey="18">제주</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </>
                    )}
                    <div className='col-md-8 col-9 d-flex justify-content-center'>
                        <MoimMainCategoryBtn></MoimMainCategoryBtn>
                    </div>
                    <div className='col-3 col-md-2 d-flex justify-content-center'>
                        <Button variant="outline-secondary" className='text-nowrap btn-sm w-100' href='/somoim/somoimNew'>모임 개설하기</Button>
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