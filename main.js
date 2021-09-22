const { app, BrowserWindow, ipcMain, session, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const isDev = require('electron-is-dev');
let mainWindow;
let mainSession;
let baixado = false;
let disponivel = false;
let baixando = false;

const cookieHandler = require('./main/cookie-handler');

//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents');
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}


autoUpdater.on('update-available', (obj) => {
  mainWindow.webContents.send('update-available', obj);
  disponivel = true;
});

autoUpdater.on('update-downloaded', (obj) => {
  mainWindow.webContents.send('update-downloaded', obj);
  baixado = true;
  baixando = false;
});

autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('checking-for-update', 'Buscando Update');
});

autoUpdater.on('update-not-available', (obj) => {
  mainWindow.webContents.send('update-not-available', obj);
});

autoUpdater.on('download-progress', (obj) => {
  mainWindow.webContents.send('download-progress', obj);
  baixando = true;
});

autoUpdater.on('error', (err) => {
  mainWindow.webContents.send('update-error', err);
});

ipcMain.handle('update-check', (event) => {
  if (isDev) return;
  if (disponivel) return;
  if (baixando) return;
  if (baixado) return;

  autoUpdater.checkForUpdates();
});

ipcMain.handle('do-update', (event) => {
  if (isDev) return;
  autoUpdater.quitAndInstall();
  app.isQuiting = true;
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false
    }
  });
  if(isDev){
    mainWindow.toggleDevTools();
  } else{
    mainWindow.setMenu(null);
  }
  mainWindow.loadURL(`file://${__dirname}/pages/prelogin.html`);
    mainWindow.maximize();
    mainSession = mainWindow.webContents.session;
  }
);

app.on('window-all-closed', () => {
  app.quit();
});

let heroisWindow = null;
ipcMain.handle('seleciona-heroi', (event, param) => {
  if(heroisWindow == null){
    let pos = mainWindow.getPosition();
    let size = mainWindow.getSize();
    heroisWindow = new BrowserWindow({
      alwaysOnTop: true,
      frame: false,
      x: pos[0]+10,
      y: pos[1]+10,
      width: size[0],
      height: size[1],
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: false
      }
    });
    if(isDev){
      heroisWindow.toggleDevTools();
    }else{
      heroisWindow.setMenu(null);
    }
    heroisWindow.on('closed', () => {
      heroisWindow = null;
    });
  }
  heroisWindow.loadURL(`file://${__dirname}/pages/herois.html?posicao=${param}`);
  }
);

let efeitosWindow = null;
ipcMain.handle('abrir-janela-efeitos', (event) => {
  if(efeitosWindow == null){
    let pos = mainWindow.getPosition();
    let size = mainWindow.getSize();
    efeitosWindow = new BrowserWindow({
      alwaysOnTop: true,
      x: pos[0]+10,
      y: pos[1]+10,
      width: size[0]/4,
      height: size[1],
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: false
      }
    });
    efeitosWindow.on('closed', () => {
      efeitosWindow = null;
    })
  }
  if(isDev){
    efeitosWindow.toggleDevTools();
  }else{
    efeitosWindow.setMenu(null);
  }
  efeitosWindow.loadURL(`file://${__dirname}/pages/efeitos.html`);
  }
);

ipcMain.handle('dialog', async (event, title, confirm, cancel, message) => {
  var choice = await dialog.showMessageBox(
    mainWindow,
    {
      type: 'question',
      cancelId: 2,
      buttons: [confirm, cancel],
      title: title,
      message: message
    }
  );
  return choice.response === 0;
});

ipcMain.handle('fechar-janela-herois', () => {
  heroisWindow.close();
});

ipcMain.handle('fechar-janela-principal', () => {
  mainWindow.close();
});

ipcMain.handle('fechar-janela-efeitos', () => {
  efeitosWindow.close();
});

ipcMain.handle('heroi-selecionado', (event, heroi, posicao) => {
  return cookieHandler.setCookie('heroi'+posicao, JSON.stringify(heroi), mainSession);
});

ipcMain.handle('get-cookies', (event) => {
  return cookieHandler.getCookie(mainSession);
});

ipcMain.handle('set-cookie', (event, label, stringValue) => {
  return cookieHandler.setCookie(label, stringValue, mainSession);
});

ipcMain.handle('clear-cookies', async (event) => {
  await cookieHandler.deleteCookie(['heroi1', 'heroi2', 'heroi3', 'cards', 'nome', 'login', 'grupo'], mainSession)
});

ipcMain.handle('delete-cookies', (event, lista) => {
  cookieHandler.deleteCookie(lista, mainSession);
});

ipcMain.handle('redirecionar-pagina', (event, pagina) => {
  mainWindow.loadURL(`file://${__dirname}/pages/`+pagina+`.html`);
  }
);

ipcMain.handle('console-log-main', (event, mensagem) => {
  console.log(mensagem);
});
