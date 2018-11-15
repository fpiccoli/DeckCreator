const { app, BrowserWindow, ipcMain, session }  = require('electron');
let mainWindow;
let mainSession;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768//,
    // frame: false
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
    let pos = mainWindow.getPosition();
    let size = mainWindow.getSize();
    heroisWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      alwaysOnTop: true,
      frame: false,
      x: pos[0]+10,
      y: pos[1]+10,
      width: size[0],
      height: size[1]
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
    mainWindow.loadURL(`file://${__dirname}/pages/editor.html`);
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

ipcMain.on('set-herois-cookie', (event, herois) => {
  herois.forEach(setCookie)

  function setCookie(heroi, index, array){
    mainSession.cookies.set({url:'https://deckcreator.com', name: 'heroi'+(index+1), value: JSON.stringify(heroi)}, (error) => {
      console.log('cookie heroi'+(index+1)+' atualizado');
    });
  }

});

ipcMain.on('pagina-editor', () => {
  mainWindow.loadURL(`file://${__dirname}/pages/editor.html`);
});

ipcMain.on('pagina-index', () => {
  mainWindow.loadURL(`file://${__dirname}/pages/index.html`);
});

ipcMain.on('clear-cookies', () => {
  let cookies = ['heroi1', 'heroi2', 'heroi3', 'cards', 'nome'];
  cookies.forEach(function (cookie, index, array){
    mainSession.cookies.remove('https://deckcreator.com', cookie, (error) => {
      console.log('cookie '+cookie+' removido');
    });
  });
});
