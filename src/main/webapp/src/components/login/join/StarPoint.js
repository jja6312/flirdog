import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const StarPoint = ({
  setIsSatisfyForNextBtnAuth,
  currentDogIndex,
  score,
  setScore,
}) => {
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

  useEffect(() => {
    console.log("Current score:", score.filter(Boolean).length);
    if (score[0] !== false) {
      setIsSatisfyForNextBtnAuth(true);
    }
  }, [score]);

  useEffect(() => {
    console.log("currentDogIndex:", currentDogIndex);
    setScore([false, false, false, false, false]);
  }, [currentDogIndex]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center mt-2"
        style={{ width: 800 }}
      >
        <span style={{ fontSize: "0.8rem" }}>아래 별점을 클릭해주세요</span>
      </div>
      <div className="mb-3">
        {score.map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{
              width: "1.3em",
              color:
                index <=
                (hoverIndex !== -1 ? hoverIndex : score.lastIndexOf(true))
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
    </>
  );
};

export default StarPoint;
