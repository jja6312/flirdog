const { kakao } = window;

export const convertAddressToCoords = (address, callback) => {
  const geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(address, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      callback(coords);
    }
  });
};

export const calculateCoordsDistance = (coords1, coords2) => {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const earthRadius = 6371; // 지구 반지름 (킬로미터 단위)

  const lat1 = coords1.getLat();
  const lon1 = coords1.getLng();
  const lat2 = coords2.getLat();
  const lon2 = coords2.getLng();

  const dLat = toRadian(lat2 - lat1);
  const dLon = toRadian(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c; // 결과는 킬로미터 단위
};
