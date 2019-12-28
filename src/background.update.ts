import {
    app,
    autoUpdater,
    dialog,
} from 'electron';
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
} from './constant/ipc';
const server = 'https://your-deployment-url.com';
const feed: any = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL(feed);
setInterval(() => {
    autoUpdater.checkForUpdates();
}, 60000);
autoUpdater.on('update-downloaded', async (event, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.',
    };

    const returnValue: any = await dialog.showMessageBox(dialogOpts);
    if (returnValue.response === 0) { autoUpdater.quitAndInstall(); }
});
autoUpdater.on('error', (message: any) => {
    // log.error('There was a problem updating the application');
    // console.error(message);
    throw new Error(message);
});
