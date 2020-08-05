const algoritmo = require('../../js/manager/array.js');
const ListaDeDeckBuilder = require('../builder/lista-decks.js');
const CartaBuilder = require('../builder/carta.js');

let lista = [];

describe("listByType() -> filtra uma lista de decks retornando todas as classes de determinado subtipo ->", function(){
  beforeEach(function(){
    lista = ListaDeDeckBuilder()
    .addPure(1, 'Warrior').addPure(1, 'Cleric').addPure(1, 'Amazon').addHybrid(1, 'Viking', 'Berserker', 'Cleric')
    .addPure(1, 'Vampire').addPure(1, 'Bard').addPure(1, 'Beast').addHybrid(1, 'Eldritch Knight', 'Knight', 'Sorcerer')
    .addPure(1, 'Jester').addPure(1, 'Barbarian').addPure(1, 'Necromancer').addHybrid(1, 'Hun', 'Barbarian', 'Monk')
    .preenche();
  });

  it ("[1] deve retornar uma lista vazia por ter não conter itens", function(){
    let retorno = algoritmo.listByType('Pure', []);
    expect(retorno).toEqual([]);
    expect(retorno.length).toEqual(0);
  });

  it ("[2] deve retornar uma lista vazia pelo tipo estar escrito errado", function(){
    let retorno = algoritmo.listByType('pure', lista)
    expect(retorno).toEqual([]);
    expect(retorno.length).toEqual(0);
  });

  it ("[3] deve retornar uma lista com 9 puros", function(){
    let retorno = algoritmo.listByType('Pure', lista)
    expect(retorno.length).toEqual(9);
  });

  it ("[4] deve retornar uma lista com 3 hibridos", function(){
    let retorno = algoritmo.listByType('Hybrid', lista)
    expect(retorno.length).toEqual(3);
  });
});

describe("getHybrid() -> filtra uma lista de decks retornando os hibridos que tenham uma determinada classe como main ou sub ->", function(){
  beforeEach(function(){
    lista = ListaDeDeckBuilder()
    .addPure(1, 'Warrior').addPure(1, 'Cleric').addPure(1, 'Amazon').addHybrid(1, 'Viking', 'Berserker', 'Cleric')
    .addPure(1, 'Vampire').addPure(1, 'Bard').addPure(1, 'Beast').addHybrid(1, 'Eldritch Knight', 'Knight', 'Sorcerer')
    .addPure(1, 'Jester').addPure(1, 'Barbarian').addPure(1, 'Necromancer').addHybrid(1, 'Hun', 'Barbarian', 'Monk')
    .addHybrid(1, 'Gipsy', 'Bard', 'Cleric').addHybrid(1, 'Efreet', 'Cleric', 'Demon')
    .preenche();
  });

  it ("[1] deve retornar uma lista vazia por ter não conter itens", function(){
    let retorno = algoritmo.getHybrid('Cleric', []);
    expect(retorno).toEqual([]);
    expect(retorno.length).toEqual(0);
  });

  it ("[2] deve retornar uma lista vazia pelo nome da classe estar escrito errado", function(){
    let retorno = algoritmo.getHybrid('cleric', lista);
    expect(retorno).toEqual([]);
    expect(retorno.length).toEqual(0);
  });

  it ("[3] deve retornar uma lista com 3 hibridos", function(){
    let retorno = algoritmo.getHybrid('Cleric', lista);
    expect(retorno.length).toEqual(3);
  });
});

describe("getClasseByCard() -> filtra uma lista de decks retornando a mesma classe contida na carta ->", function(){
  beforeEach(function(){
    lista = ListaDeDeckBuilder()
    .addPure(1, 'Warrior').addPure(1, 'Cleric').addPure(1, 'Amazon').addHybrid(1, 'Viking', 'Berserker', 'Cleric')
    .addPure(1, 'Vampire').addPure(1, 'Bard').addPure(1, 'Beast').addHybrid(1, 'Eldritch Knight', 'Knight', 'Sorcerer')
    .addPure(1, 'Jester').addPure(1, 'Barbarian').addPure(1, 'Necromancer').addHybrid(1, 'Hun', 'Barbarian', 'Monk')
    .preenche();
  });

  it ("[1] deve retornar undefined por ter não conter itens", function(){
    let retorno = algoritmo.getClasseByCard('Barbarian', []);
    expect(retorno).not.toBeDefined();
  });

  it ("[2] deve retornar undefined pelo nome da classe estar escrito errado", function(){
    let carta = CartaBuilder().comClass('barbarian').constroi();
    let retorno = algoritmo.getClasseByCard(carta, lista);
    expect(retorno).not.toBeDefined();
  });

  it ("[3] deve retornar a classe igual da carta", function(){
    let carta = CartaBuilder().comClass('Barbarian').constroi();
    let retorno = algoritmo.getClasseByCard(carta, lista);

    expect(retorno.name).toEqual('Barbarian');
    expect(retorno.subtype).toEqual('Pure');
    expect(retorno.main).toEqual('Barbarian');
    expect(retorno.sub).toEqual('Barbarian');
  });
});

describe("getClasseByName() -> filtra uma lista de decks retornando a classe consultada pelo nome ->", function(){
  beforeEach(function(){
    lista = ListaDeDeckBuilder()
    .addPure(1, 'Warrior').addPure(1, 'Cleric').addPure(1, 'Amazon').addHybrid(1, 'Viking', 'Berserker', 'Cleric')
    .addPure(1, 'Vampire').addPure(1, 'Bard').addPure(1, 'Beast').addHybrid(1, 'Eldritch Knight', 'Knight', 'Sorcerer')
    .addPure(1, 'Jester').addPure(1, 'Barbarian').addPure(1, 'Necromancer').addHybrid(1, 'Hun', 'Barbarian', 'Monk')
    .preenche();
  });

  it ("[1] deve retornar undefined por ter não conter itens", function(){
    let retorno = algoritmo.getClasseByName('Barbarian', []);
    expect(retorno).not.toBeDefined();
  });

  it ("[2] deve retornar undefined pelo nome da classe estar escrito errado", function(){
    let retorno = algoritmo.getClasseByName('barbarian', lista);
    expect(retorno).not.toBeDefined();
  });

  it ("[3] deve retornar a classe igual da carta", function(){
    let retorno = algoritmo.getClasseByName('Barbarian', lista);

    expect(retorno.name).toEqual('Barbarian');
    expect(retorno.subtype).toEqual('Pure');
    expect(retorno.main).toEqual('Barbarian');
    expect(retorno.sub).toEqual('Barbarian');
  });
});

describe("replaceAll() -> substitui todas as iteraçoes de uma string em outra string ->", function(){
  it ("[1] deve retornar a propria string por nao encontrar nada", function(){
    let string = `<div dataToggle="colapse"></div>`;
    let retorno = algoritmo.replaceAll(string, 'DataToggle', 'data-toggle');
    expect(retorno).toEqual(`<div dataToggle="colapse"></div>`);
  });

  it ("[2] deve retornar a string alterada", function(){
    let string = `<div dataToggle="colapse"></div>`;
    let retorno = algoritmo.replaceAll(string, 'dataToggle', 'data-toggle');
    expect(retorno).toEqual(`<div data-toggle="colapse"></div>`);
  });
});

describe("replaceSpecialChar() -> substitui os caracteres especiais por underline ->", function(){
  it ("[1] deve retornar a propria string por nao encontrar nada", function(){
    let string = `NomeDeUmDeck`;
    let retorno = algoritmo.replaceSpecialChar(string);
    expect(retorno).toEqual(`NomeDeUmDeck`);
  });

  it ("[2] deve retornar a string alterada", function(){
    let string = `Nome de*Um%Deck&Outro$Nome#Maior@Que_Esse`;
    let retorno = algoritmo.replaceSpecialChar(string);
    expect(retorno).toEqual(`Nome_de_Um_Deck_Outro_Nome_Maior_Que_Esse`);
  });
});

describe("dynamicSort() -> ordena um array de objetos baseado em uma determinada propriedade do objeto ->", function(){
  beforeEach(function(){
    lista = ListaDeDeckBuilder()
    .addPure(1, 'Warrior').addPure(1, 'Cleric').addPure(1, 'Amazon').addHybrid(1, 'Viking', 'Berserker', 'Cleric')
    .addPure(1, 'Vampire').addPure(1, 'Bard').addPure(1, 'Beast').addHybrid(1, 'Eldritch Knight', 'Knight', 'Sorcerer')
    .addPure(1, 'Jester').addPure(1, 'Barbarian').addPure(1, 'Necromancer').addHybrid(1, 'Hun', 'Barbarian', 'Monk')
    .preenche();
  });

  it ("[1] deve retornar a lista ordenada por nome de classe de maneira crescente", function(){
    let retorno = lista.sort(algoritmo.dynamicSort('name'));
    expect(retorno[0].name).toEqual('Amazon');
    expect(retorno[5].name).toEqual('Eldritch Knight');
    expect(retorno[11].name).toEqual('Warrior');
  });

  it ("[2] deve retornar a lista ordenada por nome de classe de maneira decrescente", function(){
    let retorno = lista.sort(algoritmo.dynamicSort('-name'));
    expect(retorno[11].name).toEqual('Amazon');
    expect(retorno[6].name).toEqual('Eldritch Knight');
    expect(retorno[0].name).toEqual('Warrior');
  });
});
