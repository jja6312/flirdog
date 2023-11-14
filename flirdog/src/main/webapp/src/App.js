import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";
import DateList from "./components/date/DateList";

import "./css/reset.css";
import Test from "./components/user/Test";
import DateWrite from "./components/date/DateWrite";

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
import SomoimDetail from "./components/somoim/detail/SomoimDetail";
import SomoimData from "./components/somoim/detail/SomoimDetailMenuData";

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
import DateReadMore from "./components/date/DateReadMore";
import DateUpdate from "./components/date/DateUpdate";
import MydogProfileUpdate from "./components/mypage/1프로필/MydogProfileUpdate";
import MydogProfileRegister from "./components/mypage/1프로필/MydogProfileRegister";
import MypointRecharge from "./components/mypage/3포인트/MypointRecharge";
import MyarticleRepl from "./components/mypage/2내가작성한글/MyarticleRepl";
import MyarticleRounge from "./components/mypage/2내가작성한글/MyarticleRounge";


const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
          
          {/* //김찬영마이페이지================================================================= */}
          <Route path="/mypage/Mypoint" element={<Mypoint />} />
          <Route path="/mypage/Mysetting" element={<Mysetting />} />
          <Route path="/mypage/Myarticle" element={<Myarticle />} />
          <Route path="/mypage/MyprofileUpdate" element={<MyprofileUpdate />} />
          <Route path="/mypage/MypageMain" element={<MypageMain />} />
          <Route path="/mypage/MypageCategory" element={<MypageCategory />} />
          <Route path="/mypage/MypageCategoryWrapper" element={<MypageCategoryWrapper />} />
          <Route path="/mypage/MydogProfile" element={<MydogProfile />} />
          <Route path="/mypage/MydogProfile" element={<MydogProfile />} />
          <Route path="/mypage/MydogProfileUpdate" element={<MydogProfileUpdate />} />
          <Route path="/mypage/MypageHeader" element={<MypageHeader />} />
          <Route path="/mypage/MydogProfileRegister" element={<MydogProfileRegister />} />
          <Route path="/mypage/MypointRecharge" element={<MypointRecharge />} />
          <Route path="/mypage/MyarticleRepl" element={<MyarticleRepl />} />
          <Route path="/mypage/MyarticleRounge" element={<MyarticleRounge />} />
          {/* 김찬영마이페이지//================================================================= */}

                    <Route path="/" element={<Main></Main>} />

<<<<<<< HEAD
          {/* 소모임 페이지 */}
          <Route path='/somoim/' element={ <SomoimMain /> } />
          <Route path="/somoim/:subMenu" element={<SomoimDetail />} />

=======
                    {/* 매칭관련 */}
                    <Route path="/user/userTest" element={<Test />} />
                    <Route path="/date/dateList" element={<DateList />} />
                    <Route path="/date/dateWrite" element={<DateWrite />} />
                    <Route path="/date/dateReadMore" element={<DateReadMore />} />
                    <Route path="/date/dateUpdate" element={<DateUpdate/>} />


                    <Route path="/admin" element={<Admin />} />

          <Route path="/somoim" element={<SomoimMain />} />
>>>>>>> 358e4426bc3ffb60d6cec64d4707302b360407a3
          {/* 상품관리 */}
          <Route
            path="/admin/productUploadForm"
            element={<ProductUploadForm openLeftside="0"></ProductUploadForm>}
          />
          <Route
            path="/admin/productPopup"
            element={<ProductPopup></ProductPopup>}
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
          {/* 문의 조회/답변*/}
          <Route
            path="/admin/reviewListForm"
            element={<ReviewListForm openLeftside="3" />}
          />

          <Route path="product">
            <Route path="" element={<Product />} />
          </Route>
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
