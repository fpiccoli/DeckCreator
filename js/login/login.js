const { ipcRenderer }  = require('electron');
const md5 = require('md5');
const alert = require('../manager/interface/alert.js');
const cookie = require('../manager/interface/cookie.js');
const dataUser = require('../rest/user.js');
const cognito = require('./cognito.js');
const file = require('../file/interface/login.js');

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
  dataUser.login(user, md5(pass))
  .then((retorno) => {
    if (retorno) auth(user, pass, retorno.email, retorno.game);
    else alert.message(document.querySelector('#alert-message'), 'Login incorrect!', 'danger');
  }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
}

function auth(user, pass, email, game){
  cognito.authenticate(user, pass)
  .then((retorno) => {
    logged(user, game, retorno);
  }).catch(err => {
    if (err.code == 'NotAuthorizedException') cognitoRegister(user, pass, email);
    else if (err.code == 'UserNotConfirmedException') {
      cognito.resendConfirmation(user);
      alert.message(document.querySelector('#alert-message'), 'Please, check your email <b>('+email+')</b> and validate your account.', 'warning');
    }
    else alert.message(document.querySelector('#alert-message'), err.message, 'danger');
  });
}

function cognitoRegister(user, pass, email){
  cognito.register(user, email, pass)
  .then((retorno) => {
    alert.message(document.querySelector('#alert-message'), 'Please, check your email <b>('+email+')</b> and validate your account.', 'warning');
  }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
}

function logged(user, game, access){
  let idToken = access.idToken;
  let refreshToken = access.refreshToken;
  if(document.querySelector('#lembrar').checked){
    file.save({user: user, rftkn: refreshToken});
  }
  ipcRenderer.send('set-cookie', 'login', JSON.stringify({user: user, game: game, idToken: idToken, refreshToken: refreshToken}));
  ipcRenderer.send('redirecionar-pagina','index');
}
