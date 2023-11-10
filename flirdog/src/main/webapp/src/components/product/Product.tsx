import React from 'react';
import Header from "../main/Header";
import {Link} from "react-router-dom";
import MainBody from "../main/MainBody";
import Footer from "../main/Footer";
import ProductSearch from "./ProductSearch";

const Product = () => {
    return (
        <div>
            <Header />
            <ProductSearch />

            <Footer></Footer>
        </div>
    );
};

export default Product;