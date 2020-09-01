const { ipcRenderer }  = require('electron');
const alert = require('../manager/interface/alert.js');
const cognito = require('../cognito/forgot-password.js');

document.querySelector('#change').addEventListener('click' , function(){
  change();
});

document.querySelector('#back').addEventListener('click' , function(){
  ipcRenderer.invoke('redirecionar-pagina','login');
});

document.querySelector('#trocar').addEventListener('click' , function(){
  ipcRenderer.invoke('redirecionar-pagina','senha-trocar');
});

function change(){
  let email = document.querySelector('#email').value.toLowerCase();

  if(!email){
    alert.message(document.querySelector('#alert-message'), 'Enter the email!', 'warning');
    return;
  }

  cognito.forgotPassword(email)
  .then((retorno) => {
    ipcRenderer.invoke('redirecionar-pagina','senha-trocar');
  }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
}
