const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'http://localhost:3000'
});

module.exports = {
  find(user, game){
    return new Promise(resolve => {
      postPromise('/deck/'+valida(game)+'/list', {'user': user.toLowerCase()}).then(retorno => {
        resolve(retorno);
      });
    });
  },
  list(game){
    return new Promise(resolve => {
      getPromise('/deck/'+valida(game)+'/public').then(retorno => {
        resolve(retorno);
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

function valida(game){
  return game == 'M&D' ? 'md' : 'mrbc'
}

function getPromise(path) {
  return new Promise(resolve => {
    client.get(path, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve(obj);
    })
  });
}

function postPromise(path, query) {
  return new Promise(resolve => {
    client.post(path, query, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve(obj);
    })
  });
}
