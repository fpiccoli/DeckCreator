const { ipcRenderer }  = require('electron');
const md5 = require('md5');
const alert = require('../manager/interface/alert.js');
const cookie = require('../manager/interface/cookie.js');
const validar = require('./validar.js');
const cognito = require('./cognito.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookie.login().then((user) => {
  if(user){
    ipcRenderer.send('redirecionar-pagina','index');
  }
}).catch(err => console.log(err));

document.querySelector('#register').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','register');
});

document.querySelector('#forgot').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','senha-esqueci');
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
  let pass = document.querySelector('#pass').value;

  if(user.length == 0){
    alert.message(document.querySelector('#alert-message'), 'Enter the user!', 'warning');
    return;
  }

  cognito.authenticate(user, pass)
  .then((retorno) => {
    let idToken = retorno.idToken;
    let refreshToken = retorno.refreshToken;
    console.log(idToken);
    console.log(refreshToken);
  }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));

  // validar.login(user, pass);
}
