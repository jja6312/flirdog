import React, {useEffect, useRef, useState} from "react";
import styleDesktop from "../../css/main/HeaderCustomNavDropdownElement.module.css";
import styleMobile from "../../css/main/HeaderCustomNavDropdownElementMobile.module.css";
import Dropdown from "react-bootstrap/Dropdown";

const HeaderCustomNavDropdownElement = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        id={styleMobile.categoryDropdown}
        className={`${styleDesktop.customDropdown} navText mx-2`}
        ref={dropdownRef}
      >
        <div
          className={`${styleDesktop.customBtn} ${styleDesktop.customDropdownToggle}`}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {theme}
        </div>
        <div
          className={`${styleDesktop.customDropdownMenu} ${
            isOpen ? styleDesktop.customShow : ""
          }`}
        >
          <a className={styleDesktop.customDropdownItem} href={`${window.location.origin}/mypage/FreeBoard`}>
            자유 게시판
          </a>
          <a className={styleDesktop.customDropdownItem} href="#action/3.2">
            자랑 게시판
          </a>
          <a className={styleDesktop.customDropdownItem} href="#action/3.3">
            Q&A
          </a>
          <a
            className={styleDesktop.customDropdownItem}
            href={
              window.location.pathname !== "/"
                ? `${window.location.origin}/mypage/MypageMain` // 현재 페이지가 메인페이지가 아닐 경우 절대 경로로 이동
                : `${window.location.origin}/mypage/MypageMain`
                // : "mypage/MypageCategoryWrapper" 테스트화면
            }
          >
            마이페이지
          </a>
          <a className={styleDesktop.customDropdownItem} href={`${window.location.origin}/mypage/WeatherAndStroll`}>
            집사생활
          </a>
        </div>
      </div>

      {/* 모바일 드랍다운 */}
      <Dropdown
        className={`${styleMobile.customDropdownMobile} d-inline navText`}
        autoClose="outside"
      >
        <Dropdown.Toggle
          id="dropdown-autoclose-outside"
          className={styleMobile.customDropdownToggleMobile}
        >
          커뮤니티
        </Dropdown.Toggle>

        <Dropdown.Menu className={styleMobile.customDropdownMenuMobile}>
          <Dropdown.Item
            className={styleMobile.customDropdownItemMobile}
            href="#"
          >
            자유 게시판
          </Dropdown.Item>
          <Dropdown.Item
            className={styleMobile.customDropdownItemMobile}
            href="#"
          >
            자랑 게시판
          </Dropdown.Item>
          <Dropdown.Item
            className={styleMobile.customDropdownItemMobile}
            href="#"
          >
            Q&A
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default HeaderCustomNavDropdownElement;
