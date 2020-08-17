const http = require('./http.js');
const stage = '/beta';

module.exports = { listAll }

function listAll(){
  return new Promise(resolve => {
    http.get(http.stage()+'/version/list').then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}
