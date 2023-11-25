import React, { useEffect, useRef, useState } from 'react';

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { Container } from 'react-bootstrap';


const getItems = (nextGroupKey, count) => {
    const nextItems = [];
    const nextKey = nextGroupKey * count;
  
    for (let i = 0; i < count; ++i) {
      nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
    }
    return nextItems;
  };
  

const SomoimDetailPhoto = ({somoimId}) => {
    // const [formData, setFormData] = useState({});
    // const { introduceDetail } = formData;
    ///////////////////////////////////////////
    const [items, setItems] = useState(() => getItems(0, 10));
    const igRef = useRef();

    const onRequestAppend = (e) => {
        const nextGroupKey = (e.groupKey || 0) + 1;
    
        setItems([...items, ...getItems(nextGroupKey, 10)]);
      };

    useEffect(() => {
        console.log(igRef.current.getItems());
    }, []);

    const Item = ({ num }) => (
        <div className="item" style={{ width: "250px" }}>
        <div className="thumbnail">
            <img
            src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num % 33) + 1}.jpg`}
            alt="egjs"
            style={{ width: "250px" }}
            />
        </div>
        {/* <div className="info">{`egjs ${num}`}</div> */}
        </div>
    );

    return (
        <>
            <Container className="mb-3">
                <MasonryInfiniteGrid
                    className="container mt-5"
                    align="center"
                    gap={5} // margin
                    defaultDirection={"end"}
                    sizeWeight={2}
                    ratioWeight={1}
                    aspectRatio={1}
                    weightPriority={"custom"}
                    // frame={[[1, 1, 2, 3, 3], [1, 1, 4, 4, 5]]} // 한 행의 열크기
                    attributePrefix={"data-grid-"}
                    column={3}
                    ref={igRef}
                    // threshold={1000}
                    onRequestAppend={onRequestAppend}
                >
                    {items.map((item ,index) => {
                        return (
                            <Item className="item" data-grid-groupkey={item.groupKey} key={item.key} num={item.key}></Item>
                            )
                    })}
                </MasonryInfiniteGrid>
            </Container>
        </>
    );
};

export default SomoimDetailPhoto;