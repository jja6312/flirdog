import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import styles from "../../css/admin/leftSide.module.css";
import { Link } from "react-router-dom";

const LeftSide = ({ openLeftside, selected }) => {
  const [currentSubmenu, setCurrentSubmenu] = useState("");

  useEffect(() => {
    const subMenu = document.querySelectorAll(styles.subMenu);
    subMenu.forEach((item) => {
      if (item.innerText === selected) {
        item.style.color = "#F56084";
        item.style.fontWeight = "bold";
      }
    });
  }, []);

  return (
    <>
      {/* <div onChange={currentSubmenu}>{currentSubmenu}</div> */}
      <div className={styles.leftSideAbsolute}>
        <div className={styles.leftSide}>
          <Accordion defaultActiveKey={openLeftside} flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>상품 관리</Accordion.Header>
              <Link
                to="/admin/productUploadForm"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body className={`mx-4 ${styles.subMenu}`}>
                  상품 등록
                </Accordion.Body>
              </Link>
              <Link
                to="/admin/productListForm"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body className={`mx-4 ${styles.subMenu}`}>
                  전체 상품 조회/수정
                </Accordion.Body>
              </Link>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className={styles.titleMenu}>
                회원 관리
              </Accordion.Header>

              <Link
                to="/admin/userListForm"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body className={`mx-4 ${styles.subMenu}`}>
                  회원 목록 조회/수정
                </Accordion.Body>
              </Link>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className={styles.titleMenu}>
                주문 관리
              </Accordion.Header>

              <Link
                to="/admin/orderListForm"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body className={`mx-4 ${styles.subMenu}`}>
                  주문 확인
                </Accordion.Body>
              </Link>
              <Link
                to="/admin/orderCheckForm"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body className={`mx-4 ${styles.subMenu}`}>
                  발주 관리
                </Accordion.Body>
              </Link>
              <Link
                to="/admin/orderShippingForm"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body className={`mx-4 ${styles.subMenu}`}>
                  배송 관리
                </Accordion.Body>
              </Link>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className={styles.titleMenu}>
                리뷰 관리
              </Accordion.Header>

              <Link
                to="/admin/reviewListForm"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body className={`mx-4 ${styles.subMenu}`}>
                  문의/리뷰 관리
                </Accordion.Body>
              </Link>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
