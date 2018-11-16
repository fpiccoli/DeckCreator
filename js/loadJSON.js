const data = require('./data.js');

module.exports = {
  montaObj(deck){
    let cartas = [];
    let herois = [];
    deck.ContainedObjects.forEach(function (card, index, array){
      let cartaObj = data.getCardByName(card.Nickname);
      if(cartaObj){
        cartaObj.deck = data.getClasseByCard(cartaObj);
        cartaObj.deck.cards = [];
        cartaObj.deck.heroes = [];
        cartas.push(cartaObj);
      }
      else{
        let heroiObj = data.getHeroByName(card.Nickname);
        if(heroiObj){
          heroiObj.deck = data.getClasseByCard(heroiObj);
          heroiObj.main = heroiObj.deck.main;
          heroiObj.sub = heroiObj.deck.sub;
          heroiObj.type = heroiObj.deck.type;
          heroiObj.deck.cards = [];
          heroiObj.deck.heroes = [];
          herois.push(heroiObj);
        }
      }
    });
    return {herois, cartas};
  }
}
