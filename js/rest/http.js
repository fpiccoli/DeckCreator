const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'https://7hx09pixtg.execute-api.us-east-1.amazonaws.com'
});

module.exports = { get, post, put, remove, valida, stage }

function get(path) {
  return new Promise(resolve => {
    client.get(path, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function post(path, query) {
  return new Promise((resolve, reject) => {
    client.post(path, query, function(err, req, res, obj) {
      if(err) {
        reject(err);
      } else{
        resolve({conteudo: obj, status: res.statusCode});
      }
    })
  });
}

function put(path, query) {
  return new Promise((resolve, reject) => {
    client.put(path, query, function(err, req, res, obj) {
      if(err) {
        reject(err);
      } else{
        resolve({conteudo: obj, status: res.statusCode});
      }
    })
  });
}

function remove(path, query) {
  return new Promise(resolve => {
    client.post(path, query, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function valida(game){
  return game == 'M&D' ? 'md' : 'mrbc';
}

function stage(){
  return '/beta';
}
