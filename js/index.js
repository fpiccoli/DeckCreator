const { ipcRenderer }  = require('electron');
const data = require('./data.js');
const panel = require('./panel-cards.js');
const html = require('./html-builder.js');

let linkFechar = document.querySelector("#link-fechar");
// let h1 = document.querySelector('.selecionar-heroi-1');
let h2 = document.querySelector('.selecionar-heroi-2');
let h3 = document.querySelector('.selecionar-heroi-3');

let listaDeCartas = []

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

  cookiesCards = filtraCookies(cookies, 'cards');
  listaDeCartas = JSON.parse(cookiesCards[0].value);

});

linkFechar.addEventListener('click', function () {
  ipcRenderer.send('fechar-janela-principal');
});

document.querySelector('.selecionar-heroi-1').addEventListener('click' , function(){
  console.log('entrou1')
  ipcRenderer.send('seleciona-heroi', 1);
  ipcRenderer.send('set-card-cookie', listaDeCartas);
});

h2.addEventListener('click' , function(){
  console.log('entrou2')
  ipcRenderer.send('seleciona-heroi', 2);
  ipcRenderer.send('set-card-cookie', listaDeCartas);
});

h3.addEventListener('click' , function(){
  console.log('entrou3')
  ipcRenderer.send('seleciona-heroi', 3);
  ipcRenderer.send('set-card-cookie', listaDeCartas);
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
  document.querySelector('#img-heroi-'+heroi.panel).innerHTML = '<img src="../icons-transparent/'+heroi.main.toLowerCase()+'.svg" height="300%" width="300%"/>';
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
      renderCards(buttons[i]);
    });
  }
}

function renderCards(classe){
  let cartas = data.getCardsByClass(classe)
  let retorno = html.cartas(cartas);
  document.querySelector('#skill-cards').innerHTML = retorno;

  for(let i in cartas){
    document.querySelector('#card-'+cartas[i].number).addEventListener('click', function () {
      if(contaObj(listaDeCartas, cartas[i]) < 3){
        if(listaDeCartas.length < 50){
          listaDeCartas.push(cartas[i]);
        }
        else{
          window.alert('O Deck já possui o número máximo de cartas (50)');
        }
      }
      else{
        removeObj(listaDeCartas, cartas[i]);
        removeObj(listaDeCartas, cartas[i]);
        removeObj(listaDeCartas, cartas[i]);
      };
      updatePanels(cartas[i]);
    });
    document.querySelector('#card-'+cartas[i].number).addEventListener('contextmenu', function () {
      removeObj(listaDeCartas, cartas[i]);
      updatePanels(cartas[i]);
    });

    updatePanels(cartas[i], classe);
  }
}

function updatePanels(carta, classe){
  // document.querySelector('#-cards').textContent = contaClass(listaDeCartas, );
  updatePanels(carta)
}

function updatePanels(carta){
  document.querySelector('#card-text-'+carta.number).textContent = contaObj(listaDeCartas, carta);
  document.querySelector('#all-cards').textContent = listaDeCartas.length;
  document.querySelector('#spell-cards').textContent = contaClass(listaDeCartas, 'Spell');
  document.querySelector('#talent-cards').textContent = contaClass(listaDeCartas, 'Talent');
}

function contaObj(lista, obj){
  let count = 0;
  for(let i in lista){
    if(lista[i].number == obj.number){
      count++;
    }
  }
  return count;
}

function contaClass(lista, tipo){
  let count = 0;
  for(let i in lista){
    if(lista[i].class.includes(tipo)){
      count++;
    }
  }
  return count;
}

function removeObj(lista, obj){
  let count = 0;
  for(let i in lista){
    if(lista[i].number == obj.number){
      lista.splice(i, 1);
      break;
    }
  }
  return count;
}
