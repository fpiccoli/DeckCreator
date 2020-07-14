const http = require('./http.js');

module.exports = {
  listAll(game){
    return new Promise(resolve => {
      http.get('/classe/'+http.valida(game)+'/list').then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  },
  getClassCards(classe, game){
    classe = classe.replace(' ','_');
    return new Promise(resolve => {
      http.get('/classe/'+http.valida(game)+'/'+classe).then(retorno => {
        resolve(retorno.conteudo);
      });
    });
  },
  //DEPRECATED
  // getClasseByCard(carta){
  // }
}
