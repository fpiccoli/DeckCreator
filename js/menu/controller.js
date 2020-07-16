const { ipcRenderer }  = require('electron');
const builder = require('../html/builder.js');
const htmlMyDecks = require('../html/decks-my.js');
const htmlPublicDecks = require('../html/decks-public.js');
const dataDeck = require('../../js/data/deck.js');
const dataManager = require('../data-manager.js');
const render = require('./render.js');
const alert = require('../alert-message.js');
const file = require('../file-manager.js');
const deckBuilder = require('../deck-builder.js');
const regras = require('../html/regras.js');
const sobre = require('../html/sobre.js');
const dataVersao = require('../data/version.js');

module.exports = {
  navbar(documento, user){
    ipcRenderer.send('update-check');
    ipcRenderer.on('update-ready', (event, downloaded) => {
      if(downloaded){
        documento.querySelector('#update-ready').innerHTML = '<a class="dropdown-toggle" title="New Update!" data-toggle="dropdown" href="#"><i class="fa fa-exclamation"></i></a><ul class="dropdown-menu dropdown-user"><li><a id="do-update" href="#">Restart and update</a></li></ul>'

        documento.querySelector("#do-update").addEventListener('click' , function(){
          ipcRenderer.send('do-update');
        });
      }
    });
    documento.querySelector("#logout").addEventListener('click', function () {
      if(alert.confirmDialog('Logout', 'Sure!', 'Nope', 'Are you sure you want to logout?')){
        file.deleteLogin();
        ipcRenderer.send('clear-cookies');
        ipcRenderer.send('redirecionar-pagina', 'login');
      }
    });
    documento.querySelector("#clear-cache").addEventListener('click', function () {
      file.clearCache();
      alert.message(documento.querySelector("#alert-message"), '<b>Tabletop Simulator</b> cache successfully cleared!', 'success');
    });
    documento.querySelector("#import-decks").addEventListener('click', function () {
      let decks = dataDeck.find(user.name, user.game);
      file.clearLocalFile(user.game);
      decks.then((retorno) => {
        retorno.forEach(function (deck, index, array) {
          let deckRetorno = deckBuilder.build(deck, user.game);
          file.export(deck.name, deckRetorno, user.game, deck.heroes);
        });
      }).catch(err => console.log(err));
      alert.message(documento.querySelector("#alert-message"), 'Decks successfully synced with <b>Tabletop Simulator</b>!', 'success');
    });
    if(user.game == 'M&D'){
      let btnLista = '<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-list-ul"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-user"><li><a id="lista-efeitos" href="#">Effects List</a></li></ul>';
      documento.querySelector("#btn-lista-efeitos").innerHTML = btnLista;
      documento.querySelector("#lista-efeitos").addEventListener('click', function () {
        ipcRenderer.send('abrir-janela-efeitos');
      });
    }
  },
  sidebar(documento, user){
    documento.querySelector('#load-decks').addEventListener('click' , function(){
      let decks = dataDeck.find(user.name, user.game);
      decks.then((retorno) => {
        retorno.sort(dataManager.dynamicSort('name'));
        retorno.forEach(function (deck, index, array) {
          deck.cards.forEach(function(card){ delete card._id });
          deck.heroes.forEach(function(hero){ delete hero._id });
        });
        documento.querySelector('#menu-content').innerHTML = builder.loading();

        documento.querySelector('#menu-content').innerHTML = htmlMyDecks.accordion(retorno, user.game);
        render.myDecks(documento, retorno, user);
      }).catch(err => console.log(err));
    });
    documento.querySelector('#public-decks').addEventListener('click' , function(){
      let decks = dataDeck.list(user.game);
      decks.then((retorno) => {
        retorno.sort(dataManager.dynamicSort('name'));
        retorno.forEach(function (deck, index, array) {
          deck.cards.forEach(function(card){ delete card._id });
          deck.heroes.forEach(function(hero){ delete hero._id });
        });
        documento.querySelector('#menu-content').innerHTML = builder.loading();

        documento.querySelector('#menu-content').innerHTML = htmlPublicDecks.accordion(retorno, user);
        render.publicDecks(documento, retorno, user);
      }).catch(err => console.log(err));
    });
    documento.querySelector('#novo-deck').addEventListener('click' , function(){
      ipcRenderer.send('delete-cookies', ['heroi1', 'heroi2', 'heroi3', 'cards', 'nome', 'grupo']);
      ipcRenderer.send('redirecionar-pagina','editor');
    });
    documento.querySelector('#editor-deck').addEventListener('click' , function(){
      ipcRenderer.send('redirecionar-pagina','editor');
    });
    documento.querySelector("#regras-panel").addEventListener('click', function () {
      documento.querySelector('#menu-content').innerHTML = regras.html(user.game);
    });
    documento.querySelector("#sobre-semver").addEventListener('click', function () {
      dataVersao.listAll().then((retorno) => {
        documento.querySelector('#menu-content').innerHTML = sobre.html(retorno, dataManager);
      }).catch(err => console.log(err));
    });
  }
}
