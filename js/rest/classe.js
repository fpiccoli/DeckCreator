const http = require('./http.js');

module.exports = { listAll, getClassCards }

function listAll(game){
  return new Promise(resolve => {
    http.get(http.stage()+'/classe/'+http.valida(game)+'/list').then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}

function getClassCards(classe, game){
  classe = classe.replace(' ','_');
  return new Promise(resolve => {
    http.get(http.stage()+'/classe/'+http.valida(game)+'/'+classe).then(retorno => {
      resolve(retorno.conteudo);
    });
  });
}
