const { ipcRenderer }  = require('electron');
const md5 = require('md5');
const data = require('./data-mongo.js');
const alert = require('./alert-message.js');
const cookie = require('./cookie-manager.js');
const file = require('./file-manager.js');

ipcRenderer.send('get-cookies');
ipcRenderer.on('send-cookies', (event, cookies) => {
  cookieLogin = cookie.filtraCookies(cookies, 'login');
  if(cookieLogin.length == 1){
    ipcRenderer.send('redirecionar-pagina','index');
  }
  const os = require('os')
  let login = file.validaLogin();
  if(login){
    ipcRenderer.send('set-cookie', 'login', JSON.stringify(login));
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
    validarLogin(user, pass);
  }
}

async function validarLogin(user, pass){
  let json = {user: user, password: pass};
  if(await data.login(user, pass)){
    if(document.querySelector('#lembrar').checked){
      manterUsuario(json);
    }
    ipcRenderer.send('set-cookie', 'login', JSON.stringify(json));
    ipcRenderer.send('redirecionar-pagina','index');
  }
  else{
    alert.message(document.querySelector('#alert-message'), 'Login incorreto!', 'danger');
  }
}

function manterUsuario(json){
  file.saveLogin('dclogin', json);
}
