const algoritmo = require('../../js/manager/deck.js');

let gdrive = 'https://drive.google.com/uc?export=download&id=';
let backMD = '15d1rszwKVEFO9sALb2Mu00iXCD3ojxus';
let backMRBC = '1UKrGHayxga-bEIvMHSEDG4HRJJe6rL2c';
let object =  {
  name: 'NomeDoDeck',
  heroes: [
    {name: 'Heroi1', id: '10', deck: {id: '1', face:'heroi-face1'}},
    {name: 'Heroi2', id: '20', deck: {id: '2', face:'heroi-face2'}},
    {name: 'Heroi3', id: '30', deck: {id: '3', face:'heroi-face3'}},
    {name: 'Heroi5', id: '50', deck: {id: '5', face:'heroi-face5'}}
  ],
  cards: [
    {name: 'Carta1', id: '11', deck: {id: '1', face:'carta-face1'}},
    {name: 'Carta2', id: '22', deck: {id: '2', face:'carta-face2'}},
    {name: 'Carta3', id: '33', deck: {id: '3', face:'carta-face3'}},
    {name: 'Carta4', id: '44', deck: {id: '4', face:'carta-face4'}}
  ]
};

describe("build() -> monta o json para o TTS baseado em um deck ->", function(){

  describe("deve retornar um json montado para o TTS (M&D) ->", function(){
    it ("[1] valida o nome do deck e os ids dos decks", function(){
      let retorno = algoritmo.build(object, 'M&D');
      expect(retorno).toBeDefined();
      expect(retorno.ObjectStates[0].Nickname).toEqual('NomeDoDeck');
      expect(retorno.ObjectStates[0].DeckIDs.length).toEqual(8);
      expect(retorno.ObjectStates[0].DeckIDs).toEqual([111,222,333,444,110,220,330,550]);
    });

    it ("[2] valida as urls das cartas (face e back)", function(){
      let retorno = algoritmo.build(object, 'M&D');
      expect(retorno).toBeDefined();
      expect(retorno.ObjectStates[0].CustomDeck['1'].FaceURL).toEqual(gdrive + 'carta-face1');
      expect(retorno.ObjectStates[0].CustomDeck['1'].BackURL).toEqual(gdrive + backMD);
      expect(retorno.ObjectStates[0].CustomDeck['2'].FaceURL).toEqual(gdrive + 'carta-face2');
      expect(retorno.ObjectStates[0].CustomDeck['2'].BackURL).toEqual(gdrive + backMD);
      expect(retorno.ObjectStates[0].CustomDeck['3'].FaceURL).toEqual(gdrive + 'carta-face3');
      expect(retorno.ObjectStates[0].CustomDeck['3'].BackURL).toEqual(gdrive + backMD);
      expect(retorno.ObjectStates[0].CustomDeck['4'].FaceURL).toEqual(gdrive + 'carta-face4');
      expect(retorno.ObjectStates[0].CustomDeck['4'].BackURL).toEqual(gdrive + backMD);
      expect(retorno.ObjectStates[0].CustomDeck['4'].FaceURL).toEqual(gdrive + 'carta-face4');
      expect(retorno.ObjectStates[0].CustomDeck['4'].BackURL).toEqual(gdrive + backMD);
      expect(retorno.ObjectStates[0].CustomDeck['5'].FaceURL).toEqual(gdrive + 'heroi-face5');
      expect(retorno.ObjectStates[0].CustomDeck['5'].BackURL).toEqual(gdrive + backMD);
    });

    it ("[3] valida o nome de cada carta e heroi inserido no deck", function(){
      let retorno = algoritmo.build(object, 'M&D');
      expect(retorno).toBeDefined();
      expect(retorno.ObjectStates[0].ContainedObjects[0].Nickname).toEqual('Carta1');
      expect(retorno.ObjectStates[0].ContainedObjects[1].Nickname).toEqual('Carta2');
      expect(retorno.ObjectStates[0].ContainedObjects[2].Nickname).toEqual('Carta3');
      expect(retorno.ObjectStates[0].ContainedObjects[3].Nickname).toEqual('Carta4');
      expect(retorno.ObjectStates[0].ContainedObjects[4].Nickname).toEqual('Heroi1');
      expect(retorno.ObjectStates[0].ContainedObjects[5].Nickname).toEqual('Heroi2');
      expect(retorno.ObjectStates[0].ContainedObjects[6].Nickname).toEqual('Heroi3');
      expect(retorno.ObjectStates[0].ContainedObjects[7].Nickname).toEqual('Heroi5');
    });
  });

  describe("(MRBC) ->", function(){
    it ("[1] valida o nome do deck e os ids dos decks", function(){
      let retorno = algoritmo.build(object, 'MRBC');
      expect(retorno).toBeDefined();
      expect(retorno.ObjectStates[0].Nickname).toEqual('NomeDoDeck');
      expect(retorno.ObjectStates[0].DeckIDs.length).toEqual(8);
      expect(retorno.ObjectStates[0].DeckIDs).toEqual([111,222,333,444,110,220,330,550]);
    });

    it ("[2] valida as urls das cartas (face e back)", function(){
      let retorno = algoritmo.build(object, 'MRBC');
      expect(retorno).toBeDefined();
      expect(retorno.ObjectStates[0].CustomDeck['1'].FaceURL).toEqual(gdrive + 'carta-face1');
      expect(retorno.ObjectStates[0].CustomDeck['1'].BackURL).toEqual(gdrive + backMRBC);
      expect(retorno.ObjectStates[0].CustomDeck['2'].FaceURL).toEqual(gdrive + 'carta-face2');
      expect(retorno.ObjectStates[0].CustomDeck['2'].BackURL).toEqual(gdrive + backMRBC);
      expect(retorno.ObjectStates[0].CustomDeck['3'].FaceURL).toEqual(gdrive + 'carta-face3');
      expect(retorno.ObjectStates[0].CustomDeck['3'].BackURL).toEqual(gdrive + backMRBC);
      expect(retorno.ObjectStates[0].CustomDeck['4'].FaceURL).toEqual(gdrive + 'carta-face4');
      expect(retorno.ObjectStates[0].CustomDeck['4'].BackURL).toEqual(gdrive + backMRBC);
      expect(retorno.ObjectStates[0].CustomDeck['5'].FaceURL).toEqual(gdrive + 'heroi-face5');
      expect(retorno.ObjectStates[0].CustomDeck['5'].BackURL).toEqual(gdrive + backMRBC);
    });

    it ("[3] valida o nome de cada carta e heroi inserido no deck", function(){
      let retorno = algoritmo.build(object, 'MRBC');
      expect(retorno).toBeDefined();
      expect(retorno.ObjectStates[0].ContainedObjects[0].Nickname).toEqual('Carta1');
      expect(retorno.ObjectStates[0].ContainedObjects[1].Nickname).toEqual('Carta2');
      expect(retorno.ObjectStates[0].ContainedObjects[2].Nickname).toEqual('Carta3');
      expect(retorno.ObjectStates[0].ContainedObjects[3].Nickname).toEqual('Carta4');
      expect(retorno.ObjectStates[0].ContainedObjects[4].Nickname).toEqual('Heroi1');
      expect(retorno.ObjectStates[0].ContainedObjects[5].Nickname).toEqual('Heroi2');
      expect(retorno.ObjectStates[0].ContainedObjects[6].Nickname).toEqual('Heroi3');
      expect(retorno.ObjectStates[0].ContainedObjects[7].Nickname).toEqual('Heroi5');
    });
  });
});
