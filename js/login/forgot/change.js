const { ipcRenderer }  = require('electron');
const alert = require('../../manager/interface/alert.js');
const mailer = require('../mailer.js');
const dataUser = require('../../rest/user.js');
const dataCode = require('../../rest/code.js');

document.querySelector('#change').addEventListener('click' , function(){
  change();
});

document.querySelector('#back').addEventListener('click' , function(){
  ipcRenderer.send('redirecionar-pagina','login');
});

function change(){
  let email = document.querySelector('#email').value.toLowerCase();

  if(!email){
    alert.message(document.querySelector('#alert-message'), 'Enter the email!', 'warning');
    return;
  }

  var userFind = dataUser.find({email: email});

  userFind.then((retorno) => {
    if(retorno){
      let codigo = Math.random().toString(36).substring(2, 5).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

      if(dataCode.save({email: email.toLowerCase(), codigo: codigo, data: new Date()})){
        mailer.forgotPassword(email, codigo).then(() => {
          ipcRenderer.send('redirecionar-pagina','senha-trocar');
        }).catch(err => console.log(err));
      }
    } else{
      alert.message(document.querySelector('#alert-message'), 'Invalid email!', 'danger');
    }
  }).catch(err => console.log(err));

}
