const builder = require('./builder.js');
const data = require('../data.js');
const load = require('../loadJSON.js');
const conta = require('../conta.js');

module.exports = {
  menu(decks){
    let json = [];
    let panels = [];
    panels.push(builder.element('h1', {class:'page-header'}, [builder.text(decks.length +' decks encontrados: ')]));

    decks.forEach(build);
    function build(deck, index, array) {
      let herois = [];
      let cartas = [];
      let deckName = deck.Nickname;

      let rowTitle = title(deckName, index);

      let retornoLoad = load.montaObj(deck);
      if (retornoLoad){
        herois = retornoLoad.herois;
        cartas = retornoLoad.cartas;
      }

      herois.push({class:'Spell', main:'Spell'});
      herois.push({class:'Enchantment', main:'Enchantment'});
      herois.push({class:'Talent', main:'Talent'});

      let elements = [];

      herois.forEach(function (heroi, index, array){
        let main = heroi.main.toLowerCase();
        let atk = conta.mainClass(cartas, heroi);
        let def = conta.subClass(cartas, heroi);

        let subElements = [];

        subElements.push(builder.element('img', {src:'../icons-full/'+main+'.svg', height:'40%', width:'40%'}, []));
        if(heroi.type == 'Hybrid'){
          let sub = heroi.sub.toLowerCase();
          subElements.push(builder.element('img', {src:'../icons-full/'+sub+'.svg', height:'40%', width:'40%'}, []));
        }
        subElements.push(builder.element('div', null, [builder.text(heroi.class)]));
        subElements.push(builder.element('div', null, [builder.text(atk+'/'+def+' ('+(atk+def)+')')]));
        elements.push(builder.element('div', {class: 'col-xs-2 text-center'}, subElements));

        childDeck = builder.element('div', {class:'col-xs-9 text-right'}, elements);
      });

      let botaoEditar = botao('edit', 'primary', 'editar-'+index, 'Editar Deck');
      let botaoExcluir = botao('trash', 'danger', 'excluir-'+index, 'Excluir Deck');
      childBotoes = builder.element('div', {class:'col-xs-3 text-right'}, [botaoEditar, botaoExcluir]);

      let panelBody = builder.element('div', {class: 'panel-body'}, [childDeck, childBotoes]);
      let rowContent = builder.element('div', {id:'deck'+index, class:'panel-collapse collapse', ariaExpanded:'false', style:'height: 0px;'}, [panelBody]);

      let panelDefault = builder.element('div', {class: 'panel panel-default'}, [rowTitle, rowContent]);
      panels.push(builder.element('div', {class: 'panel-group', id:'accordion'}, [panelDefault]));
    }

    return builder.replaceCamelCase(builder.build(panels));
  }
}

function title(name, index){
  let deckName = builder.text(name);
  let collapse = builder.element('a', {dataToggle:'collapse', dataParent:'#accordion', href:'#deck'+index, ariaExpanded:'false', class:'collapsed'}, [deckName]);
  let title = builder.element('h4', {class: 'panel-title'}, [collapse]);
  return builder.element('div', {class: 'panel-heading'}, [title]);
}

function botao(type, color, index, title){
  let icon = builder.element('i', {class:'fa fa-'+type}, []);
  let btn = builder.element('button', {id:'botao-'+index, class:'btn btn-'+color+' btn-circle btn-xl', title: title}, [icon]);
  return builder.element('div', {class: 'col-xs-6 text-center'}, [btn]);
}
