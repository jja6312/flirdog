import React from 'react';
import styles from "../../../css/product/checkBox.t.module.css";

type CheckboxProps = {
    isClicked : boolean;
    onSetIsClicked : (isClicked : Boolean) => void;
    category : {
        value:string;
        text:string
    };
    onSetSortList : (value : string) => void;
}

const CheckBox = (props : CheckboxProps) => {
    return (
        <>
            <div className={styles.checkBoxDiv}>
                {props.isClicked ? (
                    <svg
                        className={`${styles.checkBox} `}
                        onClick={() => {
                                props.onSetIsClicked(!props.isClicked);
                                props.onSetSortList(props.category.value);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        values={props.category.value}
                    >
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                ) : (
                    <svg
                        className={`${styles.checkBox} `}
                        onClick={() => {
                            props.onSetIsClicked(!props.isClicked);
                            props.onSetSortList(props.category.value);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        values={props.category.value}
                    >
                        <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                )}
            </div>{props.category.text}
        </>
    );
};

export default CheckBox;