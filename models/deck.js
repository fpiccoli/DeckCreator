var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  cards: [
    {
      _id: false,
      class: String,
      cardnumber: String,
      subtype: String,
      name: String,
      id: String,
      imgurl: String,
      stamp: String,
      deck:{
        id: String,
        face: String
      }
    }
  ],
  heroes: [
    {
      _id: false,
      cardnumber: String,
      class: String,
      main: String,
      sub: String,
      name: String,
      id: String,
      alligment: String,
      imgurl: String,
      icon: String,
      bg: String,
      deck:{
        id: String,
        face: String
      }
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
