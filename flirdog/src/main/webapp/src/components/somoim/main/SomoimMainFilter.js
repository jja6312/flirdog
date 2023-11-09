import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import SomoimMainCategoryVarContainer from './SomoimMainCategoryVarContainer';
import MoimMainCategoryBtn from './MoimMainCategoryBtn';

const SomoimMainFilter = () => {
    return (
        <div>
            <Container className="px-8" style={{border: '1px solid blue'}}>
                <div className="row mt-4 d-flex justify-content-center align-items-center">
                    <SomoimMainCategoryVarContainer></SomoimMainCategoryVarContainer>
                </div>
                <div className="row mt-4 d-flex justify-content-center align-items-center" >
                    <div className='col-1'>
                        <MoimMainCategoryBtn></MoimMainCategoryBtn>
                    </div>
                    <div className='col-3'>2</div>
                    <div className='col-6'>3</div>
                    <div className='col-2 d-flex justify-content-center'>
                        <Button variant="outline-secondary">모임 개설하기</Button>
                    </div>
                    -------------------------------


                    <div style={{width: 1332.53, height: 279.20, position: 'relative'}}>
                        <div style={{width: 728.05, height: 62, left: 391, top: 134.20, position: 'absolute'}}>
                            <div className="Rectangle29" style={{width: 728.05, height: 62, left: 0, top: 0, position: 'absolute', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 20, border: '1px black solid'}} />
                            <div className="Line2" style={{width: 57.46, height: 0, left: 138.74, top: 4.54, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: '0 0', border: '2px black solid'}}></div>
                            <div style={{width: 63.12, height: 27, left: 32.68, top: 16, position: 'absolute', color: '#625C5C', fontSize: 30, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>제 목</div>
                            <div className="Rectangle30" style={{width: 105.81, height: 43.10, left: 599.12, top: 10.58, position: 'absolute', background: '#635E5E', borderRadius: 20}} />
                            <div style={{width: 58.71, height: 27, left: 626.70, top: 16, position: 'absolute', color: 'white', fontSize: 28, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>검 색</div>
                        </div>

                        <div style={{width: 101, height: 32, left: 0, top: 174.20, position: 'absolute', textAlign: 'center', color: '#625C5C', fontSize: 18, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>카테고리</div>
                        <div className="IconMenu" style={{width: 52.14, height: 152.67, left: 28.86, top: 126.53, position: 'absolute'}}>
                            <div className="Vector" style={{width: 52.14, height: 81.39, left: 0, top: 71.28, position: 'absolute'}}></div>
                            <div className="Vector" style={{width: 39.11, height: 40.69, left: 6.52, top: 0, position: 'absolute', background: '#625C5C'}}></div>
                        </div>
                    </div>
                    -------------------------
                </div>
            </Container>
        </div>
    );
};

export default SomoimMainFilter;