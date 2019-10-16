var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  id: String,
  face: String,
  subtype: String,
  main: String,
  sub: String,
  hp: Number,
  alligment: String,
  heroes: [
    {
      cardnumber: String,
      class: String,
      name: String,
      id: String,
      imgurl: String
    }
  ],
  cards: [
    {
      class: String,
      cardnumber: String,
      subtype: String,
      name: String,
      id: String,
      imgurl: String,
      stamp: String
    }
  ],
  icon: String,
  bg: String,
  font: String
}, {collection: 'cards'});

module.exports = mongoose.model('Classe', schema);
