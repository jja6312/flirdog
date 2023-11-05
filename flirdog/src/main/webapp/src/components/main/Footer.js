import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import "../../css/main/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <section className="footer-subscription"></section>
      <div class="footer-links">
        <img
          src="/image/main/averageAge.png"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="footer-link-wrapper">
          <div class="footer-link-items">
            <h2>About Us</h2>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              공동 대표 | 김찬영
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              공동 대표 | 김현성
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              공동 대표 | 박기훈
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              공동 대표 | 장종인
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              공동 대표 | 정지안
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              공동 대표 | 최병권
            </Link>
          </div>
          <div class="footer-link-items">
            <h2>More</h2>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              Contact
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              Support
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              Destinations
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              Sponsorships
            </Link>
          </div>
          <div class="footer-link-items">
            <h2>Resources</h2>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              개인정보처리방침
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              이용약관
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              도움말
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              이메일 문의하기
            </Link>
            <Link style={{ color: "#9E9EB1 " }} to="/">
              고객센터 문의
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div style={{ width: "100%", color: "#9E9EB1" }}>
        <p>
          주식회사 평균연령31살 | 통신판매업신고 :
          제2019-서울강남-네이버클라우드캠프 | 사업자등록번호 : 123-45-6789 |
          대표자 : 아저씨6인방
        </p>
        <p>
          Corporation with an Average Age of 31 | Mail-Order Business
          Registration: No. 2019-Seoul-Gangnam-Naver Cloud Camp | Business
          Registration Number: 123-45-6789 | Representatives: The Gentlemen
          Sextet
        </p>
      </div>
    </div>
  );
};

export default Footer;
