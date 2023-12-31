import React from 'react';
import CategoryCheckboxStyles from "../../../css/product/CategoeyCheckboxStyles.t.module.css";
import MainCategory from "../resouce/MainCategory";
import MainCategoryCheckbox from "./MainCategoryCheckbox";

type CategoryCheckboxPropsType = {
    onSetMainSortList : (value : string) => void;
    onSetSubSortList : (value : string) => void;
    reset : React.MutableRefObject<number>;
}

const CategoryCheckbox = (props : CategoryCheckboxPropsType) => {
    return (
        <>
            <div className={CategoryCheckboxStyles.checkboxDiv}>
                {
                    MainCategory.map(item => (
                        <div key={item.value}>
                            <MainCategoryCheckbox
                                mainCategoey={item}
                                onSetMainSortList={props.onSetMainSortList}
                                onSetSubSortList={props.onSetSubSortList}
                                reset={props.reset}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default CategoryCheckbox;