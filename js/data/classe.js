require('../../config/mongo.js')('Deck');
var mongoose = require('mongoose');
const Classe = require('../../models/classe.js');
const ClasseMRBC = require('../../models/classe-mrbc.js');

module.exports = {
  listAll(game){
    var classeModel = mongoose.model('Classe'+game);
    return classeModel.find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    });
  },
  getClassCards(classe, game){
    var classeModel = mongoose.model('Classe'+game);
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
    var classeModel = mongoose.model('Classe'+game);
    return classeModel.find({'cards.cardnumber': carta.cardnumber}).lean().then(function(retorno){
      return retorno[0];
    },function(error){
      console.log(error);
    });
  }
}
