// const { ipcRenderer }  = require('electron');
// const md5 = require('md5');
// const data = require('../data-mongo.js');
// const mailer = require('./mailer.js');

document.querySelector('#ativar').addEventListener('click' , function(){
  let email = document.querySelector('#email').value.toLowerCase();
  let codigo = document.querySelector('#codigo').value.toLowerCase();
  //
  // let codigo = Math.random().toString(36).substring(2, 5).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  //
  // mailer.send(email, codigo);
  // data.register({user: user.toLowerCase(), email: email.toLowerCase(), pass: pass, codigo: codigo})

  console.log(email);
  console.log(codigo);

  // ipcRenderer.send('redirecionar-pagina','login');
});
