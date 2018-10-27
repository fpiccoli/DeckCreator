const { ipcRenderer } = require('electron');
const html = require('./html-builder.js');
const data = require('./data.js');

let linkFechar = document.querySelector("#link-fechar");
let recarregar;

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
      buttonSelecionar(puros[i].name.toLowerCase(), puros[i].heroes[h]);
    }
  }
  for(let i in hibridos){
    for(let h in hibridos[i].heroes){
      buttonSelecionar(hibridos[i].main.toLowerCase()+'-'+hibridos[i].sub.toLowerCase(), hibridos[i].heroes[h]);
      buttonSelecionar(hibridos[i].sub.toLowerCase()+'-'+hibridos[i].main.toLowerCase(), hibridos[i].heroes[h]);
    }
  }
}

function buttonSelecionar(param, heroi){
  myURL = new URL(document.URL);
  console.log(param);
  document.querySelector('.selecionar-'+param+'-'+heroi.number.toLowerCase()).addEventListener('click', function () {
    ipcRenderer.send('heroi-selecionado', heroi, myURL.searchParams.get('posicao'));
    ipcRenderer.send('fechar-janela-herois');
  });
}
