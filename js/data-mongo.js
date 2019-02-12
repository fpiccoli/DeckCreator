require('../config/mongo.js')('deckcreator');
var mongoose = require('mongoose');
const Classe = require('../models/classe.js');
const Deck = require('../models/deck.js');

var classeModel = mongoose.model('Classe');
var deckModel = mongoose.model('Deck');

module.exports = {
  listAll(){
    return classeModel.find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  },
  getClassCards(classe){
    return classeModel.find({name: {'$regex': classe}}).lean().then(function(retorno){
      let lista = [];
      retorno.forEach(function (classe, index, array){
        if(classe.cards){
          lista = lista.concat(classe.cards);
        }
      });
      return lista;
    },function(error){
      console.log(error);
    })
  },
  getClasseByCard(carta){
    return classeModel.find({"cards.cardnumber": carta.cardnumber}).lean().then(function(retorno){
      return retorno[0];
    },function(error){
      console.log(error);
    })
  },
  saveDeck(deck){
    // var object = new Deck(deck);
    // object.save(function (err) {
    //   if (err) return handleError(err);
    // });
    var query = {'name':deck.name};
    Deck.findOneAndUpdate(query, deck, {upsert:true, useFindAndModify: false}, function(err, doc){
      if (err) console.log(err);
    });
  },
  getDecks(user){
    return deckModel.find({user: user}).lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  },
  getCardByName(nome){
    return null;
  },
  getHeroByName(nome){
    return null;
  }
}
