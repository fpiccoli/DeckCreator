const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'https://7hx09pixtg.execute-api.us-east-1.amazonaws.com'
});

module.exports = { get, post, put, remove, valida, stage }

function get(path) {
  return new Promise(resolve => {
    client.get(options(path), function(err, req, res, obj) {
      if(err) console.log(err);
      resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function post(path, query) {
  return new Promise((resolve, reject) => {
    client.post(options(path), query, function(err, req, res, obj) {
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
    client.put(options(path), query, function(err, req, res, obj) {
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
    client.post(options(path), query, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function options(path){
  return {
    path: path,
    headers: {
      'x-api-key': 'IsT3Y2Z9pT6FvFCad09sC1JmADw6kTYvSWf9Mnhb'
    }
  }
}

function valida(game){
  return game == 'M&D' ? 'md' : 'mrbc';
}

function stage(){
  return '/beta';
}
