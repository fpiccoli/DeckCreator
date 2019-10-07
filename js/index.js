const menu = require('./menubar.js');
const { ipcRenderer }  = require('electron');
const cookie = require('./cookie-manager.js');

var package = require('../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

ipcRenderer.send('get-cookies');
ipcRenderer.on('send-cookies', (event, cookies) => {
  cookieLogin = cookie.filtraCookies(cookies, 'login');
  if(cookieLogin.length == 0){
    ipcRenderer.send('redirecionar-pagina','login');
  }

  menu.sidebar(document, cookies);
  menu.navbar(document, cookies);
});
