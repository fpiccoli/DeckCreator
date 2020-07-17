const { ipcRenderer }  = require('electron');
const dataDeck = require('../../js/data/deck.js');
const dataManager = require('../data-manager.js');
const deck = require('../deck-builder.js');
const file = require('../file-manager.js');
const cookie = require('../cookie-manager.js');
const alert = require('../alert-message.js');
const render = require('./render.js');
const update = require('./update.js');
const menu = require('../menu/controller.js');
let user;

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

let listaDeCartas = [];
let herois = [];
let buttons = [];
let nomeDoTime = 'NewDeck';

cookie.login().then((retorno) => {
  if(retorno){
    user = retorno;
    menu.navbar(document, user);
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
    renderPublic();
  }).catch(err => console.log(err));
}

function renderGrupo(){
  cookie.grupo().then((retorno) => {
    if(retorno != 'Other Decks'){
      document.querySelector("#grupo").value = retorno;
    } else{
      document.querySelector("#grupo").value = '';
    }
  }).catch(err => console.log(err));
}

function renderPublic(){
  cookie.public().then((retorno) => {
    if(retorno){
      document.querySelector("#select-public").value = retorno;
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

document.querySelector("#salvar-deck").addEventListener('click' , function(){
  if(herois.length == 0){
    alert.message(document.querySelector('#alert-message'), 'You need to add a card to the deck!', 'warning');
    return;
  }
  saveDeck();
});

function saveDeck(){
  cookie.nome().then((retorno) => {
    if(retorno){
      nomeDoTime = retorno
    }
    save(nomeDoTime);
  }).catch(err => console.log(err));
}

function save(nome){
  if(!user) return;
  if(!document.querySelector("#grupo")){
    alert.message(document.querySelector('#alert-message'), 'Try again later!', 'warning');
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
    public: document.querySelector("#select-public").value == 'true',
    game: user.game
  }

  let validacao = dataDeck.exists(object, user.game);
  validacao.then((deckJaExiste) => {
    if(deckJaExiste){
      if(alert.confirmDialog('Caution', 'Overwrite it', 'Change the name', 'Deck name already exists, what do you want to do?')){
        if(dataDeck.save(object, user.game)){
          exportDeck(object, user.game);
        }
      }
    } else{
      if(dataDeck.save(object, user.game)){
        exportDeck(object, user.game);
      }
    }
  }).catch(err => console.log(err));
}

function exportDeck(object, game){
  let deckRetorno = deck.build(object, game);
  ipcRenderer.send('set-cookie', 'cards', JSON.stringify(listaDeCartas));

  file.export(object, deckRetorno, user.game);
  // ipcRenderer.send('redirecionar-pagina','index');
}

document.querySelector('.cartas-deck').addEventListener('click', function () {
  render.lista(listaDeCartas, user, herois, document);
});
