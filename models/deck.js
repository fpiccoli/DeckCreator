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
      name: String,
      id: String,
      imgurl: String
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
