import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import SomoimMainList from './SomoimMainList';
import SomoimMainFilter from './SomoimMainFilter';

import styles from '../../../css/somoim/main/somoimHighlightCard.module.css'

const SomoimMainBody = () => {
    return (
        <div>
            <Container className='px-10 py-3' style={{border: '1px solid blue', display: 'flex', flexDirection: 'column' }}>
                <div className='row'>
                    <div className='col-13 col-md-4' style={{ textAlign: 'left', alignSelf: 'flex-end' }}>모임 하이라이트</div>
                    <div className={`${styles.moimMainTitle} col-13 col-md-4 d-none d-md-block mb-2`}>애견 소모임</div>
                </div>
                <div className='row'>
                    <div className={`${styles.moimHighlight} col-md-6 col-lg-3`}>
                        <img className={`${styles.moimHighlightImgDivImg} mb-4`} src='/image/somoim/highlight1.png' alt='somoimHighlight'/>
                        <div className={`${styles.highlightShortDetail}`} >
                                우리 동네 강아지 자랑해요 - 반려견 친목모임
                        </div>
                    </div>
                    <div className={`${styles.moimHighlight} col-md-6 col-lg-3`}>
                        <img className={`${styles.moimHighlightImgDivImg} mb-4`} src='/image/main/dog1.jpg' alt='somoimHighlight' />
                        <div className={`${styles.highlightShortDetail}`}>
                                우리 동네 강아지 자랑해요 - 반려견 친목모임
                        </div>
                    </div>
                    <div className={`${styles.moimHighlight} col-md-6 col-lg-3`}>
                        <img className={`${styles.moimHighlightImgDivImg} mb-4`} src='/image/somoim/highlight1.png' alt='somoimHighlight' />
                        <div className={`${styles.highlightShortDetail}`}>
                                우리 동네 강아지 자랑해요 - 반려견 친목모임
                        </div>
                    </div>
                    <div className={`${styles.moimHighlight} col-md-6 col-lg-3`}>
                        <img className={`${styles.moimHighlightImgDivImg} mb-4`} src='/image/somoim/highlight1.png' alt='somoimHighlight' />
                        <div className={`${styles.highlightShortDetail}`}>
                                우리 동네 강아지 자랑해요 - 반려견 친목모임
                        </div>
                    </div>
                </div>
            </Container>         
            <SomoimMainFilter></SomoimMainFilter>
            <SomoimMainList></SomoimMainList>
        </div>
    );
};

export default SomoimMainBody;