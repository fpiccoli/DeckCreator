const { ipcRenderer }  = require('electron');
const file = require('./file-manager.js');
const alert = require('./alert-message.js');
const load = require('./loadJSON.js');
const html = require('./html/menu-decks.js');
const regras = require('./html/regras.js');

module.exports = {
  navbar(documento){
    documento.querySelector("#link-fechar").addEventListener('click', function () {
      ipcRenderer.send('fechar-janela-principal');
    });
    documento.querySelector("#clear-cache").addEventListener('click', function () {
      ipcRenderer.send('get-path', 'documents');
      ipcRenderer.on('return-path', (event, path) => {
        file.clearCache(path);
        alert.message(documento.querySelector("#alert-message"), 'Cache do <b>Tabletop Simulator</b> limpo com sucesso!', 'success');
      });
    });
    documento.querySelector("#lista-efeitos").addEventListener('click', function () {
      ipcRenderer.send('abrir-janela-efeitos');
    });
  },
  sidebar(documento){
    documento.querySelector('#load-decks').addEventListener('click' , function(){
      ipcRenderer.send('get-path', 'documents');
      ipcRenderer.on('return-path', (event, path) => {
        let json = file.readDir(path);

        documento.querySelector('#menu-content').innerHTML = html.loading();
        setTimeout(function(){
          render(documento, path, json);
        }, 3000);
      });
    });
    documento.querySelector('#novo-deck').addEventListener('click' , function(){
      ipcRenderer.send('clear-cookies');
      ipcRenderer.send('pagina-editor');
    });
    documento.querySelector('#editor-deck').addEventListener('click' , function(){
      ipcRenderer.send('pagina-editor');
    });
    documento.querySelector("#regras-panel").addEventListener('click', function () {
      documento.querySelector('#menu-content').innerHTML = regras.html();
    });
  }
}

function render(documento, path, json){
  documento.querySelector('#menu-content').innerHTML = html.menu(json);
  json.forEach(build);
  function build(deck, index, array) {
    let herois = [];
    let cartas = [];

    let retornoLoad = load.montaObj(deck);
    if (retornoLoad){
      herois = retornoLoad.herois;
      cartas = retornoLoad.cartas;
    }
    documento.querySelector('#botao-editar-'+index).addEventListener('click' , function(){
      ipcRenderer.send('set-nome-cookie', array[index].Nickname);
      ipcRenderer.send('set-card-cookie', cartas);
      ipcRenderer.send('set-herois-cookie', herois);
      ipcRenderer.send('pagina-editor');
    });
    documento.querySelector('#botao-excluir-'+index).addEventListener('click' , function(){
      file.delete(path, array[index].Nickname);
      renderDecks();
    });
    document.querySelector('#botao-alterar-nome-'+index).addEventListener('click' , function(){
      document.querySelector('#input-novo-nome-'+index).innerHTML = '<div class="input-group custom-search-form"><input id="campo-nome-'+index+'" type="text" class="form-control" placeholder="Novo Nome"><span class="input-group-btn"><button id="update-nome-'+index+'" class="btn btn-default" type="button"><i class="fa fa-tag"></i></button></span></div>';
      document.querySelector('#update-nome-'+index).addEventListener('click' , function(){
        eventUpdateNome(document, path, deck, index, json);
      });
      document.querySelector('#campo-nome-'+index).addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          eventUpdateNome(document, path, deck, index, json);
        }
      });
    });
  }
}

function eventUpdateNome(documento, path, deck, index, json){
  let novoNome = documento.querySelector('#campo-nome-'+index).value;
  let antigo = deck.Nickname;
  deck.Nickname = novoNome;
  if (file.update(path, novoNome, antigo, deck)){
    render(documento, path, json);
  };
}
