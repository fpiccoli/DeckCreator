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
    let getSub = data.getClasseByName(deck.sub, lista);
    if(getSub){
      retorno.bg = getSub.bg;
      retorno.font = getSub.font;
    }
    delete retorno.deck.cards;

    return retorno;
  }
}
