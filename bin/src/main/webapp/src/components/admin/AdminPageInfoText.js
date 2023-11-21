import React from "react";
import styles from "../../css/admin/rightContent.module.css";
const AdminPageInfoText = ({ title, subTitle, isNessasary }) => {
  return (
    <>
      <div className="mt-5">
        <span className={` ${styles.titleSecond} `}>{title}</span>
        {isNessasary && <span className={styles.titleSecondStar}>*</span>}
      </div>
      <p className={`mt-4 ${styles.titleThird} `}>{subTitle}</p>
    </>
  );
};

export default AdminPageInfoText;
