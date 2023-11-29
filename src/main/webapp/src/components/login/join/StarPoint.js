import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../css/login/starpoint.module.css";

const StarPoint = () => {
  const [score, setScore] = useState([false, false, false, false, false]);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const starScore = (index) => {
    let updatedScore = score.map((_, i) => i <= index);
    setScore(updatedScore);
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div>
      {score.map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className="m-1"
          style={{
            color:
              index <=
              (hoverIndex >= 0
                ? hoverIndex
                : score.findIndex((s) => s === false) - 1)
                ? "gold"
                : "grey",
          }}
          onClick={() => starScore(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          size="xl"
        />
      ))}
    </div>
  );
};

export default StarPoint;
