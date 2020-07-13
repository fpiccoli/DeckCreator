const clients = require('restify-clients');

const client = clients.createJsonClient({
  url: 'http://localhost:3000'
});

module.exports = {
  find(query){
  },
  save(obj){
  }
}
