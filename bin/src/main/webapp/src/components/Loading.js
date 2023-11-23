import React from 'react';
import Loading from '../css/Loading.module.css';

const LoadingComponent = () => {
    return (
        <div className={Loading.loadingDiv}>
            <img src="/image/main/main1.png" alt="로딩 중" />
        </div>
    );
};

export default LoadingComponent;