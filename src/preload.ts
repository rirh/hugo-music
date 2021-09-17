'use strict';
import os from 'os';
import electron, { app, ipcMain, ipcRenderer, remote } from 'electron';
document.addEventListener('DOMNodeInserted', () => {
    window.app = app;
    window.ipcMain = ipcMain;
    window.ipcRenderer = ipcRenderer;
    window.electron = electron;
    window.remote = remote;
    window.os = os;
});
