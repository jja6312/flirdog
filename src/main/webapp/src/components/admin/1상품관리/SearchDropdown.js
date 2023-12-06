import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const SearchDropdown = ({
  selectedDropdown,
  setSelectedDropdown,
  setPlaceHolderUseState,
  type,
}) => {
  const dropdownList = {
    product: ["상품 이름", "상품 번호"],
    user: ["유저 이름", "유저 아이디", "유저 이메일", "애견 아이디"],
    dog: ["애견 아이디", "애견 이름", "애견 견종"],
    matching: [
      "매칭 제목",
      "매칭 아이디",
      "유저 아이디",
      "애견 아이디",
      "애견 이름",
    ],
  };

  const [dropdownListAsType, setDropdownListAsType] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelect = (e) => {
    setSelectedDropdown(e.target.innerText);
    if (e.target.innerText === "매칭 제목") {
      setPlaceHolderUseState("제목을 입력하세요");
    } else if (e.target.innerText === "유저 아이디") {
      setPlaceHolderUseState("유저 아이디를 입력하세요");
    } else if (e.target.innerText === "유저 이메일") {
      setPlaceHolderUseState("유저 이메일을 입력하세요");
    } else if (e.target.innerText === "애견 아이디") {
      setPlaceHolderUseState("애견 아이디를 입력하세요");
    } else if (e.target.innerText === "애견 이름") {
      setPlaceHolderUseState("애견 이름을 입력하세요");
    } else if (e.target.innerText === "매칭 아이디") {
      setPlaceHolderUseState("매칭 아이디를 입력하세요");
    } else if (e.target.innerText === "애견 견종") {
      setPlaceHolderUseState("애견 견종을 입력하세요");
    } else if (e.target.innerText === "상품 이름") {
      setPlaceHolderUseState("상품 이름을 입력하세요");
    } else if (e.target.innerText === "상품 번호") {
      setPlaceHolderUseState("상품 아이디를 입력하세요");
    } else if (e.target.innerText === "유저 이름") {
      setPlaceHolderUseState("유저 이름을 입력하세요");
    }

    setShowDropdown(false);
  };

  useEffect(() => {
    if (type === "product") {
      setDropdownListAsType(dropdownList.product);
    } else if (type === "user") {
      setDropdownListAsType(dropdownList.user);
    } else if (type === "dog") {
      setDropdownListAsType(dropdownList.dog);
    } else if (type === "matching") {
      setDropdownListAsType(dropdownList.matching);
    }
  }, []);

  return (
    <>
      <Dropdown
        show={showDropdown}
        onToggle={() => setShowDropdown(!showDropdown)}
        alignRight
      >
        <Dropdown.Toggle
          style={{
            width: 120,
            height: 50,
            backgroundColor: "#F56084",
            border: "none",
          }}
          id="dropdown-basic"
        >
          {selectedDropdown || "선택"}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ maxHeight: "200px", overflow: "auto" }}>
          {dropdownListAsType &&
            dropdownListAsType.map((item) => (
              <Dropdown.Item onClick={handleSelect}>{item}</Dropdown.Item>
            ))}

          {/* <Dropdown.Item name="title" onClick={handleSelect}>
            매칭 제목
          </Dropdown.Item>
          <Dropdown.Item name="userId" onClick={handleSelect}>
            유저 아이디
          </Dropdown.Item>
          <Dropdown.Item name="email" onClick={handleSelect}>
            유저 이메일
          </Dropdown.Item>
          <Dropdown.Item name="dogId" onClick={handleSelect}>
            애견 아이디
          </Dropdown.Item>
          <Dropdown.Item name="dogName" onClick={handleSelect}>
            애견 이름
          </Dropdown.Item>
          <Dropdown.Item name="matchingId" onClick={handleSelect}>
            매칭 아이디
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default SearchDropdown;
