import React, {useState} from 'react';
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