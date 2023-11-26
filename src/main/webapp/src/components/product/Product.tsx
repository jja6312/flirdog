import React from 'react';
import Header from "../main/Header";
import Footer from "../main/Footer";
import EventBannerImg from "./resouce/EventBannerImg";
import ProductBody from "./Object/ProductBody";
import Loading from "../Loading";
import {useRecoilValue} from "recoil";
import {LoadingAtom} from "../LoadindAtom";
import SearchBar from "./Object/SearchBar";
import EventBanner from "./Object/EventBanner";
import MessageRoom from "../message/MessageRoom";

const Product = () => {
    const loading = useRecoilValue(LoadingAtom)

    return (
        <div>
            {loading && <Loading />}
            <Header />
            <SearchBar />
            <EventBanner EventBannerImg={EventBannerImg}/>

            <div style={{width:"50%"}}>
                <MessageRoom userId={2} topic={"chat1"} nickName={"Hyuna"} roomNo={1}/>
            </div>
            <ProductBody />
            <Footer></Footer>
        </div>
    );
};

export default Product;