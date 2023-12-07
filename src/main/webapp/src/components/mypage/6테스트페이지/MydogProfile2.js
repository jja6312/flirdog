import React from 'react';
import Mypage5 from  '../../../css/main/100마이페이지/mypage5.module.css';
const MydogProfile2 = () => {

    return (
        <div>
            {/* 전체 컨텐츠 */}
            <div className={Mypage5.boardDiv1}>
                {/* 가운데정렬 */}
                <div className={Mypage5.boardDiv2}>
                    {/* MarginTop */}
                    <div className={Mypage5.boardDiv3}>
                        {/* 컨텐츠 하나임 */}
                        <div className={Mypage5.boardDiv4}>
                            {/* 컨텐츠 하나 상단부분 내용이랑 사진부분 */}
                            <div className={Mypage5.boardDiv5}>
                                {/* 내용이랑 제목이랑 같이 나오는 곳 왼쪽 부분 */}
                                <div className={Mypage5.boardDiv6}>
                                    {/* 그림나오는 부분 두군데 */}
                                    <div className={Mypage5.boardDiv7}>
                                        {/* 강아지 부분 */}
                                        <div className={Mypage5.boardDiv8}>
                                            <img className={Mypage5.boardImg}></img>
                                            <div>강아지</div>
                                        </div>
                                        {/* 강아지종류부분 */}
                                        <div className={Mypage5.boardDiv9}>
                                            <div className={Mypage5.boardDiv9_1}>
                                                <img className={Mypage5.boardImg}></img>
                                            </div>
                                            <div className={Mypage5.boardDiv9_2}>닥스훈트</div>
                                        </div>
                                    </div>
                                    <div className={Mypage5.boardDiv10}></div>
                                    <div className={Mypage5.boardDiv11}></div>
                                </div>
                                {/* 오른쪽 부분 이미지 */}
                                <div className={Mypage5.boardDiv12}>
                                    <span className={Mypage5.boardSpan1}>
                                        <img className={Mypage5.boardImg1}>
                                        </img>
                                    </span>
                                </div>
                            </div>
                            {/* 내용 하단에 닉네임 댓글 시간 표시하는 곳 */}
                            <div className={Mypage5.boardDiv13}>
                                {/* 이미지랑 닉네임부분 */}
                                <a className={Mypage5.boardA1}>
                                    <img className={Mypage5.boardImg2}></img>
                                    <div className={Mypage5.boardDiv14}></div>
                                </a>
                                {/* 댓글 */}
                                <div className={Mypage5.boardDiv15}></div>
                                {/* N분전 */}
                                <div className={Mypage5.boardDiv16}></div>
                            </div>
                            {/* 밑에 의미없는 부분 */}
                            <div className={Mypage5.boardDiv17}>
                                <div className={Mypage5.boardDiv18}></div>
                            </div>
                            {/* 밑줄 */}
                            <hr className={Mypage5.boardHr1}></hr>
                        </div>
                    </div>
                </div>
            </div>
            {/* 밑에 페이징처리 있는데 그냥 하지마. */}

        </div>
    );
};
export default MydogProfile2;