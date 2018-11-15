const { ipcRenderer }  = require('electron');
const fs = require('fs');
const load = require('./loadJSON.js');
const file = require('./file-manager.js');
const html = require('./html-builder.js');

document.querySelector('#load-decks').addEventListener('click' , function(){
  ipcRenderer.send('get-path', 'documents');
  ipcRenderer.on('return-path', (event, path) => {
    let json = file.readDir(path);
    document.querySelector('#menu-content').innerHTML = html.menuDecks(json);

    json.forEach(build);
    function build(deck, index, array) {
      let herois = [];
      let cartas = [];

      let retornoLoad = load.montaObj(deck);
      if (retornoLoad){
        herois = retornoLoad.herois;
        cartas = retornoLoad.cartas;
      }
      document.querySelector('#botao-editar-'+index).addEventListener('click' , function(){
        ipcRenderer.send('set-nome-cookie', array[index].Nickname);
        ipcRenderer.send('set-card-cookie', cartas);
        ipcRenderer.send('set-herois-cookie', herois);
        ipcRenderer.send('pagina-editor');
      });
    }
  });
});

document.querySelector('#novo-deck').addEventListener('click' , function(){
  ipcRenderer.send('clear-cookies');
  ipcRenderer.send('pagina-editor');
});

document.querySelector('#editor-deck').addEventListener('click' , function(){
  ipcRenderer.send('pagina-editor');
});

document.querySelector("#link-fechar").addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-principal');
});
