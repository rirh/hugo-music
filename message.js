import fetch from "node-fetch";

const send = () => {
  const headerNums = new Array(
    "139",
    "138",
    "137",
    "136",
    "135",
    "134",
    "159",
    "158",
    "157",
    "150",
    "151",
    "152",
    "188",
    "187",
    "182",
    "183",
    "184",
    "178",
    "130",
    "131",
    "132",
    "156",
    "155",
    "186",
    "185",
    "176",
    "133",
    "153",
    "189",
    "180",
    "181",
    "177"
  );
  const headerNum = headerNums[parseInt(Math.random() * 10, 10)];
  const bodyNum = Math.random()
    .toString()
    .replace("0.", "")
    .slice(0, 8);
  const ran_phone = headerNum + bodyNum;
  fetch(
    `https://xsbwc.biv6.com/index.php/Api/Index/verification?phone=${ran_phone}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,de;q=0.7",
        "sec-ch-ua":
          '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Referer: "https://yingdiankeji.cn/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    }
  ).then(async response => {
    const aws = await response.json();
    console.log(headerNum + bodyNum, aws);
    send();
  });
};
send();
