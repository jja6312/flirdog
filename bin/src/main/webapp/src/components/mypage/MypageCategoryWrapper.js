import React from 'react';
import Header from '../main/Header';
import Footer from '../main/Footer';
import MypageCategory from './MypageCategory';

const MypageCategoryWrapper = () => {
    return (
        <div>
        <Header></Header>

        <MypageCategory></MypageCategory>

        <Footer></Footer>
        </div>
    );
};

export default MypageCategoryWrapper;