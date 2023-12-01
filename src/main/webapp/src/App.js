import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Main from "./components/main/Main";

import "./css/reset.css";
import Test from "./components/user/Test";
import DateList from "./components/date/DateList";
import DateWrite from "./components/date/DateWrite";
import DateReadMore from "./components/date/DateReadMore";
import DateUpdate from "./components/date/DateUpdate";

import Admin from "./components/admin/Admin";
import ProductUploadForm from "./components/admin/1상품관리/ProductUploadForm";
import ProductListForm from "./components/admin/1상품관리/ProductListForm";
import ProductPopup from "./components/admin/1상품관리/1상품분류정보/ProductPopup";
import UserListForm from "./components/admin/2회원관리/UserListForm";
import OrderListForm from "./components/admin/3주문관리/OrderListForm";
import OrderCheckForm from "./components/admin/3주문관리/OrderCheckForm";
import OrderShippingForm from "./components/admin/3주문관리/OrderShippingForm";
import ReviewListForm from "./components/admin/4리뷰관리/ReviewListForm";

import SomoimMain from "./components/somoim/SomoimMain";

import SomoimNew from "./components/somoim/SomoimNew";
import SomoimDetail from "./components/somoim/detail/SomoimDetail";

import MypageMain from "./components/mypage/MypageMain";
import Myarticle from "./components/mypage/2내가작성한글/Myarticle";
import MypageCategory from "./components/mypage/MypageCategory";
import MypageCategoryWrapper from "./components/mypage/MypageCategoryWrapper";
import Mypoint from "./components/mypage/3포인트/Mypoint";
import Mysetting from "./components/mypage/4설정/Mysetting";
import MyprofileUpdate from "./components/mypage/1프로필/Myprofileupdate";
import MydogProfile from "./components/mypage/1프로필/MydogProfile";
import MypageHeader from "./components/mypage/MypageHeader";
import Product from "./components/product/Product";
import MydogProfileUpdate from "./components/mypage/1프로필/MydogProfileUpdate";
import MydogProfileRegister from "./components/mypage/1프로필/MydogProfileRegister";
import MypointRecharge from "./components/mypage/3포인트/MypointRecharge";
import MyarticleRepl from "./components/mypage/2내가작성한글/MyarticleRepl";
import MyarticleRounge from "./components/mypage/2내가작성한글/MyarticleRounge";
import ProductDetail from "./components/product/ProductDetail";
import ProductEditForm from "./components/admin/1상품관리/ProductEditForm";
import UserEditForm from "./components/admin/2회원관리/UserEditForm";
import Login from "./components/user/Login";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* //김찬영마이페이지================================================================= */}
          <Route path="/mypage/Mypoint" element={<Mypoint />} />
          <Route path="/mypage/Mysetting" element={<Mysetting />} />
          <Route path="/mypage/Myarticle" element={<Myarticle />} />
          <Route path="/mypage/MyprofileUpdate" element={<MyprofileUpdate />} />
          <Route path="/mypage/MypageMain" element={<MypageMain />} />
          <Route path="/mypage/MypageCategory" element={<MypageCategory />} />
          <Route
            path="/mypage/MypageCategoryWrapper"
            element={<MypageCategoryWrapper />}
          />
          <Route path="/mypage/MydogProfile" element={<MydogProfile />} />
          <Route path="/mypage/MydogProfile" element={<MydogProfile />} />
          <Route
            path="/mypage/MydogProfileUpdate"
            element={<MydogProfileUpdate />}
          />
          <Route path="/mypage/MypageHeader" element={<MypageHeader />} />
          <Route
            path="/mypage/MydogProfileRegister"
            element={<MydogProfileRegister />}
          />
          <Route path="/mypage/MypointRecharge" element={<MypointRecharge />} />
          <Route path="/mypage/MyarticleRepl" element={<MyarticleRepl />} />
          <Route path="/mypage/MyarticleRounge" element={<MyarticleRounge />} />
          {/* 김찬영마이페이지//================================================================= */}

            {/* 매칭페이지 */}
            <Route path="/" element={<Main></Main>} />
            <Route path="/user/userTest" element={<Test />} />
            <Route path="/date/dateList" element={<DateList />} />
            <Route path="/date/dateWrite" element={<DateWrite />} />
            <Route path="/date/dateUpdate">
              <Route path=':seq' element={<DateUpdate />}/>
            </Route>
            <Route path="/date/dateReadMore">
              <Route path=':seq' element={<DateReadMore />}/>
            </Route>

            <Route path="/admin" element={<Admin />} />

            {/* 소모임 페이지!! */}
            <Route path="/somoim" element={<SomoimMain />} />
            <Route path="/somoim/somoimNew" element={<SomoimNew />} />
            <Route
              path="/somoim/:subMenu/:somoimId"
              element={<SomoimDetail />}
            />

          <Route path="product">
            <Route path="" element={<Product />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </>
      </UserProvider>
    </BrowserRouter>
  );
};
export default App;
