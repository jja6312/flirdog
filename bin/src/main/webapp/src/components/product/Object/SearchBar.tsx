import React from 'react';
import Container from "react-bootstrap/Container";
import MainCategory from "../resouce/MainCategory";
import ProductSearchStyles from "../../../css/product/ProductSearchStyles.t.module.css";


const SearchBar = () => {
    return (
        <>
            <Container className="px-10">
                <form>
                    <div className={ProductSearchStyles.SearchBar}>
                        <div className={ProductSearchStyles.searchOption}>
                            <select>
                                <option value="">전체</option>
                                {
                                    MainCategory.map(item => {
                                        return <option key={item.value} value={item.value}>{item.text}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className={ProductSearchStyles.searchValue}>
                            <div className={ProductSearchStyles.valueDiv}>
                                <input type={"text"}/>
                            </div>
                            <div className={ProductSearchStyles.imgDiv}>
                                <img alt="search" src="./image/product/search.png"/>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
};

export default SearchBar;