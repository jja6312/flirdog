import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../css/login/starpoint.module.css"; // CSS 모듈 불러오기

const StarPoint = () => {
  const ARRAY = [0, 1, 2, 3, 4];

  return (
    <>
      {ARRAY.map((el, index) => (
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: "red" }} // Font Awesome 아이콘의 색상을 설정합니다.
          key={index}
          size="lg" // Font Awesome의 사이즈 옵션입니다.
        />
      ))}
    </>
  );
};

export default StarPoint;
// <div className={styles.starpointWrap}>
//   <div className={styles.starpointBox}>
//     {[...Array(10)].map((_, index) => (
//       <React.Fragment key={index}>
//         <label
//           htmlFor={`starpoint_${index + 1}`}
//           className={styles.labelStar}
//           title={`${index + 0.5}`}
//         >
//           <span className={styles.blind}>{`${index + 0.5}점`}</span>
//         </label>
//         <input
//           type="radio"
//           name="starpoint"
//           id={`starpoint_${index + 1}`}
//           className={styles.starRadio}
//         />
//       </React.Fragment>
//     ))}
//     <span className={styles.starpointBg}></span>
//   </div>
// </div>
