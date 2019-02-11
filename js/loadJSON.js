const data = require('./data-mongo.js');
const monta = require('./monta-heroi.js');

module.exports = {
  montaObj(deck){
    let cartas = [];
    let herois = [];
    deck.ContainedObjects.forEach(function (card, index, array){
      let cartaObj = data.getCardByName(card.Nickname);
      if(cartaObj){
        let retorno = monta.carta(cartaObj, data);
        cartas.push(retorno);
      }
      else{
        let heroiObj = data.getHeroByName(card.Nickname);
        if(heroiObj){
          let retorno = monta.heroi(heroiObj, data);
          herois.push(retorno);
        }
      }
    });
    return {herois, cartas};
  }
}
