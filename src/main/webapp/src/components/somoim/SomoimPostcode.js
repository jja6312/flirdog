import React, { useEffect, useState } from 'react';

import DaumPostcode from 'react-daum-postcode';

const SomoimPostcode = ({ onAddressChange, isOpen, onClose }) => {
    
    const [inputAddressValue, setInputAddressValue] = useState('');
    const [inputZipCodeValue, setInputZipCodeValue] = useState('');

    useEffect(() => {
        // isOpen 값이 변경될 때마다 modalState 업데이트
        setInputAddressValue('');
        setInputZipCodeValue('');
      }, [isOpen]);

    const postCodeStyle = {
        width: '400px',
        height: '400px',
        display: isOpen ? 'block' : 'none',
    }; // 스타일 정의 code

    const onCompletePost = data => {
         setInputAddressValue(data.userSelectedType === 'R'? data.roadAddress : data.jibunAddress);
         setInputZipCodeValue(data.zonecode);

         onAddressChange(data);
         onClose();
    }; // onCompletePost 함수

    return (
        <DaumPostcode
            style={postCodeStyle}
            onComplete={onCompletePost}
        >
            
        </DaumPostcode> 
    );
};

export default SomoimPostcode;