const builder = require('./builder.js');
const data = require('../data.js');
const load = require('../loadJSON.js');
const conta = require('../conta.js');


const json2html = require('html2json').json2html;

module.exports = {
  menu(decks){
    let json = [];
    let panels = [];

    decks.forEach(build);
    function build(deck, index, array) {
      let herois = [];
      let cartas = [];

      let deckName = builder.text(deck.Nickname);
      let hugeText = builder.element('div', {class:'huge text-center'}, [deckName]);
      let col12 = builder.element('div', {class: 'col-lg-12'}, [hugeText]);
      let rowTitle = builder.element('div', {class: 'row'}, [col12]);

      let retornoLoad = load.montaObj(deck);
      if (retornoLoad){
        herois = retornoLoad.herois;
        cartas = retornoLoad.cartas;
      }
      
      herois.push({class:'Spell', main:'Spell' });
      herois.push({class:'Enchantment', main:'Enchantment' });
      herois.push({class:'Talent', main:'Talent' });

      let elements = [];

      herois.forEach(function (heroi, index, array){
        let main = heroi.main.toLowerCase();
        let atk = conta.mainClass(cartas, heroi);
        let def = conta.subClass(cartas, heroi);

        if(heroi.type == 'Hybrid'){
          let sub = heroi.sub.toLowerCase();

          let mainImg = builder.element('img', { src:'../icons-full/'+main+'.svg', height:'40%', width:'40%' }, []);
          let subImg = builder.element('img', { src:'../icons-full/'+sub+'.svg', height:'40%', width:'40%' }, []);
          let heroClass = builder.element('div', null, [builder.text(heroi.class)]);
          let heroText = builder.element('div', null, [builder.text(atk+'/'+def+' ('+(atk+def)+')')]);

          elements.push(builder.element('div', {class: 'col-xs-2 text-center'}, [mainImg, subImg, heroClass, heroText]));
        }
        else{
          let mainImg = builder.element('img', { src:'../icons-full/'+main+'.svg', height:'40%', width:'40%' }, []);
          let heroClass = builder.element('div', null, [builder.text(heroi.class)]);
          let heroText = builder.element('div', null, [builder.text(atk+'/'+def+' ('+(atk+def)+')')]);

          elements.push(builder.element('div', {class: 'col-xs-2 text-center'}, [mainImg, heroClass, heroText]));
        }

        childDeck = builder.element('div', { class:'col-xs-9 text-right' }, elements);
      });

      let botoes = [];

      let iconEditar = builder.element('i', { class:'fa fa-edit' }, []);
      let editar = builder.element('button', { id:'botao-editar-'+index, class:'btn btn-primary btn-circle btn-xl', title: 'Editar Deck' }, [iconEditar]);
      botoes.push(builder.element('div', {class: 'col-xs-6 text-center'}, [editar]));

      let iconExcluir = builder.element('i', { class:'fa fa-trash' }, []);
      let excluir = builder.element('button', { id:'botao-excluir-'+index, class:'btn btn-danger btn-circle btn-xl', title: 'Excluir Deck' }, [iconExcluir]);
      botoes.push(builder.element('div', {class: 'col-xs-6 text-center'}, [excluir]));

      childBotoes = builder.element('div', { class:'col-xs-3 text-right' }, botoes);

      let rowContent = builder.element('div', { class: 'row' }, [rowTitle, childDeck, childBotoes]);

      json.push(rowContent);
    }

    json.forEach(function (obj, index, array){
      let child = [];
      child.push(obj);

      let panelHeading = builder.element('div', { class: 'panel-heading' }, child);
      let panelDefault = builder.element('div', { class: 'panel panel-default' }, [panelHeading]);
      let col12 = builder.element('div', { class: 'col-lg-12' }, [panelDefault]);
      panels.push(builder.element('div', { class: 'col-lg-12' }, [col12]));
    });

    return builder.build(panels);
  }
}
