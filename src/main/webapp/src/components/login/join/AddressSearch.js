import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const AddressSearch = ({ address, setAddress, setAddressDetail }) => {
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 검색이 완료되면 실행되는 콜백 함수
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== ""
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setAddress(fullAddress); // 검색된 주소를 상태에 저장
      },
    }).open();
  };

  return (
    <div style={{ width: "350px" }}>
      <div onClick={handleAddressSearch} style={{ cursor: "pointer" }}>
        주소 찾기
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <InputGroup size="lg" className={`mt-2 d-flex align-items-center`}>
          <Form.Control
            name="address"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="도로명 주소 검색"
            value={address}
            style={{
              backgroundColor: "#F5F5F5",
              width: "60%",
              fontSize: "0.9rem",
            }}
            readOnly
          />
        </InputGroup>
        <div
          className={`mt-2 d-flex justify-content-center align-items-center rounded`}
          style={{
            width: "25%",
            height: "37px",
            backgroundColor: "#F56084",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
          onClick={handleAddressSearch}
        >
          <span className="text-white">주소 검색</span>
        </div>
      </div>

      <InputGroup size="lg" className={`mt-2`}>
        <Form.Control
          onChange={(e) => setAddressDetail(e.target.value)}
          name="addressDetail"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-lg"
          placeholder="상세 주소"
        />
      </InputGroup>
    </div>
  );
};

export default AddressSearch;
