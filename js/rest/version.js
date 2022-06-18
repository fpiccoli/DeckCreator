const http = require('./http.js');

module.exports = { listAll, listImg }

function listAll(){
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/version/list', null)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}

function listImg(){
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/version/img', null)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}
