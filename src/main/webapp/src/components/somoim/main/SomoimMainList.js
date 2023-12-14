import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
//import { UserContext } from '../../../contexts/UserContext';

import styles from '../../../css/somoim/main/SomoimMainList.module.css';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { UserContext } from '../../../contexts/UserContext';

const SomoimMainList = ({ selectedLocation, searchList, item }) => {
    const [somoimList, setSomoimList] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const imageUrl = 'https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/somoim/';
    //const {id, email, passwd} = login; // 로그인
    const navigate = useNavigate();

    const { user } = useContext(UserContext); // 유저 컨텍스트
    const { id, name } = user

    useEffect(() => {
        setFilteredResults(somoimList);
      }, [somoimList]);

    const getMemberCount = async (somoimId) => {
      try {
          const response = await axios.get(`/somoim/getMemberCount?somoimId=${somoimId}`);
          return response.data;
      } catch (error) {
          console.error(`멤버 수를 가져오는 중 오류 발생 (소모임 ID: ${somoimId}):`, error);
          return 0;
      }
  };
    
    // 소모임 전체리스트 가져오기
    useEffect(() => {
        const filterList = async () => {
            if (!user || !user.id) {
                // user가 비어있거나 id가 없으면 데이터를 가져오지 않음
                return;
            }
            
            try {
                const response = await axios.get('/somoim/getSomoimList');
                console.log(response.data);
                //console.log('소모임 리스트에서의 소모임방번호 : ', response.data && response.data?.id)

                const updatedSomoimList = await Promise.all(
                    response.data.map(async (somoim) => {
                        const memberCountNow = await getMemberCount(somoim.id);
                        return { ...somoim, memberCountNow };
                    })
                );

                setSomoimList(updatedSomoimList);
                console.log('소모임 리스트에서의 유저 : ', user)
              } catch (error) {
                console.error('Somoim 목록을 가져오는 중 오류 발생:', error);
              }
        }
        
        filterList();
        
    },[user])

    useEffect(() => {
        // searchList가 변경되면 isSearching을 true로, 그렇지 않으면 false로 설정
        setIsSearching(searchList && searchList.searchData && searchList.searchData.search !== '');
      }, [searchList]);

      
      useEffect(() => {  // 필터기능
        let filteredList = [...somoimList];
    
        if (isSearching) {
          const searchValue = (searchList && searchList.searchData && searchList.searchData.search) || '';
          filteredList = filteredList.filter(item => item.somoimName.toLowerCase().includes(searchValue.toLowerCase()));
        } else {
          if (!selectedLocation || selectedLocation === '전국') {
            setFilteredResults(filteredList);
            return;
          }
          filteredList = filteredList.filter(item => item.location === selectedLocation);
        }
    
        setFilteredResults(filteredList);
        
      }, [selectedLocation, isSearching, somoimList, searchList]);

      useEffect(()=> {   // 필터, 검색 기능 스위칭
        setIsSearching(false)
      }, [selectedLocation])

      const handleButtonClick = (item) => {
        // 사용자 정보 업데이트
        //updateUser({ ...login, selectedSomoim: item });
    
        // 상세 페이지로 이동
        navigate(`/somoim/detailMain/${item.id}`, { user });
      };

    //날짜 표현
    const createdAtDate =moment(somoimList.createdAt).format('YYYY년 MM월 DD일');
    //const createdAtTime =moment(somoimList.createdAt).format('HH:mm');



    return (
        <>
            {somoimList.length === 0 ? (
                <p style={{ display:'flex', justifyContent: 'center' }}>로딩 중...</p>
            ) : (
                
                    <Container className="px-8 mt-5 col-12">
                        {/* 이름 : {name} 아이디 : {id} */}
                        <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
                    {
                        filteredResults.map((item, index) => {return (
                        // filteredResults.reverse().map((item, index) => {return ( // 순서 거꾸로 정렬 (현재는 서버단에서 수행중)
                        <div key={index} onClick={() => handleButtonClick(item)} style={{ cursor: 'pointer' }}>
                            <>
                                <Card className={`${styles.box} mb-5 h-80`} border="danger" bg="white">
                                        <Card.Header>※ 소모임 목록 번호 : {index}</Card.Header>
                                        {/* <a href={`/somoim/detailMain/${item.id}`} className={` ${styles.link}`}> */}
                                        <Card.Img 
                                            className={`${styles.box}`}
                                            variant="top" 
                                            src= { item.introducePhotoUUID ? imageUrl + item.introducePhotoUUID : "/image/main/main1.png" }
                                            style={{ width: 'auto', height: '11rem', objectFit: 'cover' }} />
                                            {/* </a> */}
                                        <Card.Body>
                                            <Card.Title>{ item.somoimName }</Card.Title>
                                            <Card.Subtitle className="mb-3 text-muted">- { item.introduceSub }</Card.Subtitle>
                                            <Card.Text as="div" className='mb-2' style={{ lineHeight: '1.7rem' }}>
                                                <div>위치 : {item.address} </div>
                                                <div>대상 : {item.target}</div>
                                                <div>멤버 : 총 {item.memberCountNow}명 | 모집멤버 : {item.memberCount} 명</div>
                                                <div>⩢ {item.location}</div>
                                            </Card.Text>
                                            <Card.Link onClick={() => handleButtonClick(item)} >
                                                <Button className={`${styles.boxBtn}`} variant="primary">상세 보기
                                                </Button>
                                                </Card.Link>   
                                        </Card.Body>
                                        <Card.Footer className="text-muted">개설일 : { createdAtDate }</Card.Footer>
                                </Card>
                            </>
                        </div>)})
                    }
                        </div>
                    </Container>
            )}            
        </>
    );
};

export default SomoimMainList;