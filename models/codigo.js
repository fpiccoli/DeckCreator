var mongoose = require('mongoose');

var schema = mongoose.Schema({
  email: String,
  codigo: String,
  data: { type: Date, default: Date.now }
}, {collection: 'codigos', versionKey: false});

module.exports = mongoose.model('Code', schema);
