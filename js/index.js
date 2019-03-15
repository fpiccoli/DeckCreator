const menu = require('./menubar.js');
const { ipcRenderer }  = require('electron');
const cookie = require('./cookie-manager.js');

ipcRenderer.send('get-cookies');
ipcRenderer.on('send-cookies', (event, cookies) => {
  cookieLogin = cookie.filtraCookies(cookies, 'login');
  if(cookieLogin.length == 0){
    ipcRenderer.send('redirecionar-pagina','login');
  }

  menu.sidebar(document, cookies);
  menu.navbar(document, cookies);
});
