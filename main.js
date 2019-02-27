const { app, BrowserWindow, ipcMain, session }  = require('electron');
let mainWindow;
let mainSession;

//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}

// Module to control application life.
var path = require('path')


app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768//,
    // frame: false
  });
  // mainWindow.setMenu(null);
  mainWindow.loadURL(`file://${__dirname}/pages/login.html`);
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

let efeitosWindow = null;
ipcMain.on('abrir-janela-efeitos', (event) => {
  if(efeitosWindow == null){
    let pos = mainWindow.getPosition();
    let size = mainWindow.getSize();
    efeitosWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      alwaysOnTop: true,
      x: pos[0]+10,
      y: pos[1]+10,
      width: size[0]/4,
      height: size[1]
    });
    efeitosWindow.on('closed', () => {
      efeitosWindow = null;
    })
  }
  // efeitosWindow.setMenu(null);
  efeitosWindow.loadURL(`file://${__dirname}/pages/efeitos.html`);
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

ipcMain.on('fechar-janela-efeitos', () => {
  efeitosWindow.close();
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

ipcMain.on('set-cookie', (event, label, stringValue) => {
  let newCookie = {url:'https://deckcreator.com', name: label, value: stringValue};
  mainSession.cookies.set(newCookie, (error) => {
    console.log('cookie '+label+' atualizado');
  });
});

ipcMain.on('redirecionar-pagina', (event, pagina) => {
  mainWindow.loadURL(`file://${__dirname}/pages/`+pagina+`.html`);
});

ipcMain.on('clear-cookies', () => {
  let cookies = ['heroi1', 'heroi2', 'heroi3', 'cards', 'nome', 'login'];
  cookies.forEach(function (cookie, index, array){
    mainSession.cookies.remove('https://deckcreator.com', cookie, (error) => {
      console.log('cookie '+cookie+' removido');
    });
  });
});

ipcMain.on('console-log-main', (event, mensagem) => {
  console.log(mensagem);
});
