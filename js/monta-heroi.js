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
  heroiMenu(heroi, data, lista, main, sub){
    let deck = data.getClasseByCard(heroi, lista);
    let retorno = heroi;
    retorno.deck = deck;
    retorno.main = main;
    retorno.sub = sub;
    retorno.subtype = deck.subtype;
    retorno.deck.cards = [];
    retorno.icon = data.getClasseByName(deck.main, lista).icon;
    retorno.bg = data.getClasseByName(deck.sub, lista).bg;

    return retorno;
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
