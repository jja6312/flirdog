import React from 'react';
import ProductCardStyles from "../../../css/product/ProductCardStyles.t.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import {Link} from "react-router-dom";

type ProductCardType = {
    img: string;
    link: string;
    text: string;
}

type CardPropsType = {
    prodInfo: ProductCardType
}

const ProductCard = (props: CardPropsType) => {
    return (
        <div className={ProductCardStyles.productCardDiv}>
            <Link to="/product/1">
                <Card>
                    <Card.Img variant="top" src={props.prodInfo.img}/>
                    <Card.Body>
                        <Card.Title>{props.prodInfo.text}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
};

export default ProductCard;