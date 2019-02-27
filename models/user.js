var mongoose = require('mongoose');

var schema = mongoose.Schema({
  user: String,
  pass: String
}, {collection: 'users'});

module.exports = mongoose.model('User', schema);
