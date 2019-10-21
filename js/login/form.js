const { ipcRenderer }  = require('electron');
const md5 = require('md5');
const alert = require('../alert-message.js');
const cookie = require('../cookie-manager.js');
const validar = require('./validar.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

ipcRenderer.send('get-cookies');
ipcRenderer.on('send-cookies', (event, cookies) => {
  cookieLogin = cookie.filtraCookies(cookies, 'login');
  if(cookieLogin.length == 1){
    ipcRenderer.send('redirecionar-pagina','index');
  }
});

document.querySelector('#login').addEventListener('click' , function(){
  login();
});

document.querySelector('#user').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    login();
  }
});

document.querySelector('#pass').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    login();
  }
});

function login(){
  let user = document.querySelector('#user').value.toLowerCase();
  let pass = md5(document.querySelector('#pass').value);
  if(user.length == 0){
    alert.message(document.querySelector('#alert-message'), 'Informe o usuário!', 'warning');
  }
  else{
    validar.login(user, pass, document, ipcRenderer);
  }
}
