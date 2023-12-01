import React, { useEffect, useRef, useState } from 'react';

import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import { Button, Container, Modal } from 'react-bootstrap';

import styles from '../../../css/somoim/detail/SomoimPhotoModal_style.module.css';
import ImageModal from './ImageModal';
// import Pin from './Pin';
// import Modal from './Modal';


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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

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
        </div>
    );

    return (
        <>
            <Container className="mb-3">
                <div className="navigation_bar d-flex justify-content-end">
                    <div
                        onClick={handleShow}
                        className={`${styles.pint_mock_icon_container} add_pin`}
                    >
                        <img src="/image/somoim/add.png" alt="add_pin" className={`${styles.pint_mock_icon}`} />
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{height:'600px'}}>
                        <ImageModal />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        사진 저장 및 추가
                    </Button>
                    </Modal.Footer>
                </Modal>


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