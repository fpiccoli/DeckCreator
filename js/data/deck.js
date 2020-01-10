require('../../config/mongo.js')('Deck');
var mongoose = require('mongoose');
const Deck = require('../../models/deck.js');
const DeckMRBC = require('../../models/deck-mrbc.js');

module.exports = {
  find(user, game){
    var deckModel = mongoose.model('Deck'+game);
    return deckModel.find({'user': user.toLowerCase()}).lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  },
  delete(nome, user, game){
    var deckModel = mongoose.model('Deck'+game);
    return deckModel.deleteOne({ name: nome, user: user }, function(err) {
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  update(deck, novoNome, nomeAntigo, game){
    deck.name = novoNome;
    var query = {'name': nomeAntigo};
    var deckModel = mongoose.model('Deck'+game);
    return deckModel.findOneAndUpdate(query, deck, {upsert: true, useFindAndModify: false}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  save(deck, game){
    var query = {'name': deck.name, user: deck.user};
    var deckModel = mongoose.model('Deck'+game);
    return deckModel.findOneAndUpdate(query, deck, {upsert: true, useFindAndModify: false}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  exists(deck, game){
    var deckModel = mongoose.model('Deck'+game);
    return deckModel.find({name: deck.name, user: deck.user.toLowerCase()}).lean().then(function(retorno){
      return retorno.length;
    },function(error){
      console.log(error);
    })
  }
}
