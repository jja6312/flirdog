import React from "react";
import CommunityBtnContainer from "./CommunityBtnContainer";
import CommunityWrite from "./CommunityWrite";
import Container from "react-bootstrap/esm/Container";
import NavigateBtn from "../NavigateBtn";

const CommunityMain = () => {
  return (
    <>
      <Container className="px-10">
        <div className="row mt-8">
          <CommunityBtnContainer></CommunityBtnContainer>
        </div>

        <div className="row mt-1">
          <div className=" col-12 col-xl-6 communityWriteElementContainer">
            <div className="communityWriteElement">
              <CommunityWrite
                title="개떡ㅁㅌㅊ?ㅋㅋ"
                createdDate="1시간 전"
                author="시바이누"
                imgSrc="/image/main/exam/community1.png"
                number={1}
              ></CommunityWrite>
              <CommunityWrite
                title="점심나가서먹을것같아점심나가서먹을것같아점심나가서먹을것같아"
                createdDate="4시간 전"
                author="우리집개똥안먹어요"
                imgSrc="/image/main/exam/community2.png"
                number={2}
              ></CommunityWrite>
              <CommunityWrite
                title="우리집 꽃개 ㅋㅋ"
                createdDate="17시간 전"
                author="익명"
                imgSrc="/image/main/exam/community3.png"
                number={3}
              ></CommunityWrite>
              <CommunityWrite
                title="개죽이 근황"
                createdDate="1일 전"
                author="2000년에도사람이태어난다고"
                imgSrc="/image/main/exam/community4.png"
                number={4}
              ></CommunityWrite>
              <CommunityWrite
                title="떡으로 우리집개 피규어 만들었다"
                createdDate="2시간 전"
                author="잘만들었으면개추"
                imgSrc="/image/main/exam/community5.png"
                number={5}
              ></CommunityWrite>
            </div>
          </div>
          <div className=" col-12 col-xl-6 communityWriteElementContainer">
            <div className="communityWriteElement">
              <CommunityWrite
                title="인기글 도전한다"
                createdDate="3시간 전"
                author="시바이누"
                imgSrc="/image/main/exam/community6.png"
                number={6}
              ></CommunityWrite>
              <CommunityWrite
                title="우리집 강아지 너무 잘 먹음"
                createdDate="5시간 전"
                author="돼지개"
                imgSrc="/image/main/exam/community7.png"
                number={7}
              ></CommunityWrite>
              <CommunityWrite
                title="시바견 기엽누"
                createdDate="9시간 전"
                author="시바수바"
                imgSrc="/image/main/exam/community8.png"
                number={8}
              ></CommunityWrite>
              <CommunityWrite
                title="보신탕 맛집 리스트 공유합니다"
                createdDate="2시간 전"
                author="건강이최고"
                imgSrc="/image/main/exam/community9.png"
                number={9}
              ></CommunityWrite>
              <CommunityWrite
                title="울집 강아지 이정도면 잘생겼나요?"
                createdDate="5분 전"
                author="팔불출레전드"
                imgSrc="/image/main/exam/community10.png"
                number={10}
              ></CommunityWrite>
            </div>
          </div>
        </div>
        <div className="mt-7 d-flex justify-content-center align-items-center">
          <NavigateBtn
            text="커뮤니티 이동"
            url="/"
            fontSize="2.5vw"
            btnWidth="25vw"
            btnHeight="80px"
          ></NavigateBtn>
        </div>
      </Container>
    </>
  );
};

export default CommunityMain;
