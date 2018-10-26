const { ipcRenderer } = require('electron');
const panel = require('./panel-heroes.js');

let abrirPanel = document.querySelector("#abrir-panel");
let linkFechar = document.querySelector("#link-fechar");

setTimeout(function(){
  panel.renderPuro();
  panel.renderHibrido();
}, 3000);

window.onload = function(){
};

linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-herois');
});
