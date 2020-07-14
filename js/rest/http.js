const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'http://localhost:3000'
});

module.exports = {
  get(path) {
    return new Promise(resolve => {
      client.get(path, function(err, req, res, obj) {
        if(err) console.log(err);
        resolve({conteudo: obj, status: res.statusCode});
      })
    });
  },
  post(path, query) {
    return new Promise(resolve => {
      client.post(path, query, function(err, req, res, obj) {
        if(err) console.log(err);
        resolve({conteudo: obj, status: res.statusCode});
      })
    });
  },
  valida(game){
    return game == 'M&D' ? 'md' : 'mrbc'
  }
}
