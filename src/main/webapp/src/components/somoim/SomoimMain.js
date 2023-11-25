import React, { useState } from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import SomoimMainBody from './main/SomoimMainBody';

const SomoimMain = () => {
    // const [login, setLogin] = useState({
    //     id: 1,
    //     email: 'aaa@aaa.aaa',
    //     passwd: '1111'
    // })

    return (
        <div>
            <Header></Header>
            <div style={{ width: "100%", textAlign: "center", height: '1rem' }}>
            </div>

            {/* <SomoimMainBody login={login} ></SomoimMainBody> */}
            <SomoimMainBody></SomoimMainBody>

            <div style={{ height: 50 }}></div>
            <Footer></Footer>
        </div>
    );
};

export default SomoimMain;