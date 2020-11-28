const { app, BrowserWindow, ipcMain, session, dialog } = require('electron');
const isDev = require('electron-is-dev');
let mainWindow;
let mainSession;
let downloaded = false;

const autoUpdater = require('./main/auto-updater');
const cookieHandler = require('./main/cookie-handler');

ipcMain.handle("update-check", async (event) => {
  return await downloaded;
});

ipcMain.handle("do-update", (event) => {
  autoUpdater.quitAndInstall();
  app.isQuiting = true;
  app.quit();
});

app.on('ready', () => {
  if (!isDev){
    autoUpdater.checkForUpdatesAndNotify();
    setInterval(function(){
      autoUpdater.checkForUpdatesAndNotify();
    }, 60000);
  }
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false
    }
  });
  if(isDev){
    mainWindow.toggleDevTools();
  }else{
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
