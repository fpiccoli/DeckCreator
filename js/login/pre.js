const { ipcRenderer }  = require('electron');
const alert = require('../manager/interface/alert.js');
const cookie = require('../manager/interface/cookie.js');
const file = require('../manager/file.js');
const validar = require('./validar.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookie.login().then((user) => {
  if(user){
    ipcRenderer.send('redirecionar-pagina','index');
  } else{
    let login = file.validaLogin();
    if(login){
      validar.login(login.user, login.password, null, ipcRenderer);
    } else{
      ipcRenderer.send('redirecionar-pagina','login');
    }
  }
}).catch(err => console.log(err));
