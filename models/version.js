var mongoose = require('mongoose');

var schema = mongoose.Schema({
  versao: String,
  data: String,
  funcionalidades: [
    {
      _id: false,
      titulo: String,
      itens: [ String ]
    }
  ],
  changes: [
    {
      _id: false,
      titulo: String,
      itens: [ String ]
    }
  ]

}, {collection: 'version'});

module.exports = mongoose.model('Versao', schema);
