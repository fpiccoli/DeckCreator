const clients = require('restify-clients');
const api = require('./property.js');

const client = clients.createJsonClient({
  url: api.url()
});

module.exports = { get, post, put, remove, valida, stage }

function get(path, token) {
  return new Promise((resolve, reject) => {
    client.get(options(path, token), function(err, req, res, obj) {
      if(err) reject(err);
      resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function post(path, query, token) {
  return new Promise((resolve, reject) => {
    client.post(options(path, token), query, function(err, req, res, obj) {
      if(err) reject(err);
      else resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function put(path, query, token) {
  return new Promise((resolve, reject) => {
    client.put(options(path, token), query, function(err, req, res, obj) {
      if(err) reject(err);
      else resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function remove(path, query, token) {
  return new Promise((resolve, reject) => {
    client.post(options(path, token), query, function(err, req, res, obj) {
      if(err) reject(err);
      else resolve({conteudo: obj, status: res.statusCode});
    })
  });
}

function options(path, token){
  let retorno = {
    path: path,
    headers: { 'x-api-key': api.key() }
  }
  if (token) retorno.headers.Authorization = 'Bearer ' + token;
  return retorno;
}

function valida(game){
  return game == 'M&D' ? 'md' : 'mrbc';
}

function stage(){
  return '/beta';
}
