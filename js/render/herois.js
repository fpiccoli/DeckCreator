const { ipcRenderer } = require('electron');
const html = require('../html/herois.js');
const dataManager = require('../manager/array.js');

module.exports = {
  accordion(type, colunas, puros, lista){
    let retorno = html.build(type, colunas, puros, lista);
    document.querySelector('#accordion-'+type+'-panel').innerHTML = retorno;
    if (retorno.search("recarregar-herois") > 0){
      document.querySelector("#recarregar-herois").addEventListener('click', function () {
        module.exports.accordion('pure', 2, puros, lista);
        module.exports.accordion('hybrid', 2, puros, lista);
      });
    }
  },
  button(lista, puros, hibridos){
    for(let i in puros){
      for(let h in puros[i].heroes){
        let heroi = puros[i].heroes[h];
        heroi = montaHeroi(heroi, dataManager, lista, puros[i].main, puros[i].sub);
        buttonSelecionar(dataManager.getNome(puros[i].name), heroi, lista);
      }
    }
    for(let i in hibridos){
      for(let h in hibridos[i].heroes){
        let heroi = hibridos[i].heroes[h];

        heroi = montaHeroi(heroi, dataManager, lista, hibridos[i].main, hibridos[i].sub);
        buttonSelecionar(dataManager.getNome(hibridos[i].main)+'-'+dataManager.getNome(hibridos[i].sub), heroi, lista);
        if(dataManager.getNome(hibridos[i].sub) != '___'){
          buttonSelecionar(dataManager.getNome(hibridos[i].sub)+'-'+dataManager.getNome(hibridos[i].main), heroi, lista);
        }
      }
    }
  }
}

function montaHeroi(heroi, data, lista, main, sub){
  let deck = data.getClasseByCard(heroi, lista);
  let retorno = heroi;
  retorno.deck = deck;
  retorno.main = main;
  retorno.sub = sub;
  retorno.subtype = deck.subtype;
  retorno.alligment = deck.alligment;
  retorno.icon = data.getClasseByName(deck.main, lista).icon;
  let getSub = data.getClasseByName(deck.sub, lista);
  if(getSub){
    retorno.bg = getSub.bg;
    retorno.font = getSub.font;
  }
  delete retorno.deck.cards;

  return retorno;
}

function buttonSelecionar(param, heroi, lista){
  myURL = new URL(document.URL);
  document.querySelector('.selecionar-'+param+'-'+dataManager.getNome(heroi.cardnumber)).addEventListener('click', function () {
    ipcRenderer.send('heroi-selecionado', heroi, myURL.searchParams.get('posicao'));
    ipcRenderer.send('fechar-janela-herois');
  });
}
