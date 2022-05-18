const builder = require('./builder.js');
const conta = require('../manager/conta.js');
const dataManager = require('../manager/string.js');
var groupBy = require('json-groupby');

module.exports = { accordion, accordionHeader, accordionContent }

function accordion(decks, game){
  decks.forEach(function (deck, index, array) {
    if(!deck.grupo) deck.grupo = 'Other Decks';
  });
  let decksGrupo = groupBy(decks, ['grupo']);
  let grupos = [];
  Object.getOwnPropertyNames(decksGrupo).forEach(function (nomeDoGrupo, index, array) {
    if(nomeDoGrupo != 'Other Decks') grupos.push(nomeDoGrupo);
  });
  grupos = grupos.sort();
  grupos.push('Other Decks');

  let json = [];
  json.push(builder.element('div', {class: 'col-lg-12'}, [accordionHeader(grupos), accordionContent(grupos, decksGrupo, game)]));

  return  builder.replaceCamelCase(builder.build(json));
}

function accordionHeader(grupos){
  let lis = [];

  grupos.forEach(function (nomeDoGrupo, index, array) {
    let a = builder.element('a', {href: '#'+dataManager.getNome(nomeDoGrupo), dataToggle:'tab'}, [builder.text(nomeDoGrupo)]);
    let content = {};
    if (index == 0) content = {class: 'active'};
    lis.push(builder.element('li', content, [a]));
  });

  return builder.element('ul', {class: 'nav nav-tabs'}, lis);
}

function accordionContent(grupos, decksGrupo, game){
  let divs = [];

  grupos.forEach(function (nomeDoGrupo, index, array) {
    let content = '';
    if (index == 0) content = ' active in';

    if(decksGrupo[nomeDoGrupo]) divs.push(builder.element('div', {class: 'tab-pane fade'+content, id:dataManager.getNome(nomeDoGrupo)}, menu(decksGrupo[nomeDoGrupo], game)));
    else divs.push(builder.element('div', {class: 'tab-pane fade'+content, id:dataManager.getNome(nomeDoGrupo)}, [builder.element('div', {class: 'brtre'}, [])]));
  });

  return builder.element('div', {class: 'tab-content'}, divs);
}

function menu(decks, game){
  let json = [];
  let panels = [];

  decks.forEach(function (deck, index, array) {
    let herois = [];
    let cartas = [];

    let rowTitle = title(deck, deck.user+'-'+dataManager.getNome(deck.name));

    herois = herois.concat(deck.heroes);
    cartas = herois.concat(deck.cards);

    if(game == 'M&D'){
      herois.push({class:'Spell', main:'Spell', sub:'Spell', bg:'#B19CD9'})
      herois.push({class:'Enchantment', main:'Enchantment', sub:'Enchantment', bg:'#FF99FF'})
      herois.push({class:'Talent', main:'Talent', sub:'Talent', bg:'#C0C0C0'})
    }
    else if(game == 'MRBC'){
      herois.push({class:'Breeder-SPE', main:'Breeder-SPE', sub:'Breeder-SPE', bg:'#483939'})
      herois.push({class:'Breeder-ENV', main:'Breeder-ENV', sub:'Breeder-ENV', bg:'#483939'})
      herois.push({class:'Any Monster', main:'Any Monster', sub:'Any Monster', bg:'#F7F7F9'})
    }

    let elements = [];

    herois.forEach(function (heroi, index, array){
      let atk = conta.mainClass(cartas, heroi, game);
      let def = conta.subClass(cartas, heroi, game);

      let subElements = [];

      imgName = heroi.main.toLowerCase().replace(' ','');
      game === 'MRBC' ? imgName = imgName + '.png' : imgName = imgName + '.svg';

      subElements.push(builder.element('img', {src:'../img/'+game+'/icons/'+imgName, draggable:"false", height:'55%', width:'55%', style:'background-color:'+heroi.bg+'; border-radius:5px; padding:5px;'}, []));

      subElements.push(builder.element('div', null, [builder.text(heroi.class)]));
      subElements.push(builder.element('div', null, [builder.text(atk+'/'+def+' ('+(atk+def)+')')]));
      elements.push(builder.element('div', {class: 'col-xs-2 text-center'}, subElements));

      childDeck = builder.element('div', {class:'col-xs-9 text-right'}, elements);
    });

    let id = deck.user+'-'+dataManager.getNome(deck.name);
    let botaoAlterarNome = botao('tag', 'info', 'alterar-nome-'+id, 'Change Name');
    let botaoEditar = botao('edit', 'primary', 'editar-'+id, 'Edit Deck');
    let botaoExcluir = botao('trash', 'danger', 'excluir-'+id, 'Remove Deck');
    childBotoes = builder.element('div', {class:'col-xs-3 text-right'}, [botaoAlterarNome, botaoEditar, botaoExcluir, builder.element('div', {id:'input-novo-nome-'+id}, [])]);

    let panelBody = builder.element('div', {class: 'panel-body'}, [childDeck, childBotoes]);
    let rowContent = builder.element('div', {id:'deck'+id, class:'panel-collapse collapse', ariaExpanded:'false', style:'height: 0px;'}, [panelBody]);

    let panelDefault = builder.element('div', {class: 'panel panel-default'}, [rowTitle, rowContent]);
    panels.push(builder.element('div', {class: 'panel-group', id:'accordion'}, [panelDefault]));
  });
  return panels;
}

function title(deck, index){
  let publico = '<i class="fa fa-lock"></i> <small>(Private)</small>';
  if (deck.public){
    publico = '<i class="fa fa-globe"></i> <small>('+'Public'+')</small>';
  }

  let collapse = builder.element('a', {dataToggle:'collapse', dataParent:'#accordion', href:'#deck'+index, ariaExpanded:'false', class:'collapsed'}, [builder.text(deck.name + ' ' + publico)]);
  let title = builder.element('h4', {class: 'panel-title'}, [collapse]);
  return builder.element('div', {class: 'panel-heading'}, [title]);
}

function botao(type, color, index, title){
  let icon = builder.element('i', {class:'fa fa-'+type}, []);
  let btn = builder.element('button', {id:'botao-'+index, class:'btn btn-'+color+' btn-circle btn-xl', title: title}, [icon]);
  return builder.element('div', {class: 'col-xs-4 text-center'}, [btn]);
}
