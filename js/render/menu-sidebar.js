const { ipcRenderer }  = require('electron');
const builder = require('../html/builder.js');
const htmlMyDecks = require('../html/decks-my.js');
const htmlPublicDecks = require('../html/decks-public.js');
const regras = require('../html/regras.js');
const sobre = require('../html/sobre.js');
const alert = require('../manager/alert.js');
const file = require('../manager/file.js');
const dataManager = require('../manager/array.js');
const deckBuilder = require('../manager/deck.js');
const render = require('../render/menu.js');
const dataDeck = require('../rest/deck.js');
const dataVersao = require('../rest/version.js');

module.exports = {
  loadDecks(documento, user){
    documento.querySelector('#load-decks').addEventListener('click' , function(){
      dataDeck.find(user.name, user.game)
      .then((retorno) => {
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
  },
  publicDecks(documento, user){
    documento.querySelector('#public-decks').addEventListener('click' , function(){
      dataDeck.public(user.game)
      .then((retorno) => {
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
  },
  recipe(documento, user){
    documento.querySelector('#recipe').addEventListener('click' , function(){
      dataDeck.recipe(user.game)
      .then((retorno) => {
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
  },
  newDeck(documento){
    documento.querySelector('#novo-deck').addEventListener('click' , function(){
      ipcRenderer.send('delete-cookies', ['heroi1', 'heroi2', 'heroi3', 'cards', 'nome', 'grupo']);
      ipcRenderer.send('redirecionar-pagina','editor');
    });
  },
  editorDeck(documento){
    documento.querySelector('#editor-deck').addEventListener('click' , function(){
      ipcRenderer.send('redirecionar-pagina','editor');
    });
  },
  regras(documento, user){
    documento.querySelector("#regras-panel").addEventListener('click', function () {
      documento.querySelector('#menu-content').innerHTML = regras.html(user.game);
    });
  },
  sobre(documento){
    documento.querySelector("#sobre-semver").addEventListener('click', function () {
      dataVersao.listAll().then((retorno) => {
        documento.querySelector('#menu-content').innerHTML = sobre.html(retorno);
      }).catch(err => console.log(err));
    });
  }
}
