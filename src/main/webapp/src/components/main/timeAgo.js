const timeAgo = (modifiedAt) => {
  const now = new Date();
  const modifiedTime = new Date(modifiedAt);
  const delta = now - modifiedTime;

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((delta / (1000 * 60)) % 60);

  if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else {
    return `${minutes}분 전`;
  }
};

export default timeAgo;
