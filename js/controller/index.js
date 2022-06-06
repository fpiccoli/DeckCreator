const { ipcRenderer }  = require('electron');
const navbar = require('../render/menu-navbar.js');
const sidebar = require('../render/menu-sidebar.js');
const cookie = require('../manager/interface/cookie.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookie.login().then((user) => {
  if(user){
    navbar.logout(document, user);
    navbar.clearCache(document);
    navbar.importDecks(document, user);
    navbar.effects(document, user);

    sidebar.loadDecks(document, user);
    sidebar.publicDecks(document, user);
    sidebar.recipe(document, user);
    sidebar.newDeck(document);
    sidebar.editorDeck(document);
    sidebar.regras(document, user);
    sidebar.sobre(document, user);
  } else{
    ipcRenderer.invoke('redirecionar-pagina','login');
  }
}).catch(err => console.log(err));
