const http = require('./http.js');

module.exports = {
  find(user, game){
    return new Promise(resolve => {
      http.post('/deck/'+http.valida(game)+'/list', {'user': user.toLowerCase()}).then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  },
  list(game){
    return new Promise(resolve => {
      http.get('/deck/'+http.valida(game)+'/public').then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  },
  delete(nome, user, game){
  },
  update(deck, novoNome, nomeAntigo, game){
  },
  save(deck, game){
  },
  exists(deck, game){
  }
}
