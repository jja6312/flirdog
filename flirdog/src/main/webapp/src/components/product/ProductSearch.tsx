import React from 'react';
import Container from "react-bootstrap/Container";
import MainCategory from "./MainCategory";
import ProductSearchStyles from "../../css/product/ProductSearch.t.module.css";


const ProductSearch = () => {
    return (
        <>
            <Container className="px-10">
                <form>
                    <div className={ProductSearchStyles.SearchBar}>
                        <div className={ProductSearchStyles.searchOption}>
                            <select>
                                {
                                    MainCategory.map(item => {
                                        return <option value={item.value}>{item.text}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={ProductSearchStyles.searchValue}>
                            <div className={ProductSearchStyles.valueDiv}>
                                <input type={"text"}/>
                            </div>
                            <div className={ProductSearchStyles.imgDiv}>
                                <img src="./image/product/search.png"/>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
};

export default ProductSearch;