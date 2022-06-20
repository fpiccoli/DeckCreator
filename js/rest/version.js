const http = require('./http.js');

module.exports = { list, listAll }

function list(game){
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/version/list/'+game, null)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}

function listAll(){
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/version/list', null)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}
