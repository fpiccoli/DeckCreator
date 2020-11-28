const builder = require('./builder.js');
var groupBy = require('json-groupby');
const dataManager = require('../manager/string.js');

module.exports = { addButtons, addGrupo, addPublic, updateGrupo }

function addButtons(buttons){
  let json = [];

  buttons.forEach(montaJson);
  function montaJson(button, index, array){
    let childs = [];
    let elements = [];

    childs.push(builder.element('img', {src:'https://drive.google.com/uc?export=download&id='+button.icon, draggable:"false", height:'50%', width:'25%', style:'background-color:'+button.bg+'; border-radius:5px; padding:5px;'}, []));

    childs.push(builder.element('div', {class: 'text-center'}, [builder.text(button.class)]));
    elements.push(builder.element('a', {href:'#', class: 'text-center', id:'cards-'+dataManager.getNome(button.class)}, childs));

    json.push(builder.element('li', null, elements));
  }

  return builder.build(json);
}

function addGrupo(grupos){
  let options = [];
  options.push(builder.element('option', { class:'active', value: '' }, [builder.text('Select a group')]));
  grupos.forEach(function (grupo, index, array) {
    options.push(addOption(grupo));
  });

  let retorno = builder.build([builder.element('li', {class: 'sidebar-search', id: 'lista-grupos'}, [grupo(options)])]);

  return builder.replaceCamelCase(retorno);
}

function addPublic(){
  let options = [];
  let public = options.push(builder.element('i', { class:'fa fa-globe'}, []));
  let private = options.push(builder.element('i', { class:'fa fa-lock'}, []));

  options.push(builder.element('option', { class:'active', value: 'false' }, [builder.text('Private')]));
  options.push(builder.element('option', { class:'active', value: 'true' }, [builder.text('Public')]));

  let select = builder.element('select', {class: 'form-control', id: 'select-public'}, options);
  let inputGroup = builder.element('div', {class: 'input-group-btn custom-search-form'}, [select]);

  let retorno = builder.build([builder.element('li', {class: 'sidebar-search'}, [inputGroup])]);

  return builder.replaceCamelCase(retorno);
}

function updateGrupo(grupos, opcaoNova){
  let options = [];
  options.push(builder.element('option', { class:'active', value: '' }, [builder.text('Select a group')]));
  grupos.forEach(function (grupo, index, array) {
    options.push(addOption(grupo));
  });
  options.push(addOption(opcaoNova));

  let retorno = builder.build([grupo(options)]);

  return builder.replaceCamelCase(retorno);
}

function grupo(options){
  let iconAdd = builder.element('i', { class: 'fa fa-plus' }, []);
  let btnAdd = builder.element('button', { class:'btn btn-default', dataToggle:'modal', dataTarget:'#myModal', type:'button' }, [iconAdd]);

  let spanAdd = builder.element('span', { class:'input-group-btn' }, [btnAdd]);

  let select = builder.element('select', {class: 'form-control', id: 'grupo'}, options);

  return inputGroup = builder.element('div', {class: 'input-group custom-search-form'}, [select, spanAdd]);
}

function addOption(texto){
  return builder.element('option', { value: texto }, [builder.text(texto)]);;
}
