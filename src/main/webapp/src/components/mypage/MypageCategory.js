import React from 'react';
import { Link } from 'react-router-dom';

const MypageCategory = () => {
    return (
        <div>
            <h1>마이페이지 카테고리 화면 입니다.</h1>
            <div style={{ width: "100%", textAlign: "center",fontSize:'50px' }}>
                <Link to="/mypage/MypageMain">페이지테스트</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/MypageHeader">마이페이지헤더</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/MydogProfileRegister2">이미지업로드테스트</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/MydogProfile2">이미지조회</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/WeatherAndStroll">날씨 api기능구현</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/FreeBoard">자유게시판메인</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/Kakaopay">카카오페이</Link>
            </div>
        </div>
    );
};

export default MypageCategory;