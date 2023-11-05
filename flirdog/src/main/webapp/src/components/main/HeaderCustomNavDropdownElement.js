import React, { useState, useRef, useEffect } from "react";
import "../../css/main/HeaderCustomNavDropdownElement.css"; // CSS 파일을 컴포넌트와 함께 import합니다.

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
    <div className="custom-dropdown navText mx-2" ref={dropdownRef}>
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
      </div>
    </div>
  );
};

export default HeaderCustomNavDropdownElement;
