import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Banner = ({ imgSrc1, imgSrc2, imgSrc3 }) => {
  return (
    <div>
      <Carousel data-bs-theme="white">
        <Carousel.Item>
          <img className="d-block w-100" src={imgSrc1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={imgSrc2} alt="First slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
