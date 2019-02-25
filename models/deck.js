var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
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
  heroes: [
    {
      cardnumber: String,
      class: String,
      main: String,
      sub: String,
      name: String,
      id: String,
      imgurl: String,
      icon: String,
      bg: String
    }
  ],
  extra: [
    {
      cardnumber: String,
      class: String,
      name: String,
      id: String,
      imgurl: String
    }
  ],
  user: String
}, {collection: 'decks'});

module.exports = mongoose.model('Deck', schema);
