import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';

//import styles from '../../../css/somoim/main/SomoimMainList.module.css';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const SomoimMainList = ({ selectedLocation }) => {
    const [somoimList, setSomoimList] = useState([]);
    //const { somoimId } = somoimList
    //const [selectedLocation, setSelectedLocation] = useState(null);

    // useEffect(() => {
    //     axios.get('/somoim/getSomoimList')
    //         .then(res => {
    //             console.log(res.data)
    //             setSomoimList(res.data)
    //         })
    //         .catch(error => console.log(error))
    // },[])

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

    // useEffect(() => {
    //     const filterList = async () => {
    //         try {
    //             const response = await axios.get('/somoim/getSomoimList');
    //             console.log(response.data);
    //             setSomoimList(response.data);
    //         } catch (error) {
    //             console.error('Error fetching somoim list:', error);
    //         }
    //     };

    //     filterList();
    // }, []);

    const filterSomoimList = () => {
        
        if (!selectedLocation || selectedLocation === '전국') {
            return somoimList;
        }

        console.log(selectedLocation)
        return somoimList.filter(item => item.location === selectedLocation);
    };

    return (
        <>
            <Container className="px-8 mt-5 col-12">
                <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
            {
                filterSomoimList().map((item, index) => {return (
                <div key={index}>
                    <>
                        <Card Card className='mb-5 h-80' border="danger" bg="white">
                                <Card.Header>Featured</Card.Header>
                                <Card.Img 
                                    variant="top" 
                                    src="/image/main/main1.png" 
                                    style={{ width: 'auto', height: '11rem', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{ item.somoimName }</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">- { item.introduceSub }</Card.Subtitle>
                                    <Card.Text >
                                        <p className='mb-1'>위치 : { item.address } | 멤버 { item.memberCount } 명</p>
                                        <p className='mb-1'>대상 : { item.target }</p>
                                        <p className='mb-1'>가입비용 : {item.cost} 원</p>
                                        <p className='mb-1'>   ⩢ { item.location }</p>
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
                {/* <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
                    <div>
                        <Card Card className='mb-5 h-80' border="danger" bg="white">
                            <Card.Header>Featured</Card.Header>
                            <Card.Img 
                                variant="top" 
                                src="/image/main/main1.png" 
                                style={{ width: 'auto', height: '11rem', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>우리 동네 강아지 자랑해요</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">- 반려견 친목모임</Card.Subtitle>
                                <Card.Text >
                                    <p className='mb-1'>위치 : 강서구 | 멤버 9</p>
                                    <p className='mb-1'>일정 : 2023-11-16(일) 14:00 ~18:00</p>
                                    <p className='mb-1'>신청마감 : ~ 2023-11-16(목) 13:59</p>
                                    <p className='mb-1'>   ⩢ 서울 강서구 강서로</p>
                                </Card.Text>
                                <Card.Link href={`/somoim/detailMain/${somoimId}`}>
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div>
                </div> */}
            </Container>
        </>
    );
};

export default SomoimMainList;