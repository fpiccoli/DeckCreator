const { app, BrowserWindow, ipcMain, session }  = require('electron');
let mainWindow;
let mainSession;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    frame: false
  });
  mainWindow.loadURL(`file://${__dirname}/pages/index.html`);
  mainWindow.maximize();
  mainSession = mainWindow.webContents.session;
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
  heroisWindow.loadURL(`file://${__dirname}/pages/herois.html?posicao=${param}`);
});

ipcMain.on('get-cookies', (event) => {
  mainSession.cookies.get({}, (error, cookies) => {
    event.sender.send('send-cookies', cookies);
  });
});

ipcMain.on('get-path', (event, location) => {
  event.sender.send('return-path', app.getPath(location));
});

ipcMain.on('fechar-janela-herois', () => {
  heroisWindow.close();
});

ipcMain.on('fechar-janela-principal', () => {
  mainWindow.close();
});

ipcMain.on('heroi-selecionado', (event, heroi, posicao) => {
  let newCookie = {url:'https://deckcreator.com', name: 'heroi'+posicao, value: JSON.stringify(heroi)};

  mainSession.cookies.set(newCookie, (error) => {
    mainWindow.loadURL(`file://${__dirname}/pages/index.html`);
  });
});

ipcMain.on('set-card-cookie', (event, lista) => {
  let newCookie = {url:'https://deckcreator.com', name: 'cards', value: JSON.stringify(lista)};

  mainSession.cookies.set(newCookie, (error) => {
    console.log('cookie cards atualizado');
  });
});

ipcMain.on('set-nome-cookie', (event, stringNome) => {
  let newCookie = {url:'https://deckcreator.com', name: 'nome', value: stringNome};

  mainSession.cookies.set(newCookie, (error) => {
    console.log('cookie nome do deck atualizado');
  });
});
