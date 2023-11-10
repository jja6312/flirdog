import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./css/reset.css";
import Mypage from './Mypage';
import Myprofile from './Myprofile';
import Mydogprofile from './Mydogprofile';

const MypageRouter = () => {
    return (
      <BrowserRouter>
        <>
            <Routes>
                <Route path='/myPage/MyPage' element={<Mypage />}/>
                <Route path='/myPage/Myprofile' element={<Myprofile />}/>
                <Route path='/myPage/Mydogprofile' element={<Mydogprofile/>}/>
            </Routes>
        </>
      </BrowserRouter>
        );
};

export default MypageRouter;