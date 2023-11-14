import React, { useEffect, useState } from 'react';
import CheckBox from "../resouce/CheckBox";
import SubCategory from "../resouce/SubCategory";
import SubCategoryCheckbox from "./SubCategoryCheckbox";
import MaincheckBoxStyles from "../../../css/product/MainCheckBoxStyles.t.module.css";
import { useSetRecoilState } from "recoil";
import { LoadingAtom } from "../../LoadindAtom";

type MainCategoeyCheckboxPropsType = {
    mainCategoey: {
        value: string;
        text: string;
    };
    onSetMainSortList: (value: string) => void;
    onSetSubSortList: (value: string) => void;
    reset : React.MutableRefObject<number>;
};

const MainCategoryCheckbox = (props: MainCategoeyCheckboxPropsType) => {
    const { value, text } = props.mainCategoey;
    const [isChecked, setIsChecked] = useState(false);
    const [countSubChecked, setCountSubChecked] = useState(0);
    const { onSetMainSortList, onSetSubSortList } = props;
    const totalSubCategory = SubCategory.valueOf<SubCategory>(value).subCategory.length;
    const setLoading = useSetRecoilState(LoadingAtom);

    useEffect(() => {
        setLoading(false);
    }, [isChecked]);

    return (
        <>
            <div className={MaincheckBoxStyles.mainCheckBoxDiv}>
                <CheckBox
                    isClicked={isChecked}
                    onSetIsClicked={(isClicked: Boolean) => setIsChecked(!isChecked)}
                    category={props.mainCategoey}
                    onSetSortList={onSetMainSortList}
                />
            </div>
            <div style={{ display: isChecked || countSubChecked > 0 ? "block" : "none" }}>
                {SubCategory.valueOf<SubCategory>(value).subCategory.map((item) => (
                    <SubCategoryCheckbox
                        key={item.text}
                        subCategory={item}
                        onSetSortList={onSetSubSortList}
                        countSubChecked={countSubChecked}
                        setCountSubChecked={setCountSubChecked}
                        totalSubCategory={totalSubCategory}
                        reset={props.reset}
                        SetMainIsChecked={setIsChecked}
                    />
                ))}
            </div>
        </>
    );
};

export default MainCategoryCheckbox;
