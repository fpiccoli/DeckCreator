const { ipcRenderer }  = require('electron');
const data = require('./data.js');
const panel = require('./panel-cards.js');

let linkFechar = document.querySelector("#link-fechar");
let h1 = document.querySelector('.selecionar-heroi-1');
let h2 = document.querySelector('.selecionar-heroi-2');
let h3 = document.querySelector('.selecionar-heroi-3');

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-principal');
});

h1.addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', 1);
});

h2.addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', 2);
});

h3.addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', 3);
});
