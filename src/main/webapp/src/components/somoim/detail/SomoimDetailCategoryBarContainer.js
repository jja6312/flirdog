import React, { useEffect, useState } from 'react';
import CategoryBtn from "./SomoimDetailCategoryBar";
import { useNavigate } from 'react-router-dom';
import data from './SomoimDetailMenuData';
import axios from 'axios';

const SomoimDetailCategoryBarContainer = ({somoimId, user}) => {
  const [selectedCategory, setSelectedCategory] = useState('모임 정보');
  const [memberCount, setMemberCount] = useState(1);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryInfo) => {
    const [title, path] = categoryInfo;
    //navigate(`/somoim/${path}/${somoimId}`, { somoimId: somoimId });
    navigate(`/somoim/${path}/${somoimId}`, { state: { user, somoimId } });
    setSelectedCategory(title);
  };

  // 멤버 수를 가져오는 함수
  useEffect(() => {
    getMemberCount(somoimId);
  },[somoimId]);

  const getMemberCount = async (somoimId) => {
    console.log('과연 소모임아이디는 찍히는가? ', somoimId)
    try {
      if(somoimId) {
        await axios.get(`/somoim/getMemberCount?somoimId=${somoimId}`)
            .then(res => {
              setMemberCount(res.data)
              console.log('현재 소모임의 회원수 : ', res.data)
            })
            .catch(e => console.log(e));
      }
    } catch (error) {
      console.error('멤버 수를 가져오는 중 오류 발생:', error);
      return 1; // 오류가 발생하면 0으로 처리하거나 다른 기본값 사용
    }
  };

    return (
        <>
          {
            data.map((item, index) => {return (
                <CategoryBtn
                  key={index}
                  isSelect={selectedCategory === item.title ? "selected" : "notSelected"}
                  // text={item.title + `(${memberCount})`}
                  text={`${item.title}${item.title === '모임 멤버' ? `(${memberCount})` : ''}`}
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