const html = require('./html/efeitos.js');
const data = require('./data-manager.js');
const dataEfeito = require('./rest/efeito.js');

let lista = dataEfeito.listAll();

lista.then((retorno) => {
  retorno.sort(data.dynamicSort('-nameEN'));
  document.querySelector('#efeitos').innerHTML = html.efeitos(retorno);
}).catch(err => console.log(err));
