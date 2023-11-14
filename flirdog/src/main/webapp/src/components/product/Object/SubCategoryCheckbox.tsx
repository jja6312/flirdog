import React, {useCallback, useEffect, useState} from 'react';
import CheckBox from "../resouce/CheckBox";
import SubCheckboxStyles from "../../../css/product/SubCheckBoxStyles.t.module.css";

type SubCategoeyCheckboxPropsType = {
    subCategory: {
        value: string;
        text: string
    }
    onSetSortList: (value: string) => void;
    countSubChecked:number;
    setCountSubChecked: React.Dispatch<React.SetStateAction<number>>;
    reset : React.MutableRefObject<number>;
    totalSubCategory:number;
    SetMainIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubCategoryCheckbox = (props: SubCategoeyCheckboxPropsType) => {
    const [isChecked, setIsChecked] = useState(false)
    const {onSetSortList} = props

    useEffect(() => {
        if(isChecked) {
            props.setCountSubChecked(props.countSubChecked+1)
            if (props.countSubChecked === props.totalSubCategory) {
                props.setCountSubChecked(0)
                setIsChecked(false)
            }
        } else {
            props.setCountSubChecked(props.countSubChecked-1)
        }
    }, [isChecked]);


    useEffect(() => {
        setIsChecked(false)
        props.SetMainIsChecked(false)
        props.setCountSubChecked(0)
    }, [props.reset]);

    return (
        <div className={SubCheckboxStyles.subCheckBoxDiv}>
            <CheckBox
                isClicked={isChecked}
                onSetIsClicked={(isClicked: Boolean) => setIsChecked(!isChecked)}
                category={props.subCategory}
                onSetSortList={onSetSortList}
            />
        </div>
    );
};

export default SubCategoryCheckbox;