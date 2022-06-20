const builder = require('./builder.js');
const dataManager = require('../manager/array.js');
var moment = require('moment');

module.exports = { html }

function html(lista, game) {
  let property = 'changes';
  moment.locale('en');

  if (game === "M&D") {
    moment.locale('pt-br');
    property = 'funcionalidades';
  }

  let text = [];

  text.push(h1('Patch Notes'));
  text.push(h2('Releases:'));

  lista = dataManager.dateSort(lista, 0);

  lista.forEach(function (objeto) {
    text.push(h3(objeto.versao));
    text.push(h4(moment(objeto.data, "DD/MM/YYYY").format("LL")));

    objeto[property].forEach(function (objeto) {
      text.push(patch([
        {
          titulo: objeto.titulo,
          itens: objeto.itens
        }])
      );
    });
  });

  let json = builder.element('div', { class: 'col-lg-12' }, text)

  return builder.build([json]);
}

function patch(lista) {
  let retorno = []
  lista.forEach(function (objeto) {
    retorno.push({ texto: builder.text(objeto.titulo), items: ul(objeto.itens) });
  });
  return ul2(retorno);
}

function p(string) {
  return builder.element('p', null, [builder.text(string)]);
}

function h1(string) {
  return builder.element('h1', { class: 'page-header' }, [builder.text(string)]);
}

function h2(string) {
  return builder.element('h2', null, [builder.text(string)]);
}

function h3(string) {
  return builder.element('h3', null, [builder.text(string)]);
}

function h4(string) {
  return builder.element('h4', null, [builder.text(string)]);
}

function ul(lista) {
  let li = [];
  lista.forEach(monta);
  function monta(item) {
    li.push(builder.element('li', null, [builder.text(item)]));
  }
  return builder.element('ul', null, li);
}

function ul2(lista) {
  let li = [];
  lista.forEach(monta);
  function monta(item) {
    li.push(builder.element('li', null, [item.texto, item.items]));
  }
  return builder.element('ul', null, li);
}
