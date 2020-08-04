const builder = require('./builder.js');
const conta = require('../manager/conta.js');
const dataManager = require('../manager/array.js');
var groupBy = require('json-groupby');

module.exports = {
  accordion(decks, userObj){
    let decksUser = groupBy(decks, ['user']);
    let lista = [];
    Object.getOwnPropertyNames(decksUser).forEach(function (user, index, array) {
        if(user != userObj.name) lista.push(user);
    });
    lista = lista.sort();

    let json = [];


    json.push(builder.element('div', {class: 'col-lg-12'}, [this.accordionHeader(lista), this.accordionContent(lista, decksUser, userObj.game)]));

    return  builder.replaceCamelCase(builder.build(json));
  },
  accordionHeader(users){
    let lis = [];

    users.forEach(function (user, index, array) {
      let a = builder.element('a', {href: '#'+dataManager.getNome(user), dataToggle:'tab'}, [builder.text(user)]);
      let content = {};
      if (index == 0) content = {class: 'active'};
      lis.push(builder.element('li', content, [a]));
    });

    return builder.element('ul', {class: 'nav nav-tabs'}, lis);
  },
  accordionContent(grupos, decksGrupo, game){
    let divs = [];

    grupos.forEach(function (nomeDoGrupo, index, array) {
      let content = '';
      if (index == 0) content = ' active in';

      if(decksGrupo[nomeDoGrupo]) divs.push(builder.element('div', {class: 'tab-pane fade'+content, id:dataManager.getNome(nomeDoGrupo)}, menu(decksGrupo[nomeDoGrupo], game)));
      else divs.push(builder.element('div', {class: 'tab-pane fade'+content, id:dataManager.getNome(nomeDoGrupo)}, [builder.element('div', {class: 'brtre'}, [])]));
    });

    return builder.element('div', {class: 'tab-content'}, divs);
  },
  loading(){
    return builder.loading();
  }
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
      herois.push({class:'Spell', main:'Spell', sub:'Spell', icon:'12-7YJWM_Y4fbdMPdZgAbZAuJ0n1vUwZV', bg:'#B19CD9'})
      herois.push({class:'Enchantment', main:'Enchantment', sub:'Enchantment', icon:'1-J5PmwMchC8J6sBROmT5-DJVrgYjiohW', bg:'#FF99FF'})
      herois.push({class:'Talent', main:'Talent', sub:'Talent', icon:'1WrooGrmv1Uand440zPn9QojbY_SA6WzB', bg:'#C0C0C0'})
    }
    else if(game == 'MRBC'){
      herois.push({class:'Breeder-SPE', main:'Breeder-SPE', sub:'Breeder-SPE', icon:'1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ', bg:'#483939'})
      herois.push({class:'Breeder-ENV', main:'Breeder-ENV', sub:'Breeder-ENV', icon:'1PwRtWS3sAKngZNE9njZr_YsHQPaZpBOZ', bg:'#483939'})
      herois.push({class:'Any Monster', main:'Any Monster', sub:'Any Monster', icon:'1cTOPQh_UbGKeWzEkUuCjPjxYSTeqTseJ', bg:'#F7F7F9'})
    }

    let elements = [];

    herois.forEach(function (heroi, index, array){
      let atk = conta.mainClass(cartas, heroi, game);
      let def = conta.subClass(cartas, heroi, game);

      let subElements = [];

      subElements.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+heroi.icon, draggable:"false", height:'55%', width:'55%', style:'background-color:'+heroi.bg+'; border-radius:5px; padding:5px;'}, []));

      subElements.push(builder.element('div', null, [builder.text(heroi.class)]));
      subElements.push(builder.element('div', null, [builder.text(atk+'/'+def+' ('+(atk+def)+')')]));
      elements.push(builder.element('div', {class: 'col-xs-2 text-center'}, subElements));

      childDeck = builder.element('div', {class:'col-xs-10 text-right'}, elements);
    });

    let id = deck.user+'-'+dataManager.getNome(deck.name);
    let botaoImportar = botao('download', 'warning', 'import-'+id, 'Import Deck');
    childBotoes = builder.element('div', {class:'col-xs-2 text-right'}, [botaoImportar]);

    let panelBody = builder.element('div', {class: 'panel-body'}, [childDeck, childBotoes]);
    let rowContent = builder.element('div', {id:'deck'+id, class:'panel-collapse collapse', ariaExpanded:'false', style:'height: 0px;'}, [panelBody]);

    let panelDefault = builder.element('div', {class: 'panel panel-default'}, [rowTitle, rowContent]);
    panels.push(builder.element('div', {class: 'panel-group', id:'accordion'}, [panelDefault]));
  });
  return panels;
}

function title(deck, index){
  let collapse = builder.element('a', {dataToggle:'collapse', dataParent:'#accordion', href:'#deck'+index, ariaExpanded:'false', class:'collapsed'}, [builder.text(deck.name)]);
  let title = builder.element('h4', {class: 'panel-title'}, [collapse]);
  return builder.element('div', {class: 'panel-heading'}, [title]);
}

function botao(type, color, index, title){
  let icon = builder.element('i', {class:'fa fa-'+type}, []);
  let btn = builder.element('button', {id:'botao-'+index, class:'btn btn-'+color+' btn-circle btn-xl', title: title}, [icon]);
  return builder.element('div', {class: 'col-xs-4 text-center'}, [btn]);
}
