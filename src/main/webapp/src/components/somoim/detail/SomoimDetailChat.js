import React, { useEffect, useState } from 'react';

const getRandomImage = () => {
    const imagePaths = [
      '/image/somoim/ad.jpeg',
      '/image/somoim/ad1.jpg',
      '/image/somoim/ad2.jpg',
      '/image/somoim/ad3.jpg',
      '/image/somoim/ad4.jpg',
    ];
  
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
  };

const SomoimDetailChat = () => {
    const [currentImage, setCurrentImage] = useState(getRandomImage);

    const getNextImage = () => {
        setCurrentImage(getRandomImage);
    };

    useEffect(() => {
        // 새로고침할 때마다 다음 이미지를 보여줌
        getNextImage();
    }, []);


    return (
        <>
        <div className='col-lg-3 col-12 d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-start', padding: 0 }}>
            <div style={{ width: '290px', height: '964px', position: 'relative', paddingRight: '90%' }}>
            <img
                src={currentImage}
                alt="Random Image"
                style={{ width: '290px', height: '700px', objectFit: 'cover' }}
                />
            </div>
        </div>

            {/* <div className='col-lg-3 col-12 d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-end', border: '1px solid brown', padding: 0 }}>
            <div className='col-lg-3 col-12 d-flex justify-content-right' style={{ textAlign: 'center', alignSelf: 'flex-start', padding: 0 }}>
                   <div style={{ width: '290px', height: '964px', position: 'relative', paddingRight: '90%' }}>
                    <img src='/image/somoim/ad.jpeg' alt='광고'  style={{ width: '290px', height: '604px', position: 'relative', paddingRight: '90%' }}/>   
                       <div className="Rectangle56" style={{ width: '308px', height: '965.79px', left: '0px', position: 'absolute', background: '#FFF4F4' }}></div>
                       <div style={{ width: '278px', height: '924px', left: '17px', top: '14px', position: 'absolute', background: 'white' }}></div>
                       <div style={{ width: '287px', height: '90px', left: '18px', top: '935px', position: 'absolute' }}>
                           <div style={{ width: '287px', height: '60px', left: '0px', top: '12px', position: 'absolute', background: '#FFF4F4' }}></div>
                           <div style={{ width: '288px', height: '54px', left: '0px', top: '18px', position: 'absolute', background: 'white' }}></div>
                           <div style={{ width: '190px', height: '50px', left: '14px', top: '17px', position: 'absolute', color: '#BAB9AF', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>채팅하기...</div>
                           <div className="Chat" style={{ width: '90px', height: '90px', left: '200px', top: '0px', position: 'absolute' }}></div>
                           <img className="Sms" style={{ width: '45px', height: '45px', left: '237px', top: '22px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="Sms" />
                           <img className="Happy" style={{ width: '45px', height: '45px', left: '186px', top: '22px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="Happy" />
                       </div>
                       <div className="1" style={{ width: '385px', height: '154px', left: '16px', top: '22px', position: 'absolute' }}>
                           <div style={{ width: '215px', height: '82px', left: '52px', top: '0px', position: 'absolute' }}>
                           <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                           <div className="2" style={{ width: '193px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>다음주에 저희 일요일날 가는 걸로 아는데 혹시 2차도 예정있나요?</div>
                           </div>
                           <div style={{ width: '49px', height: '59px', left: '0px', top: '95px', position: 'absolute' }}>
                           <img className="UserMale" style={{ width: '45px', height: '45px', left: '2px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                           <div style={{ width: '49px', height: '14px', left: '0px', top: '45px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>술고래</div>
                           </div>
                       </div>
                       <div className="2" style={{ width: '385px', height: '153px', left: '4px', top: '150px', position: 'absolute' }}>
                       <div style={{ width: '215px', height: '82px', left: '64px', top: '0px', position: 'absolute' }}>
                           <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                           <div style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>글쎄여...</div>
                       </div>
                       <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                           <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                           <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>코딩만세</div>
                       </div>
                       </div>
                       <div className="3" style={{ width: '385px', height: '164px', left: '59px', top: '300px', position: 'absolute' }}>
                       <div style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute' }}>
                           <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#F68E8E', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomLeftRadius: '40px' }}></div>
                           <div style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>저번주에도 했으니까 이번에도 하지 않을까요?</div>
                       </div>
                       <div style={{ width: '80px', height: '58px', left: '173px', top: '82px', position: 'absolute' }}>
                           <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                           <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>나</div>
                       </div>
                       </div>
                       <div className="4" style={{ width: '385px', height: '153px', left: '4px', top: '450px', position: 'absolute' }}>
                       <div style={{ width: '215px', height: '82px', left: '64px', top: '0px', position: 'absolute' }}>
                           <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                           <div className="3" style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>공지 없어도 3번이나 자발적으로 모였으면 한다고 봐도 되지 않을까요?</div>
                       </div>
                       <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                           <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                           <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>주말야근</div>
                       </div>
                       </div>
                       <div className="5" style={{ width: '385px', height: '153px', left: '11px', top: '590px', position: 'absolute' }}>
                       <div style={{ width: '215px', height: '82px', left: '64px', top: '0px', position: 'absolute' }}>
                           <div className="Rectangle60" style={{ width: '215px', height: '82px', left: '0px', top: '0px', position: 'absolute', background: '#FFF4F4', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}></div>
                           <div style={{ width: '187px', height: '75px', left: '14px', top: '17px', position: 'absolute', color: '#454141', fontSize: '15px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>아 역시 그렇군요ㅋㅋㅋ 기대되네요</div>
                       </div>
                       <div style={{ width: '80px', height: '58px', left: '0px', top: '95px', position: 'absolute' }}>
                           <img className="UserMale" style={{ width: '45px', height: '45px', left: '14px', top: '0px', position: 'absolute' }} src="https://via.placeholder.com/45x45" alt="UserMale" />
                           <div style={{ width: '80px', height: '14px', left: '0px', top: '44px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '16px', fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word' }}>코딩만세</div>
                       </div>
                       </div>
                   </div>
               </div> */}
        </>
    );
};

export default SomoimDetailChat;