const { ipcRenderer } = require('electron');
const htmlMenu = require('../html/editor-menu.js');
const htmlCartas = require('../html/editor-cartas.js');
const arrayManager = require('../manager/array.js');
const stringManager = require('../manager/string.js');
const conta = require('../manager/conta.js');
const update = require('./editor-update.js');
const dataDeck = require('../../js/rest/deck.js');
const dataClasse = require('../../js/rest/classe.js');
const path = require('../manager/path.js').getPath();

module.exports = { panel, sidebar, lista, special }

function panel(heroi, documento, game) {
  documento.querySelector('#panel' + heroi.panel).innerHTML = documento.querySelector('#panel' + heroi.panel).innerHTML.replace('heading-style', 'color: ' + heroi.font + ';background-color:' + heroi.bg + ';');
  documento.querySelector('#nome-heroi-' + heroi.panel).textContent = heroi.name;
  documento.querySelector('#classe-heroi-' + heroi.panel).textContent = heroi.class + ' (' + heroi.alligment + ')';
  documento.querySelector('#txt-heroi-' + heroi.panel).textContent = 'Change';

  imgPath = path + game + '/icons';
  imgName = heroi.main.toLowerCase().replace(' ','');
  game === 'MRBC' ? imgName = imgName + '.png' : imgName = imgName + '.svg';

  documento.querySelector('#img-heroi-' + heroi.panel).innerHTML = '<img src="' + imgPath + '/' + imgName + '" height="300%" width="300%"/>';
}

async function sidebar(buttons, user, listaDeCartas, herois, documento) {
  addEventSelecionar(1, listaDeCartas);
  addEventSelecionar(2, listaDeCartas);
  addEventSelecionar(3, listaDeCartas);

  let grupos = await dataDeck.grupo(user.name, user.game, user.idToken);
  grupos.sort();
  documento.querySelector('#side-menu').innerHTML += htmlMenu.addGrupo(grupos);
  documento.querySelector('#side-menu').innerHTML += htmlMenu.addPublic();
  documento.querySelector('#side-menu').innerHTML += htmlMenu.addButtons(buttons, user.game);

  for (let i in buttons) {
    documento.querySelector('#cards-' + stringManager.getNome(buttons[i].class)).addEventListener('click', function () {
      let txt = '#cards-' + stringManager.getNome(buttons[i].class);

      buscaCartas(buttons[i], user).then((retorno) => {
        documento.querySelector('#skill-cards').innerHTML = htmlCartas.cartas(retorno, user.game);
        retorno.forEach(function (carta, i, array) {
          layout(carta, user, listaDeCartas, herois, documento);
        });
      }).catch(err => console.log(err));

      ipcRenderer.invoke('set-cookie', 'cards', JSON.stringify(listaDeCartas));
    });
  }
  documento.querySelector("#add-grupo").addEventListener('click', function () {
    documento.querySelector('#lista-grupos').innerHTML = htmlMenu.updateGrupo(grupos, documento.querySelector("#change-grupo").value);
  });
  documento.querySelector("#update-nome").addEventListener('click', function () {
    let nome = documento.querySelector("#campo-nome").value;
    if (validaNomeVazio(nome, documento)) {
      eventUpdateNome(nome, documento);
    }
  });
  documento.querySelector('#campo-nome').addEventListener('keypress', function (e) {
    let nome = documento.querySelector("#campo-nome").value;
    if (e.key === 'Enter') {
      if (validaNomeVazio(nome, documento)) {
        eventUpdateNome(nome, documento);
      }
    }
  });
}

function lista(cartas, user, herois, documento) {
  documento.querySelector('#skill-cards').innerHTML = htmlCartas.lista(cartas, user.game);

  cartas.forEach(function (carta, index, array) {
    documento.querySelector('#card-' + index).addEventListener('click', function () {
      removeObj(cartas, carta);
      module.exports.lista(cartas, user, herois, documento);
      update.otherPanels(cartas, user, documento);
      update.heroPanels(cartas, user, herois, documento);
    });
  });
}

function special(buttons, user) {
  if (!user) return;
  if (user.game == 'M&D') {
    buttons.push({ class: 'Spell', main: 'Spell', sub: 'Spell', bg: '#B19CD9' })
    buttons.push({ class: 'Enchantment', main: 'Enchantment', sub: 'Enchantment', bg: '#FF99FF' })
    buttons.push({ class: 'Talent', main: 'Talent', sub: 'Talent', bg: '#C0C0C0' })
  }
  else if (user.game == 'MRBC') {
    buttons.push({ class: 'Breeder-SPE', main: 'Breeder-SPE', sub: 'Breeder-SPE', bg: '#483939' })
    buttons.push({ class: 'Breeder-ENV', main: 'Breeder-ENV', sub: 'Breeder-ENV', bg: '#483939' })
    buttons.push({ class: 'Any Monster', main: 'Any Monster', sub: 'Any Monster', bg: '#F7F7F9' })
  }
}

function layout(carta, user, listaDeCartas, herois, documento) {
  documento.querySelector('#card-' + carta.cardnumber).addEventListener('click', function () {
    if (conta.obj(listaDeCartas, carta) < 3) {
      addObj(listaDeCartas, carta);
    }
    else {
      removeObj(listaDeCartas, carta);
      removeObj(listaDeCartas, carta);
      removeObj(listaDeCartas, carta);
    }
    update.cardPanels(carta, listaDeCartas, documento);
    update.otherPanels(listaDeCartas, user, documento);
    update.heroPanels(listaDeCartas, user, herois, documento);
  });
  documento.querySelector('#card-' + carta.cardnumber).addEventListener('contextmenu', function () {
    if (conta.obj(listaDeCartas, carta) == 0) {
      addObj(listaDeCartas, carta);
      addObj(listaDeCartas, carta);
      addObj(listaDeCartas, carta);
    } else {
      removeObj(listaDeCartas, carta);
    }
    update.cardPanels(carta, listaDeCartas, documento);
    update.otherPanels(listaDeCartas, user, documento);
    update.heroPanels(listaDeCartas, user, herois, documento);
  });
  update.cardPanels(carta, listaDeCartas, documento);
  update.otherPanels(listaDeCartas, user, documento);
  update.heroPanels(listaDeCartas, user, herois, documento);
}

async function buscaCartas(classe, user) {
  let main = await dataClasse.getClassCards(classe.main, user.game, user.idToken);
  let sub;
  if (classe.sub == '???') {
    sub = await dataClasse.getClassCards(classe.main, user.game, user.idToken);
  } else {
    sub = await dataClasse.getClassCards(classe.sub, user.game, user.idToken);
  }
  let mainCards = [];
  let subCards = [];

  main.forEach(function (deck, index, array) {
    if (deck.cards) {
      let filtrado = arrayManager.filtraMain(deck.cards, user.game);
      filtrado.forEach(function (carta, i, array) {
        carta.deck = { id: deck.id, face: deck.face, aws: deck.aws };
      });
      mainCards = mainCards.concat(filtrado);
    }
  });
  sub.forEach(function (deck, index, array) {
    if (deck.cards) {
      let filtrado = arrayManager.filtraSub(deck.cards, user.game);
      filtrado.forEach(function (carta, i, array) {
        carta.deck = { id: deck.id, face: deck.face, aws: deck.aws };
      });
      subCards = subCards.concat(filtrado);
    }
  });

  mainCards.sort(arrayManager.dynamicSort('cardnumber'));
  subCards.sort(arrayManager.dynamicSort('cardnumber'));

  return mainCards.concat(subCards);
}

function eventUpdateNome(nome, documento) {
  nomeDoTime = nome;
  nome = '';
  documento.querySelector("#nome-time").textContent = nomeDoTime;
  ipcRenderer.invoke('set-cookie', 'nome', nomeDoTime);
}

function validaNomeVazio(nome, documento) {
  if (nome.length == 0) {
    alert.message(documento.querySelector('#alert-message'), 'You must enter a valid name!', 'warning')
    return 0;
  }
  return 1;
}

function addEventSelecionar(number, listaDeCartas) {
  document.querySelector('.selecionar-heroi-' + number).addEventListener('click', function () {
    ipcRenderer.invoke('seleciona-heroi', number);
    ipcRenderer.invoke('set-cookie', 'cards', JSON.stringify(listaDeCartas));
  });
}

function addObj(lista, carta) {
  lista.push(carta);
  lista.sort(arrayManager.dynamicSort('cardnumber'));
}

function removeObj(lista, obj) {
  let count = 0;
  for (let i in lista) {
    if (lista[i].cardnumber == obj.cardnumber) {
      lista.splice(i, 1);
      break;
    }
  }
  return lista;
}
