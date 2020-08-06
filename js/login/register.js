const { ipcRenderer }  = require('electron');
const md5 = require('md5');
const mailer = require('./mailer.js');
const alert = require('../manager/interface/alert.js');
const dataUser = require('../rest/user.js');
const dataCode = require('../rest/code.js');

document.querySelector('#back').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','login');
});

document.querySelector('#activate').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','ativar');
});

document.querySelector('#register').addEventListener('click' , function(){
  let user = document.querySelector('#user').value.toLowerCase();
  let email = document.querySelector('#email').value.toLowerCase();
  let pass = md5(document.querySelector('#pass').value);

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

  let userFind = dataUser.active({user: user.toLowerCase(), email: email.toLowerCase()});
  userFind.then((retorno) => {
    if(retorno){
      alert.message(document.querySelector('#alert-message'), 'User or email already registered!', 'danger');
    } else{
      sendEmail(user, email, pass);
    }
  }).catch(err => console.log(err));
});

function sendEmail(user, email, pass){
  let obj = {
    user: user.toLowerCase(),
    email: email.toLowerCase(),
    password: pass,
    game:'MRBC',
    codigo: Math.random().toString(36).substring(2, 5).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase(),
    active: false
  };

  saveUser(obj);
}

function saveUser(obj){
  dataUser.save(obj).then((retorno) => {
    if(retorno){
      saveCode(obj);
    }
  }).catch(err => console.log(err));
}

function saveCode(obj){
  dataCode.save({email: obj.email, codigo: obj.codigo, data: new Date()})
  .then((retorno) => {
    console.log(retorno);
    if(retorno){
      mail(obj);
    }
  }).catch(err => console.log(err));
}

function mail(obj){
  mailer.alert(obj.user, obj.email, obj.codigo);
  mailer.registration(obj.user, obj.email, obj.codigo).then(() => {
    ipcRenderer.send('redirecionar-pagina','ativar');
  }).catch(err => console.log(err));
}
