import React from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import {Link} from 'react-router-dom';
import SomoimMainBody from './main/SomoimMainBody';

const SomoimMain = () => {
    return (
        <div>
            <Header></Header>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Link to="/user/userTest">가이드라인(필독)</Link>
            </div>

            <SomoimMainBody></SomoimMainBody>

            <div style={{ height: 50 }}></div>
            <Footer></Footer>
        </div>
    );
};

export default SomoimMain;