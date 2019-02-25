const builder = require('./builder.js');
const conta = require('../conta.js');

module.exports = {
  menu(decks){
    let json = [];
    let panels = [];
    panels.push(builder.element('h1', {class:'page-header'}, [builder.text(decks.length +' decks encontrados: ')]));

    decks.forEach(function (deck, index, array) {
      let herois = [];
      let cartas = [];

      let rowTitle = title(deck.name, index);

      herois = herois.concat(deck.heroes);
      cartas = herois.concat(deck.cards);

      herois.push({class:'Spell', main:'Spell', sub:'Spell', icon:'12-7YJWM_Y4fbdMPdZgAbZAuJ0n1vUwZV', bg:'1be1iq7sJOLYeo07ZrNrKgSCx30ln_8_R'})
      herois.push({class:'Enchantment', main:'Enchantment', sub:'Enchantment', icon:'1-J5PmwMchC8J6sBROmT5-DJVrgYjiohW', bg:'1QOaiH7ABjkmcLrij5Cz-Ir2Qh7FRc-zd'})
      herois.push({class:'Talent', main:'Talent', sub:'Talent', icon:'1WrooGrmv1Uand440zPn9QojbY_SA6WzB', bg:'1tDpQbbRL7rMfj2GBR2SXKFo8hSd3i1ef'})

      let elements = [];

      herois.forEach(function (heroi, index, array){
        let atk = conta.mainClass(cartas, heroi);
        let def = conta.subClass(cartas, heroi);

        let subElements = [];

        subElements.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+heroi.icon, height:'55%', width:'55%', class:'center-icon'}, []));
        subElements.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+heroi.bg, height:'40%', width:'40%'}, []));

        subElements.push(builder.element('div', null, [builder.text(heroi.class)]));
        subElements.push(builder.element('div', null, [builder.text(atk+'/'+def+' ('+(atk+def)+')')]));
        elements.push(builder.element('div', {class: 'col-xs-2 text-center'}, subElements));

        childDeck = builder.element('div', {class:'col-xs-9 text-right'}, elements);
      });

      let botaoAlterarNome = botao('tag', 'info', 'alterar-nome-'+index, 'Alterar Nome');
      let botaoEditar = botao('edit', 'primary', 'editar-'+index, 'Editar Deck');
      let botaoExcluir = botao('trash', 'danger', 'excluir-'+index, 'Excluir Deck');
      childBotoes = builder.element('div', {class:'col-xs-3 text-right'}, [botaoAlterarNome, botaoEditar, botaoExcluir, builder.element('div', {id:'input-novo-nome-'+index}, [])]);

      let panelBody = builder.element('div', {class: 'panel-body'}, [childDeck, childBotoes]);
      let rowContent = builder.element('div', {id:'deck'+index, class:'panel-collapse collapse', ariaExpanded:'false', style:'height: 0px;'}, [panelBody]);

      let panelDefault = builder.element('div', {class: 'panel panel-default'}, [rowTitle, rowContent]);
      panels.push(builder.element('div', {class: 'panel-group', id:'accordion'}, [panelDefault]));
    });

    return builder.replaceCamelCase(builder.build(panels));
  },
  loading(){
    return builder.loading();
  }
}

function title(name, index){
  let collapse = builder.element('a', {dataToggle:'collapse', dataParent:'#accordion', href:'#deck'+index, ariaExpanded:'false', class:'collapsed'}, [builder.text(name)]);
  let title = builder.element('h4', {class: 'panel-title'}, [collapse]);
  return builder.element('div', {class: 'panel-heading'}, [title]);
}

function botao(type, color, index, title){
  let icon = builder.element('i', {class:'fa fa-'+type}, []);
  let btn = builder.element('button', {id:'botao-'+index, class:'btn btn-'+color+' btn-circle btn-xl', title: title}, [icon]);
  return builder.element('div', {class: 'col-xs-4 text-center', id:'birbo-'+index}, [btn]);
}
