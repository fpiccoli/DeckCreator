const { ipcRenderer } = require('electron');
const dataManager = require('../manager/array.js');
const deck = require('../manager/deck.js');
const cookie = require('../manager/interface/cookie.js');
const alert = require('../manager/interface/alert.js');
const file = require('../file/interface/deck.js');
const render = require('../render/editor.js');
const update = require('../render/editor-update.js');
const navbar = require('../render/menu-navbar.js');
const dataDeck = require('../rest/deck.js');
let user;

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

let listaDeCartas = [];
let herois = [];
let buttons = [];
let nomeDoTime = 'NewDeck';

cookie.login().then((retorno) => {
  if (retorno) {
    user = retorno;

    navbar.logout(document);
    navbar.clearCache(document);
    navbar.importDecks(document, user);
    navbar.effects(document, user);

    update.otherPanels(listaDeCartas, user, document);
    renderHerois();
  } else {
    ipcRenderer.invoke('redirecionar-pagina', 'login');
  }
}).catch(err => console.log(err));

function renderHerois() {
  cookie.herois().then((retorno) => {
    herois = retorno;
    for (let i in herois) {
      render.panel(herois[i], document, user.game);
      buttons.push(herois[i]);
    }
    renderSidebar(user);
    render.special(buttons, user);
    update.heroPanels(listaDeCartas, user, herois, document);
    update.otherPanels(listaDeCartas, user, document);
  }).catch(err => console.log(err));
}

function renderSidebar(usuario) {
  render.sidebar(buttons, usuario, listaDeCartas, herois, document).then(() => {
    renderGrupo();
    renderPublic();
  }).catch(err => console.log(err));
}

function renderGrupo() {
  cookie.grupo().then((retorno) => {
    if (retorno != 'Other Decks') {
      document.querySelector("#grupo").value = retorno;
    } else {
      document.querySelector("#grupo").value = '';
    }
  }).catch(err => console.log(err));
}

function renderPublic() {
  cookie.public().then((retorno) => {
    if (retorno) {
      document.querySelector("#select-public").value = retorno;
    } else {
      document.querySelector("#grupo").value = '';
    }
  }).catch(err => console.log(err));
}

cookie.cards().then((retorno) => {
  if (retorno) {
    listaDeCartas = retorno;
  }
}).catch(err => console.log(err));

cookie.nome().then((retorno) => {
  if (retorno) {
    document.querySelector("#nome-time").textContent = retorno;
  }
}).catch(err => console.log(err));

document.querySelector("#salvar-deck").addEventListener('click', function () {
  if (herois.length == 0) {
    alert.message(document.querySelector('#alert-message'), 'You need to add a card to the deck!', 'warning');
    return;
  }
  saveDeck();
});

function saveDeck() {
  cookie.nome().then((retorno) => {
    if (retorno) {
      nomeDoTime = retorno
    }
    save(nomeDoTime);
  }).catch(err => console.log(err));
}

function save(nome) {
  if (!user) return;
  if (!document.querySelector("#grupo")) {
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
    tag: document.querySelector("#grupo").value,
    public: document.querySelector("#select-public").value == 'true',
    game: user.game
  }

  dataDeck.exists(object, user.game, user.idToken).then((retorno) => {
    if (retorno) {
      if (retorno.exists && !retorno.error) {
        alert.confirmDialog('Caution', 'Overwrite it', 'Change the name', 'Deck name already exists, what do you want to do?')
          .then(positiveResponse => {
            if (positiveResponse) {
              httpSave(object, user.game, user.idToken)
            }
          })
      } else if (!retorno.exists && !retorno.error) {
        httpSave(object, user.game, user.idToken)
      }
    }
  }).catch(err => alert.message(document.querySelector('#alert-message'), err, 'danger'));
}

function httpSave(obj, game, token) {
  dataDeck.save(obj, game, token).then((retorno) => {
    if (retorno) {
      exportDeck(obj, game);
    }
  }).catch(err => alert.message(document.querySelector('#alert-message'), err, 'danger'));
}

function exportDeck(object, game) {
  let deckRetorno = deck.build(object, game);
  ipcRenderer.invoke('set-cookie', 'cards', JSON.stringify(listaDeCartas));

  file.saveLocal(object, deckRetorno, user.game).then(retorno => {
    ipcRenderer.invoke('redirecionar-pagina', 'index');
  }).catch(err => alert.message(document.querySelector('#alert-message'), err, 'danger'));
}

document.querySelector('.cartas-deck').addEventListener('click', function () {
  render.lista(listaDeCartas, user, herois, document);
});
