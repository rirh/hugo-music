import axios from 'axios';

export default (url = '', datas = null, method = 'GET') => {
  console.log(`${url}${datas}${method}`);
  return new Promise(async (resolve, reject) => {
    try {
      const { status, data } = await axios({
        method,
        url,
        data: datas,
      });
      if (status === 200) {
        // LoadingBar.finish();
        resolve({ response: data });
      } else {
        reject(data);
      }
    } catch (error) {
      console.error(error);
    }
  });
};

