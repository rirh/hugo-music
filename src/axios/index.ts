import axios from 'axios';

export default (url = '', datas = {}, method = 'GET') => {
  return new Promise(async (resolve, reject) => {
    try {
      // const params: any = {
      //   header: {
      //     "Access-Control-Allow-Origin": "*",
      //   },
      //   method,
      //   url,
      //   data: datas,
      // };
      // const { status, data } = await axios(params);
      const { status, data } = await axios.get(url);
      if (status === 200) {
        // LoadingBar.finish();
        resolve({ response: data });
      } else {
        reject(data);
      }
    } catch (error) {
      throw error;
      // console.error(error);
    }
  });
};
