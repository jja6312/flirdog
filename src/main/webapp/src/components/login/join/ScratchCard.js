import React, { useRef, useEffect } from "react";

const ScratchCard = ({ frontImageSrc, backImageSrc, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.backgroundImage = `url(${backImageSrc})`; // 뒷 배경 이미지 설정
    canvas.style.backgroundSize = "cover";
    const ctx = canvas.getContext("2d");

    // 전면 이미지 로드
    const frontImage = new Image();
    frontImage.src = frontImageSrc; // 전면 이미지 URL
    frontImage.onload = () => {
      ctx.drawImage(frontImage, 0, 0, canvas.width, canvas.height);
    };

    // 드래그 이벤트 핸들러
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, false);
      ctx.fill();
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [frontImageSrc]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default ScratchCard;
