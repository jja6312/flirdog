import React from 'react';
import MypageHeader from '../MypageHeader';
import Container from 'react-bootstrap/esm/Container';
import { Link } from "react-router-dom";
import Mypage from '../../../css/main/100마이페이지/mypage.module.css';
import MypageSubHeader3 from '../5공통/MypageSubHeader3';


const MypointRecharge = () => {
    return (
        <div>
            <MypageHeader/>
            <MypageSubHeader3/>
            <h1>포인트 충전 화면입니다. 구상중입니다.</h1>
            <h5>포인트는 쿠폰으로 충전하기도 하고, 결제로 충전하기도 한다. 이벤트 참여로 포인트도 발급한다.</h5>
        </div>
    );
};

export default MypointRecharge;