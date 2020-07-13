const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'http://localhost:3000'
});

module.exports = {
  listAll(){
    return new Promise(resolve => {
      getPromise('/version/list').then(retorno => {
        resolve(retorno);
      });
    });
  }
}

function getPromise(path) {
  return new Promise(resolve => {
    client.get(path, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve(obj);
    })
  });
}
