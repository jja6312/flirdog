import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../../../css/main/5인기상품/shoppingProduct.module.css";
import { Link } from "react-router-dom";

const ShoppingProduct = ({ imgSrc, name, price }) => {
  //가격 형식 변환
  const formatPrice = (value) => {
    return new Intl.NumberFormat("ko-KR").format(value);
  };

  return (
    <div className="col-lg-3 col-sm-6  px-2 rounded mt-4">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Card className={styles.shoppingProductCard}>
          <Card.Img variant="top" src={imgSrc} />

          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>{name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item style={{ textAlign: "center", color: "gray" }}>
              {formatPrice(price)}원
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Link>
      {/* <div className=" shoppingProduct"></div> */}
    </div>
  );
};

export default ShoppingProduct;
