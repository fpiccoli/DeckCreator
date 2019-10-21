const { ipcRenderer }  = require('electron');
const alert = require('../alert-message.js');
const cookie = require('../cookie-manager.js');
const file = require('../file-manager.js');
const validar = require('./validar.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

ipcRenderer.send('get-cookies');
ipcRenderer.on('send-cookies', (event, cookies) => {
  cookieLogin = cookie.filtraCookies(cookies, 'login');
  if(cookieLogin.length == 1){
    ipcRenderer.send('redirecionar-pagina','index');
  }
  let login = file.validaLogin();
  if(login){
    validar.login(login.user, login.password, null, ipcRenderer);
  } else{
    ipcRenderer.send('redirecionar-pagina','login');
  }
});
