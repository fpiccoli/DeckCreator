const { ipcRenderer, shell } = require('electron');

let linkFechar = document.querySelector("#link-fechar");
let amazon = document.querySelector(".pure-amazon");

window.onload = function(){
}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-herois');
})

amazon.addEventListener('click', function () {
    console.log('ENTROU!');
})
