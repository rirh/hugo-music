import {
  app,
  ipcMain,
  remote,
  shell,
  BrowserWindow,
  Notification,
  systemPreferences,
  dialog,

} from 'electron';
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib'
import {
  MAIN_MIN,
  MAIN_ZOOM,
  MAIN_CLOSE,
  MAIN_DROP,
  FORGET_PWD,
  VIP_CENTER,
  USER_LEVER,
  HSOP_SEND,
  HAVE_BLUR,
  HAVE_FOCUS,
  OPEN_FLOAT,
  SEND_STORE,
  ACCEPT_STORE,
  INTENT_CHANGE,
  LOAD_MUSIC
} from './constant/ipc';
let win: any;
let data: any;

const _minimize = () => {
  const mainWindow = remote.getCurrentWindow();
  mainWindow.minimize();
};
const _unminimize = () => {
  const mainWindow = remote.getCurrentWindow();
  mainWindow.restore();
};
const _maximize = () => {
  const mainWindow = remote.getCurrentWindow();
  mainWindow.maximize();
};
const _unmaximize = () => {
  const mainWindow = remote.getCurrentWindow();
  mainWindow.unmaximize();
};

const _closewin = () => {
  const mainWindow = remote.getCurrentWindow();
  // console.log(1);

  mainWindow.close();
};

ipcMain.on(MAIN_MIN, () => {
  const mainWindow = remote.getCurrentWindow();
  const isMin = mainWindow.isMinimized();
  if (isMin) {
    _unminimize();
  } else {
    _minimize();
  }

});
ipcMain.on(MAIN_ZOOM, () => {
  const mainWindow = remote.getCurrentWindow();
  const isMax = mainWindow.isMaximized();
  if (isMax) {
    _maximize();
  } else {
    _unmaximize();
  }


});
ipcMain.on(MAIN_CLOSE, () => {
  _closewin();

});
ipcMain.on(MAIN_DROP, (e: any) => {
  console.log(e)
});
ipcMain.on(FORGET_PWD, () => {
  shell.openExternal('http://reg.163.com/naq/findPassword')
})

ipcMain.on(VIP_CENTER, () => {
  shell.openExternal('https://music.163.com/#/member')
})

ipcMain.on(USER_LEVER, () => {
  shell.openExternal('https://music.163.com/#/user/level')
})

ipcMain.on(HSOP_SEND, () => {
  shell.openExternal('https://music.163.com/store/product')
})

ipcMain.on(ACCEPT_STORE, () => {

})
ipcMain.on(OPEN_FLOAT, (event: any, args: any, ) => {
  const createWin = () => {
    win = new BrowserWindow({
      width: 310,
      height: 50,
      show: false,
      minWidth: 200,
      minHeight: 40,
      x: 1000,
      y: 200,
      resizable: false,
      backgroundColor: '#fff',
      webPreferences: {
        nodeIntegration: true
      },
      frame: false,
    });
    win.once('ready-to-show', () => {
      win.show()
    });
    win.webContents.on('did-finish-load', function () {
      setTimeout(() => {
        win.webContents.send(ACCEPT_STORE, args);
      }, 0)
    })
    win.on('closed', function () {
      win = null;
      console.log('close');
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}float`);
    } else {
      // createProtocol('app');
      // Load the index.html when not in development
      win.loadURL('app://${__dirname}/index.html/float')
    }
  }
  // 自动切换音乐
  // 打开悬浮页面
  // 激活悬浮页面
  if (args.show) {
    if (win) {
      win.show()
    } else {
      createWin();
    }
  } else {
    if (win)
      win.webContents.send(ACCEPT_STORE, args);
  }
})


ipcMain.on(INTENT_CHANGE, async (e: any, state: any) => {
  // const params: any = {
  //   title: '通知',
  //   body: `您已${state === 'online' ? '连接' : '断开'}网络！`,
  //   // hasReply: true,
  //   // replyPlaceholder: '好',
  // }
  // const notification: any = new Notification(params);
  // notification.show()
  const dialogOpts = {
    type: 'info',
    title: '通知',
    message: '通知',
    buttons: ['好'],
    detail: `您已${state === 'online' ? '连接' : '断开'}网络！`
  }

  const returnValue = await dialog.showMessageBox(dialogOpts);
});

ipcMain.on(LOAD_MUSIC, async (e: any, state: any) => {
  // const tmp: any = require("tmp");
  const fs = require("fs");
  // const path: string = tmp.tmpdir;
  fs.readdir(remote.app.getPath('music'), function (err: any, data: any) {
    if (err) throw err;
    console.log(data);
    e.returnValue = data;
  });
})

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged() {
    //TODO systemPreferences.isDarkMode()
    const params: any = {
      title: '通知',
      body: `${systemPreferences.isDarkMode() ? '白天' : '夜间'} 模式`,
      // hasReply: true,
      // replyPlaceholder: '好',
    }
    const notification: any = new Notification(params);
    notification.show()

  }
)
// const http = function (args: any) {
//   const { net, netLog } = require('electron')

//   new Promise((resolve, reject) => {
//     const request = net.request(args.url)
//     request.on('response', (response: any) => {
//       console.log(`STATUS: ${response.statusCode}`)
//       // let data: any = '';
//       // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
//       response.on('data', (chunk: any) => {
//         // console.log(`BODY: ${chunk}`)
//         // data = (chunk.toString())
//         console.log(chunk.toString().length);
//         resolve(chunk)

//         // console.log(params.length,'==================================');


//         // event.sender.send('main-reply-ipc', params);
//         // porxy.trigger("net",params );

//         // event.sender.send('net-done', chunk);

//       })
//       response.on('end', async () => {
//         console.log('No more data in response.')
//         // await netLog.startLogging(`${__dirname}/log`)
//         // After some network events
//         // event.returnValue = data;
//         // console.log(data.lenght);

//         // const path = await netLog.stopLogging()
//         // console.log('Net-logs written to', path)
//       })
//     })
//     request.end()
//   })
// }
// let p = [];
// ipcMain.on('net', async (event: any, args: any) => {
//   const chunk: any = await http(args)
//   event.returnValue = chunk;

// })
