const { ipcRenderer }  = require('electron');
const deckBuilder = require('./deck-builder.js');
const file = require('./file-manager.js');
const alert = require('./alert-message.js');
const html = require('./html/menu-decks.js');
const regras = require('./html/regras.js');
const sobre = require('./html/sobre.js');
const data = require('./data-mongo.js');
const dataManager = require('./data-manager.js');
const cookie = require('./cookie-manager.js');

module.exports = {
  navbar(documento, cookies){
    documento.querySelector("#logout").addEventListener('click', function () {
      if(alert.confirmDialog('Remover Deck', 'Sim', 'Não', 'Tem certeza que deseja sair?')){
        file.deleteLogin();
        ipcRenderer.send('clear-cookies');
        ipcRenderer.send('redirecionar-pagina', 'login');
      }
    });
    documento.querySelector("#clear-cache").addEventListener('click', function () {
      file.clearCache();
      alert.message(documento.querySelector("#alert-message"), 'Cache do <b>Tabletop Simulator</b> limpo com sucesso!', 'success');
    });
    documento.querySelector("#import-decks").addEventListener('click', function () {
      cookieLogin = cookie.filtraCookies(cookies, 'login');
      let decks = data.getDecks(JSON.parse(cookieLogin[0].value).user);
      decks.then((retorno) => {
        retorno.forEach(function (deck, index, array) {
          let deckRetorno = deckBuilder.build(deck);
          file.export(deck.name, deckRetorno);
        });
      }).catch(err => console.log(err));
      alert.message(documento.querySelector("#alert-message"), 'Decks importados para o <b>Tabletop Simulator</b> com sucesso!', 'success');
    });
    documento.querySelector("#lista-efeitos").addEventListener('click', function () {
      ipcRenderer.send('abrir-janela-efeitos');
    });
  },
  sidebar(documento, cookies){
    documento.querySelector('#load-decks').addEventListener('click' , function(){
      cookieLogin = cookie.filtraCookies(cookies, 'login');
      let decks = data.getDecks(JSON.parse(cookieLogin[0].value).user);
      decks.then((retorno) => {
        retorno.sort(dataManager.dynamicSort('name'));
        retorno.forEach(function (deck, index, array) {
          deck.cards.forEach(function(card){ delete card._id });
          deck.heroes.forEach(function(hero){ delete hero._id });
        });
        documento.querySelector('#menu-content').innerHTML = html.loading();
        render(documento, retorno);
      }).catch(err => console.log(err));
    });
    documento.querySelector('#novo-deck').addEventListener('click' , function(){
      ipcRenderer.send('delete-cookies', ['heroi1', 'heroi2', 'heroi3', 'cards', 'nome']);
      ipcRenderer.send('redirecionar-pagina','editor');
    });
    documento.querySelector('#editor-deck').addEventListener('click' , function(){
      ipcRenderer.send('redirecionar-pagina','editor');
    });
    documento.querySelector("#regras-panel").addEventListener('click', function () {
      documento.querySelector('#menu-content').innerHTML = regras.html();
    });
    documento.querySelector("#sobre-semver").addEventListener('click', function () {
      documento.querySelector('#menu-content').innerHTML = sobre.html();
    });
  }
}

function render(documento, json){
  documento.querySelector('#menu-content').innerHTML = html.accordion(json);
  json.forEach(function (deck, index, array) {
    let herois = deck.heroes;
    let cartas = deck.cards;

    let id = deck.user+'-'+dataManager.replaceAll(deck.name.toLowerCase(),' ','-');
    documento.querySelector('#botao-editar-'+id).addEventListener('click' , function(){
      ipcRenderer.send('set-cookie', 'nome', array[index].name);
      ipcRenderer.send('set-cookie', 'cards', JSON.stringify(cartas));
      herois.forEach(setCookie);
      function setCookie(heroi, index, array){
        ipcRenderer.send('set-cookie', 'heroi'+(index+1), JSON.stringify(heroi));
      };
      ipcRenderer.send('redirecionar-pagina','editor');
    });
    documento.querySelector('#botao-excluir-'+id).addEventListener('click' , function(){
      if(alert.confirmDialog('Remover Deck', 'Sim', 'Não', 'Tem certeza que deseja remover o deck "'+ array[index].name +'"?')){
        if(data.delete(array[index].name)){
          file.delete(array[index].name);
          json = removeObj(json, array[index]);
        }
      }
      render(documento, json);
    });
    document.querySelector('#botao-alterar-nome-'+id).addEventListener('click' , function(){
      document.querySelector('#input-novo-nome-'+id).innerHTML = '<div class="input-group custom-search-form"><input id="campo-nome-'+id+'" type="text" class="form-control" placeholder="Novo Nome"><span class="input-group-btn"><button id="update-nome-'+index+'" class="btn btn-default" type="button"><i class="fa fa-tag"></i></button></span></div>';
      document.querySelector('#update-nome-'+id).addEventListener('click' , function(){
        eventUpdateNome(document, deck, id, json);
      });
      document.querySelector('#campo-nome-'+id).addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          eventUpdateNome(document, deck, id, json);
        }
      });
    });
  });
}

function eventUpdateNome(documento, deck, index, json){
  let novoNome = documento.querySelector('#campo-nome-'+index).value;
  if(novoNome.length == 0){
    alert.message(document.querySelector('#alert-message'), 'Você precisa digitar um nome válido!', 'warning');
    return;
  }

  let antigo = deck.name;
  if(alert.confirmDialog('Salvar Deck', 'Sim', 'Não', 'Deseja alterar o nome de "'+antigo+'" para  "'+novoNome+'"?')){
    if(data.update(deck, novoNome, antigo)){
      file.update(novoNome, antigo, deckBuilder.build(deck));
    }
  }
  render(documento, json);
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
