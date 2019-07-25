import axios from 'axios';
import { notification } from 'ant-design-vue';


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
      const { status, data } = await axios.get(url, { withCredentials: true });
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
