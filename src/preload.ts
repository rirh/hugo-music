'use strict';
import os from 'os';
import electron, { app, ipcMain, ipcRenderer, remote } from 'electron';
declare global {
    interface Window {
        app?: any;
        ipcMain?: any;
        ipcRenderer?: any;
        electron?: any;
        remote?: any;
        os?: any;
    }
}
document.addEventListener('DOMNodeInserted', () => {
    window.app = app;
    window.ipcMain = ipcMain;
    window.ipcRenderer = ipcRenderer;
    window.electron = electron;
    window.remote = remote;
    window.os = os;
});
