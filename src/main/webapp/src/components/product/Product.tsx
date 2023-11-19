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

const Product = () => {
    const loading = true

    return (
        <div>
            {loading && <Loading />}
            <Header />
            <SearchBar />
            <EventBanner EventBannerImg={EventBannerImg}/>

            <ProductBody />
            <Footer></Footer>
        </div>
    );
};

export default Product;