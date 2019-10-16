module.exports = {
  heroi(heroi, data, lista, main, sub){
    let deck = data.getClasseByCard(heroi, lista);
    let retorno = heroi;
    retorno.deck = deck;
    retorno.main = main;
    retorno.sub = sub;
    retorno.subtype = deck.subtype;
    retorno.alligment = deck.alligment;
    retorno.icon = data.getClasseByName(deck.main, lista).icon;
    retorno.bg = data.getClasseByName(deck.sub, lista).bg;
    retorno.font = data.getClasseByName(deck.sub, lista).font;

    delete retorno.deck.cards;

    return retorno;
  }
}
