const { ipcRenderer } = require('electron');
const html = require('./html-builder.js');

let linkFechar = document.querySelector("#link-fechar");
let recarregar;

setTimeout(function(){
  render('pure', 2);
  render('hybrid', 2);
}, 3000);

linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-herois');
});

function render(type, colunas){
  let retorno = html.build(type, colunas);
  document.querySelector('#accordion-'+type+'-panel').innerHTML = retorno;
  if (retorno.search("recarregar-herois") > 0){
    recarregar = document.querySelector("#recarregar-herois");
    recarregar.addEventListener('click', function () {
        render('pure', 2);
        render('hybrid', 2);
    });
  }
}
