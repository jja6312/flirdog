import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "../../css/main/shoppingProduct.css";
import { Link } from "react-router-dom";

const ShoppingProduct = ({ imgSrc }) => {
  return (
    <div className="col-lg-3 col-sm-6  px-2 rounded mt-4">
      <Card>
        <Link to="/">
          <Card.Img variant="top" src={imgSrc} />
        </Link>

        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Super Goods</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item style={{ textAlign: "center", color: "gray" }}>
            29,000원
          </ListGroup.Item>
        </ListGroup>
      </Card>
      {/* <div className=" shoppingProduct"></div> */}
    </div>
  );
};

export default ShoppingProduct;
