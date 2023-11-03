import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";

import "./css/reset.css";
import Test from "./components/user/Test";
const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/user/userTest" element={<Test />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
