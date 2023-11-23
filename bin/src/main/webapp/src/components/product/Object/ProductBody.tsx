import React, {useEffect, useRef, useState} from 'react';
import Container from "react-bootstrap/Container";
import ProductBodyStyles from "../../../css/product/ProductBodyStyles.t.module.css"
import CategoeySortBar from "./CategoeySortBar";
import ProductDisplay from "./ProductDisplay";

const ProductBody = () => {
    const [mainSortList, setMainSortList] = useState<string[]>([])
    const [subSortList, setSubSortList] = useState<string[]>([])
    const onSetMainSortList = ( value : string ) => {
        mainSortList.includes(value) ? setMainSortList(mainSortList.filter( item => item !== value)) : mainSortList.push(value)
    }
    const onSetSubSortList = ( value : string ) => {
        subSortList.includes(value) ? setSubSortList(subSortList.filter( item => item !== value)) : subSortList.push(value)
    }
    const reset = useRef(0)
    const setReset = () => {
        reset.current += 1
    }


    useEffect(() => {
        setMainSortList([])
        setSubSortList([])
    }, [reset]);

    useEffect(() => {
        console.log("메인소트")
        console.log(mainSortList)
        console.log("서브소트")
        console.log(subSortList)
    }, [mainSortList, subSortList]);

    return (
        <>
            <Container className="px-10" >
               <div className={ProductBodyStyles.bodySize}>
                   <CategoeySortBar
                       onSetMainSortList={onSetMainSortList}
                       onSetSubSortList={onSetSubSortList}
                       reset={reset}
                       setReset={setReset}
                   />
                   <ProductDisplay  />
               </div>
            </Container>
        </>
    );
};

export default ProductBody;