import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';

import styles from '../../../css/somoim/main/SomoimMainList.module.css';
import { Button, Card } from 'react-bootstrap';

const SomoimMainList = () => {
    const [somoimId, setSomoimId] = useState('1');

    return (
        <>
            <Container className="px-8 mt-5 col-12">
                <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1'>
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
                                {/* <Card.Link href={`/somoim/detail/${somoimId}`}> */}
                                <Card.Link href={`/somoim/detailMain/${somoimId}`}>
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card Card className='mb-5 h-80' border="danger" bg="white">
                            <Card.Header>Featured</Card.Header>
                            <Card.Img 
                                variant="top" 
                                src="/image/somoim/highlight1.png" 
                                style={{ width: '300px', height: '11rem', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>우리 동네 강아지 자랑해요</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">- 반려견 친목모임</Card.Subtitle>
                                <Card.Text >
                                    <p className='mb-1'>위치 : 강서구 | 멤버 9</p>
                                    <p className='mb-1'>일정 : 2023-11-16(일) 14:00 ~18:00</p>
                                    <p className='mb-1'>신청마감 : ~ 2023-11-16(목) 13:59</p>
                                    <p className='mb-1'>   ⩢ 서울 강서구 강서로</p>
                                </Card.Text>
                                <Card.Link href="/somoim/detail">
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card Card className='mb-5' border="danger" bg="white">
                            <Card.Header>Featured</Card.Header>
                            <Card.Img variant="top" src="/image/main/main1.png" />
                            <Card.Body>
                                <Card.Title>우리 동네 강아지 자랑해요</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">- 반려견 친목모임</Card.Subtitle>
                                <Card.Text >
                                    <p className='mb-1'>위치 : 강서구 | 멤버 9</p>
                                    <p className='mb-1'>일정 : 2023-11-16(일) 14:00 ~18:00</p>
                                    <p className='mb-1'>신청마감 : ~ 2023-11-16(목) 13:59</p>
                                    <p className='mb-1'>   ⩢ 서울 강서구 강서로</p>
                                </Card.Text>
                                <Card.Link href="/somoim/detail">
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card Card className='mb-5' border="danger" bg="white">
                            <Card.Header>Featured</Card.Header>
                            <Card.Img variant="top" src="/image/main/main1.png" />
                            <Card.Body>
                                <Card.Title>우리 동네 강아지 자랑해요</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">- 반려견 친목모임</Card.Subtitle>
                                <Card.Text >
                                    <p className='mb-1'>위치 : 강서구 | 멤버 9</p>
                                    <p className='mb-1'>일정 : 2023-11-16(일) 14:00 ~18:00</p>
                                    <p className='mb-1'>신청마감 : ~ 2023-11-16(목) 13:59</p>
                                    <p className='mb-1'>   ⩢ 서울 강서구 강서로</p>
                                </Card.Text>
                                <Card.Link href="/somoim/detail">
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card Card className='mb-5' border="danger" bg="white">
                            <Card.Header>Featured</Card.Header>
                            <Card.Img variant="top" src="/image/main/main1.png" />
                            <Card.Body>
                                <Card.Title>우리 동네 강아지 자랑해요</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">- 반려견 친목모임</Card.Subtitle>
                                <Card.Text >
                                    <p className='mb-1'>위치 : 강서구 | 멤버 9</p>
                                    <p className='mb-1'>일정 : 2023-11-16(일) 14:00 ~18:00</p>
                                    <p className='mb-1'>신청마감 : ~ 2023-11-16(목) 13:59</p>
                                    <p className='mb-1'>   ⩢ 서울 강서구 강서로</p>
                                </Card.Text>
                                <Card.Link href="/somoim/detail">
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div>
                    <div>
                        <Card Card className='mb-5' border="danger" bg="white">
                            <Card.Header>Featured</Card.Header>
                            <Card.Img variant="top" src="/image/main/main1.png" />
                            <Card.Body>
                                <Card.Title>우리 동네 강아지 자랑해요</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">- 반려견 친목모임</Card.Subtitle>
                                <Card.Text >
                                    <p className='mb-1'>위치 : 강서구 | 멤버 9</p>
                                    <p className='mb-1'>일정 : 2023-11-16(일) 14:00 ~18:00</p>
                                    <p className='mb-1'>신청마감 : ~ 2023-11-16(목) 13:59</p>
                                    <p className='mb-1'>   ⩢ 서울 강서구 강서로</p>
                                </Card.Text>
                                <Card.Link href="/somoim/detail">
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div>
                    {/* <div className='col-md-4 col-sm-6 col-12'>
                        <Card Card className='mb-5' border="danger" bg="white">
                            <Card.Header>Featured</Card.Header>
                            <Card.Img variant="top" src="/image/main/main1.png" />
                            <Card.Body>
                                <Card.Title>우리 동네 강아지 자랑해요</Card.Title>
                                <Card.Subtitle className="mb-3 text-muted">- 반려견 친목모임</Card.Subtitle>
                                <Card.Text >
                                    <p className='mb-1'>위치 : 강서구 | 멤버 9</p>
                                    <p className='mb-1'>일정 : 2023-11-16(일) 14:00 ~18:00</p>
                                    <p className='mb-1'>신청마감 : ~ 2023-11-16(목) 13:59</p>
                                    <p className='mb-1'>   ⩢ 서울 강서구 강서로</p>
                                </Card.Text>
                                <Card.Link href="/somoim/detail">
                                    <Button variant="primary">상세 보기
                                    </Button>
                                    </Card.Link>   
                            </Card.Body>
                            <Card.Footer className="text-muted">2 days ago</Card.Footer>
                        </Card>
                    </div> */}
                </div>

                <div className='row'>
                    {/* <div className="mt-2 mb-2 d-flex justify-content-center align-items-center" style={{border: '1px solid red'}}> */}
                    <div className="mt-2 mb-2 d-flex justify-content-center align-items-center">
                        {/* <div className='d-flex justify-content-center' style={{ width:'344px',height: '331px', flex: 1, position: 'relative', background: 'white', borderRadius: 3, overflow: 'hidden', border: '1px solid red', padding: 0}}> */}                        
                        <div className={`${styles.list} d-flex justify-content-center`}>
                            <img className={`${styles.img} img-thumbnail`} src='/image/somoim/highlight1.png' alt='somoimHighlight' />
                            <div className={`${styles.text}`}>
                                    <Link to='/somoim/detail'></Link>
                            </div>
                        </div>
                        <div className={`${styles.list} d-flex justify-content-center`}>
                            <img className={`${styles.img} img-thumbnail`} src='/image/somoim/highlight1.png' alt='somoimHighlight' />
                            <div className={`${styles.text}`}>
                                    <Link to='/somoim/detail'></Link>
                            </div>
                        </div>
                        <div className={`${styles.list} d-flex justify-content-center`}>
                            <img className={`${styles.img} img-thumbnail`} src='/image/somoim/highlight1.png' alt='somoimHighlight' />
                            <div className={`${styles.text}`}>
                                    <Link to='/somoim/detail'></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default SomoimMainList;