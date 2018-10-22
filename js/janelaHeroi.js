const { ipcRenderer, shell } = require('electron');
    const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkTwitter = document.querySelector("#link-twitter");
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function(){



}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
})

linkTwitter.addEventListener('click', function () {
    shell.openExternal("https://www.twitter.com/dquintanilhas");
})
