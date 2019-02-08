var mongojs = require('mongojs');
var db = mongojs('mongodb://readonly:txcread@tymbox-shard-00-00-8gad9.mongodb.net:27017,tymbox-shard-00-01-8gad9.mongodb.net:27017,tymbox-shard-00-02-8gad9.mongodb.net:27017/test?ssl=true&replicaSet=tymbox-shard-0&authSource=admin&retryWrites=true');

module.exports = {
  listAll(){
    var cards = db.collection('cards');
    cards.find({name: "Lich"}, function (err, docs) {
      return docs;
    })
  }
}
