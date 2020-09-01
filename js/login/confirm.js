const { ipcRenderer }  = require('electron');
const alert = require('../manager/interface/alert.js');
const dataUser = require('../rest/user.js');
const md5 = require('md5');
const cognito = require('../cognito/forgot-password.js');

document.querySelector('#back').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','senha-esqueci');
});

document.querySelector('#email').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    confirm();
  }
});

document.querySelector('#pass').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    confirm();
  }
});

document.querySelector('#codigo').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    confirm();
  }
});

document.querySelector('#confirm').addEventListener('click' , function(){
  confirm()
});

function confirm(){
  let email = document.querySelector('#email').value.toLowerCase();
  let pass = document.querySelector('#pass').value;
  let codigo = document.querySelector('#codigo').value.toUpperCase();

  if(!email){
    alert.message(document.querySelector('#alert-message'), 'Enter the email!', 'warning');
    return;
  }
  if(codigo.length != 6){
    alert.message(document.querySelector('#alert-message'), 'Code must have exactly 6 characters!', 'warning');
    return;
  }
  if(document.querySelector('#pass').value.length < 6){
    alert.message(document.querySelector('#alert-message'), 'Password must be at least 6 characters!', 'warning');
    return;
  }

  cognito.confirmPassword(email, codigo, pass)
  .then((retorno) => {
    getUser(email, pass);
  }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));

  function getUser(user, newPassword){
    dataUser.active({ user: user, email: user })
    .then((retorno) => {
      retorno.password = md5(newPassword);
      updateUser(retorno);
    }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
  }

  function updateUser(obj){
    dataUser.save(obj)
    .then((retorno) => {
      ipcRenderer.send('redirecionar-pagina','login');
    }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
  }
}
