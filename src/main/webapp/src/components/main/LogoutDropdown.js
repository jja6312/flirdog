import React, { useContext, useEffect, useRef, useState } from "react";
import styleDesktop from "../../css/main/HeaderCustomNavDropdownElement.module.css";
import styleMobile from "../../css/main/HeaderCustomNavDropdownElementMobile.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../../contexts/UserContext";

const LogoutDropdown = ({ myDogsInfo, storedUser }) => {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logoutBtn = () => {
    logout();
  };

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
          className={`${styleDesktop.customBtn}`}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="d-flex justify-content-center align-items-center">
            <svg
              style={{ fill: "white", widht: 20, height: 20, marginLeft: 15 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
            <img
              className="rounded-circle"
              src={
                myDogsInfo
                  ? `https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-112/flirdogStorage/aiDogProfile/${myDogsInfo.imageAiProfile}`
                  : "/image/nullImage/nullImage2.png"
              }
              style={{ width: 40, height: 40, marginLeft: 5 }}
            />
          </div>
        </div>
        <div
          className={`${styleDesktop.customDropdownMenu} ${
            isOpen ? styleDesktop.customShow : ""
          }`}
        >
          <a
            className={styleDesktop.customDropdownItem}
            href={
              window.location.pathname !== "/"
                ? `${window.location.origin}/mypage/MypageMain` // 현재 페이지가 메인페이지가 아닐 경우 절대 경로로 이동
                : `${window.location.origin}/mypage/MypageMain`
              //: "mypage/MypageCategoryWrapper" 테스트화면
            }
          >
            마이페이지
          </a>
          <a
            className={styleDesktop.customDropdownItem}
            style={{ cursor: "pointer" }}
            onClick={logoutBtn}
          >
            로그아웃
          </a>
          {storedUser.userRole === "ADMIN" && (
            <a
              className={styleDesktop.customDropdownItem}
              href={`${window.location.origin}/admin`}
            >
              관리자페이지
            </a>
          )}
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
          내정보
        </Dropdown.Toggle>

        <Dropdown.Menu className={styleMobile.customDropdownMenuMobile}>
          <Dropdown.Item
            className={styleMobile.customDropdownItemMobile}
            href="#"
          >
            마이페이지
          </Dropdown.Item>
          <Dropdown.Item
            className={styleMobile.customDropdownItemMobile}
            href="#"
          >
            로그아웃
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default LogoutDropdown;
