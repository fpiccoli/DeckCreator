var mongoose = require('mongoose');

var schema = mongoose.Schema({
  nameEN: String,
  descriptionBR: String
}, {collection: 'efeitos'});

module.exports = mongoose.model('Efeito', schema);
