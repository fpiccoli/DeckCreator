const { ipcRenderer } = require('electron');
const html = require('./html/herois.js');
const data = require('./data.js');
const monta = require('./monta-heroi.js');

let linkFechar = document.querySelector("#link-fechar");
let recarregar;

document.querySelector('#accordion-pure-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">CARREGANDO...</button>';
document.querySelector('#accordion-hybrid-panel').innerHTML = '<button type="button" class="btn btn-outline btn-primary btn-lg btn-block">CARREGANDO...</button>';

setTimeout(function(){
  render('pure', 2);
  render('hybrid', 2);
  buttonBuilder();
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

function buttonBuilder(){
  let puros = data.listByType('Pure');
  let hibridos = data.listByType('Hybrid');

  for(let i in puros){
    for(let h in puros[i].heroes){
      let heroi = puros[i].heroes[h];

      heroi = monta.heroi(heroi, data.getClasseByCard(heroi), puros[i].main, puros[i].sub, null, null, null);
      buttonSelecionar(puros[i].name.toLowerCase(), heroi);
    }
  }
  for(let i in hibridos){
    for(let h in hibridos[i].heroes){
      let heroi = hibridos[i].heroes[h];

      heroi = monta.heroi(heroi, data.getClasseByCard(heroi), hibridos[i].main, hibridos[i].sub, null, null, null);
      buttonSelecionar(hibridos[i].main.toLowerCase()+'-'+hibridos[i].sub.toLowerCase(), heroi);
      buttonSelecionar(hibridos[i].sub.toLowerCase()+'-'+hibridos[i].main.toLowerCase(), heroi);
    }
  }
}

function buttonSelecionar(param, heroi){
  myURL = new URL(document.URL);
  document.querySelector('.selecionar-'+param+'-'+heroi.number.toLowerCase()).addEventListener('click', function () {
    heroi.type = data.getClasseByCard(heroi).type;
    ipcRenderer.send('heroi-selecionado', heroi, myURL.searchParams.get('posicao'));
    ipcRenderer.send('fechar-janela-herois');
  });
}
