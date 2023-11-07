import React from 'react';
import { Link } from 'react-router-dom';

const Myprofile = () => {
    return (
        <div>
            <h1>프로필화면입니다.</h1>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/myPage/Mydogprofile">개프로필1</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/myPage/Mydogprofile">개프로필2</Link>
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/myPage/Mydogprofile">개프로필3</Link>
            </div>
        </div>
    );
};

export default Myprofile;