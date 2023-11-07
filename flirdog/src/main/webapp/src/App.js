import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";

import "./css/reset.css";
import Test from "./components/user/Test";
import Mypage from "./components/mypage/Mypage";

const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/user/userTest" element={<Test />} />
          <Route path="/mypage/Mypage" element={<Mypage />} /> {/* [ 김찬영  2023-11-7 오후 04:42:39 ] */}
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
