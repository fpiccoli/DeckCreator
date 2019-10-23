const { ipcRenderer }  = require('electron');
const data = require('../data-mongo.js');
const dataManager = require('../data-manager.js');
const deck = require('../deck-builder.js');
const file = require('../file-manager.js');
const cookie = require('../cookie-manager.js');
const alert = require('../alert-message.js');
const render = require('./render.js');
const update = require('./update.js');
// const htmlMenu = require('../html/menu-cards.js');
// const htmlCartas = require('../html/cartas.js');
// const menu = require('../menubar.js');
// const conta = require('../conta.js');
let user;

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

let listaDeCartas = [];
let herois = [];
let buttons = [];
let nomeDoTime = 'NovoDeck';

cookie.login().then((retorno) => {
  if(retorno){
    user = retorno;
    update.otherPanels(listaDeCartas, user, document);
    renderHerois();
  } else{
    ipcRenderer.send('redirecionar-pagina','login');
  }
}).catch(err => console.log(err));

function renderHerois(){
  cookie.herois().then((retorno) => {
    herois = retorno;
    for(let i in herois){
      render.panel(herois[i], document);
      buttons.push(herois[i]);
    }
    renderSidebar(user);
    render.special(buttons, user);
    update.heroPanels(listaDeCartas, user, herois, document);
    update.otherPanels(listaDeCartas, user, document);
  }).catch(err => console.log(err));
}

function renderSidebar(usuario){
  render.sidebar(buttons, usuario, listaDeCartas, herois, document).then(() => {
    renderGrupo();
  }).catch(err => console.log(err));
}

function renderGrupo(){
  cookie.grupo().then((retorno) => {
    if(retorno){
      document.querySelector("#grupo").value = retorno;
    } else{
      document.querySelector("#grupo").value = '';
    }
  }).catch(err => console.log(err));
}

cookie.cards().then((retorno) => {
  if (retorno){
    listaDeCartas = retorno;
  }
}).catch(err => console.log(err));

cookie.nome().then((retorno) => {
  if (retorno){
    document.querySelector("#nome-time").textContent = retorno;
  }
}).catch(err => console.log(err));


addEventSelecionar(1);
addEventSelecionar(2);
addEventSelecionar(3);

document.querySelector("#salvar-deck").addEventListener('click' , function(){
  if(!deckDefault()){
    alert.message(document.querySelector('#alert-message'), 'Você precisa ter exatamente <b>50 cartas</b> para salvar um deck padrão!', 'warning');
    return;
  }
  saveDeck();
});

document.querySelector("#salvar-deck-experimental").addEventListener('click' , function(){
  saveDeck();
});

function addEventSelecionar(number){
  document.querySelector('.selecionar-heroi-'+number).addEventListener('click' , function(){
    ipcRenderer.send('seleciona-heroi', number);
    ipcRenderer.send('set-cookie', 'cards', JSON.stringify(listaDeCartas));
  });
}

function saveDeck(){
  cookie.nome().then((retorno) => {
    save(retorno);
  }).catch(err => console.log(err));
}

function save(nome){
  if(!user) return;
  if(!document.querySelector("#grupo")){
    alert.message(document.querySelector('#alert-message'), 'Tente novamente!', 'warning');
    return;
  }
  listaDeCartas.sort(dataManager.dynamicSort('cardnumber'));

  let object = {
    name: nome,
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

document.querySelector('.cartas-deck').addEventListener('click', function () {
  render.lista(listaDeCartas, user, herois, document);
});

function deckDefault(){
  if(listaDeCartas.length == 50){
    return true;
  }
  return false;
}
