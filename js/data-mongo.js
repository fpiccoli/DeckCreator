require('../config/mongo.js')('deckcreator');
var mongoose = require('mongoose');
const Classe = require('../models/classe.js');
const Deck = require('../models/deck.js');

var model = mongoose.model('Classe');

module.exports = {
  listAll(){
    return model.find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  },
  getClassCards(classe){
    return model.find({name: {'$regex': classe}}).lean().then(function(retorno){
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
    return model.find({name: carta.class}).lean().then(function(retorno){
      return retorno[0];
    },function(error){
      console.log(error);
    })
  },
  save(deck){
    var object = new Deck(deck);
    console.log(deck);
    console.log(object);
    object.save(function (err) {
        if (err) return handleError(err);
        console.log('Salvo com sucesso!');
    });
  },
  getCardByName(nome){
    return null;
  },
  getHeroByName(nome){
    return null;
  }
}
