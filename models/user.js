var mongoose = require('mongoose');

var schema = mongoose.Schema({
  user: String,
  email: String,
  pass: String,
  game: String,
  active: Boolean
}, {collection: 'users', versionKey: false});

module.exports = mongoose.model('User', schema);
