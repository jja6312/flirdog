import React from 'react';
import ProductDisplyStyles from "../../../css/product/ProductDisplayStyles.t.module.css";
import SortByBar from "./SortByBar";
import ProductCardList from "./ProductCardList";

const ProductDisplay = () => {
    return (
        <>
            <div className={ProductDisplyStyles.productDisplay}>
                <SortByBar />
                <ProductCardList />
            </div>
        </>
    );
};

export default ProductDisplay;