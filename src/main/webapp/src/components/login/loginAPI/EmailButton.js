import emailjs from "emailjs-com";
import { useState } from "react";
import Swal from "sweetalert2";

function EmailButton({
  email,
  isValidEmail,
  setShowAuthKeyInput,
  setAuthCode,
  isEmailCheck,
}) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const generateAuthCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleAuthButtonClick = () => {
    if (isEmailCheck === false) {
      //swal
      Swal.fire({
        title: "이미 사용중인 이메일입니다.",
        icon: "error",
        timer: 700,
        showConfirmButton: false,
        position: "top",
      });
    } else if (isEmailCheck === true) {
      const newAuthCode = generateAuthCode();
      setAuthCode(newAuthCode);
      verifyEmail(newAuthCode);
      setShowAuthKeyInput(true);
    }
  };

  const verifyEmail = (newAuthCode) => {
    if (isValidEmail === true) {
      const templateParams = {
        to_email: email,
        from_name: "flirdog",
        message: "인증되었습니다.",
        auth_code: newAuthCode,
      };
      emailjs
        .send(
          "flirdogEmail", // 서비스 ID
          "flirdogEmailTemplate", // 템플릿 ID
          templateParams,
          "kqK_NYaJb3vA1A3eJ" // public-key
        )
        .then(() => {
          setIsEmailSent(true);
        })
        .catch((error) => {
          console.error("이메일 보내기 실패:", error);
        });
    } else if (isValidEmail === false) {
      Swal.fire({
        title: "이메일 형식이 올바르지 않습니다.",
        text: "이메일을 확인해주세요.",
        icon: "error",
        timer: 700,
        showConfirmButton: false,
        position: "top",
      });
    }
  };

  return (
    <div
      className={`mt-2 d-flex justify-content-center align-items-center rounded`}
      style={{
        width: "20%",
        height: "47px",
        backgroundColor: "#F56084",
        cursor: "pointer",
        fontSize: "0.9rem",
      }}
      onClick={handleAuthButtonClick}
    >
      <span className="text-white">인증</span>
    </div>
  );
}

export default EmailButton;
