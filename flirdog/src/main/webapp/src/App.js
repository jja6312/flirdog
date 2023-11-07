import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";

import "./css/reset.css";
import Test from "./components/user/Test";

import Mypage from "./components/mypage/Mypage";
import Admin from "./components/admin/Admin";
import ProductUploadForm from "./components/admin/1상품관리/ProductUploadForm";
import ProductListForm from "./components/admin/1상품관리/ProductListForm";
import UserListForm from "./components/admin/2회원관리/UserListForm";
import OrderListForm from "./components/admin/3주문관리/OrderListForm";
import OrderCheckForm from "./components/admin/3주문관리/OrderCheckForm";
import OrderShippingForm from "./components/admin/3주문관리/OrderShippingForm";
import ReviewListForm from "./components/admin/4리뷰관리/ReviewListForm";
const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/user/userTest" element={<Test />} />
          <Route path="/mypage/Mypage" element={<Mypage />} /> {/* [ 김찬영  2023-11-7 오후 04:42:39 ] */}
          <Route path="/admin" element={<Admin />} />
          {/* 상품관리 */}
          <Route
            path="/admin/productUploadForm"
            element={<ProductUploadForm openLeftside="0"></ProductUploadForm>}
          />
          <Route
            path="/admin/productListForm"
            element={<ProductListForm openLeftside="0" />}
          />
          {/* 회원관리 */}
          <Route
            path="/admin/userListForm"
            element={<UserListForm openLeftside="1" />}
          />
          {/* 주문관리 */}
          <Route
            path="/admin/orderListForm"
            element={<OrderListForm openLeftside="2" />}
          />
          <Route
            path="/admin/orderCheckForm"
            element={<OrderCheckForm openLeftside="2" />}
          />
          <Route
            path="/admin/orderShippingForm"
            element={<OrderShippingForm openLeftside="2" />}
          />
          {/* 리뷰 관리 */}
          <Route
            path="/admin/reviewListForm"
            element={<ReviewListForm openLeftside="3" />}
          />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
