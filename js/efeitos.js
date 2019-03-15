const html = require('./html/efeitos.js');
const mongo = require('./data-mongo.js');
const data = require('./data-manager.js');

let lista = mongo.listEfeitos();

lista.then((retorno) => {
  retorno.sort(data.dynamicSort('-nameEN'));
  document.querySelector('#efeitos').innerHTML = html.efeitos(retorno);
}).catch(err => console.log(err));
