import React, { useEffect, useState } from "react";
import ShoppingProduct from "./ShoppingProduct";
import styles from "../../../css/main/5인기상품/shoppingProduct.module.css";
import axios from "axios";
const BestProductMain = () => {
  const [imageInfoArray, setImageInfoArray] = useState([]);

  useEffect(() => {
    axios
      .post("https://java.flirdog.store:8080/access/getProductInfoArray")
      .then((res) => {
        setImageInfoArray(res.data);
        console.log("인기 상품 이미지정보(imageInfoArray)");
        console.log(res.data);
      });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mt-10 flex-column">
        <span className={styles.titleText}>인기 상품</span>
        <div className="row mt-5">
          <ShoppingProduct
            imgSrc={
              imageInfoArray[0] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[0].image}`
            }
            name={imageInfoArray[0] && imageInfoArray[0].name}
            price={imageInfoArray[0] && imageInfoArray[0].price}
          />
          <ShoppingProduct
            imgSrc={
              imageInfoArray[1] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[1].image}`
            }
            name={imageInfoArray[1] && imageInfoArray[1].name}
            price={imageInfoArray[1] && imageInfoArray[1].price}
          />
          <ShoppingProduct
            imgSrc={
              imageInfoArray[2] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[2].image}`
            }
            name={imageInfoArray[2] && imageInfoArray[2].name}
            price={imageInfoArray[2] && imageInfoArray[2].price}
          />
          <ShoppingProduct
            imgSrc={
              imageInfoArray[3] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[3].image}`
            }
            name={imageInfoArray[3] && imageInfoArray[3].name}
            price={imageInfoArray[3] && imageInfoArray[3].price}
          />
        </div>
        <div className="row">
          <ShoppingProduct
            imgSrc={
              imageInfoArray[4] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[4].image}`
            }
            name={imageInfoArray[4] && imageInfoArray[4].name}
            price={imageInfoArray[4] && imageInfoArray[4].price}
          />
          <ShoppingProduct
            imgSrc={
              imageInfoArray[5] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[5].image}`
            }
            name={imageInfoArray[5] && imageInfoArray[5].name}
            price={imageInfoArray[5] && imageInfoArray[5].price}
          />
          <ShoppingProduct
            imgSrc={
              imageInfoArray[6] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[6].image}`
            }
            name={imageInfoArray[6] && imageInfoArray[6].name}
            price={imageInfoArray[6] && imageInfoArray[6].price}
          />
          <ShoppingProduct
            imgSrc={
              imageInfoArray[7] &&
              `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/${imageInfoArray[7].image}`
            }
            name={imageInfoArray[7] && imageInfoArray[7].name}
            price={imageInfoArray[7] && imageInfoArray[7].price}
          />
        </div>
      </div>
    </>
  );
};

export default BestProductMain;
