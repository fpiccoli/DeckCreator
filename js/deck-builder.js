
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

    let listaDeIds = [];
    for(let i in object.cards){
      let valor = object.cards[i].deck.id + object.cards[i].id;
      listaDeIds.push(parseInt(valor));
    }

    let json = [];
    json.push({
      Name: 'Deck',
      Transform: {
        // posX: 0.24660559,
        // posY: 1.2083478,
        // posZ: -0.013766719,
        // rotX: 1.6045432E-07,
        // rotY: 180.0004,
        // rotZ: -2.52562074E-07,
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
      DeckIDs: listaDeIds,
      CustomDeck: this.decks(object.cards),
      XmlUI: '',
      LuaScript: '',
      LuaScriptState: '',
      ContainedObjects: this.cards(object.cards)
      // ,
      // GUID: '92eb27'
    });
    return json;
  },
  decks(cards){
    let decks = [];
    for(let i in cards){
      if(!verificaSeExiste(decks, cards[i].deck.id)){
        decks.push(cards[i].deck);
      }
    }

    let json = '{';
    for(let i in decks){
      if(i > 0){
        json += ','
      }
      json += '"' + decks[i].id + '":{"FaceURL": "http://gdurl.com/' + decks[i].face + '","BackURL": "http://gdurl.com/FXdw","NumWidth": 5,"NumHeight": 4,"BackIsHidden": false,"UniqueBack": false}'
    }
    json += '}';
    return JSON.parse(json);
  },
  cards(cards){
    let json = [];
    for(let i in cards){
      json.push({
        Name: 'Card',
        Transform: {
          posX: -73.01444,
          posY: 1.08727837,
          posZ: 25.63611,
          rotX: 359.992157,
          rotY: 179.903046,
          rotZ: 359.9631,
          scaleX: 1.5,
          scaleY: 1.0,
          scaleZ: 1.5
        },
        Nickname: cards[i].name,
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
        CardID: cards[i].id,
        SidewaysCard: false,
        CustomDeck: {},
        XmlUI: '',
        LuaScript: '',
        LuaScriptState: ''//,
        // GUID: cards[i].guid
      });
    }
    return json;
  }
}

function verificaSeExiste(decks, id){
  for(let i in decks){
    if (decks[i].id == id) {
      return true;
    }
  }
  return false;
}
