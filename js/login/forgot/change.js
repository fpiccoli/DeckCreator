const { ipcRenderer }  = require('electron');
const alert = require('../../manager/interface/alert.js');
const mailer = require('../mailer.js');
const cognito = require('../cognito.js');

document.querySelector('#change').addEventListener('click' , function(){
  change();
});

document.querySelector('#back').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','login');
});

document.querySelector('#trocar').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','senha-trocar');
});

function change(){
  let email = document.querySelector('#email').value.toLowerCase();

  if(!email){
    alert.message(document.querySelector('#alert-message'), 'Enter the email!', 'warning');
    return;
  }

  cognito.forgotPassword(email)
  .then((retorno) => {
    ipcRenderer.send('redirecionar-pagina','senha-trocar');
  }).catch(err => alert.message(document.querySelector('#alert-message'), err.message, 'danger'));
}
