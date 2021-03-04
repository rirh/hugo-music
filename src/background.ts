"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  remote,
  ipcMain
} from "electron";
import path from "path";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
import {
  HAVE_BLUR,
  HAVE_FOCUS,
  INTENT_CHANGE,
  ASYNC_LYRICS
} from "./constant/ipc";
import DockMenu from "./constant/dock.menu";
import "./background.main";
const isDevelopment = process.env.NODE_ENV !== "production";
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | any;
let tray: any = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: { secure: true, standard: true }
  }
]);

function createWindow() {
  // Create the browser window.
  const options: any = {
    width: 1000,
    height: 670,
    resizable: false,
    backgroundColor: "#fff",
    webPreferences: {
      nodeIntegration: true
    },
    vibrancy: "ultra-dark",
    titleBarStyle: "hidden",
    frame: false,
    show: false
    // icon: path.join(__static, 'icon.png')
    // icon: path.join(__static, 'icon.png')
  };
  //如果是win的窗口就需要自定义按钮关闭
  if (process.platform === "win32") {
    // 如果平台是win32，也即windows
    options.show = true; // 当window创建的时候打开
    options.frame = false; // 创建一个frameless窗口，详情：https://electronjs.org/docs/api/frameless-window
    options.backgroundColor = "#3f3c37";
  }

  win = new BrowserWindow(options);
  const dockMenu = Menu.buildFromTemplate(DockMenu);
  app.dock.setMenu(dockMenu);
  win.setMenu(null);
  win.once("ready-to-show", () => {
    (win as any).show();
  });
  win.on("blur", (e: any, cmd: any) => {
    win && win.webContents.send(HAVE_BLUR);
  });
  win.on("focus", (e: any, cmd: any) => {
    win && win.webContents.send(HAVE_FOCUS);
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode

    win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}` as string);
    // win.loadURL(`https://www.huzhihui.org.cn` as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools();
    // win.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    win.loadURL("app//./index.html");
    // win.loadURL(`${__dirname}/index.html`)
  }

  win.on("closed", (e: Event) => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  createProtocol("app");
  const iconpath = path.join(__dirname, "../public/img/tray@2x.png");
  const icon = nativeImage.createFromPath(iconpath);
  tray = new Tray(icon);
  tray.setToolTip("netease");
  tray.on("click", () => {
    // app.maximize()
    app.focus();
  });
  tray.on("right-click", () => {
    app.focus();

    // console.log('right-click');
  });
  tray.on("double-click", () => {
    app.focus();

    // console.log('double-click');
  });
  tray.setTitle(new Date().toString());

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

ipcMain.on(ASYNC_LYRICS, (e: any, params: any) => {
  tray.setTitle(`${params}`);
});
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
