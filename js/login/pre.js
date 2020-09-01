const { ipcRenderer }  = require('electron');
const cookie = require('../manager/interface/cookie.js');
const cognito = require('./cognito.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookieLogin()
.then(sessionStorage)
.then(refreshSession)
.catch(err => {
  if (err.code == 'NotAuthorizedException'){
    ipcRenderer.send('clear-cookies');
    ipcRenderer.send('redirecionar-pagina','login');
  }
  else console.log(err));
});

function cookieLogin(){
  return new Promise((resolve, reject) => {
    cookie.login().then(user => {
      if(user) { ipcRenderer.send('redirecionar-pagina','index'); return; }
      else resolve();
    }).catch(err => reject(err));
  });
}

function sessionStorage(){
  return new Promise((resolve, reject) => {
    cognito.getSessionStorage().then(obj => {
      resolve(obj);
    }).catch(err => reject(err));
  });
}

function refreshSession(obj){
  return new Promise((resolve, reject) => {
    console.log('REFRESH')
    cognito.refresh(obj.cognitoUser, obj.session).then(retorno => {
      ipcRenderer.send('set-cookie', 'login', JSON.stringify(retorno));
      ipcRenderer.send('redirecionar-pagina','index');
    }).catch(err => reject(err));
  });
}
