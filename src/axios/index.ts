import axios from 'axios';
import { notification } from 'ant-design-vue';
import { ipcRenderer, net } from 'electron';


export default (url = '', datas = {}, method = 'GET') => {
  return new Promise(async (resolve, reject) => {
    // const { remote } = require('electron');

    // const request = remote.net.request(url)
    // request.on('response', (response) => {
    //   console.log(`STATUS: ${response.statusCode}`)
    //   // let data: any = '';
    //   // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    //   response.on('data', (chunk: any) => {
    //     // console.log(`BODY: ${chunk}`)
    //   })
    //   response.on('end', async () => {
    //     console.log('No more data in response.')
    //   })
    // })
    // request.end()
    // try {
    try {
      const { status, data } = await axios.get(url, { withCredentials: true });

      if (status === 200) {
        resolve({ response: data });
      } else {
        reject({ response: { message: '请求错误' } });
      }
    } catch (error) {
      reject({ response: { message: '请求错误' } });
    }







    // ipcRenderer.on('net-done', (e: any, data: any) => {
    //   console.log(JSON.parse(data.toString()));


    // })x
    // console.log(JSON.parse(relry));
    // const data = JSON.parse(relry.toString());
    // console.log(data);


    // if (status === 200) {
    // LoadingBar.finish();
    // resolve({ response: JSON.parse(relry.toString()) });
    // resolve({ response: JSON.parse(relry.toString()) });
    // resolve({ response: data });

    // }
    // } catch (err) {
    //   if (err && err.response.data.message) {
    //     notification.error({
    //       message: '提示',
    //       description: err.response.data.message,
    //     });
    //   }

    //   // console.error("Error response:");
    //   // console.error(err.response.data);    // ***
    //   // console.error(err.response.status);  // ***
    //   // console.error(err.response.headers); // ***
    //   // resolve({ response: { code: 400, msg: '请求错误！' } });
    //   throw err;
    // }
  });
};
