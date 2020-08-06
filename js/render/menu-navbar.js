const { ipcRenderer }  = require('electron');
const builder = require('../html/builder.js');
const htmlMyDecks = require('../html/decks-my.js');
const htmlPublicDecks = require('../html/decks-public.js');
const regras = require('../html/regras.js');
const sobre = require('../html/sobre.js');
const dataManager = require('../manager/array.js');
const alert = require('../manager/interface/alert.js');
const file = require('../manager/file.js');
const deckBuilder = require('../manager/deck.js');
const render = require('../render/menu.js');
const dataDeck = require('../rest/deck.js');
const dataVersao = require('../rest/version.js');

module.exports = {
  updateCheck(documento){
    ipcRenderer.send('update-check');
    ipcRenderer.on('update-ready', (event, downloaded) => {
      if(downloaded){
        documento.querySelector('#update-ready').innerHTML = '<a class="dropdown-toggle" title="New Update!" data-toggle="dropdown" href="#"><i class="fa fa-exclamation"></i></a><ul class="dropdown-menu dropdown-user"><li><a id="do-update" href="#">Restart and update</a></li></ul>'
        documento.querySelector("#do-update").addEventListener('click' , function(){
          ipcRenderer.send('do-update');
        });
      }
    });
  },
  logout(documento){
    documento.querySelector("#logout").addEventListener('click', function () {
      if(alert.confirmDialog('Logout', 'Sure!', 'Nope', 'Are you sure you want to logout?')){
        file.deleteLogin();
        ipcRenderer.send('clear-cookies');
        ipcRenderer.send('redirecionar-pagina', 'login');
      }
    });
  },
  clearCache(documento){
    documento.querySelector("#clear-cache").addEventListener('click', function () {
      file.clearCache();
      alert.message(documento.querySelector("#alert-message"), '<b>Tabletop Simulator</b> cache successfully cleared!', 'success');
    });
  },
  importDecks(documento, user){
    documento.querySelector("#import-decks").addEventListener('click', function () {
      file.clearLocalFile(user.game);
      dataDeck.find(user.name, user.game)
      .then((retorno) => {
        retorno.forEach(function (deck, index, array) {
          let deckRetorno = deckBuilder.build(deck, user.game);
          file.export(deck, deckRetorno, user.game);
        });
      }).catch(err => console.log(err));
      alert.message(documento.querySelector("#alert-message"), 'Decks successfully synced with <b>Tabletop Simulator</b>!', 'success');
    });
  },
  effects(documento, user){
    if(user.game == 'M&D'){
      let btnLista = '<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-list-ul"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-user"><li><a id="lista-efeitos" href="#">Effects List</a></li></ul>';
      documento.querySelector("#btn-lista-efeitos").innerHTML = btnLista;
      documento.querySelector("#lista-efeitos").addEventListener('click', function () {
        ipcRenderer.send('abrir-janela-efeitos');
      });
    }
  }
}
