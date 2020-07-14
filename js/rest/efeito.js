const http = require('./http.js');

module.exports = {
  listAll(){
    return new Promise(resolve => {
      http.get('/effect/list').then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  }
}
