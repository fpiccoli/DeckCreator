const { ipcRenderer }  = require('electron');
const data = require('./data.js');
const panel = require('./panel-cards.js');

let linkFechar = document.querySelector("#link-fechar");
let h1 = document.querySelector('.selecionar-heroi-1');
let h2 = document.querySelector('.selecionar-heroi-2');
let h3 = document.querySelector('.selecionar-heroi-3');

ipcRenderer.send('get-cookies');

ipcRenderer.on('send-cookies', (event, cookies) => {
  let herois = [];
  cookiesHeroi = filtraCookies(cookies, 'heroi');
  for (let i in cookiesHeroi){
    let json = JSON.parse(cookiesHeroi[i].value);
    json.panel = cookiesHeroi[i].name.replace('heroi','');
    herois.push(json);
  }
  renderPanel(herois);
});

linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-principal');
});

h1.addEventListener('click' , function(){
  ipcRenderer.send('seleciona-heroi', 1);
});

h2.addEventListener('click' , function(){
  ipcRenderer.send('seleciona-heroi', 2);
});

h3.addEventListener('click' , function(){
  ipcRenderer.send('seleciona-heroi', 3);
});


function filtraCookies(cookies, nome){
  return cookies.filter(
    function(cookie){
      return cookie.domain == 'deckcreator.com' && cookie.name.includes(nome)
    }
  );
}

function renderPanel(herois){
  for(let i in herois){
    document.querySelector('#panel'+herois[i].panel).innerHTML = document.querySelector('#panel'+herois[i].panel).innerHTML.replace('panel-red','panel-green');
    document.querySelector('#nome-heroi-'+herois[i].panel).textContent = herois[i].name;
    document.querySelector('#classe-heroi-'+herois[i].panel).textContent = herois[i].class;
    document.querySelector('#txt-heroi-'+herois[i].panel).textContent = 'Alterar';
    document.querySelector('#img-heroi-'+herois[i].panel).innerHTML = '<img src="'+herois[i].imgurl+'" height="240%" width="240%"/>';
  }
}
