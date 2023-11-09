import React from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import Myprofile from './Myprofile';

const Mypage = () => {
    return (
        <div>
        <Header></Header>
        
        <Myprofile></Myprofile>

        <Footer></Footer>
        </div>
    );
};

export default Mypage;