const { ipcRenderer }  = require('electron');
const fs = require('fs');
const file = require('./file-manager.js');
const html = require('./html-builder.js');

document.querySelector('#load-decks').addEventListener('click' , function(){
  ipcRenderer.send('get-path', 'documents');
  ipcRenderer.on('return-path', (event, path) => {
    let json = file.readDir(path);

console.log( html.menuDecks(json));

    document.querySelector('#menu-content').innerHTML = html.menuDecks(json);
  });
});

document.querySelector('#novo-deck').addEventListener('click' , function(){
  ipcRenderer.send('pagina-editor');
});

document.querySelector("#link-fechar").addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-principal');
});
