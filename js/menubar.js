const { ipcRenderer }  = require('electron');
const deckBuilder = require('./deck-builder.js');
const file = require('./file-manager.js');
const alert = require('./alert-message.js');
const builder = require('./html/builder.js');
const htmlMyDecks = require('./html/decks-my.js');
const htmlPublicDecks = require('./html/decks-public.js');
const regras = require('./html/regras.js');
const sobre = require('./html/sobre.js');
const dataVersao = require('../js/data/version.js');
const dataDeck = require('../js/data/deck.js');
const dataManager = require('./data-manager.js');
const cookie = require('./cookie-manager.js');

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
          file.export(deck.name, deckRetorno, user.game);
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
        render(documento, retorno, user);
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
        renderPublic(documento, retorno, user);
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

function render(documento, json, user){
  json.forEach(function (deck, index, array) {
    let herois = deck.heroes;
    let cartas = deck.cards;

    let id = deck.user+'-'+dataManager.getNome(deck.name);
    documento.querySelector('#botao-editar-'+id).addEventListener('click' , function(){
      ipcRenderer.send('set-cookie', 'nome', array[index].name);
      if(deck.grupo == 'Sem Grupo'){
        ipcRenderer.send('delete-cookies', ['grupo']);
      } else{
        ipcRenderer.send('set-cookie', 'grupo', deck.grupo);
      }
      if(deck.public){
        ipcRenderer.send('set-cookie', 'public', 'true');
      } else{
        ipcRenderer.send('set-cookie', 'public', 'false');
      }
      ipcRenderer.send('set-cookie', 'cards', JSON.stringify(cartas));
      herois.forEach(setCookie);
      function setCookie(heroi, index, array){
        ipcRenderer.send('set-cookie', 'heroi'+(index+1), JSON.stringify(heroi));
      };
      ipcRenderer.send('redirecionar-pagina','editor');
    });
    documento.querySelector('#botao-excluir-'+id).addEventListener('click' , function(){
      if(alert.confirmDialog('Remove Deck', 'Sure!', 'Nope', 'Are you sure you want to remove the deck "'+ array[index].name +'"?')){
        if(dataDeck.delete(array[index].name, user.name, user.game)){
          file.delete(array[index].name, user.game);
          json = removeObj(json, array[index]);
        }
      }
      documento.querySelector('#menu-content').innerHTML = htmlMyDecks.accordion(json, user.game);
      render(documento, json, user);
    });
    document.querySelector('#botao-alterar-nome-'+id).addEventListener('click' , function(){
      document.querySelector('#input-novo-nome-'+id).innerHTML = '<div class="input-group custom-search-form"><input id="campo-nome-'+id+'" type="text" class="form-control" placeholder="New Name"><span class="input-group-btn"><button id="update-nome-'+id+'" class="btn btn-default" type="button"><i class="fa fa-tag"></i></button></span></div>';
      document.querySelector('#update-nome-'+id).addEventListener('click' , function(){
        eventUpdateNome(document, deck, id, json, user);
      });
      document.querySelector('#campo-nome-'+id).addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          eventUpdateNome(document, deck, id, json, user);
        }
      });
    });
  });
}

function renderPublic(documento, json, user){
  json.forEach(function (deck, index, array) {
    let herois = deck.heroes;
    let cartas = deck.cards;

    let id = deck.user+'-'+dataManager.getNome(deck.name);

    if(deck.user != user.name){
      documento.querySelector('#botao-import-'+id).addEventListener('click' , function(){

        let object = {
          name: deck.user + "'s " + deck.name,
          cards: cartas,
          heroes: herois,
          extra: [],
          user: user.name,
          grupo: 'Imported Decks',
          public: false,
          game: user.game
        }
        if(dataDeck.save(object, user.game)){
          let deckRetorno = deckBuilder.build(object, user.game);
          file.export(object.name, deckRetorno, user.game);
          alert.message(documento.querySelector("#alert-message"), '<b>' + deck.user + "'s " + deck.name + '</b> successfully imported to your decks!', 'success');
        }
      });
    }

  });
}

function eventUpdateNome(documento, deck, index, json, user){
  let novoNome = documento.querySelector('#campo-nome-'+index).value;
  if(novoNome.length == 0){
    alert.message(document.querySelector('#alert-message'), 'You must enter a valid name!', 'warning');
    return;
  }

  let antigo = deck.name;
  if(alert.confirmDialog('Name Change', 'Sure!', 'Nope', 'Do you want to change the name of "'+antigo+'" to "'+novoNome+'"?')){
    if(dataDeck.update(deck, novoNome, antigo, user.game)){
      file.update(novoNome, antigo, deckBuilder.build(deck, user.game), user.game);
    }
  }
  render(documento, json, user);
}

function removeObj(lista, obj){
  let count = 0;
  for(let i in lista){
    if(lista[i].name == obj.name){
      lista.splice(i, 1);
      break;
    }
  }
  return lista;
}
