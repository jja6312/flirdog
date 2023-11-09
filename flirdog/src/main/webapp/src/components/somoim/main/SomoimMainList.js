import React from 'react';
import Container from 'react-bootstrap/esm/Container';

const SomoimMainList = () => {
    return (
        <div>
            <Container className="px-8">
            <div className="mt-2 mb-2 d-flex justify-content-center align-items-center" style={{border: '1px solid red'}}>
                소모임 목록 페이지 입니다.
            </div>
            </Container>
        </div>
    );
};

export default SomoimMainList;