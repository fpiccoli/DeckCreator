const menu = require('./menu/controller.js');
const { ipcRenderer }  = require('electron');
const cookie = require('./cookie-manager.js');

var package = require('../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookie.login().then((user) => {
  if(user){
    menu.sidebar(document, user);
    menu.navbar(document, user);
  } else{
    ipcRenderer.send('redirecionar-pagina','login');
  }
}).catch(err => console.log(err));
