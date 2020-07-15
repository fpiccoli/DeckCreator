const { ipcRenderer }  = require('electron');
var moment = require('moment');
const alert = require('../alert-message.js');
const dataCode = require('../rest/code.js');
const dataUser = require('../rest/user.js');

document.querySelector('#back').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','register');
});

document.querySelector('#ativar').addEventListener('click' , function(){
  let email = document.querySelector('#email').value.toLowerCase();
  let codigo = document.querySelector('#codigo').value.toUpperCase();

  if(email.length == 0){
    alert.message(document.querySelector('#alert-message'), 'Enter the email!', 'warning');
    return;
  }

  if(codigo.length != 6){
    alert.message(document.querySelector('#alert-message'), 'Code must have exactly 6 characters!', 'warning');
    return;
  }

  findCode({email: email, codigo: codigo});
});

function findCode(obj){
  dataCode.find(obj).then((retorno) => {
    if(retorno){
      let atual = moment();
      let limite = moment(retorno.data).add(15, 'm');

      if(atual.isBefore(limite)){
        activateUser(obj);
      }
      else {
        alert.message(document.querySelector('#alert-message'), 'Expired code!' , 'warning');
      }

    } else{
      alert.message(document.querySelector('#alert-message'), 'Invalid code or email!', 'danger');
    }
  }).catch(err => console.log(err));
}

function activateUser(obj){
  console.log(obj);
  dataUser.activate(obj.email).then((retorno) => {
    if(retorno){
      ipcRenderer.send('redirecionar-pagina','login');
    }
  }).catch(err => console.log(err));
}
