import React, { useEffect, useRef } from 'react';

const Kakaopay = () => {
  // useRef를 사용하여 버튼 엘리먼트를 참조
  const buttonRef = useRef(null);

  useEffect(() => {
    // IMP 초기화
    const IMP = window.IMP;
    IMP.init("imp15772586");

    // useRef로 참조한 버튼 엘리먼트를 사용
    const button = buttonRef.current;

    // onClickpay 함수 정의
    const onClickpay = async () => {
      IMP.request_pay({
        pg: "kakaopay",
        pay_method: "card",
        amount: "10",
        name: "강아지껌",
        merchant_uid: "ORD20231203-000005",
      });
    };

    // 버튼이 정상적으로 찾아지면 클릭 이벤트를 할당
    if (button) {
      button.addEventListener("click", onClickpay);
    }

    // cleanup 함수
    return () => {
      // 버튼이 정상적으로 찾아지면 이벤트 핸들러 제거
      if (button) {
        button.removeEventListener("click", onClickpay);
      }
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div>
      {/* 버튼에 ref를 추가하여 참조할 수 있도록 함 */}
      <input type="button" id="naverPayBtn" value="네이버페이 결제 버튼" ref={buttonRef} />
    </div>
  );
};

export default Kakaopay;