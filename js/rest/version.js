const http = require('./http.js');

module.exports = { listAll }

function listAll(){
  return new Promise(resolve => {
    http.get(http.stage()+'/version/list').then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}
