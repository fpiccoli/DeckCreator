const builder = require('./builder.js');
const data = require('../data.js');
const load = require('../loadJSON.js');
const conta = require('../conta.js');

module.exports = {
  menu(decks){
    let json = [];
    let panels = [];

    decks.forEach(build);
    function build(deck, index, array) {
      let herois = [];
      let cartas = [];

      let rowTitle = title(deck.Nickname);

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

      let rowContent = builder.element('div', {class: 'row'}, [rowTitle, childDeck, childBotoes]);

      json.push(rowContent);
    }

    json.forEach(function (obj, index, array){
      let child = [];
      child.push(obj);

      let panelHeading = builder.element('div', {class: 'panel-heading'}, child);
      let panelDefault = builder.element('div', {class: 'panel panel-default'}, [panelHeading]);
      let col12 = builder.element('div', {class: 'col-lg-12'}, [panelDefault]);
      panels.push(builder.element('div', {class: 'col-lg-12'}, [col12]));
    });

    return builder.build(panels);
  }
}

function title(name){
  let deckName = builder.text(name);
  let hugeText = builder.element('div', {class:'huge text-center'}, [deckName]);
  let col12 = builder.element('div', {class: 'col-lg-12'}, [hugeText]);
  return builder.element('div', {class: 'row'}, [col12]);
}

function botao(type, color, index, title){
  let icon = builder.element('i', {class:'fa fa-'+type}, []);
  let btn = builder.element('button', {id:'botao-'+index, class:'btn btn-'+color+' btn-circle btn-xl', title: title}, [icon]);
  return builder.element('div', {class: 'col-xs-6 text-center'}, [btn]);
}
