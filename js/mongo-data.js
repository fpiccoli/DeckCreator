var mongojs = require('mongojs');

var user = 'readwrite';
var pass = 'txcreadwrite';
var db = 'deckcreator';
var url = 'mongodb://'+user+':'+pass+'@tymbox-shard-00-00-8gad9.mongodb.net:27017,tymbox-shard-00-01-8gad9.mongodb.net:27017,tymbox-shard-00-02-8gad9.mongodb.net:27017/'+db+'?ssl=true&replicaSet=tymbox-shard-0&authSource=admin&retryWrites=true';

var collection = 'cards';

// var url = '127.0.0.1/teste'
// var collection = 'dados'

var db = mongojs(url, [collection]);


module.exports = {
  listAll(){
    db.cards.find(function (err, docs) {
      console.log(docs);
      // return docs;
    })
  }
}
