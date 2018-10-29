const { ipcRenderer }  = require('electron');
const data = require('./data.js');
const panel = require('./panel-cards.js');
const html = require('./html-builder.js');

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
  let buttons = [];

  for(let i in herois){
    renderPanel(herois[i]);
    buttons = addButtons(buttons, herois[i].main);
    buttons = addButtons(buttons, herois[i].sub);
  }

  buttons.push('Spell');
  buttons.push('Talent');
  renderSidebar(buttons);
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

function addButtons(buttons, classe){
  if (!buttons.includes(classe)){
    buttons.push(classe);
  }
  return buttons;
}

function filtraCookies(cookies, nome){
  return cookies.filter(
    function(cookie){
      return cookie.domain == 'deckcreator.com' && cookie.name.includes(nome)
    }
  );
}

function renderPanel(heroi){
  document.querySelector('#panel'+heroi.panel).innerHTML = document.querySelector('#panel'+heroi.panel).innerHTML.replace('panel-default','panel-'+heroi.sub.toLowerCase());
  document.querySelector('#nome-heroi-'+heroi.panel).textContent = heroi.name;
  document.querySelector('#classe-heroi-'+heroi.panel).textContent = heroi.class;
  document.querySelector('#txt-heroi-'+heroi.panel).textContent = 'Alterar';
  document.querySelector('#img-heroi-'+heroi.panel).innerHTML = '<img src="../icons-transparent/'+heroi.main.toLowerCase()+'.svg" height="750%" width="750%"/>';
}

function renderSidebar(buttons){
  let innerHTML = document.querySelector('#side-menu').innerHTML;
  let retorno = html.returnJSON(innerHTML);
  retorno.child = [];
  let resultado = html.menuItem(retorno, buttons);

  document.querySelector('#side-menu').innerHTML = html.returnHTML(resultado);
  for(let i in buttons){
    document.querySelector('#cards-'+buttons[i].toLowerCase()).addEventListener('click', function () {
      let txt = '#cards-'+buttons[i].toLowerCase();
      console.log(txt);
      renderCards(txt);
    });
  }
}

function renderCards(txt){
  console.log('criou o botao: '+txt);
}
