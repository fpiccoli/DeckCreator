const { ipcRenderer }  = require('electron');
var moment = require('moment');
const md5 = require('md5');
const alert = require('../../alert-message.js');
const dataCode = require('../../data/code.js');
const dataUser = require('../../data/user.js');

document.querySelector('#confirm').addEventListener('click' , function(){
  let email = document.querySelector('#email').value.toLowerCase();
  let pass = md5(document.querySelector('#pass').value);
  let codigo = document.querySelector('#codigo').value.toUpperCase();

  if(!email){
    alert.message(document.querySelector('#alert-message'), 'Enter the email!', 'warning');
    return;
  }
  if(!codigo){
    alert.message(document.querySelector('#alert-message'), 'Enter the code!', 'warning');
    return;
  }
  if(!document.querySelector('#pass').value){
    alert.message(document.querySelector('#alert-message'), 'Enter the new password!', 'warning');
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
      alert.message(document.querySelector('#alert-message'), 'Invalid code!', 'danger');
    }
  }).catch(err => console.log(err));

});
