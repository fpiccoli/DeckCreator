const builder = require('./builder.js');
var groupBy = require('json-groupby');

module.exports = {
  items(buttons, decks){
    let json = [];

    json.push(insereNome());
    json.push(selecionaGrupo(decks));

    buttons.forEach(montaJson);
    function montaJson(button, index, array){
      let childs = [];
      let elements = [];

      childs.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+button.bg, height:'50%', width:'25%'}, []));
      childs.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+button.icon, height:'50%', width:'25%', class:'center-icon-menu'}, []));

      childs.push(builder.element('div', {class: 'text-center'}, [builder.text(button.class)]));
      elements.push(builder.element('a', {href:'#', class: 'text-center', id:'cards-'+button.class.toLowerCase().toLowerCase().replace(' ','')}, childs));

      json.push(builder.element('li', null, elements));
    }
    return builder.build(json);
  }
}

function insereNome(){
  let icon = builder.element('i', { class: 'fa fa-edit' }, []);
  let btn = builder.element('button', { id:'update-nome', class:'btn btn-default', type:'button' }, [icon]);
  let input = builder.element('input', { id:'campo-nome', type:'text', class:'form-control', placeholder:'Nome do Deck' }, []);
  let span = builder.element('span', { class:'input-group-btn' }, [btn]);
  let inputGroup = builder.element('div', {class: 'input-group custom-search-form'}, [input, span]);

  return builder.element('li', {class: 'sidebar-search'}, [inputGroup]);
}

function selecionaGrupo(decks){
  let options = [];

  decks.forEach(function (deck, index, array) {
    if(!deck.grupo) deck.grupo = 'Sem Grupo';
  });
  let decksGrupo = groupBy(decks, ['grupo']);
  let grupos = [];
  Object.getOwnPropertyNames(decksGrupo).forEach(function (nomeDoGrupo, index, array) {
    if(nomeDoGrupo != 'Sem Grupo') grupos.push(nomeDoGrupo);
  });

  options.push(addOption('', 'Selecione um grupo'));
  grupos.forEach(function (grupo, index, array) {
    options.push(addOption(grupo, grupo));
  });

  let iconAdd = builder.element('i', { class: 'fa fa-plus' }, []);
  let btnAdd = builder.element('button', { id:'add-grupo', class:'btn btn-default', type:'button' }, [iconAdd]);
  let iconRemove = builder.element('i', { class: 'fa fa-minus' }, []);
  let btnRemove = builder.element('button', { id:'remove-grupo', class:'btn btn-default', type:'button' }, [iconRemove]);

  let spanAdd = builder.element('span', { class:'input-group-btn' }, [btnAdd]);
  let spanRemove = builder.element('span', { class:'input-group-btn' }, [btnRemove]);

  let select = builder.element('select', {class: 'form-control', id: 'grupo'}, options);
  let inputGroup = builder.element('div', {class: 'input-group custom-search-form'}, [spanAdd, select, spanRemove]);

  return builder.element('li', {class: 'sidebar-search'}, [inputGroup]);
}

function addOption(valor, texto){
  return builder.element('option', { class:'active', value:valor }, [builder.text(texto)]);;
}
