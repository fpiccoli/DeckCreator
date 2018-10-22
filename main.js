const { app, BrowserWindow, ipcMain }  = require('electron');

app.on('ready', () => {

    let mainWindow = new BrowserWindow({
        width: 1366,
        height: 768
    });
    mainWindow.loadURL(`file://${__dirname}/pages/index.html`);
    mainWindow.maximize();

});

ipcMain.on('get-cards', (event) => {
  event.returnValue = cards;
})

app.on('window-all-closed', () => {
      app.quit();
});
