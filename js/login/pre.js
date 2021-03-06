const { ipcRenderer }  = require('electron');
const cookie = require('../manager/interface/cookie.js');
const cognito = require('../cognito/session.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookieLogin()
.then(sessionStorage)
.then(refreshSession)
.catch(err => {
  if (!err){
    ipcRenderer.invoke('clear-cookies').then(() => {
      ipcRenderer.invoke('redirecionar-pagina','login');
    })
  } else if (err.code == 'NotAuthorizedException'){
    ipcRenderer.invoke('clear-cookies').then(() => {
      ipcRenderer.invoke('redirecionar-pagina','login');
    })
  }
  else console.log(err);
});

function cookieLogin(){
  return new Promise((resolve, reject) => {
    cookie.login().then(user => {
      if(user) { ipcRenderer.invoke('redirecionar-pagina','index'); return; }
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
    cognito.refresh(obj.cognitoUser, obj.session).then(retorno => {
      ipcRenderer.invoke('set-cookie', 'login', JSON.stringify(retorno)).then((isSet) => {
        ipcRenderer.invoke('redirecionar-pagina', 'index');
      })
    }).catch(err => reject(err));
  });
}
