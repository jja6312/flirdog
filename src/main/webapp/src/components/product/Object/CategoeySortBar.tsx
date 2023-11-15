import React from 'react';
import CategoeySortBarStyles from "../../../css/product/CategoeySortBarStyles.t.module.css";
import CategoryCheckbox from "./CategoryCheckbox";

type CategorySortBarPropsType = {
    onSetMainSortList : (value : string) => void;
    onSetSubSortList : (value : string) => void;
    reset : React.MutableRefObject<number>;
    setReset : () => void;
}

const CategoeySortBar = (props : CategorySortBarPropsType) => {
    return (
        <>
            <div className={CategoeySortBarStyles.categoeySortBar}>
                <div className={CategoeySortBarStyles.titleDiv}>
                    <div>필터</div>
                    <div onClick={() => props.setReset} style={{textDecoration:"underline", cursor:"pointer"}}>초기화</div>
                </div>
                <div className={CategoeySortBarStyles.categoryCheckboxBar}>
                    <CategoryCheckbox
                        onSetMainSortList={props.onSetMainSortList}
                        onSetSubSortList={props.onSetSubSortList}
                        reset={props.reset}
                    />
                </div>
           </div>
        </>
    );
};

export default CategoeySortBar;