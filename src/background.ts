'use strict'

import { app, protocol, BrowserWindow, Tray, Menu } from 'electron';
import path from 'path';
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import {
  HAVE_BLUR,
  HAVE_FOCUS,
  INTENT_CHANGE
} from './constant/ipc';
import DockMenu from './constant/dock.menu';
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | any
let tray = null
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app', privileges: { secure: true, standard: true }
}])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 670,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    show: false,
    // icon: path.join(__static, 'icon.png')
    // icon: path.join(__static, 'icon.png')
  })


  const dockMenu = Menu.buildFromTemplate(DockMenu)
  app.dock.setMenu(dockMenu)
  win.setMenu(null);
  win.once('ready-to-show', () => {
    (win as any).show();
    require('./background.main')
  

    // tray = new Tray('');
    // const contextMenu = Menu.buildFromTemplate([
    //   { label: 'Item1', type: 'radio' },
    //   { label: 'Item2', type: 'radio' },
    //   { label: 'Item3', type: 'radio', checked: true },
    //   { label: 'Item4', type: 'radio' }
    // ])
    // tray.setToolTip('NotesMuisc')
    // tray.setContextMenu(contextMenu)
  })
  win.on('blur', (e: any, cmd: any) => {
    win && win.webContents.send(HAVE_BLUR)
  })
  win.on('focus', (e: any, cmd: any) => {
    win && win.webContents.send(HAVE_FOCUS)
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode

    win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}` as string)
    // win.loadURL(`https://www.huzhihui.org.cn` as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
    // win.webContents.openDevTools();
  } else {
    win.webContents.openDevTools();
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://${__dirname}/index.html')
    // win.loadURL(`${__dirname}/index.html`)
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
