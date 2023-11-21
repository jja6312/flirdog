import React from "react";
import Header from "../main/Header";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";

const Test = () => (
  <div>
    <Header />
    <h1 className="mt-3 text-center">가이드라인</h1>
    <hr></hr>
    <div style={{ width: "100%", textAlign: "center" }}>
      <h2 style={{ color: "gray" }}>서론</h2>
      <h4 style={{ color: "gray" }}>
        반응형 웹으로 만들 계획입니다. 휴대폰에서 사용할 때 불편함이
        없어야합니다.
      </h4>
      <h4 style={{ color: "gray" }}>
        한 단계씩 따라하시거나, 필요한 코드를 보면서 이해하시면서
        작업하시면됩니다.
      </h4>
      <hr></hr>
    </div>
    <h3>
      1. 가로 100%로 이미지나오게하기 + 이미지 정배율
      유지하기(objectFit:"cover")
    </h3>
    <img
        alt="1"
      src="/image/test/testImg1.jpg"
      style={{ width: "100%", height: "150px", objectFit: "cover" }}
    />
    <Container className="px-10">
      <h3>2. 반응형으로 좌우공백 유지시키기(Container태그. </h3>
      <h3 style={{ color: "red" }}>
        모든 꾸미는 요소의 상위에 Container className="px-10" 를 써주십시오.
        저희 반응형웹 기초 틀로 가려고합니다.)
      </h3>
      <p>
        Container는 화면이 작아져도 좌우 마진을 유지시켜주고, 유동적인 사이트로
        보이게 해줍니다. px-10는 x축 padding을
      </p>
      <img
          alt="2"
        src="/image/test/testImg1.jpg"
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
    </Container>
    <Container className="px-10">
      <h3>
        3. close 버튼 삽입하기.(1. 리액트부트스트랩 홈페이지 - get started -
        좌측메뉴 중 Components - 하위항목 Close Button들어가기.)
      </h3>
      <p>
        그리고는 import를 퍼와주시고, return 바로뒤에있는 태그를 퍼오시면됩니다.
      </p>
      <p>
        부트스트랩관련 설정(npm 설치 및 index.html에 js,css삽입)은
        다해놓았기때문에, 위 방식만으로 모든 부트스트랩을 사용하실 수 있습니다.
      </p>
      <CloseButton className="mb-5" />
      <h1 style={{ color: "red" }}>그리드란?</h1>
      <h3>
        화면을 그물망처럼 쪼개어, row 클래스와 col클래스로 공간을 할당할 수 있게
        도와주는 field.
      </h3>
      <h4>아래는 그리드의 예시.</h4>

      <h3>한 화면에 이미지를 두개 넣고 싶을 때</h3>
      <div className="row">
        <img alt="1" src="/image/test/testImg1.jpg" className="col-6" />
        <img alt="1" src="/image/test/testImg2.jpg" className="col-6" />
      </div>
      <h3>카드도 마찬가지</h3>
      <div className="row">
        <Card className="col-6">
          <Card.Img alt="1" variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card className="col-6">
          <Card.Img alt="1" variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
      <h3>아래는 한 화면에 이미지를 세개 넣고 싶을 때.</h3>
      <div className="row">
        <img alt="1" src="/image/test/testImg1.jpg" className="col-lg-4 col-12" />
        <img alt="1" src="/image/test/testImg2.jpg" className="col-lg-4 col-12" />
        <img alt="1" src="/image/test/testImg3.jpg" className="col-lg-4 col-12" />
      </div>
      <br></br>
      <h2 style={{ color: "blue" }}>
        아래와 같이 이미지를 정배율로 설정해야합니다.
      </h2>
      <h3>
        아래는 한 화면에 이미지를 세개 넣고, 화면이 커졌을때(휴대폰화면 혹은
        ctrl+마우스휠) 한 줄에 이미지를 두 개 표현하고, 화면이 더 작아지면
        이미지를 하나씩 표현하고싶을 때
      </h3>
      <div className="row">
        <img
            alt="1"
          src="/image/test/testImg1.jpg"
          className="col-lg-4 col-md-6 col-12"
          style={{ objectFit: "cover" }}
        />
        <img
            alt="1"
          src="/image/test/testImg2.jpg"
          className="col-lg-4 col-md-6 col-12"
          style={{ objectFit: "cover" }}
        />
        <img
            alt="1"
          src="/image/test/testImg3.jpg"
          className="col-lg-4 col-md-6 col-12"
          style={{ objectFit: "cover" }}
        />
      </div>
      <hr></hr>
      <h3>아래는 레드 박스에 대한 설정.</h3>
      <br></br>
      <h3>(p-5)</h3>
      <h4>padding을 높은수준으로 먹임. 1~5까지 강도설정가능.</h4>
      <br></br>
      <h3>(col-xl-4)</h3>
      <h4>일반 화면에서 4/12(33%)만큼 가로를 차지함. </h4>
      <br></br>
      <h3>(col-lg-6)</h3>
      <h4>적당히 확대되면 6/12(50%)만큼 가로를 차지함. </h4>
      <br></br>
      <h3>(col-md-8)</h3>
      <h4>
        태블릿만큼 화면이 작아지면(즉 확대되면) 8/12(66%) 만큼 가로를 차지함.
      </h4>
      <h3>(col-12)</h3>
      <h4>
        휴대폰만큼 화면이 작아지면(즉 확대되면) 12/12(100%)만큼 가로를 차지함.
      </h4>
      <div className="row">
        <div
          className="col-xl-4 col-lg-6 col-md-8 col-12 p-5"
          style={{ height: 40, backgroundColor: "red" }}
        ></div>
        <div
          className="col-4"
          style={{ height: 40, backgroundColor: "blue" }}
        ></div>
        <div
          className="col-4"
          style={{ height: 40, backgroundColor: "green" }}
        ></div>
      </div>
    </Container>
  </div>
);

export default Test;
