import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";

import "./css/reset.css";
import Test from "./components/user/Test";
import Admin from "./components/admin/Admin";
import ProductUpload from "./components/admin/ProductUpload";
const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/user/userTest" element={<Test />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/productUpload"
            element={<ProductUpload openLeftside="0"></ProductUpload>}
          />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
