import axios from 'axios';
import { notification } from 'ant-design-vue';
import { ipcRenderer, net } from 'electron';


export default (url = '', datas = {}, method = 'GET') => {
  return new Promise(async (resolve, reject) => {
//     const { remote } = require('electron');

// //     const request = remote.net.request(url)
// //     request.on('response', (response) => {
// //       console.log(`STATUS: ${response.statusCode}`)
// //       // let data: any = '';
// //       // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
// //       response.on('data', (chunk:any) => {
// //         // console.log(`BODY: ${chunk}`)
// //         // data = (chunk.toString())
// //         // console.log(JSON.parse(chunk.toString()));
// //         function Uint8ArrayToString(fileData:any){
// //           var dataString = "";
// //           for (var i = 0; i < fileData.length; i++) {
// //             dataString += String.fromCharCode(fileData[i]);
// //           }

// //           return dataString
// //         }
// //         console.log(Uint8ArrayToString(chunk));
// //         // var uint8array = new TextEncoder("utf-8").encode("¢");
// // var string = new TextDecoder("utf-8").decode(chunk);
// // console.log(JSON.parse(string) );

// //         // console.log((chunk.toString()));
// //         // resolve(chunk)

// //         // console.log(params.length,'==================================');


// //         // event.sender.send('main-reply-ipc', params);
// //         // porxy.trigger("net",params );

// //         // event.sender.send('net-done', chunk);

// //       })
// //       response.on('end', async () => {
// //         console.log('No more data in response.')
// //         // await netLog.startLogging(`${__dirname}/log`)
// //         // After some network events
// //         // event.returnValue = data;
// //         // console.log(data.lenght);

// //         // const path = await netLog.stopLogging()
// //         // console.log('Net-logs written to', path)
// //       })
// //     })
// //     request.end()
    // try {


    const { status, data } = await axios.get(url, { withCredentials: true });
    if (status === 200) {
      resolve({ response: data });
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
