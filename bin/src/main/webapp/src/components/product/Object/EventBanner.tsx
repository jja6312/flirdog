import React from 'react';
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";

type BannerImg = {
    img:string;
    link:string;
    text:string;
}

type PropsType = {
    EventBannerImg : BannerImg[]
}
const EventBanner = ( props : PropsType) => {
    return (
        <>
            <Container className="px-10">
                <Carousel data-bs-theme="white" style={{minHeight: 84.11, minWidth: 300}}>
                    {
                        props.EventBannerImg.map((item, index) => {
                            return (
                                <Carousel.Item key={item.text}>
                                    <Link to="/">
                                        <img
                                            className="d-block w-100"
                                            src={item.img}
                                            alt={item.text}
                                        />
                                    </Link>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </Container>
        </>
    );
};

export default EventBanner;