import React from 'react';
import Header from "../main/Header";
import Footer from "../main/Footer";
import EventBannerImg from "./resouce/EventBannerImg";
import ProductBody from "./Object/ProductBody";
import SearchBar from "./Object/SearchBar";
import EventBanner from "./Object/EventBanner";
import MessageRoom from "../message/MessageRoom";

const Product = () => {
    const loading = true

    return (
        <div>
            <div style={{width:500,height:500}}>
                <MessageRoom userId={2} topic={"messageRoom1"} nickName={"Hyuna"} roomNo={1} profileImage={"null"}/>
            </div>
            <Header />
            <SearchBar />
            <EventBanner EventBannerImg={EventBannerImg}/>

            <ProductBody />
            <Footer></Footer>
        </div>
    );
};

export default Product;