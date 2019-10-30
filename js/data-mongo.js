require('../config/mongo.js')();
var mongoose = require('mongoose');
const Classe = require('../models/classe.js');
const ClasseMRBC = require('../models/classe-mrbc.js');
const Deck = require('../models/deck.js');
const DeckMRBC = require('../models/deck-mrbc.js');
const User = require('../models/user.js');
const Efeito = require('../models/efeito.js');

var userModel = mongoose.model('User');
var efeitoModel = mongoose.model('Efeito');

module.exports = {
  listAll(game){
    return mongoose.model('Classe'+game).find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    });
  },
  getClassCards(classe, game){
    return mongoose.model('Classe'+game).find({name: {'$regex': classe}}).lean().then(function(retorno){
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
  save(deck, game){
    var query = {'name': deck.name, user: deck.user};
    return mongoose.model('Deck'+game).findOneAndUpdate(query, deck, {upsert: true, useFindAndModify: false}, function(err, doc){
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
    return mongoose.model('Deck'+game).findOneAndUpdate(query, deck, {upsert: true, useFindAndModify: false}, function(err, doc){
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  delete(nome, user, game){
    return mongoose.model('Deck'+game).deleteOne({ name: nome, user: user }, function(err) {
      if (err) {
        console.log(err)
        return 0;
      } else {
        return 1;
      }
    });
  },
  validaDeckExistente(deck, game){
    return mongoose.model('Deck'+game).find({name: deck.name, user: deck.user.toLowerCase()}).lean().then(function(retorno){
      return retorno.length;
    },function(error){
      console.log(error);
    })
  },
  getDecks(user, game){
    return mongoose.model('Deck'+game).find({'user': user.toLowerCase()}).lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  },
  login(user, pass){
    return User.find({user: user.toLowerCase(), password: pass}).lean().then(function(retorno){
      return retorno[0];
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
