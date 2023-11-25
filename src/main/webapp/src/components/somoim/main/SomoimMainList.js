import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';

//import styles from '../../../css/somoim/main/SomoimMainList.module.css';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const SomoimMainList = ({ selectedLocation, searchList }) => {
    const [somoimList, setSomoimList] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const filterList = async () => {
            await axios.get('/somoim/getSomoimList')
                .then(res => {
                    console.log(res.data)
                    setSomoimList(res.data)
                })
                .catch(error => console.log(error));
        }
        
        filterList();
    },[])

    useEffect(() => {
        // searchList가 변경되면 isSearching을 true로, 그렇지 않으면 false로 설정
        setIsSearching(searchList && searchList.searchData && searchList.searchData.search !== '');
      }, [searchList]);

      
      useEffect(() => {
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

    return (
        <>
            <Container className="px-8 mt-5 col-12">
                <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
            {
                filteredResults.map((item, index) => {return (
                <div key={index}>
                    <>
                        <Card className='mb-5 h-80' border="danger" bg="white">
                                <Card.Header>Featured</Card.Header>
                                <Card.Img 
                                    variant="top" 
                                    src="/image/main/main1.png" 
                                    style={{ width: 'auto', height: '11rem', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{ item.somoimName }</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">- { item.introduceSub }</Card.Subtitle>
                                    <Card.Text as="div" className='mb-2' style={{ lineHeight: '1.7rem' }}>
                                        <div>위치 : {item.address} | 멤버 {item.memberCount} 명</div>
                                        <div>대상 : {item.target}</div>
                                        <div>가입비용 : {item.cost} 원</div>
                                        <div>⩢ {item.location}</div>
                                    </Card.Text>
                                    <Card.Link href={`/somoim/detailMain/${item.id}`}>
                                        <Button variant="primary">상세 보기
                                        </Button>
                                        </Card.Link>   
                                </Card.Body>
                                <Card.Footer className="text-muted">개설일 : { item.createdAt }</Card.Footer>
                        </Card>
                    </>
                </div>)})
            }
                </div>
            </Container>
        </>
    );
};

export default SomoimMainList;