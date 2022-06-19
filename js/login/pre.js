const { ipcRenderer } = require('electron');
const cookie = require('../manager/interface/cookie.js');
const cognito = require('../cognito/session.js');
const img = require('./images.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookieLogin()
  .then(sessionStorage)
  .then(refreshSession)
  .catch(err => {
    ipcRenderer.invoke('clear-cookies').then(() => {
      ipcRenderer.invoke('console-log-main', err);
      ipcRenderer.invoke('redirecionar-pagina', 'login');
    })
  });

function cookieLogin() {
  return new Promise((resolve, reject) => {
    cookie.login().then((user) => {
      if (user) {
        img.validate(user.game).then(() => {
          ipcRenderer.invoke('redirecionar-pagina', 'index');
        })
        return;
      }
      else resolve();
    }).catch(err => reject(err));
  });
}

function sessionStorage() {
  return new Promise((resolve, reject) => {
    cognito.getSessionStorage().then(obj => {
      resolve(obj);
    }).catch(err => reject(err));
  });
}

function refreshSession(obj) {
  return new Promise((resolve, reject) => {
    cognito.refresh(obj.cognitoUser, obj.session).then(retorno => {
      ipcRenderer.invoke('set-cookie', 'login', JSON.stringify(retorno)).then((isSet) => {
        img.validate(retorno.game).then(() => {
          ipcRenderer.invoke('redirecionar-pagina', 'index');
        })
      })
    }).catch(err => reject(err));
  });
}