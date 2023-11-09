import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";
import DateList from "./components/date/DateList";

import "./css/reset.css";
import Test from "./components/user/Test";
import DateWrite from "./components/date/DateWrite";
const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/user/userTest" element={<Test />} />
          <Route path="/date/dateList" element={<DateList />} />
          <Route path="/date/dateWrite" element={<DateWrite />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
