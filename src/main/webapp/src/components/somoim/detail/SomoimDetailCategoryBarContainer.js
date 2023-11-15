import React, { useState } from 'react';
import CategoryBtn from "./SomoimDetailCategoryBar";
import { useNavigate } from 'react-router-dom';
import data from './SomoimDetailMenuData';

const SomoimDetailCategoryBarContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState('모임 정보');
  const navigate = useNavigate();
  //const location = useLocation();

  const handleCategoryClick = (categoryInfo) => {
    const [title, path] = categoryInfo;
    navigate(`/somoim/${path}`);
    setSelectedCategory(title);
  };

  //const showDetailMain = location.pathname === '/somoim/detailMain' || selectedCategory === '모임 정보';

    return (
        <>
          {
            data.map((item, index) => {return (
                <CategoryBtn
                  key={index}
                  isSelect={selectedCategory === item.title ? "selected" : "notSelected"}
                  text={item.title}
                  onClick={() => handleCategoryClick([item.title, item.path])}
                  size="col-3 col-lg-2"
                  height="40px"
                  fontSize="1.2rem"
                  >
                </CategoryBtn>
              )
            })
          }
          {/* {showDetailMain && <SomoimDetailMain />} */}
          {/* <CategoryBtn
            isSelect={selectedCategory === "모임 정보" ? "selected" : "notSelected"}
            text="모임 정보"
            onClick={() => handleCategoryClick("모임 정보")}
            size="col-2 col-lg-2"
            height="40px"
            fontSize="1.2rem"
          />
          <CategoryBtn
            isSelect={selectedCategory === "게시판" ? "selected" : "notSelected"}
            text="게시판"
            onClick={() => handleCategoryClick("게시판")}
            size="col-2 col-lg-2"
            height="40px"
            fontSize="1.2rem"
          />
          <CategoryBtn
            isSelect={selectedCategory === "사진첩" ? "selected" : "notSelected"}
            text="사진첩"
            onClick={() => handleCategoryClick("사진첩")}
            size="col-2 col-lg-2"
            height="40px"
            fontSize="1.2rem"
          />
          <CategoryBtn
            isSelect={selectedCategory === "모임 일정" ? "selected" : "notSelected"}
            text="모임 일정"
            onClick={() => handleCategoryClick("모임 일정")}
            size="col-2 col-lg-2"
            height="40px"
            fontSize="1.2rem"
          />
          <CategoryBtn
            isSelect={selectedCategory === "모임 멤버(9)" ? "selected" : "notSelected"}
            text="모임 멤버(9)"
            onClick={() => handleCategoryClick("모임 멤버(9)")}
            size="col-2 col-lg-2"
            height="40px"
            fontSize="1.2rem"
          /> */}
      </>
    );
};

export default SomoimDetailCategoryBarContainer;