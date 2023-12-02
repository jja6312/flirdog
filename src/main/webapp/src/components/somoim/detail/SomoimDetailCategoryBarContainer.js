import React, { useState } from 'react';
import CategoryBtn from "./SomoimDetailCategoryBar";
import { useNavigate } from 'react-router-dom';
import data from './SomoimDetailMenuData';

const SomoimDetailCategoryBarContainer = ({somoimId}) => {
  const [selectedCategory, setSelectedCategory] = useState('모임 정보');
  const navigate = useNavigate();

  const handleCategoryClick = (categoryInfo) => {
    const [title, path] = categoryInfo;
    navigate(`/somoim/${path}/${somoimId}`, { somoimId: somoimId });
    setSelectedCategory(title);
  };

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
      </>
    );
};

export default SomoimDetailCategoryBarContainer;