import React from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import SomoimMainBody from './main/SomoimMainBody';

const SomoimMain = () => {
    return (
        <div>
            <Header></Header>
            <div style={{ width: "100%", textAlign: "center", height: '1rem' }}>
            </div>

            <SomoimMainBody></SomoimMainBody>

            <div style={{ height: 50 }}></div>
            <Footer></Footer>
        </div>
    );
};

export default SomoimMain;