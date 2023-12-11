import React, {useEffect, useRef, useState} from 'react';
import ProductCardListStyles from "../../../css/product/ProductCardListStyles.t.module.css";
import ProductCard from "./ProductCard";
import DumyProduct from "../resouce/DumyProduct";
import axios from "axios";

type Hit = {
    // Hit 타입에 해당하는 필드
};

type Product = {
    id: number;
    name: string;
    content?: string;
    image?: string;
    stock: number;
    price: number;
    contentDetail?: string;
    mainCategory: string;
    subCategory: string;
    hit: number;
};


const ProductCardList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
        axios.get("https://java.flirdog.store:8080/product/getAllProducts", {params: { page }})
            .then((res) => {
            setProducts(prevProducts => [...prevProducts, ...res.data]);
        }). catch((error) => {
            console.log(error);
        });
    }, [page]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };

        const observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        }, options);

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loader]);


    return (
        <>
            <div className={ProductCardListStyles.productCardListDiv}>
                <div>
                    {
                        DumyProduct.map((item, index) => (
                            <ProductCard key={index} prodInfo={item}/>
                        ))
                    }
                </div>
                <div ref={loader}></div>
            </div>
        </>
    );
};

export default ProductCardList;