import React from 'react';
import Header from '../main/Header';
import Container from 'react-bootstrap/esm/Container';
import "../../css/reset.css"
import "../../css/date/dateList.css";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from 'components/ExampleCarouselImage';

const dateList = () => {
    return (
        <div>
            <Header></Header>
            <br />
            <br />

            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <div className="Group66" style={{width: "14.5vw", height: "7vh", background: '#F56084', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{width: "9.5vw", color: 'white', fontSize: "1.7vw", fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>애견 매칭</div>   
                </div>
                &emsp;&emsp;<img src='/image/date/image1.jpg' style={{width:'70%'}}></img>
                <img src='/image/date/image2.png' style={{width:'10%'}}></img>
            </div>
            <br/>

            <Container className='px-10'>
                <div style={{display: 'flex', justifyContent:'center'}}>
                        <img src='/image/date/image3.png' className="d-block w-100" style={{width:'100%'}}></img>
                </div>
            </Container>
            <br /><br />
            
            <hr className='dateHr'/>
            <br /><br />
            
            <div>
            {/* <Carousel data-bs-theme="white">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/main/main1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/main/main2.png"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel> */}
                <Carousel>
                    <Carousel.Item>
                        <ExampleCarouselImage text="First slide" />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Second slide" />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Third slide" />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default dateList;