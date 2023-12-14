import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '../../main/Header';
import saddog from './saddog.jpg';
import smiledog from './smiledog.jpg';

const WeatherAndStrollBackup = () => {
    const API_KEY = "1e7c80253e0b45e8952c959aa383dda5"; 
    const [location, setLocation] = useState('SEOUL');
    const [result, setResult] = useState({});
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},Korea&appid=${API_KEY}`;
    //https://api.openweathermap.org/data/2.5/weather?q=Seoul,Korea&appid=1e7c80253e0b45e8952c959aa383dda5 이거 긁어서 검색창에 넣고 test.json에 갖다붙이시오.

    const searchWeather = async (e) => {
        if(e.key === 'Enter') {
          try {
            const data =  axios({
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
      }
    return (
        <AppWrap>
        <Header/>
        <div className="appContentWrap">
          <input
            placeholder="도시를 입력하세요"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            onKeyDown={searchWeather}
          />
          {Object.keys(result).length !== 0 && (
            <ResultWrap>
              <div className="city">{result.data.name === 'Seoul'? '서울': 'Seoul'}</div>
              <div className='img'>
                <img className='img2' src={smiledog}></img>
              </div>
              <div className="temperature">
                {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
              </div>
              <div className="sky">{result.data.weather[0].main}</div>
            </ResultWrap>
          )}
        </div>
      </AppWrap>
    );
};


export default WeatherAndStrollBackup;