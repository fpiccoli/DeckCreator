const { ipcRenderer }  = require('electron');
const cookie = require('../manager/interface/cookie.js');
const cognito = require('./cognito.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookie.login().then((user) => {
  if(user){
    ipcRenderer.send('redirecionar-pagina','index');
  } else{
    cognito.getSessionStorage()
    .then(retorno => {
      if(retorno) refreshToken(retorno);
      else ipcRenderer.send('redirecionar-pagina','login');
    }).catch(err => console.log(err));
  }
}).catch(err => console.log(err));

function refreshToken(obj){
  ipcRenderer.send('set-cookie', 'login', JSON.stringify(obj));
  ipcRenderer.send('redirecionar-pagina','index');
}
