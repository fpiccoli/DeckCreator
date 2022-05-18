const { ipcRenderer } = require('electron');
const html = require('../html/herois.js');
const arrayManager = require('../manager/array.js');
const stringManager = require('../manager/string.js');

module.exports = { accordion, button }

function accordion(type, colunas, puros, lista, game) {
  let retorno = html.build(type, colunas, puros, lista, game);
  document.querySelector('#accordion-' + type + '-panel').innerHTML = retorno;
  if (retorno.search("recarregar-herois") > 0) {
    document.querySelector("#recarregar-herois").addEventListener('click', function () {
      module.exports.accordion('pure', 2, puros, lista);
      module.exports.accordion('hybrid', 2, puros, lista);
    });
  }
}

function button(lista, puros, hibridos) {
  for (let i in puros) {
    for (let h in puros[i].heroes) {
      let heroi = puros[i].heroes[h];
      heroi = montaHeroi(heroi, lista, puros[i].main, puros[i].sub);
      buttonSelecionar(stringManager.getNome(puros[i].name), heroi, lista);
    }
  }
  for (let i in hibridos) {
    for (let h in hibridos[i].heroes) {
      let heroi = hibridos[i].heroes[h];

      heroi = montaHeroi(heroi, lista, hibridos[i].main, hibridos[i].sub);
      buttonSelecionar(stringManager.getNome(hibridos[i].main) + '-' + stringManager.getNome(hibridos[i].sub), heroi, lista);
      if (stringManager.getNome(hibridos[i].sub) != '___') {
        buttonSelecionar(stringManager.getNome(hibridos[i].sub) + '-' + stringManager.getNome(hibridos[i].main), heroi, lista);
      }
    }
  }
}

function montaHeroi(heroi, lista, main, sub) {
  let deck = arrayManager.getClasseByCard(heroi, lista);
  let retorno = heroi;
  retorno.deck = deck;
  retorno.main = main;
  retorno.sub = sub;
  retorno.subtype = deck.subtype;
  retorno.alligment = deck.alligment;
  retorno.icon = arrayManager.getClasseByName(deck.main, lista).icon;
  let getSub = arrayManager.getClasseByName(deck.sub, lista);
  if (getSub) {
    retorno.bg = getSub.bg;
    retorno.font = getSub.font;
  }
  delete retorno.deck.cards;

  return retorno;
}

function buttonSelecionar(param, heroi, lista) {
  myURL = new URL(document.URL);
  document.querySelector('.selecionar-' + param + '-' + stringManager.getNome(heroi.cardnumber)).addEventListener('click', function () {
    ipcRenderer.invoke('heroi-selecionado', heroi, myURL.searchParams.get('posicao')).then(() => {
      ipcRenderer.invoke('redirecionar-pagina', 'editor')
      ipcRenderer.invoke('fechar-janela-herois');
    })
  });
}
