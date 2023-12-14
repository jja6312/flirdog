import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../css/admin/filterForm.module.css";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faStoreSlash } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTree } from "@fortawesome/free-solid-svg-icons";

const FilterForm = ({
  iconName,
  titleText,
  searchValue,
  selectedIcon,
  setSelectedIcon,
}) => {
  return (
    <>
      <div
        className={`${styles.allContainer} d-flex justify-content-start align-items-center`}
        onClick={() => setSelectedIcon(iconName)}
      >
        <div
          className={`${styles.iconContainer} ${
            selectedIcon === iconName
              ? styles.iconContainerPink
              : styles.iconContainerGray
          }`}
        >
          {iconName === "faBorderAll" && (
            <FontAwesomeIcon className={styles.icon} icon={faBorderAll} />
          )}
          {iconName === "faCartShopping" && (
            <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
          )}
          {iconName === "faStoreSlash" && (
            <FontAwesomeIcon className={styles.icon} icon={faStoreSlash} />
          )}
          {iconName === "faCommentDots" && (
            <FontAwesomeIcon className={styles.icon} icon={faCommentDots} />
          )}
          {iconName === "faHeadset" && (
            <FontAwesomeIcon className={styles.icon} icon={faHeadset} />
          )}
          {iconName === "faHourglassHalf" && (
            <FontAwesomeIcon className={styles.icon} icon={faHourglassHalf} />
          )}
          {iconName === "faHourglassEnd" && (
            <FontAwesomeIcon className={styles.icon} icon={faHourglassEnd} />
          )}
          {iconName === "faHeart" && (
            <FontAwesomeIcon className={styles.icon} icon={faHeart} />
          )}
          {iconName === "faTree" && (
            <FontAwesomeIcon className={styles.icon} icon={faTree} />
          )}
        </div>

        <div
          className={`${styles.textContainer} d-flex flex-column align-items-start justify-content-center mx-3`}
        >
          <span className={styles.titleText}>{titleText}</span>
          <div
            className={`${styles.titleContentContainer} d-flex justify-content-first align-items-center`}
          >
            <sapn className={styles.textContentBigText}>{searchValue}</sapn>
            <sapn className={styles.textContentSmallText}>건</sapn>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterForm;
