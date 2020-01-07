var mongoose = require('mongoose');

var schema = mongoose.Schema({
  user: String,
  email: String,
  password: String,
  game: String,
  active: Boolean
}, {collection: 'users', versionKey: false});

module.exports = mongoose.model('User', schema);
