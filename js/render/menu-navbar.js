const { ipcRenderer } = require('electron');
const alert = require('../manager/interface/alert.js');
const deckBuilder = require('../manager/deck.js');
const fileCache = require('../file/interface/cache.js');
const fileDeck = require('../file/interface/deck.js');
const dataDeck = require('../rest/deck.js');
const cognito = require('../cognito/session.js');

module.exports = {
  logout(documento, user) {
    documento.querySelector("#logout").addEventListener('click', function () {
      alert.confirmDialog('Logout', 'Sure!', 'Nope', 'Are you sure you want to logout?')
        .then(positiveResponse => {
          if (positiveResponse) {
            cognito.signOut(user);
            ipcRenderer.invoke('clear-cookies').then(() => {
              ipcRenderer.invoke('redirecionar-pagina', 'login');
            })
          }
        })
        .catch(err => alert.message(documento.querySelector("#alert-message"), err.message, 'danger'));
    });
  },
  clearCache(documento) {
    documento.querySelector("#clear-cache").addEventListener('click', function () {
      fileCache.clear();
      alert.message(documento.querySelector("#alert-message"), '<b>Tabletop Simulator</b> cache successfully cleared!', 'success');
    });
  },
  importDecks(documento, user) {
    documento.querySelector("#import-decks").addEventListener('click', function () {
      fileDeck.clearLocal(user.game);
      dataDeck.find(user.name, user.game, user.idToken)
        .then((retorno) => {
          retorno.forEach(function (deck, index, array) {
            let deckRetorno = deckBuilder.build(deck, user.game);
            fileDeck.saveLocal(deck, deckRetorno, user.game);
          });
        }).catch(err => console.log(err));
      alert.message(documento.querySelector("#alert-message"), 'Decks successfully synced with <b>Tabletop Simulator</b>!', 'success');
    });
  },
  effects(documento, user) {
    if (user.game == 'M&D') {
      let btnLista = '<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-list-ul"></i> <i class="fa fa-caret-down"></i></a><ul class="dropdown-menu dropdown-user"><li><a id="lista-efeitos" href="#">Effects List</a></li></ul>';
      documento.querySelector("#btn-lista-efeitos").innerHTML = btnLista;
      documento.querySelector("#lista-efeitos").addEventListener('click', function () {
        ipcRenderer.invoke('abrir-janela-efeitos');
      });
    }
  }
}
