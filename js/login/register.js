const { ipcRenderer }  = require('electron');
const md5 = require('md5');
const alert = require('../manager/interface/alert.js');
const dataUser = require('../rest/user.js');
const cognito = require('../cognito/auth.js');

document.querySelector('#back').addEventListener('click' , function(){
  ipcRenderer.invoke('redirecionar-pagina','login');
});

document.querySelector('#register').addEventListener('click' , function(){
  let user = document.querySelector('#user').value.toLowerCase();
  let email = document.querySelector('#email').value.toLowerCase();
  let pass = document.querySelector('#pass').value;

  if(user.length < 3){
    alert.message(document.querySelector('#alert-message'), 'User must be at least 3 characters!', 'warning');
    return;
  }

  if(email.length == 0){
    alert.message(document.querySelector('#alert-message'), 'Enter the email!', 'warning');
    return;
  }

  if(document.querySelector('#pass').value.length < 6){
    alert.message(document.querySelector('#alert-message'), 'Password must be at least 6 characters!', 'warning');
    return;
  }

  dataUser.active({user: user.toLowerCase(), email: email.toLowerCase()})
  .then((retorno) => {
    if(retorno){
      alert.message(document.querySelector('#alert-message'), 'User or email already registered!', 'danger');
    } else{
      saveCognito(user, email, pass)
    }
  }).catch(err => console.log(err));
});

function saveCognito(user, email, pass){
  cognito.register(user, email, pass)
  .then((retorno) => {
    saveUser(user, email, pass);
  }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
}

function saveUser(user, email, pass){
  let obj = {
    user: user.toLowerCase(),
    email: email.toLowerCase(),
    password: md5(pass),
    game:'MRBC',
    active: true
  };

  dataUser.save(obj)
  .then((retorno) => {
    if(retorno){
      ipcRenderer.invoke('redirecionar-pagina','login');
    }
  }).catch(err =>  alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
}
