import React from 'react';
import Header from '../../main/Header';
import Mypage3 from '../../../css/main/100마이페이지/mypage3.module.css';
// 특정한 이미지 주소를 import하는 방법.밑에서 이미지 쓸거임
import pen  from './pen.png';
import { Link } from 'react-router-dom';
const FreeBoard = () => {
    
    const handleInputChange = () => {
        // 오류 방지용. 나중에 지울 것.
    }
    // div1, div7 접어서 보면 보기 편함.
    return (
        <div>
            <Header/>
            {/* 검색 이랑 에 인기 게시판 */}
            <div className={Mypage3.div1}>
                <div className={Mypage3.div2}>
                    <div className={Mypage3.div3}>
                        <input className={Mypage3.input1}  placeholder="찾으시는 게시판 글이 있으신가요?" maxLength="130"  enterKeyHint="search" value="" onChange={handleInputChange}></input>
                    </div>
                    <div>
                        <div className={Mypage3.div4}>인기 자유게시판</div>
                        <div className={Mypage3.div5}>{/* 인기게시판 내용들 */}
                            <div className={Mypage3.div6}>
                              <Link to="/mypage/FreeBoardOne" className={Mypage3.LinkReset}>
                                <div className={Mypage3.div6_1}>
                                    <div className={Mypage3.div6_2}>
                                        <img  src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                        <div>강아지</div>
                                    </div>
                                    <div className={Mypage3.div6_2_1}>강아지랑 스튜디오에서 사진찍었어요</div>
                                    <div className={Mypage3.div6_2_2}>
                                        <div className={Mypage3.div6_2_3_1}>
                                            고양이와 사진 찍는 건 참 어려운 일이라 매번 고민만했었는데요! 이번에 기회가 되어 여름겨울이와 함께 사진을 찍어봤습니다!

                                            제가 찍은 곳은 사진작가 없이 셀프로 촬영할 수 있는
                                            곳이라 낯선장소에서 낯가림이 심한 고양이들에게 괜찮은 스튜디오더라구요! 

                                            물론 성격에 따라 불가능한 고양이들도 있을 수 있습니다! 최대한 아이들 스트레스 안받게 하는 게
                                            중요하니 혹시라도 사진을 찍고싶은 집사님들은 반려동물의 성향을 잘 파악하셔야할 것 같아용 

                                            저희는 촬영 시간은 10분 이내로 끝내서 
                                            아이들이 크게 스트레스 받는 일 없이 무사히 끝날 수 있었어요🫶

                                            인생샷 남겨서 너무나 좋았던 하루였네용
                                        </div>
                                        <div className={Mypage3.div6_2_3_2}>
                                            <span>댓글 7</span>
                                            <span>날짜20231128</span>
                                        </div>
                                    </div>
                                </div>
                              </Link>
                              
                              <Link to="/mypage/FreeBoardOne" className={Mypage3.LinkReset}>
                                <div className={Mypage3.div6_1}>
                                    <div className={Mypage3.div6_2}>
                                        <img  src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                        <div>강아지</div>
                                    </div>
                                    <div className={Mypage3.div6_2_1}>강아지랑 스튜디오에서 사진찍었어요</div>
                                    <div className={Mypage3.div6_2_2}>
                                        <div className={Mypage3.div6_2_3_1}>
                                            고양이와 사진 찍는 건 참 어려운 일이라 매번 고민만했었는데요! 이번에 기회가 되어 여름겨울이와 함께 사진을 찍어봤습니다!

                                            제가 찍은 곳은 사진작가 없이 셀프로 촬영할 수 있는
                                            곳이라 낯선장소에서 낯가림이 심한 고양이들에게 괜찮은 스튜디오더라구요! 

                                            물론 성격에 따라 불가능한 고양이들도 있을 수 있습니다! 최대한 아이들 스트레스 안받게 하는 게
                                            중요하니 혹시라도 사진을 찍고싶은 집사님들은 반려동물의 성향을 잘 파악하셔야할 것 같아용 

                                            저희는 촬영 시간은 10분 이내로 끝내서 
                                            아이들이 크게 스트레스 받는 일 없이 무사히 끝날 수 있었어요🫶

                                            인생샷 남겨서 너무나 좋았던 하루였네용
                                        </div>
                                        <div className={Mypage3.div6_2_3_2}>
                                            <span>댓글 7</span>
                                            <span>날짜20231128</span>
                                        </div>
                                    </div>
                                </div>
                              </Link>
                              
                              <Link to="/mypage/FreeBoardOne" className={Mypage3.LinkReset}>
                                <div className={Mypage3.div6_1}>
                                    <div className={Mypage3.div6_2}>
                                        <img  src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                        <div>강아지</div>
                                    </div>
                                    <div className={Mypage3.div6_2_1}>강아지랑 스튜디오에서 사진찍었어요</div>
                                    <div className={Mypage3.div6_2_2}>
                                        <div className={Mypage3.div6_2_3_1}>
                                            고양이와 사진 찍는 건 참 어려운 일이라 매번 고민만했었는데요! 이번에 기회가 되어 여름겨울이와 함께 사진을 찍어봤습니다!

                                            제가 찍은 곳은 사진작가 없이 셀프로 촬영할 수 있는
                                            곳이라 낯선장소에서 낯가림이 심한 고양이들에게 괜찮은 스튜디오더라구요! 

                                            물론 성격에 따라 불가능한 고양이들도 있을 수 있습니다! 최대한 아이들 스트레스 안받게 하는 게
                                            중요하니 혹시라도 사진을 찍고싶은 집사님들은 반려동물의 성향을 잘 파악하셔야할 것 같아용 

                                            저희는 촬영 시간은 10분 이내로 끝내서 
                                            아이들이 크게 스트레스 받는 일 없이 무사히 끝날 수 있었어요🫶

                                            인생샷 남겨서 너무나 좋았던 하루였네용
                                        </div>
                                        <div className={Mypage3.div6_2_3_2}>
                                            <span>댓글 7</span>
                                            <span>날짜20231128</span>
                                        </div>
                                    </div>
                                </div>
                              </Link>
                                
                              <Link to="/mypage/FreeBoardOne" className={Mypage3.LinkReset}>
                                <div className={Mypage3.div6_1}>
                                    <div className={Mypage3.div6_2}>
                                        <img  src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                        <div>강아지</div>
                                    </div>
                                    <div className={Mypage3.div6_2_1}>강아지랑 스튜디오에서 사진찍었어요</div>
                                    <div className={Mypage3.div6_2_2}>
                                        <div className={Mypage3.div6_2_3_1}>
                                            고양이와 사진 찍는 건 참 어려운 일이라 매번 고민만했었는데요! 이번에 기회가 되어 여름겨울이와 함께 사진을 찍어봤습니다!

                                            제가 찍은 곳은 사진작가 없이 셀프로 촬영할 수 있는
                                            곳이라 낯선장소에서 낯가림이 심한 고양이들에게 괜찮은 스튜디오더라구요! 

                                            물론 성격에 따라 불가능한 고양이들도 있을 수 있습니다! 최대한 아이들 스트레스 안받게 하는 게
                                            중요하니 혹시라도 사진을 찍고싶은 집사님들은 반려동물의 성향을 잘 파악하셔야할 것 같아용 

                                            저희는 촬영 시간은 10분 이내로 끝내서 
                                            아이들이 크게 스트레스 받는 일 없이 무사히 끝날 수 있었어요🫶

                                            인생샷 남겨서 너무나 좋았던 하루였네용
                                        </div>
                                        <div className={Mypage3.div6_2_3_2}>
                                            <span>댓글 7</span>
                                            <span>날짜20231128</span>
                                        </div>
                                    </div>
                                </div>
                              </Link>
                                
                              <Link to="/mypage/FreeBoardOne" className={Mypage3.LinkReset}>
                                <div className={Mypage3.div6_1}>
                                    <div className={Mypage3.div6_2}>
                                        <img  src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                        <div>강아지</div>
                                    </div>
                                    <div className={Mypage3.div6_2_1}>강아지랑 스튜디오에서 사진찍었어요</div>
                                    <div className={Mypage3.div6_2_2}>
                                        <div className={Mypage3.div6_2_3_1}>
                                            고양이와 사진 찍는 건 참 어려운 일이라 매번 고민만했었는데요! 이번에 기회가 되어 여름겨울이와 함께 사진을 찍어봤습니다!

                                            제가 찍은 곳은 사진작가 없이 셀프로 촬영할 수 있는
                                            곳이라 낯선장소에서 낯가림이 심한 고양이들에게 괜찮은 스튜디오더라구요! 

                                            물론 성격에 따라 불가능한 고양이들도 있을 수 있습니다! 최대한 아이들 스트레스 안받게 하는 게
                                            중요하니 혹시라도 사진을 찍고싶은 집사님들은 반려동물의 성향을 잘 파악하셔야할 것 같아용 

                                            저희는 촬영 시간은 10분 이내로 끝내서 
                                            아이들이 크게 스트레스 받는 일 없이 무사히 끝날 수 있었어요🫶

                                            인생샷 남겨서 너무나 좋았던 하루였네용
                                        </div>
                                        <div className={Mypage3.div6_2_3_2}>
                                            <span>댓글 7</span>
                                            <span>날짜20231128</span>
                                        </div>
                                    </div>
                                </div>
                              </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={Mypage3.hr}/>
            
            {/* 하단에 필터링 부분 이랑 글쓰기 부분이랑 페이징 까지 */}
            <div className={Mypage3.div7}>
                <div className={Mypage3.div8}>
                    <div className={Mypage3.div9}>
                        <div className={Mypage3.div9_1}>
                            <input className={Mypage3.input2} type="radio" id="new" name="question" value="최신 순" onChange={handleInputChange} />
                            <label htmlFor="new">최신 순</label>
                        </div>
                        <div className={Mypage3.div9_1}>
                            <input className={Mypage3.input2} type="radio" id="answer" name="question" value="답변 수 순" onChange={handleInputChange} />
                            <label htmlFor="answer">답변수 순</label>
                        </div>
                        <div className={Mypage3.div9_1}>
                            <input className={Mypage3.input2} type="radio" id="popularity" name="question" value="인기 순" onChange={handleInputChange} />
                            <label htmlFor="popularity">인기 순</label>
                        </div>
                    </div>
                </div>
                <div className={Mypage3.div10}>{/* 내용이랑 필터링 글쓰기  */}
                    <div className={Mypage3.div11}> {/* 내용 */}
                        <div className={Mypage3.div12}> {/* div12가 반복되어야 내용이 밑으로 쭈욱 나옴. */}
                            <div className={Mypage3.div13}>
                                <div className={Mypage3.div14}>
                                    <div className={Mypage3.div14_1}>
                                        <div className={Mypage3.div14_1_1}>
                                            <img src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                            <div>강아지</div>
                                        </div>
                                    </div>
                                    <div  className={Mypage3.div14_2_plus}>정보글) 강아지가 아플때 보내는 신호들</div>
                                    <div className={Mypage3.div14_2}>
                                    1.보호자의 손길을 피해요

                                    2.움직임이 줄어들고 자는 시간이 늘어요

                                    3.식욕이 줄어들어요

                                    4.배변 실수가 잦아요.

                                    5.보호자에게 과도하게 집착해요

                                    6.과민반응을 보여요.

                                    7.불안해보여요
                                    </div>
                                    <div className={Mypage3.div14_3}></div>
                                </div>
                            </div>
                            <div className={Mypage3.div15}>
                                <a className={Mypage3.div15_0}>
                                    <img src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}} ></img>
                                    <div className={Mypage3.div15_01}>코코아빠</div>
                                </a>
                                <div className={Mypage3.div15_1}>댓글 : 0</div>
                                <div className={Mypage3.div15_2}>2 분전</div>
                            </div>
                            <div className={Mypage3.div16}>
                                <div className={Mypage3.div16_1}></div>
                            </div>
                            <hr className={Mypage3.hr1}></hr>
                        </div>
                        <div className={Mypage3.div12}> {/* div12가 반복되어야 내용이 밑으로 쭈욱 나옴. */}
                            <div className={Mypage3.div13}>
                                <div className={Mypage3.div14}>
                                    <div className={Mypage3.div14_1}>
                                        <div className={Mypage3.div14_1_1}>
                                            <img src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                            <div>강아지</div>
                                        </div>
                                    </div>
                                    <div  className={Mypage3.div14_2_plus}>정보글) 강아지가 아플때 보내는 신호들</div>
                                    <div className={Mypage3.div14_2}>
                                    1.보호자의 손길을 피해요

                                    2.움직임이 줄어들고 자는 시간이 늘어요

                                    3.식욕이 줄어들어요

                                    4.배변 실수가 잦아요.

                                    5.보호자에게 과도하게 집착해요

                                    6.과민반응을 보여요.

                                    7.불안해보여요
                                    </div>
                                    <div className={Mypage3.div14_3}></div>
                                </div>
                            </div>
                            <div className={Mypage3.div15}>
                                <a className={Mypage3.div15_0}>
                                    <img src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}} ></img>
                                    <div className={Mypage3.div15_01}>코코아빠</div>
                                </a>
                                <div className={Mypage3.div15_1}>댓글 : 0</div>
                                <div className={Mypage3.div15_2}>2 분전</div>
                            </div>
                            <div className={Mypage3.div16}>
                                <div className={Mypage3.div16_1}></div>
                            </div>
                            <hr className={Mypage3.hr1}></hr>
                        </div>
                        <div className={Mypage3.div12}> {/* div12가 반복되어야 내용이 밑으로 쭈욱 나옴. */}
                            <div className={Mypage3.div13}>
                                <div className={Mypage3.div14}>
                                    <div className={Mypage3.div14_1}>
                                        <div className={Mypage3.div14_1_1}>
                                            <img src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}}></img>
                                            <div>강아지</div>
                                        </div>
                                    </div>
                                    <div  className={Mypage3.div14_2_plus}>정보글) 강아지가 아플때 보내는 신호들</div>
                                    <div className={Mypage3.div14_2}>
                                    1.보호자의 손길을 피해요

                                    2.움직임이 줄어들고 자는 시간이 늘어요

                                    3.식욕이 줄어들어요

                                    4.배변 실수가 잦아요.

                                    5.보호자에게 과도하게 집착해요

                                    6.과민반응을 보여요.

                                    7.불안해보여요
                                    </div>
                                    <div className={Mypage3.div14_3}></div>
                                </div>
                            </div>
                            <div className={Mypage3.div15}>
                                <a className={Mypage3.div15_0}>
                                    <img src='https://bemypet.kr/icons/community/ANIMALICON_DOG_RIRI.svg' alt='' style={{width:'20px',borderRadius:'100%'}} ></img>
                                    <div className={Mypage3.div15_01}>코코아빠</div>
                                </a>
                                <div className={Mypage3.div15_1}>댓글 : 0</div>
                                <div className={Mypage3.div15_2}>2 분전</div>
                            </div>
                            <div className={Mypage3.div16}>
                                <div className={Mypage3.div16_1}></div>
                            </div>
                            <hr className={Mypage3.hr1}></hr>
                        </div>
                    </div>
                    <div className={Mypage3.div17}> {/* 필터링과글쓰기 */}
                        <div className={Mypage3.div18}>
                            <button className={Mypage3.div19}>
                                <img className={Mypage3.div20} src={pen} style={{width:'20px', borderRadius:'100%'}}/>
                                <span>글쓰기</span>
                            </button>
                        </div>
                        <div className={Mypage3.div21}>
                            <div className={Mypage3.div22}>
                                <div className={Mypage3.div23}>
                                    <label>
                                        <div className={Mypage3.div24}>강아지종류</div>
                                    </label>
                                    <div className={Mypage3.div25}>
                                        <img src='https://bemypet.kr/icons/community/ICON_EXPAND_MORE.svg' className={Mypage3.imageCheck} style={{width:'20px', borderRadius:'100%'}}></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  className={Mypage3.div22}>
                            <img src='https://bemypet.kr/icons/community/ICON_REFRESH.svg'></img>
                            <div>필터초기화</div>
                        </div>
                    </div>
                </div>
                <ul className={Mypage3.pagination}>{/* 페이징 */}
                    <li> 
                        <a>‹</a>
                    </li>
                    <li>
                        <a>...</a>
                    </li>
                    <li>
                        <a>1</a>
                    </li>
                    <li>
                        <a>2</a>
                    </li>
                    <li>
                        <a>3</a>
                    </li>
                    <li>
                        <a>4</a>
                    </li>
                    <li>
                        <a>5</a>
                    </li>
                    <li>
                        <a>...</a>
                    </li>
                    <li>
                        <a>›</a>
                    </li>
                </ul>
                <button>{/* 글쓰기 버튼  */}
                    <img src=''/> 
                </button>
            </div>
        </div>
    );
};

export default FreeBoard;