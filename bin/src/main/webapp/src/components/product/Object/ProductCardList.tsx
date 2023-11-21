import React from 'react';
import ProductCardListStyles from "../../../css/product/ProductCardListStyles.t.module.css";
import ProductCard from "./ProductCard";
import DumyProduct from "../resouce/DumyProduct";

const ProductCardList = () => {
    return (
        <>
            <div className={ProductCardListStyles.productCardListDiv}>
                {
                    DumyProduct.map((item, index) => (
                        <ProductCard key={index} prodInfo={item}/>
                    ))
                }
            </div>
        </>
    );
};

export default ProductCardList;