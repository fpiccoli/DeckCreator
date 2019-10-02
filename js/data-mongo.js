require('../config/mongo.js')('deckcreator');
var mongoose = require('mongoose');
const Classe = require('../models/classe.js');
const Deck = require('../models/deck.js');
const User = require('../models/user.js');
const Efeito = require('../models/efeito.js');

var classeModel = mongoose.model('Classe');
var deckModel = mongoose.model('Deck');
var userModel = mongoose.model('User');
var efeitoModel = mongoose.model('Efeito');

module.exports = {
  listAll(){
    return classeModel.find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    });
  },
  getClassCards(classe){
    return classeModel.find({name: {'$regex': classe}}).lean().then(function(retorno){
      let lista = []
      retorno.forEach(function (classe, index, array){
        lista = lista.concat(classe);
      });
      return lista;
    },function(error){
      console.log(error);
    });
  },
  getClasseByCard(carta){
    return classeModel.find({'cards.cardnumber': carta.cardnumber}).lean().then(function(retorno){
      return retorno[0];
    },function(error){
      console.log(error);
    });
  },
  save(deck){
    var query = {'name': deck.name, user: deck.user};
    return Deck.findOneAndUpdate(query, deck, {upsert: true, useFindAndModify: false}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  update(deck, novoNome, nomeAntigo){
    deck.name = novoNome;
    var query = {'name': nomeAntigo};
    return Deck.findOneAndUpdate(query, deck, {upsert: true, useFindAndModify: false}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  delete(nome){
    return deckModel.deleteOne({ 'name': nome }, function(err) {
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  validaDeckExistente(deck){
    return deckModel.find({name: deck.name, user: deck.user.toLowerCase()}).lean().then(function(retorno){
      return retorno.length;
    },function(error){
      console.log(error);
    })
  },
  getDecks(user){
    return deckModel.find({'user': user.toLowerCase()}).lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  },
  login(user, pass){
    return User.find({user: user.toLowerCase(), password: pass}).lean().then(function(retorno){
      return retorno[0] != undefined;
    },function(error){
      console.log(error);
    });
  },
  listEfeitos(){
    return efeitoModel.find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  }
}