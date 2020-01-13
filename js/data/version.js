require('../../config/mongo.js')('Versao');
const Versao = require('../../models/version.js');

module.exports = {
  listAll(){
    return Versao.find().lean().then(function(retorno){
      return retorno;
    },function(error){
      console.log(error);
    })
  }
}
