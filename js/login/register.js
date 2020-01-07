const { ipcRenderer }  = require('electron');
const md5 = require('md5');
const dataUser = require('../data/user.js');
const dataCode = require('../data/code.js');
const mailer = require('./mailer.js');
const alert = require('../alert-message.js');

document.querySelector('#register').addEventListener('click' , function(){
  let user = document.querySelector('#user').value.toLowerCase();
  let email = document.querySelector('#email').value.toLowerCase();
  let pass = md5(document.querySelector('#pass').value);

  var userFind = dataUser.find({
    $and: [
      {$or: [{user: user.toLowerCase()}, {email: email.toLowerCase()} ]},
      {active: true}
    ]
  });

  userFind.then((retorno) => {
    if(retorno){
      alert.message(document.querySelector('#alert-message'), 'User or email already registered!', 'danger');
    } else{
      sendEmail(user, email, pass);
    }
  }).catch(err => console.log(err));
});

function sendEmail(user, email, pass){
  let codigo = Math.random().toString(36).substring(2, 5).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

  if(dataUser.save({user: user.toLowerCase(), email: email.toLowerCase(), password: pass, game:'MRBC', codigo: codigo, active: false})){
    if(dataCode.save({email: email.toLowerCase(), codigo: codigo, data: new Date()})){
      mailer.send(email, codigo).then(() => {
        ipcRenderer.send('redirecionar-pagina','ativar');
      }).catch(err => console.log(err));
    }
  }
}
