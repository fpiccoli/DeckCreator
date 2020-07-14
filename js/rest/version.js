const http = require('./http.js');

module.exports = {
  listAll(){
    return new Promise(resolve => {
      http.get('/version/list').then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  }
}
