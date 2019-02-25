const data = require('./data-mongo.js');

module.exports = {
  build(object){
    let json = {
      SaveName: '',
      GameMode: '',
      Gravity: 0.5,
      Date: '',
      Table: '',
      Sky: '',
      Note: '',
      Rules: '',
      XmlUI: '',
      LuaScript: '',
      ObjectStates: this.objectStates(object),
      LuaScriptState: '',
    }
    return json;
  },
  objectStates(object){
    let content = buildCards(object);

    let json = [];
    json.push({
      Name: 'Deck',
      Transform: {
        scaleX: 1.5,
        scaleY: 1.0,
        scaleZ: 1.5
      },
      Nickname: object.name,
      Description: "",
      ColorDiffuse: {
        r: 0.713235259,
        g: 0.713235259,
        b: 0.713235259
      },
      Locked: false,
      Grid: true,
      Snap: true,
      Autoraise: true,
      Sticky: true,
      Tooltip: true,
      GridProjection: false,
      Hands: false,
      SidewaysCard: false,
      DeckIDs: content.listaDeIds,
      CustomDeck: content.decks,
      XmlUI: '',
      LuaScript: '',
      LuaScriptState: '',
      ContainedObjects: content.cards
    });
    return json;
  }
}

function buildCards(object){
  let json;
  let retorno = '{';
  let decks = [];

  let content = {cards: [], listaDeIds: []};

  for(let i in object.cards){
    json = deckJSON(object.cards[i].deck);
    object.cards[i].deckJSON = JSON.parse("{"+json+"}");
    if(!verificaSeExiste(decks, object.cards[i].deck.id)){
      if(decks.length > 0){
        retorno += ',';
      }
      decks.push(object.cards[i].deck);
      retorno += json;
    }

    let valor = object.cards[i].deck.id + object.cards[i].id;
    content.listaDeIds.push(parseInt(valor));

    content.cards.push(cardJSON(object.cards[i]));
  }

  for(let i in object.heroes){
    json = deckJSON(object.heroes[i].deck);
    object.heroes[i].deckJSON = JSON.parse("{"+json+"}");
    if(!verificaSeExiste(decks, object.heroes[i].deck.id)){
      if(decks.length > 0){
        retorno += ',';
      }
      decks.push(object.heroes[i].deck);
      retorno += json;
    }

    let valor = object.heroes[i].deck.id + object.heroes[i].id;
    content.listaDeIds.push(parseInt(valor));

    content.cards.push(cardJSON(object.heroes[i]));
  }

  retorno += '}';
  content.decks = JSON.parse(retorno)
  return content;
}

function cardJSON(card){
  return {
    Name: 'Card',
    Transform: {
      scaleX: 1.5,
      scaleY: 1.0,
      scaleZ: 1.5
    },
    Nickname: card.name,
    Description: '',
    ColorDiffuse: {
      r: 0.713235259,
      g: 0.713235259,
      b: 0.713235259
    },
    Locked: false,
    Grid: true,
    Snap: true,
    Autoraise: true,
    Sticky: true,
    Tooltip: true,
    GridProjection: false,
    Hands: true,
    CardID: parseInt(card.deck.id + card.id),
    SidewaysCard: false,
    CustomDeck: card.deckJSON,
    XmlUI: '',
    LuaScript: '',
    LuaScriptState: ''
  }
}

function deckJSON(deck){
  return '"' + deck.id + '":{"FaceURL": "https://drive.google.com/uc?export=download&id=' + deck.face + '","BackURL": "https://drive.google.com/uc?export=download&id=15d1rszwKVEFO9sALb2Mu00iXCD3ojxus","NumWidth": 5,"NumHeight": 4,"BackIsHidden": false,"UniqueBack": false}';
}

function verificaSeExiste(decks, id){
  for(let i in decks){
    if (decks[i].id == id) {
      return true;
    }
  }
  return false;
}
