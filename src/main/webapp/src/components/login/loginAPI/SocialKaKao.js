import KakaoLogin from "react-kakao-login";
import login from "../../../css/login/login.module.css";

const SocialKakao = () => {
  const kakaoClientId = "5ef65674b926693e29d5904e2c2d93db";
  const kakaoOnSuccess = async (data) => {
    console.log(data);
    const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
  };
  const kakaoOnFailure = (error) => {
    console.log(error);
  };
  return (
    <>
      {/* <img
          src="/image/logo/kakaoLogo.png"
          alt="kakao_login_medium_narrow"
          style={{ width: "100px", height: "100px" }}
        /> */}
      <KakaoLogin
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
