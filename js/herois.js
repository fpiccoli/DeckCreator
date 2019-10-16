const { ipcRenderer } = require('electron');
const html = require('./html/herois.js');
const mongo = require('./data-mongo.js');
const data = require('./data-manager.js');
const monta = require('./monta-heroi.js');

let linkFechar = document.querySelector("#link-fechar");
let recarregar;

document.querySelector('#accordion-pure-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">CARREGANDO...</button>';
document.querySelector('#accordion-hybrid-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">CARREGANDO...</button>';

let classes = mongo.listAll();

classes.then((retorno) => {
  let puros = data.listByType('Pure', retorno);
  let hibridos = data.listByType('Hybrid', retorno);

  puros.sort(data.dynamicSort('name'));
  hibridos.sort(data.dynamicSort('name'));

  render('pure', 2, puros, retorno);
  render('hybrid', 2, puros, retorno);
  buttonBuilder(retorno, puros, hibridos);

}).catch(err => console.log(err));

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
      buttonSelecionar(data.getNome(puros[i].name), heroi);
    }
  }
  for(let i in hibridos){
    for(let h in hibridos[i].heroes){
      let heroi = hibridos[i].heroes[h];

      heroi = monta.heroi(heroi, data, lista, hibridos[i].main, hibridos[i].sub);
      buttonSelecionar(data.getNome(hibridos[i].main)+'-'+data.getNome(hibridos[i].sub), heroi, lista);
      buttonSelecionar(data.getNome(hibridos[i].sub)+'-'+data.getNome(hibridos[i].main), heroi, lista);
    }
  }
}

function buttonSelecionar(param, heroi, lista){
  myURL = new URL(document.URL);
  document.querySelector('.selecionar-'+param+'-'+data.getNome(heroi.cardnumber)).addEventListener('click', function () {
    ipcRenderer.send('heroi-selecionado', heroi, myURL.searchParams.get('posicao'));
    ipcRenderer.send('fechar-janela-herois');
  });
}
