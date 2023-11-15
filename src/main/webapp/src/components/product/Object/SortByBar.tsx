import React from 'react';
import SortByBarStyles from "../../../css/product/SortByBarStyles.t.module.css";

const SortByBar = () => {
    return (
        <>
            <div className={SortByBarStyles.sortByBarDiv}>
                <div style={{marginLeft:5,borderRight:"1px solid #F789A2"}}>인기순</div>
                <div style={{borderRight:"1px solid #F789A2"}}>낮은가격순</div>
                <div style={{borderRight:"1px solid #F789A2"}}>높은가격순</div>
                <div>최신순</div>
            </div>
        </>
    );
};

export default SortByBar;