const { ipcRenderer }  = require('electron');
const alert = require('../../manager/alert.js');
const dataCode = require('../../rest/code.js');
const dataUser = require('../../rest/user.js');
var moment = require('moment');
const md5 = require('md5');

document.querySelector('#confirm').addEventListener('click' , function(){
  let email = document.querySelector('#email').value.toLowerCase();
  let pass = md5(document.querySelector('#pass').value);
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

  var codeFind = dataCode.find({email: email, codigo: codigo});

  codeFind.then((retorno) => {
    if(retorno){
      let atual = moment();
      let limite = moment(retorno.data).add(15, 'm');

      if(atual.isBefore(limite)){
        if(dataUser.update({email: email, password: pass})){
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
