import React, { useEffect, useState } from "react";
const { kakao } = window;

const KakaoMap = ({ matchingAddress, onAddressSelected }) => {
  const [address, setAddress] = useState(matchingAddress);
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  const onAddressClick = (item) => {
    const selectedAddress = item.road_address_name || item.address_name;
    console.log(address);
    console.log(infowindow);
    setAddress(selectedAddress);
    onAddressSelected(selectedAddress);
    console.log(selectedAddress);
  };

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    const container = document.getElementById("kakaoMap");
    const options = {
      center: new kakao.maps.LatLng(37.498776, 127.029105),
      level: 3,
    };
    //지도 객체 생성
    const map = new kakao.maps.Map(container, options);

    //검색기능
    const ps = new kakao.maps.services.Places();

    if (matchingAddress !== "") {
      ps.keywordSearch(matchingAddress, placesSearchCB);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          //displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    /*
        //마커
        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x),
            })
      
            kakao.maps.event.addListener(marker, 'click', function () {
              infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
              infowindow.open(map, marker)
            })
          }*/

    //주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    if (matchingAddress !== "") {
      geocoder.addressSearch(matchingAddress, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">만남 장소</div>',
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    }
  }, [matchingAddress]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        id="kakaoMap"
        style={{
          width: "500px",
          height: "500px",
          marginRight: "20px",
        }}
      ></div>
      <div
        id="result-list"
        style={{
          width: "700px",
          border: "5px solid #F56084",
          backgroundColor: "white",
          color: "gray",
          fontWeight: "bold",
          borderRadius: "10px",
          padding: "10px",
          maxHeight: "500px", // 스크롤 가능한 최대 높이
          overflowY: "auto", // 세로 스크롤을 사용하여 오버플로우 처리
        }}
      >
        {Places.map((item, i) => (
          <div
            key={i}
            style={{
              border: "5px solid lightpink",
              backgroundColor: "white",
              borderRadius: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              padding: "5px",
            }}
            onClick={() => onAddressClick(item)}
          >
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default KakaoMap;
