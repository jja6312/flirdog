import React, { useState, useRef, useEffect } from "react";
import "../../css/main/HeaderCustomNavDropdownElement.css";
import "../../css/main/HeaderCustomNavDropdownElementMobile.css";
import Dropdown from "react-bootstrap/Dropdown";

const HeaderCustomNavDropdownElement = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        id="categoryDropdown"
        className="custom-dropdown navText mx-2"
        ref={dropdownRef}
      >
        <div
          className="custom-btn custom-dropdown-toggle"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {theme}
        </div>
        <div className={`custom-dropdown-menu ${isOpen ? "custom-show" : ""}`}>
          <a className="custom-dropdown-item" href="#action/3.1">
            자유 게시판
          </a>
          <a className="custom-dropdown-item" href="#action/3.2">
            자랑 게시판
          </a>
          <a className="custom-dropdown-item" href="#action/3.3">
            Q&A
          </a>
            <a className="custom-dropdown-item" href={window.location.pathname !==  "/" ? "../mypage/MypageCategoryWrapper" : "mypage/MypageCategoryWrapper"}>
              마이페이지
            </a> {/* [ 김찬영  2023-11-7 오후 04:42:25 ] */}
        </div>
      </div>
      {/* 여기서부터 모바일 드랍다운*/}
      <Dropdown
        className="custom-dropdown-mobile d-inline navText"
        autoClose="outside"
      >
        <Dropdown.Toggle
          id="dropdown-autoclose-outside "
          className="custom-dropdown-toggle-mobile"
        >
          커뮤니티
        </Dropdown.Toggle>

        <Dropdown.Menu className="custom-dropdown-menu-mobile">
          <Dropdown.Item className="custom-dropdown-item-mobile" href="#">
            자유 게시판
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item-mobile" href="#">
            자랑 게시판
          </Dropdown.Item>
          <Dropdown.Item className="custom-dropdown-item-mobile" href="#">
            Q&A
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default HeaderCustomNavDropdownElement;
