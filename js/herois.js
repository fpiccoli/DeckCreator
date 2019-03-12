const { ipcRenderer } = require('electron');
const html = require('./html/herois.js');
const data = require('./data-manager.js');
const monta = require('./monta-heroi.js');

let linkFechar = document.querySelector("#link-fechar");
let recarregar;

document.querySelector('#accordion-pure-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">CARREGANDO...</button>';
document.querySelector('#accordion-hybrid-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">CARREGANDO...</button>';

require('../config/mongo.js')('deckcreator');
var mongoose = require('mongoose');
const Efeito = require('../models/classe.js');

var model = mongoose.model('Classe');

model.find().lean().then(function(retorno){
  let puros = data.listByType('Pure', retorno);
  let hibridos = data.listByType('Hybrid', retorno);

  puros.sort(dynamicSort('name'));
  hibridos.sort(dynamicSort('name'));

  render('pure', 2, puros, retorno);
  render('hybrid', 2, puros, retorno);
  buttonBuilder(retorno, puros, hibridos);
},function(error){
  console.log(error);
})


linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-herois');
});

function render(type, colunas, puros, lista){
  let retorno = html.build(type, colunas, puros, lista);
  document.querySelector('#accordion-'+type+'-panel').innerHTML = retorno;
  if (retorno.search("recarregar-herois") > 0){
    recarregar = document.querySelector("#recarregar-herois");
    recarregar.addEventListener('click', function () {
      render('pure', 2);
      render('hybrid', 2);
    });
  }
}

function buttonBuilder(lista, puros, hibridos){
  for(let i in puros){
    for(let h in puros[i].heroes){
      let heroi = puros[i].heroes[h];
      heroi = monta.heroi(heroi, data, lista, puros[i].main, puros[i].sub);
      buttonSelecionar(puros[i].name.toLowerCase(), heroi);
    }
  }
  for(let i in hibridos){
    for(let h in hibridos[i].heroes){
      let heroi = hibridos[i].heroes[h];

      heroi = monta.heroi(heroi, data, lista, hibridos[i].main, hibridos[i].sub);
      buttonSelecionar(hibridos[i].main.toLowerCase()+'-'+hibridos[i].sub.toLowerCase(), heroi, lista);
      buttonSelecionar(hibridos[i].sub.toLowerCase()+'-'+hibridos[i].main.toLowerCase(), heroi, lista);
    }
  }
}

function buttonSelecionar(param, heroi, lista){
  myURL = new URL(document.URL);
  document.querySelector('.selecionar-'+param+'-'+heroi.cardnumber.toLowerCase()).addEventListener('click', function () {
    ipcRenderer.send('heroi-selecionado', heroi, myURL.searchParams.get('posicao'));
    ipcRenderer.send('fechar-janela-herois');
  });
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}
