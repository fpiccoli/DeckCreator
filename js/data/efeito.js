require('../../config/mongo.js')('Efeito');
const Efeito = require('../../models/efeito.js');

module.exports = {
  listAll(){
    return Efeito.find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  }
}
