const { ipcRenderer } = require('electron');
const md5 = require('md5');
const alert = require('../manager/interface/alert.js');
const cookie = require('../manager/interface/cookie.js');
const dataUser = require('../rest/user.js');
const cognito = require('../cognito/auth.js');
const img = require('./images.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookie.login().then((user) => {
  if (user) {
    ipcRenderer.invoke('redirecionar-pagina', 'index');
  }
}).catch(err => console.log(err));

document.querySelector('#register').addEventListener('click', function () {
  ipcRenderer.invoke('redirecionar-pagina', 'register');
});

document.querySelector('#forgot').addEventListener('click', function () {
  ipcRenderer.invoke('redirecionar-pagina', 'senha-esqueci');
});

document.querySelector('#login').addEventListener('click', function () {
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

function login() {
  let user = document.querySelector('#user').value.toLowerCase();
  let pass = document.querySelector('#pass').value;

  if (user.length == 0) {
    alertMessage('Enter the user!', 'warning');
    return;
  }

  if (pass.length == 0) {
    alertMessage('Enter the password!', 'warning');
    return;
  }

  document.querySelector('#login').setAttribute('disabled', 'disabled');
  document.querySelector('#login').innerHTML = 'Loading';

  dataUser.login(user, md5(pass))
    .then((retorno) => {
      if (retorno) auth(user, pass, retorno.email, retorno.game);
      else alertMessage('Login incorrect!', 'danger')
    }).catch(err => alertMessage(err.message, 'danger'));
}

function auth(user, pass, email, game) {
  cognito.authenticate(user, pass)
    .then((retorno) => {
      logged(user, game, retorno);
    }).catch(err => {
      if (err.code == 'NotAuthorizedException') cognitoRegister(user, pass, email);
      else if (err.code == 'UserNotConfirmedException') {
        cognito.resendConfirmation(user);
        alertMessage('Please, check your email <b>(' + email + ')</b> and validate your account.', 'warning');
      }
      else alertMessage(err.message, 'danger');
    });
}

function cognitoRegister(user, pass, email) {
  cognito.register(user, email, pass)
    .then((retorno) => {
      alertMessage('Please, check your email <b>(' + email + ')</b> and validate your account.', 'warning');
    }).catch(err => alertMessage(err.message, 'danger'));
}

function alertMessage(message, type) {
  alert.message(document.querySelector('#alert-message'), message, type);
  document.querySelector('#login').removeAttribute('disabled');
  document.querySelector('#login').innerHTML = 'Enter';
}

function logged(user, game, access) {
  let idToken = access.idToken;
  let refreshToken = access.refreshToken;
  let cookie = { user, game, idToken, refreshToken };
  ipcRenderer.invoke('set-cookie', 'login', JSON.stringify(cookie)).then(() => {
    img.validate(cookie).then(() => {
      ipcRenderer.invoke('redirecionar-pagina', 'index');
    })
  })
}
