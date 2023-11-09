import React from 'react';
import { Link } from 'react-router-dom';

const Myprofile = () => {
    return (
        <div>
            <h1>프로필화면입니다.</h1>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/Myprofile">프로필</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/Myarticle">내가 작성한 글</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/Mypoint">포인트</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/Mysetting">설정</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/mypage/Mypage_test">페이지테스트</Link>
            </div>
        </div>
    );
};

export default Myprofile;