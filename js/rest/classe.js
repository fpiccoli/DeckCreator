const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'http://localhost:3000'
});

module.exports = {
  listAll(game){
    return new Promise(resolve => {
      getPromise('/classe/'+valida(game)+'/list').then(retorno => {
        resolve(retorno);
      });
    });
  },
  getClassCards(classe, game){
    classe = classe.replace(' ','_');
    return new Promise(resolve => {
      getPromise('/classe/'+valida(game)+'/'+classe).then(retorno => {
        resolve(retorno);
      });
    });
  },
  getClasseByCard(carta){
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
