const { ipcRenderer } = require('electron');
const dataManager = require('../manager/array.js');
const cookie = require('../manager/interface/cookie.js');
const render = require('../render/herois.js');
const dataClasse = require('../rest/classe.js');

let linkFechar = document.querySelector("#link-fechar");

document.querySelector('#accordion-pure-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">LOADING...</button>';
document.querySelector('#accordion-hybrid-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">LOADING...</button>';

cookie.login().then((retorno) => {
  if(retorno){
    getHerois(retorno.game, retorno.idToken);
  }
}).catch(err => console.log(err));

function getHerois(game, token){
  dataClasse.listAll(game, token)
  .then((retorno) => {
    let puros = dataManager.listByType('Pure', retorno);
    let hibridos = dataManager.listByType('Hybrid', retorno);

    puros.sort(dataManager.dynamicSort('name'));
    hibridos.sort(dataManager.dynamicSort('name'));

    render.accordion('pure', 2, puros, retorno);
    render.accordion('hybrid', 2, puros, retorno);
    render.button(retorno, puros, hibridos);

  }).catch(err => console.log(err));
}

linkFechar.addEventListener('click', function () {
  ipcRenderer.invoke('fechar-janela-herois');
});
