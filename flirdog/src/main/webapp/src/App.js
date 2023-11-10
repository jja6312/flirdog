import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/main/Main";
import DateList from "./components/date/DateList";

import "./css/reset.css";
import Test from "./components/user/Test";
import DateWrite from "./components/date/DateWrite";
<<<<<<< HEAD

import Admin from "./components/admin/Admin";
import UserListForm from "./components/admin/2회원관리/UserListForm";
import OrderListForm from "./components/admin/3주문관리/OrderListForm";
import OrderCheckForm from "./components/admin/3주문관리/OrderCheckForm";
import OrderShippingForm from "./components/admin/3주문관리/OrderShippingForm";
import ReviewListForm from "./components/admin/4리뷰관리/ReviewListForm";
<<<<<<< HEAD
import Product from "./components/product/Product";
<<<<<<< HEAD
import MypageMain from "./components/mypage/MypageMain";
import Myarticle from "./components/mypage/2내가작성한글/Myarticle";
import MypageCategory from "./components/mypage/MypageCategory";
import MypageCategoryWrapper from "./components/mypage/MypageCategoryWrapper";
import Mypoint from "./components/mypage/3포인트/Mypoint";
import Mysetting from "./components/mypage/4설정/Mysetting";
import MyprofileUpdate from "./components/mypage/1프로필/Myprofileupdate";
import MydogProfile from "./components/mypage/1프로필/MydogProfile";
import MypageHeader from "./components/mypage/MypageHeader";

<<<<<<< HEAD
const App = () => {
    return (
        <BrowserRouter>
            <>
                {/* 화면에 보이는 영역 */}
                <Routes>
                    {/* //김찬영마이페이지================================================================= */}
                    <Route path="/mypage/Mypoint" element={<Mypoint/>}/>
                    <Route path="/mypage/Mysetting" element={<Mysetting/>}/>
                    <Route path="/mypage/Myarticle" element={<Myarticle/>}/>
                    <Route path="/mypage/MyprofileUpdate" element={<MyprofileUpdate/>}/>
                    <Route path="/mypage/MypageMain" element={<MypageMain/>}/>
                    <Route path="/mypage/MypageCategory" element={<MypageCategory/>}/>
                    <Route path="/mypage/MypageCategoryWrapper" element={<MypageCategoryWrapper/>}/>
                    <Route path="/mypage/MydogProfile" element={<MydogProfile/>}/>
                    <Route path="/mypage/MypageHeader" element={<MypageHeader/>}/>
                    {/* 김찬영마이페이지//================================================================= */}
=======

import MypageMain from "./components/mypage/MypageMain";
import Myarticle from "./components/mypage/2내가작성한글/Myarticle";
import MypageCategory from "./components/mypage/MypageCategory";
import MypageCategoryWrapper from "./components/mypage/MypageCategoryWrapper";
import Mypoint from "./components/mypage/3포인트/Mypoint";
import Mysetting from "./components/mypage/4설정/Mysetting";
import MyprofileUpdate from "./components/mypage/1프로필/Myprofileupdate";
import MydogProfile from "./components/mypage/1프로필/MydogProfile";
import MypageHeader from "./components/mypage/MypageHeader";
>>>>>>> 7b0ef7b (마이페이지 간소화)

                    <Route path="/" element={<Main></Main>}/>
                    <Route path="/user/userTest" element={<Test/>}/>
                    <Route path="/mypage/Mypage" element={<Mypage/>}/>{" "}
                    {/* [ 김찬영  2023-11-7 오후 04:42:39 ] */}
                    <Route path="/date/dateList" element={<DateList/>}/>
                    <Route path="/date/dateWrite" element={<DateWrite/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    {/* 상품관리 */}
                    <Route
                        path="/admin/productUploadForm"
                        element={<ProductUploadForm openLeftside="0"></ProductUploadForm>}
                    />
                    <Route
                        path="/admin/productListForm"
                        element={<ProductListForm openLeftside="0"/>}
                    />
                    {/* 회원관리 */}
                    <Route
                        path="/admin/userListForm"
                        element={<UserListForm openLeftside="1"/>}
                    />
                    {/* 주문관리 */}
                    <Route
                        path="/admin/orderListForm"
                        element={<OrderListForm openLeftside="2"/>}
                    />
                    <Route
                        path="/admin/orderCheckForm"
                        element={<OrderCheckForm openLeftside="2"/>}
                    />
                    <Route
                        path="/admin/orderShippingForm"
                        element={<OrderShippingForm openLeftside="2"/>}
                    />
                    {/* 리뷰 관리 */}
                    <Route
                        path="/admin/reviewListForm"
                        element={<ReviewListForm openLeftside="3"/>}
                    />
                    <Route path="product">
                        <Route path="" element={<Product/>}/>
                    </Route>
                </Routes>
            </>
        </BrowserRouter>
    );
=======
=======
>>>>>>> 508804b (스타일.매칭페이지/글작성)
=======
import SomoimMain from "./components/somoim/SomoimMain";
>>>>>>> 251556d (소모임 메인페이지 css 꾸미기)
const App = () => {
  return (
    <BrowserRouter>
      <>
        {/* 화면에 보이는 영역 */}
        <Routes>
<<<<<<< HEAD
=======
          {/* //김찬영마이페이지================================================================= */}
          <Route path="/mypage/Mypoint" element={<Mypoint />} />
          <Route path="/mypage/Mysetting" element={<Mysetting />} />
          <Route path="/mypage/Myarticle" element={<Myarticle />} />
          <Route path="/mypage/MyprofileUpdate" element={<MyprofileUpdate />} />
          <Route path="/mypage/MypageMain" element={<MypageMain />} />
          <Route path="/mypage/MypageCategory" element={<MypageCategory />} />
          <Route path="/mypage/MypageCategoryWrapper" element={<MypageCategoryWrapper />} />
          <Route path="/mypage/MydogProfile" element={<MydogProfile />} />
          <Route path="/mypage/MypageHeader" element={<MypageHeader />} />
          {/* 김찬영마이페이지//================================================================= */}

>>>>>>> 7b0ef7b (마이페이지 간소화)
          <Route path="/" element={<Main></Main>} />
          <Route path="/user/userTest" element={<Test />} />
<<<<<<< HEAD
          <Route path="/mypage/Mypage" element={<Mypage />} />{" "}
          {/* [ 김찬영  2023-11-7 오후 04:42:39 ] */}
          <Route path="/admin" element={<Admin />} />

          <Route path='/somoim' element={ <SomoimMain /> } />
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
          <Route path="product" >
              <Route path="" element={<Product />} />
          </Route>
=======
          <Route path="/date/dateList" element={<DateList />} />
<<<<<<< HEAD
>>>>>>> e744f0e (스타일:매칭페이지 초기설정)
=======
          <Route path="/date/dateWrite" element={<DateWrite />} />
>>>>>>> 508804b (스타일.매칭페이지/글작성)
        </Routes>
      </>
    </BrowserRouter>
  );
>>>>>>> f63edee (스프링 기본 세팅)
};

export default App;
