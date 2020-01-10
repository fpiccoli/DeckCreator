const { ipcRenderer }  = require('electron');
var moment = require('moment');
const alert = require('../alert-message.js');
const dataCode = require('../data/code.js');
const dataUser = require('../data/user.js');

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

  var codeFind = dataCode.find({email: email, codigo: codigo});

  codeFind.then((retorno) => {
    if(retorno){
      let atual = moment();
      let limite = moment(retorno.data).add(15, 'm');

      if(atual.isBefore(limite)){
        if(dataUser.activate(email)){
          ipcRenderer.send('redirecionar-pagina','login');
        }
      }
      else{
        alert.message(document.querySelector('#alert-message'), 'Expired code!' , 'warning');
      }

    } else{
      alert.message(document.querySelector('#alert-message'), 'Invalid code or email!', 'danger');
    }
  }).catch(err => console.log(err));

});
