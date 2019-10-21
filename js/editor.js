const { ipcRenderer }  = require('electron');
const data = require('./data-mongo.js');
const dataManager = require('./data-manager.js');
const htmlMenu = require('./html/menu-cards.js');
const htmlCartas = require('./html/cartas.js');
const deck = require('./deck-builder.js');
const conta = require('./conta.js');
const file = require('./file-manager.js');
const cookie = require('./cookie-manager.js');
const menu = require('./menubar.js');
const alert = require('./alert-message.js');
let user;

var package = require('../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

let listaDeCartas = [];
let herois = [];
let buttons = [];
let nomeDoTime = 'NovoDeck';

ipcRenderer.send('get-cookies');
ipcRenderer.on('send-cookies', (event, cookies) => {
  menu.navbar(document, cookies);
  cookieLogin = cookie.filtraCookies(cookies, 'login');
  if(cookieLogin.length == 0){
    ipcRenderer.send('redirecionar-pagina','login');
  } else if(cookieLogin[0]){
    let loginJson = JSON.parse(cookieLogin[0].value);
    user = {name: loginJson.user, game: loginJson.game};
  }

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

  function renderSpecial(){
    if(!user) return;
    if(user.game == 'M&D'){
      buttons.push({class:'Spell', main:'Spell', sub:'Spell', icon:'12-7YJWM_Y4fbdMPdZgAbZAuJ0n1vUwZV', bg:'#B57EDC'})
      buttons.push({class:'Enchantment', main:'Enchantment', sub:'Enchantment', icon:'1-J5PmwMchC8J6sBROmT5-DJVrgYjiohW', bg:'#CC8899'})
      buttons.push({class:'Talent', main:'Talent', sub:'Talent', icon:'1WrooGrmv1Uand440zPn9QojbY_SA6WzB', bg:'#c0c0c0'})
    }
    else if(user.game == 'MRBC'){
      buttons.push({class:'Breeder-SPE', main:'Breeder-SPE', sub:'Breeder-SPE', icon:'1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ', bg:'#483939'})
      buttons.push({class:'Breeder-ENV', main:'Breeder-ENV', sub:'Breeder-ENV', icon:'1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ', bg:'#483939'})
      buttons.push({class:'Any Monster', main:'Any Monster', sub:'Any Monster', icon:'1cTOPQh_UbGKeWzEkUuCjPjxYSTeqTseJ', bg:'#f7f7f9'})
    }
  }

  renderSidebar(buttons, cookies).then(() => {
    cookiesGrupo = cookie.filtraCookies(cookies, 'grupo');
    if(cookiesGrupo[0]){
      grupo = cookiesGrupo[0].value;
      document.querySelector("#grupo").value = grupo;
    } else{
      document.querySelector("#grupo").value = '';
    }
  }).catch(err => console.log(err));

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
  renderSpecial();

  addEventSelecionar(1);
  addEventSelecionar(2);
  addEventSelecionar(3);

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

});

function addEventSelecionar(number){
  document.querySelector('.selecionar-heroi-'+number).addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', number);
    ipcRenderer.send('set-cookie', 'cards', JSON.stringify(listaDeCartas));
  });
}

function saveDeck(){
  if(!user) return;
  listaDeCartas.sort(dataManager.dynamicSort('cardnumber'));

  let object = {
    name: nomeDoTime,
    cards: listaDeCartas,
    heroes: herois,
    extra: [],
    user: user.name,
    grupo: document.querySelector("#grupo").value,
    game: user.game
  }

  let validacao = data.validaDeckExistente(object, user.game);
  validacao.then((deckJaExiste) => {
    if(deckJaExiste){
      if(alert.confirmDialog('Deck já existente', 'Quero salvar por cima', 'Vou alterar o nome', 'Já existe um deck salvo com esse nome, o que deseja fazer?')){
        if(data.save(object, user.game)){
          exportDeck(object);
        }
      }
    } else{
      if(data.save(object, user.game)){
        exportDeck(object);
      }
    }
  }).catch(err => console.log(err));
}

function exportDeck(object){
  let deckRetorno = deck.build(object);
  ipcRenderer.send('set-cookie', 'cards', JSON.stringify(listaDeCartas));
  file.export(object.name, deckRetorno, user.game);
  ipcRenderer.send('redirecionar-pagina','index');
}

function renderPanel(heroi){
  document.querySelector('#panel'+heroi.panel).innerHTML = document.querySelector('#panel'+heroi.panel).innerHTML.replace('heading-style','color: '+heroi.font+';background-color:'+heroi.bg+';');
  document.querySelector('#nome-heroi-'+heroi.panel).textContent = heroi.name;
  document.querySelector('#classe-heroi-'+heroi.panel).textContent = heroi.class + ' ('+heroi.alligment+')';
  document.querySelector('#txt-heroi-'+heroi.panel).textContent = 'Alterar';
  document.querySelector('#img-heroi-'+heroi.panel).innerHTML = '<img src="https://drive.google.com/uc?export=download&id='+heroi.icon+'" height="300%" width="300%"/>';
}

async function renderSidebar(buttons, cookies){
  let decks = await data.getDecks(user.name, user.game);
  document.querySelector('#side-menu').innerHTML += htmlMenu.addGrupo(decks);
  document.querySelector('#side-menu').innerHTML += htmlMenu.addButtons(buttons);

  for(let i in buttons){
    document.querySelector('#cards-'+dataManager.getNome(buttons[i].class)).addEventListener('click', function () {
      let txt = '#cards-'+dataManager.getNome(buttons[i].class);

      renderCards(buttons[i]);
      ipcRenderer.send('set-cookie', 'cards', JSON.stringify(listaDeCartas));
    });
  }
  document.querySelector("#add-grupo").addEventListener('click', function(){
    document.querySelector('#lista-grupos').innerHTML = htmlMenu.updateGrupo(decks, document.querySelector("#change-grupo").value);
  });
  document.querySelector("#update-nome").addEventListener('click', function(){
    let nome = document.querySelector("#campo-nome").value;
    if(validaNomeVazio(nome)){
      eventUpdateNome(nome);
    }
  });
  document.querySelector('#campo-nome').addEventListener('keypress', function (e) {
    let nome = document.querySelector("#campo-nome").value;
    if (e.key === 'Enter') {
      if(validaNomeVazio(nome)){
        eventUpdateNome(nome);
      }
    }
  });
  function eventUpdateNome(nome){
    nomeDoTime = nome;
    nome = '';
    document.querySelector("#nome-time").textContent = nomeDoTime;
    ipcRenderer.send('set-cookie', 'nome', nomeDoTime);
  }
  function validaNomeVazio(nome){
    if(nome.length == 0){
      alert.message(document.querySelector('#alert-message'), 'Você precisa digitar um nome válido!', 'warning')
      return 0;
    }
    return 1;
  }
}

document.querySelector('.cartas-deck').addEventListener('click', function () {
  renderLista(listaDeCartas);
});

async function renderCards(classe){
  let main = await data.getClassCards(classe.main, user.game);
  let sub = [];
  if(classe.sub == '???'){
    sub = await data.getClassCards(classe.main, user.game);
  } else{
    sub = await data.getClassCards(classe.sub, user.game);
  }
  let mainCards = [];
  let subCards = [];

  main.forEach(function (grupo, index, array){
    if(grupo.cards){
      let filtrado = dataManager.filtraMain(grupo.cards, user.game);
      filtrado.forEach(function (carta, i, array){
        carta.deck = {id: grupo.id, face: grupo.face};
      });
      mainCards = mainCards.concat(filtrado);
    }
  });
  sub.forEach(function (grupo, index, array){
    if(grupo.cards){
      let filtrado = dataManager.filtraSub(grupo.cards, user.game);
      filtrado.forEach(function (carta, i, array){
        carta.deck = {id: grupo.id, face: grupo.face};
      });
      subCards = subCards.concat(filtrado);
    }
  });

  mainCards.sort(dataManager.dynamicSort('cardnumber'));
  subCards.sort(dataManager.dynamicSort('cardnumber'));

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
    let valor = conta.mainClass(listaDeCartas, herois[i], user.game) + conta.subClass(listaDeCartas, herois[i], user.game);
    document.querySelector('#qtde-heroi-'+herois[i].panel).textContent = valor;
  }
}

function updateCardPanels(carta){
  document.querySelector('#card-text-'+carta.cardnumber).textContent = conta.obj(listaDeCartas, carta);
}

function updateOtherPanels(){
  let talentStyle;
  let spellStyle;
  let talentIcon;
  let spellIcon;
  let talentText;
  let spellText;
  let qtdeTalent = 0;
  let qtdeSpell = 0;

  let percentual = listaDeCartas.length*100/50;
  document.querySelector('#all-cards').textContent = listaDeCartas.length;
  document.querySelector('#status-value').textContent = percentual+'%';
  document.querySelector('#status-bar').innerHTML = htmlCartas.statusbar(percentual);


  if(user.game == 'M&D'){
    qtdeTalent = conta.class(listaDeCartas, 'Talent', user.game);
    qtdeSpell = conta.class(listaDeCartas, 'Spell', user.game) + conta.class(listaDeCartas, 'Enchantment', user.game);
    talentStyle = 'style="color: white;background-color: #c0c0c0;"';
    spellStyle = 'style="color: white;background-color: #B57EDC;"';
    talentIcon = '<img src="https://drive.google.com/uc?export=download&id=1WrooGrmv1Uand440zPn9QojbY_SA6WzB" height="300%" width="300%"/>';
    spellIcon = '<img src="https://drive.google.com/uc?export=download&id=12-7YJWM_Y4fbdMPdZgAbZAuJ0n1vUwZV" height="150%" width="150%"/><img src="https://drive.google.com/uc?export=download&id=1-J5PmwMchC8J6sBROmT5-DJVrgYjiohW" height="150%" width="150%"/>';
    talentText = 'Talent</br>All Classes';
    spellText = 'Spell +</br>Enchantment';
  } else if(user.game == 'MRBC'){
    qtdeTalent = conta.class(listaDeCartas, 'Any Monster', user.game);
    qtdeSpell = conta.class(listaDeCartas, 'Breeder', user.game);
    talentStyle = 'style="color: black;background-color: #f7f7f9;"';
    spellStyle = 'style="color: white;background-color: #483939;"';
    talentIcon = '<img src="https://drive.google.com/uc?export=download&id=1cTOPQh_UbGKeWzEkUuCjPjxYSTeqTseJ" height="300%" width="300%"/>';
    spellIcon = '<img src="https://drive.google.com/uc?export=download&id=1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ" height="300%" width="300%"/>';
    talentText = 'Any Monster';
    spellText = 'Breeder';
  }

  let talentHtml = '<div class="panel-heading" '+talentStyle+'><div class="row"><div class="col-xs-3">'+talentIcon+'</div><div class="col-xs-9 text-right"><div class="huge">'+qtdeTalent+'</div><div>'+talentText+'</div></div></div></div>';
  let spellHtml = '<div class="panel-heading" '+spellStyle+'"><div class="row"><div class="col-xs-3">'+spellIcon+'</div><div class="col-xs-9 text-right"><div class="huge">'+qtdeSpell+'</div><div>'+spellText+'</div></div></div></div>';

  document.querySelector('#talent-panel').innerHTML = talentHtml;
  document.querySelector('#spell-panel').innerHTML = spellHtml;
}


function deckDefault(){
  if(listaDeCartas.length == 50){
    return true;
  }
  return false;
}

function addObj(carta){
  listaDeCartas.push(carta);
  listaDeCartas.sort(dataManager.dynamicSort('cardnumber'));
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
