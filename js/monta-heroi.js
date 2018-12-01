module.exports = {
  heroi(heroi, data){
    let deck = data.getClasseByCard(heroi);
    heroi.deck = deck;
    heroi.main = deck.main;
    heroi.sub = deck.sub;
    heroi.type = deck.type;
    heroi.deck.cards = [];
    heroi.deck.heroes = [];
    heroi.icon = data.getClasseByName(deck.main).icon;
    heroi.bg = data.getClasseByName(deck.sub).bg;

    return heroi;
  },
  carta(carta, data){
    let deck = data.getClasseByCard(carta);
    carta.deck = deck;
    carta.deck.cards = [];
    carta.deck.heroes = [];

    return carta;
  },
  magia(magia, data){
    let deck = data.getClasseByName(magia.name);
    magia.icon = deck.icon;
    magia.bg = deck.bg;

    return magia;
  }
}
