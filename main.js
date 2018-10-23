const { app, BrowserWindow, ipcMain }  = require('electron');
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    frame: false
  });
  mainWindow.loadURL(`file://${__dirname}/pages/index.html`);
  mainWindow.maximize();

});

app.on('window-all-closed', () => {
  app.quit();
});

let heroisWindow = null;
ipcMain.on('seleciona-heroi', (event, param) => {
  if(heroisWindow == null){
    heroisWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      alwaysOnTop: true,
      frame: false
    });
    heroisWindow.on('closed', () => {
      heroisWindow = null;
    })
  }
  heroisWindow.loadURL(`file://${__dirname}/pages/herois.html`);
});

ipcMain.on('fechar-janela-herois', () => {
  heroisWindow.close();
});

ipcMain.on('fechar-janela-principal', () => {
  mainWindow.close();
});
