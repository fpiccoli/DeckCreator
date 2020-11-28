const http = require('./http.js');

module.exports = { listAll, getClassCards }

function listAll(game, token){
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/classe/'+http.valida(game)+'/list', token)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}

function getClassCards(classe, game, token){
  classe = classe.replace(' ','_');
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/classe/'+http.valida(game)+'/'+classe, token)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}
