export const artoString = (data, key) => {
  if (!data) return "";
  if (!key) return "";
  if (!Array.isArray(data)) return;
  return data.map(e => e[key] || "").toString();
};

export const resizeImage = (imgUrl, size = 512) => {
  if (!imgUrl) return "";
  let httpsImgUrl = imgUrl;
  if (imgUrl.slice(0, 5) !== "https") {
    httpsImgUrl = "https" + imgUrl.slice(4);
  }
  return `${httpsImgUrl}?param=${size}y${size}`;
};
