// 이 줄을 제거하세요.
// import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../main/Header';
import smmile from './smmile.jpg';
import normaldog from './normaldog.jpg';
import saddog from './saddog.jpg';
import Container from 'react-bootstrap/esm/Container';

const WeatherAndStroll = () => {
    const API_KEY = "1e7c80253e0b45e8952c959aa383dda5"; 
    const [location, setLocation] = useState('SEOUL');
    const [result, setResult] = useState({});
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},Korea&appid=${API_KEY}`;
    //https://api.openweathermap.org/data/2.5/weather?q=Seoul,Korea&appid=1e7c80253e0b45e8952c959aa383dda5 이거 긁어서 검색창에 넣고 test.json에 갖다붙이시오.
    //현재날짜 가져오기
    const today = new Date();

    const formmattedDate = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일 `;

    useEffect(() => {
      // 초기 로딩 시 검색
      searchWeather();
    }, []); 

    const searchWeather = async () => {
          try {
            const data = await axios({
              method: 'get',
              url: url,
            })
            setResult(data);
            console.log(data);
          } 
          catch(err) {
            alert(err);
          }
      }
    return (
      <>
        <Header/>
        <AppWrap>
          <div className={`appContentWrap`}>
            <Container className={`px-10`}>
              <div className='row '>
                  <div className='col-lg-4 d-flex justify-content-center'></div>
                  <div className='col-lg-4 d-flex justify-content-center'>
                      <span style={{textAlign:'center',fontWeight:'700',fontSize:'20px',color:'#2E8B57'}}>산책 지수</span>
                  </div>
                  <div className='col-lg-4 d-flex justify-content-center'></div>
              </div>
            </Container>
                      <Container className='px-10 mt-2'>
              <div className='row '>
                  <div className='col-lg-4 d-flex justify-content-center'></div>
                  <div className='col-lg-4 d-flex justify-content-center'>
                  {Object.keys(result).length !== 0 && (
              <ResultWrap>
                <div className="date">{formmattedDate}</div>
                <div className="city">{result.data.name ==='Seoul' ? '서울' : 'Seoul'}</div>
                <div className='img'>
                  {/* 눈오거나비오면 슬픈개 이미지 */}
                  {(result.data.weather[0].main ==='Rain' || result.data.weather[0].main ==='Snow') &&  (
                    <>
                      <img className='img2' src={saddog} alt=''></img>
                    </>
                  )}
                  {/* 날이 맑으면 기쁜개 */}
                  {(result.data.weather[0].main ==='Clear' ) &&  (
                    <>
                      <img className='img2' src={smmile} alt=''></img>
                    </>
                  )}
                  {/* 비오거나 눈오거나 아니면 평범한개 나머지는 평범한개*/}
                  {(result.data.weather[0].main !=='Rain' && result.data.weather[0].main !=='Snow'&& result.data.weather[0].main !=='Clear') &&  (
                    <>
                      <img className='img2' src={normaldog} alt=''></img>
                    </>
                  )}
                </div>
                <div className="temperature">
                  {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C   /   {result.data.weather[0].main}
                </div>
                <div>
                  {result.data.weather[0].main ==='Clear' && (
                    <>
                      <div className='message'>산책난이도: 쉬움</div>
                      <div className='message2'>산책하기 좋은 날씨에요.</div>
                      <div className='message2'>산책하러 가시죠~</div>
                    </>
                  )}
                  {result.data.weather[0].main ==='Rain' && (
                    <>
                      <div className='message'>산책난이도: 어려움</div>
                      <div className='message2'>산책하기 좋은 날씨가 아니에요.</div>
                      <div className='message2'>실내에 있는게 나을것 같애요~</div>
                    </>
                  )}
                  {result.data.weather[0].main ==='Snow' && (
                    <>
                      <div className='message'>산책난이도: 어려움</div>
                      <div className='message2'>산책하기 좋은 날씨가 아니에요.</div>
                      <div className='message2'>미끄러울수 있으니 조심하세요~</div>
                    </>
                  )}
                  {result.data.weather[0].main ==='Mist' && (
                    <>
                      <div className='message'>산책난이도: 보통</div>
                      <div className='message2'>☆☆☆산책하기 좋아요☆☆☆</div>
                      <div className='message2'>그래도, 안개가 있으니 조심해주세요~</div>
                    </>
                  )}
                  
                  {result.data.weather[0].main ==='Clouds' && (
                    <>
                      <div className='message'>산책난이도: 보통</div>
                      <div className='message2'>☆☆☆산책하기 좋아요☆☆☆</div>
                      <div className='message2'>구름낀 날씨지만 조심하면 괜찮아요~</div>
                    </>
                  )}
                  {result.data.weather[0].main ==='Haze' && (
                    <>
                      <div className='message'>산책난이도: 보통</div>
                      <div className='message2'>☆☆☆산책하기 좋아요☆☆☆</div>
                      <div className='message2'>안개낀 날씨지만 조심하면 괜찮아요~</div>
                    </>
                  )}
                  {result.data.weather[0].main ==='Dust' && (
                    <>
                      <div className='message'>산책난이도: 어려움</div>
                      <div className='message2'>산책할 수야 있지만...</div>
                      <div className='message2'>미세먼지가 있으니 마스크를 챙기세요~</div>
                    </>
                  )}
                  {result.data.weather[0].main ==='Fog' && (
                    <>
                      <div className='message'>산책난이도: 보통</div>
                      <div className='message2'>☆☆☆산책하기 좋아요☆☆☆</div>
                      <div className='message2'>안개낀 날씨지만 조심하면 괜찮아요~</div>
                    </>
                  )}
                  {result.data.weather[0].main ==='Sand' && (
                    <>
                      <div className='message'>산책난이도: 어려움</div>
                      <div className='message2'>☆☆☆산책하기 나쁨☆☆☆</div>
                      <div className='message2'>황사가 있으니 마스크를 챙기세요~</div>
                    </>
                  )}
                  
                  {Math.round((result.data.main.temp - 273.15) * 10) / 10 + 1 > 0.01 && (
                    <>
                      <div className='message2'>기온은 너무 춥지 않네요</div>
                    </>
                  )}
                  {Math.round((result.data.main.temp - 273.15) * 10) / 10 + 1 < 0.01 && (
                    <>
                      <div className='message2'>(대신에, 날씨는 너무 춥습니다.ㅠㅠ) </div>
                    </>
                  )}
                  
                  {result.data.weather[0].main ==='Thunderstorm' && (
                    <>
                      <div className='message' >산책난이도: 어려움</div>
                      <div className='message2'>☆☆☆산책하기 나쁨☆☆☆</div>
                      <div className='message2'>비오니까 나가지 않으시길 추천드려요</div>
                    </>
                  )}
                </div>
              </ResultWrap>
            )}
                  </div>
                  <div className='col-lg-4 d-flex justify-content-center'></div>
              </div>
            </Container>
          </div>
          
          <input
              placeholder="도시를 입력하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="hidden"
              onKeyDown={searchWeather}
            />
        </AppWrap>
      
      </>
    );
};

export default WeatherAndStroll;

const AppWrap = styled.div`
    width: 100vw;
    height: 100vh;

    .appContentWrap {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        padding: 20px;
        margin-top: 8rem;
      }
      input {
        padding: 16px;
        border: 2px black solid;
        border-radius: 16px;
      }
    
    `;
    
    const ResultWrap = styled.div`
      margin-top: 30px;
      border: 1px black solid;
      padding: 100px;
      border-radius: 8px;

    
      .city {
        text-align: center;
        font-size: 24px;
        margin-bottom: 30px;
        margin-top: 10px;
      }
      .temperature {
        font-size: 25px;
        margin-top: 10px;
        text-align: center;
      }
      .message {
        font-size: 20px;
        text-align: center;
        margin-top: 8px;
        color: red;
      }
      .message2 {
        font-size: 15px;
        text-align: center;
        margin-top: 8px;
      }
      .img{
        text-align: center;
      }
      .img2{
        width: 200px;
        height: 200px;
      }
      .date{
        font-size: 20px;
        text-align: center;
        margin-top: 8px;
      }
      .AppWrap .appContentWrap .px-10.mt-10.MarginRem {
        margin-top: 100rem;
      }
`;