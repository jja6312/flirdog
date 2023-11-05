import React, { useState, useRef, useEffect } from "react";

const HeaderCustomNavDropdown = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // dropdownRef가 존재하고, 클릭된 요소가 dropdownRef 내부에 포함되지 않으면
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // isOpen 상태를 false로 설정한다.
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // 이벤트가 document까지 전파되는 것을 방지
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        className="btn custom-dropdown-toggle navText"
        type="button"
        id="dropdownMenuButton"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        {theme}
      </button>
      {isOpen && (
        <div
          className="custom-dropdown-menu"
          aria-labelledby="dropdownMenuButton"
        >
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
      )}
    </div>
  );
};

export default HeaderCustomNavDropdown;
