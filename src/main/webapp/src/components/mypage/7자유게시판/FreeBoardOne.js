import React from 'react';
import Header from '../../main/Header';
import Mypage4 from '../../../css/main/100마이페이지/mypage4.module.css';

const FreeBoardOne = () => {
    return (
        <div>
            <Header />
            {/* 최상위 */}
            <div className={Mypage4.div1}>
                {/* 부분전체 */}
                <div className={Mypage4.div2}>
                    {/* 본글 */}
                    <div className={Mypage4.div3}>
                        {/* 제목내용 */}
                        <div className={Mypage4.div4}>
                            {/* 제목 */}
                            <div className={Mypage4.div5}>
                                {/* 강아지아이콘 */}
                                <div className={Mypage4.div5_1}>
                                    <button className={Mypage4.button1}>강아지</button>
                                </div>
                                {/* 제목 */}
                                <h1 className={Mypage4.h1_1}>우리의 반려견을 위한 앱 개발, 여러분의 소중한 의견을 들려주세요.</h1>
                            </div>
                            {/* 내용 */}
                            <div className={Mypage4.div6}>
                                {/* 링크걸시에 */}
                                <a className={Mypage4.a_1} href='https://forms.gle/2Xmvfar6r4agTNne6'>https://forms.gle/2Xmvfar6r4agTNne6</a>
                                {/* 내용 여기밑에 넣어라*/}
                                부탁드립니다ㅜㅜ
                                여러분의 소중한 의견이 필요합니다!!
                            </div>
                            {/* 여백 */}
                            <div  className={Mypage4.div7}></div>
                            {/* 좋아요 싫어요*/}
                            <div className={Mypage4.div8}>
                                <div className={Mypage4.div8_0}>
                                    {/* 좋아요 */}
                                    <div className={Mypage4.div9}>
                                        <div className={Mypage4.div9_0}>
                                            <svg className={Mypage4.svg1}></svg>
                                            <div className={Mypage4.div9_1}>0</div>
                                        </div>
                                    </div>
                                    {/* 싫어요 */}
                                    <div className={Mypage4.div9}>
                                        <div className={Mypage4.div9_0}>
                                            <svg className={Mypage4.svg1}></svg>
                                            <div className={Mypage4.div9_1}>1</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 아이디 */}
                            <div className={Mypage4.div10}>
                                <div className={Mypage4.div11}>
                                    <a className={Mypage4.a_2}>
                                        <img className={Mypage4.img1}></img>
                                        <div className={Mypage4.div12}>
                                            <div className={Mypage4.div12_1}></div>
                                            <div className={Mypage4.div12_2}></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        {/* 여백 */}
                        <div className={Mypage4.div13}></div>
                        {/* 광고 */}
                        <ins className={Mypage4.ins}>
                            <div className={Mypage4.div14}>
                                <iframe className={Mypage4.iframe}>
                                    {/* 여기안에 HTML들어가는데 엄청 복잡해. 아마 못할거같아. 광고링크만 걸어놓고 이미지만따오고 링크걸자.*/}
                                </iframe>
                            </div>
                        </ins>
                        {/* 댓글 */}
                        <div className={Mypage4.div15}>
                            {/* 댓글 숫자 */}
                            <div className={Mypage4.div15_1}></div>
                            {/* 댓글내용 */}
                            <div className={Mypage4.div15_2}></div>
                            {/* 댓글달려있으면 댓글내용, 댓글없으면 댓글을 남겨주세요. */}
                            <div className={Mypage4.div15_3}></div>
                        </div>
                    </div>
                    {/* 인기글 (할수있을진 모르겠지만.. 여기까지는...)*/} 
                    <div className={Mypage4.div16}>
                        {/* 커뮤니티 인기글  */}
                        <div className={Mypage4.div16_1}></div>
                        {/* 인기글 리스트 */}
                        <div className={Mypage4.div16_2}></div>
                    </div>
                    {/* 추천컨텐츠 */}
                    <div className={Mypage4.div17}>
                        {/* 플러독 추천컨텐츠 */}
                        <div className={Mypage4.div17_1}></div>    
                        {/* 컨텐츠내용 */}
                        <div className={Mypage4.div17_2}></div>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default FreeBoardOne;