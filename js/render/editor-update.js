const { max } = require('moment');
const htmlCartas = require('../html/editor-cartas.js');
const conta = require('../manager/conta.js');
const path = require('../manager/path.js').getPath();

module.exports = { heroPanels, cardPanels, otherPanels }

function heroPanels(listaDeCartas, user, herois, documento) {
  for (let i in herois) {
    let valor = conta.mainClass(listaDeCartas, herois[i], user.game) + conta.subClass(listaDeCartas, herois[i], user.game);
    documento.querySelector('#qtde-heroi-' + herois[i].panel).textContent = valor;
  }
}

function cardPanels(carta, listaDeCartas, documento) {
  documento.querySelector('#card-text-' + carta.cardnumber).textContent = conta.obj(listaDeCartas, carta);
}

function otherPanels(listaDeCartas, user, documento) {
  let talentStyle;
  let spellStyle;
  let talentIcon;
  let spellIcon;
  let talentText;
  let spellText;
  let qtdeTalent = 0;
  let qtdeSpell = 0;

  maxCards = 60;
  if (user.game === 'MRBC') maxCards = 50;

  let percentual = listaDeCartas.length * 100 / maxCards;
  percentual = round(percentual, 1);
  documento.querySelector('#all-cards').textContent = listaDeCartas.length;
  documento.querySelector('#status-value').textContent = percentual + '%';
  documento.querySelector('#status-bar').innerHTML = htmlCartas.statusbar(percentual);

  if (user.game == 'M&D') {
    qtdeTalent = conta.classe(listaDeCartas, 'Talent', user.game);
    qtdeSpell = conta.classe(listaDeCartas, 'Spell', user.game) + conta.classe(listaDeCartas, 'Enchantment', user.game);
    talentStyle = 'style="color: white;background-color: #c0c0c0;"';
    spellStyle = 'style="color: white;background-color: #B57EDC;"';
    talentIcon = '<img src="' + path + 'M&D/icons/talent.svg" height="300%" width="300%"/>';
    spellIcon = '<img src="' + path + 'M&D/icons/spell.svg" height="150%" width="150%"/><img src="' + path + 'M&D/icons/enchantment.svg" height="150%" width="150%"/>';
    talentText = 'Talent</br>All Classes';
    spellText = 'Spell +</br>Enchantment';
  } else if (user.game == 'MRBC') {
    qtdeTalent = conta.classe(listaDeCartas, 'Any Monster', user.game);
    qtdeSpell = conta.classe(listaDeCartas, 'Breeder', user.game);
    talentStyle = 'style="color: black;background-color: #f7f7f9;"';
    spellStyle = 'style="color: white;background-color: #483939;"';
    talentIcon = '<img src="' + path + 'MRBC/icons/anymonster.png" height="300%" width="300%"/>';
    spellIcon = '<img src="' + path + 'MRBC/icons/breeder.png" height="300%" width="300%"/>';
    talentText = 'Any Monster';
    spellText = 'Breeder';
  }

  let talentHtml = '<div class="panel-heading" ' + talentStyle + '><div class="row"><div class="col-xs-3">' + talentIcon + '</div><div class="col-xs-9 text-right"><div class="huge">' + qtdeTalent + '</div><div>' + talentText + '</div></div></div></div>';
  let spellHtml = '<div class="panel-heading" ' + spellStyle + '"><div class="row"><div class="col-xs-3">' + spellIcon + '</div><div class="col-xs-9 text-right"><div class="huge">' + qtdeSpell + '</div><div>' + spellText + '</div></div></div></div>';

  documento.querySelector('#talent-panel').innerHTML = talentHtml;
  documento.querySelector('#spell-panel').innerHTML = spellHtml;
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
