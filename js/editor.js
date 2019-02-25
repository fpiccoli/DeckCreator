const { ipcRenderer }  = require('electron');
const data = require('./data-mongo.js');
const htmlMenu = require('./html/menu-cards.js');
const htmlCartas = require('./html/cartas.js');
const deck = require('./deck-builder.js');
const conta = require('./conta.js');
const file = require('./file-manager.js');
const cookie = require('./cookie-manager.js');
const menu = require('./menubar.js');
const alert = require('./alert-message.js');

let listaDeCartas = [];
let herois = [];
let buttons = [];
let nomeDoTime = 'NovoDeck';

menu.navbar(document);

ipcRenderer.send('get-cookies');
ipcRenderer.on('send-cookies', (event, cookies) => {
  cookiesHeroi = cookie.filtraCookies(cookies, 'heroi');
  for (let i in cookiesHeroi){
    let json = JSON.parse(cookiesHeroi[i].value);
    json.panel = cookiesHeroi[i].name.replace('heroi','');
    herois.push(json);
  }

  for(let i in herois){
    renderPanel(herois[i]);
    buttons.push(herois[i]);
  }

  buttons.push({class:'Spell', main:'Spell', sub:'Spell', icon:'12-7YJWM_Y4fbdMPdZgAbZAuJ0n1vUwZV', bg:'1be1iq7sJOLYeo07ZrNrKgSCx30ln_8_R'})
  buttons.push({class:'Enchantment', main:'Enchantment', sub:'Enchantment', icon:'1-J5PmwMchC8J6sBROmT5-DJVrgYjiohW', bg:'1QOaiH7ABjkmcLrij5Cz-Ir2Qh7FRc-zd'})
  buttons.push({class:'Talent', main:'Talent', sub:'Talent', icon:'1WrooGrmv1Uand440zPn9QojbY_SA6WzB', bg:'1tDpQbbRL7rMfj2GBR2SXKFo8hSd3i1ef'})
  renderSidebar(buttons);

  cookiesCards = cookie.filtraCookies(cookies, 'cards');
  if(cookiesCards[0]){
    listaDeCartas = JSON.parse(cookiesCards[0].value);
  }

  cookiesNome = cookie.filtraCookies(cookies, 'nome');
  if(cookiesNome[0]){
    nomeDoTime = cookiesNome[0].value;
    document.querySelector("#nome-time").textContent = nomeDoTime;
  }

  updateHeroPanels();
  updateOtherPanels();

  addEventSelecionar(1);
  addEventSelecionar(2);
  addEventSelecionar(3);
});

function addEventSelecionar(number){
  document.querySelector('.selecionar-heroi-'+number).addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', number);
    ipcRenderer.send('set-card-cookie', listaDeCartas);
  });
}

document.querySelector("#salvar-deck").addEventListener('click' , function(){
  if(!deckDefault()){
    alert.message(document.querySelector('#alert-message'), 'Você precisa ter exatamente <b>50 cartas</b> para salvar um deck padrão!', 'warning')
    return;
  }
  saveDeck();
});

document.querySelector("#salvar-deck-experimental").addEventListener('click' , function(){
  saveDeck();
});

function saveDeck(){
  let object = {
    name: nomeDoTime,
    cards: listaDeCartas,
    heroes: herois,
    extra: [],
    user: "mqt"
  }
  listaDeCartas.sort(dynamicSort('cardnumber'));
  data.saveDeck(object);
  exportDeck(object);
}

function exportDeck(object){
  let deckRetorno = deck.build(object);

  ipcRenderer.send('get-path', 'documents');
  ipcRenderer.on('return-path', (event, path) => {
    ipcRenderer.send('set-card-cookie', listaDeCartas);
    file.export(path, object.name, deckRetorno)
  });
}

function renderPanel(heroi){
  document.querySelector('#panel'+heroi.panel).innerHTML = document.querySelector('#panel'+heroi.panel).innerHTML.replace('panel-default','panel-'+heroi.sub.toLowerCase());
  document.querySelector('#nome-heroi-'+heroi.panel).textContent = heroi.name;
  document.querySelector('#classe-heroi-'+heroi.panel).textContent = heroi.class + ' ('+heroi.deck.alligment+')';
  document.querySelector('#txt-heroi-'+heroi.panel).textContent = 'Alterar';
  document.querySelector('#img-heroi-'+heroi.panel).innerHTML = '<img src="https://drive.google.com/uc?export=download&id='+heroi.icon+'" height="300%" width="300%"/>';
}

function renderSidebar(buttons){
  document.querySelector('#side-menu').innerHTML = htmlMenu.items(buttons);
  for(let i in buttons){
    document.querySelector('#cards-'+buttons[i].class.toLowerCase().replace(' ','')).addEventListener('click', function () {
      let txt = '#cards-'+buttons[i].class.toLowerCase().toLowerCase().replace(' ','');

      renderCards(buttons[i]);
      ipcRenderer.send('set-card-cookie', listaDeCartas);
    });
  }
  document.querySelector("#update-nome").addEventListener('click', function(){
    eventUpdateNome();
  });
  document.querySelector('#campo-nome').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      eventUpdateNome();
    }
  });
  function eventUpdateNome(){
    let campo = document.querySelector("#campo-nome");

    nomeDoTime = campo.value;
    campo.value = '';
    document.querySelector("#nome-time").textContent = nomeDoTime;

    ipcRenderer.send('set-nome-cookie', nomeDoTime);
  }
}

document.querySelector('.cartas-deck').addEventListener('click', function () {
  renderLista(listaDeCartas);
});

async function renderCards(classe){
  let main = await data.getClassCards(classe.main);
  let sub = await data.getClassCards(classe.sub);
  let mainCards = main.cards;
  let subCards = sub.cards;

  mainCards = mainCards.filter(
    function(carta){
      return (carta.subtype == 'ATK' || carta.subtype == 'TEC' || carta.subtype == 'SKL' || carta.subtype == 'DOM')
    }
  );
  subCards = subCards.filter(
    function(carta){
      return (carta.subtype == 'GRD' || carta.subtype == 'EVD')
    }
  );

  mainCards.forEach(function (carta, index, array){
    carta.deck = {id: main.id, face: main.face};
  });
  subCards.forEach(function (carta, index, array){
    carta.deck = {id: sub.id, face: sub.face};
  });

  mainCards.sort(dynamicSort('cardnumber'));
  subCards.sort(dynamicSort('cardnumber'));

  let cartas = mainCards.concat(subCards);

  document.querySelector('#skill-cards').innerHTML = htmlCartas.cartas(cartas);

  for(let i in cartas){
    document.querySelector('#card-'+cartas[i].cardnumber).addEventListener('click', function () {
      if(conta.obj(listaDeCartas, cartas[i]) < 3){
        addObj(cartas[i]);
      }
      else{
        removeObj(listaDeCartas, cartas[i]);
        removeObj(listaDeCartas, cartas[i]);
        removeObj(listaDeCartas, cartas[i]);
      }
      updateCardPanels(cartas[i]);
      updateOtherPanels();
      updateHeroPanels();
    });
    document.querySelector('#card-'+cartas[i].cardnumber).addEventListener('contextmenu', function () {
      if(conta.obj(listaDeCartas, cartas[i]) == 0){
        addObj(cartas[i]);
        addObj(cartas[i]);
        addObj(cartas[i]);
      } else{
        removeObj(listaDeCartas, cartas[i]);
      }
      updateCardPanels(cartas[i]);
      updateOtherPanels();
      updateHeroPanels();
    });
    updateCardPanels(cartas[i]);
  }
  updateHeroPanels();
  updateOtherPanels();
}

function renderLista(cartas){
  document.querySelector('#skill-cards').innerHTML = htmlCartas.lista(cartas);

  cartas.forEach(function (carta, index, array){
    document.querySelector('#card-'+index).addEventListener('click', function () {
      removeObj(cartas, carta);
      renderLista(cartas);
      updateOtherPanels();
      updateHeroPanels();
    });
  });
}

function updateHeroPanels(){
  for(let i in herois){
    let valor = conta.mainClass(listaDeCartas, herois[i]) + conta.subClass(listaDeCartas, herois[i]);
    document.querySelector('#qtde-heroi-'+herois[i].panel).textContent = valor;
  }
}

function updateCardPanels(carta){
  document.querySelector('#card-text-'+carta.cardnumber).textContent = conta.obj(listaDeCartas, carta);
}

function updateOtherPanels(){
  let percentual = listaDeCartas.length*100/50;
  document.querySelector('#all-cards').textContent = listaDeCartas.length;
  document.querySelector('#status-value').textContent = percentual+'%';
  document.querySelector('#status-bar').innerHTML = htmlCartas.statusbar(percentual);
  document.querySelector('#spell-cards').textContent = conta.class(listaDeCartas, 'Spell') + conta.class(listaDeCartas, 'Enchantment');
  document.querySelector('#talent-cards').textContent = conta.class(listaDeCartas, 'Talent');
}

function deckDefault(){
  if(listaDeCartas.length == 50){
    return true;
  }
  return false;
}

function addObj(carta){
  listaDeCartas.push(carta);
  listaDeCartas.sort(dynamicSort('cardnumber'));
}

function removeObj(lista, obj){
  let count = 0;
  for(let i in lista){
    if(lista[i].cardnumber == obj.cardnumber){
      lista.splice(i, 1);
      break;
    }
  }
  return lista;
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
