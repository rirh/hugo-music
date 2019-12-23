'use strict';

import { app, ipcMain, remote, shell, BrowserWindow } from 'electron';
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib'
const {
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
  OPEN_FLOAT
} = require('./constant/ipc');


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
  _minimize();

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

ipcMain.on(OPEN_FLOAT, () => {
  let win = new BrowserWindow({
    width: 310,
    height: 50,
    show: false,
    minWidth:200,
    minHeight:40,
    x: 1000,
    y: 200,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
  })
  win.once('ready-to-show', () => {
    win.show()
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}float`);
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://${__dirname}/index.html')
  }
})


