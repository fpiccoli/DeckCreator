const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'http://localhost:3000'
});

module.exports = {
  login(user, pass){
  },
  find(query){
    return new Promise(resolve => {
      getPromise('/user/find', query).then(retorno => {
        resolve(retorno);
      });
    });
  },
  save(obj){
  },
  activate(email){
  },
  update(obj){
  }
}

function getPromise(path, query) {
  return new Promise(resolve => {
    client.post(path, query, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve(obj);
    })
  });
}
