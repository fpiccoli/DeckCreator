const { ipcRenderer }  = require('electron');
const alert = require('../../alert-message.js');
const dataUser = require('../../data/user.js');
const dataCode = require('../../data/code.js');
const mailer = require('../mailer.js');

document.querySelector('#change').addEventListener('click' , function(){
  change();
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
        mailer.send(email, codigo).then(() => {
          ipcRenderer.send('redirecionar-pagina','senha-trocar');
        }).catch(err => console.log(err));
      }
    } else{
      alert.message(document.querySelector('#alert-message'), 'Invalid email!', 'danger');
    }
  }).catch(err => console.log(err));

}
