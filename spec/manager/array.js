const algoritmo = require('../../js/manager/array.js');
const ListaDeDeckBuilder = require('../builder/lista-decks.js');
const ListaDeCartaBuilder = require('../builder/lista-cartas.js');
const CartaBuilder = require('../builder/carta.js');
const Moment = require('moment');

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

describe("dateSort() -> ordena um array de objetos baseado no campo data ->", function(){
  beforeEach(function(){
    lista = [
      {name: 'Outubro-2020', data: '01/10/2020'},{name: 'Maio-2020', data: '01/05/2020'},
      {name: 'Janeiro-2021', data: '01/01/2021'},{name: 'Janeiro-2019', data: '01/01/2019'},
      {name: 'Março-2020', data: '01/03/2020'},{name: 'Agosto-2020', data: '01/08/2020'},
      {name: 'Fevereiro-2020', data: '01/02/2020'},{name: 'Janeiro-2020', data: '01/01/2020'},
    ]
  });

  it ("[1] deve retornar a lista ordenada por data em ordem crescente", function(){
    let retorno = algoritmo.dateSort(lista, 1);
    expect(retorno[0].name).toEqual('Janeiro-2019');
    expect(retorno[3].name).toEqual('Março-2020');
    expect(retorno[7].name).toEqual('Janeiro-2021');
  });

  it ("[2] deve retornar a lista ordenada por data em ordem decrescente", function(){
    let retorno = algoritmo.dateSort(lista, 0);
    expect(retorno[7].name).toEqual('Janeiro-2019');
    expect(retorno[4].name).toEqual('Março-2020');
    expect(retorno[0].name).toEqual('Janeiro-2021');
  });
});

describe("filtra um array de cartas baseado no campo subtype ->", function(){

  describe("(M&D) ATK/TEC/SKL/DOM -", function(){
    beforeEach(function(){
      lista = ListaDeCartaBuilder()
      .addItem(2, 'Warrior', 'ATK').addItem(2, 'Warrior', 'TEC').addItem(2, 'Warrior', 'EVD').addItem(2, 'Warrior', 'ATK')
      .addItem(2, 'Warrior', 'ATK').addItem(1, 'Warrior', 'TEC').addItem(1, 'Warrior', 'SKL').addItem(2, 'Warrior', 'ATK')
      .addItem(2, 'Warrior', 'GRD').addItem(2, 'Warrior', 'GRD').addItem(2, 'Warrior', 'SKL').addItem(2, 'Warrior', 'EVD')
      .preenche();
    });

    it ("[1] filtraMain() deve retornar um array vazio por ter game incorreto", function(){
      let retorno = algoritmo.filtraMain(lista, 'MRBC');
      expect(retorno.length).toEqual(0);
    });

    it ("[2] filtraSub() deve retornar um array vazio por ter game incorreto", function(){
      let retorno = algoritmo.filtraSub(lista, 'MRBC');
      expect(retorno.length).toEqual(0);
    });

    it ("[3] filtraMain() deve retornar 8 em uma lista de 22", function(){
      let retorno = algoritmo.filtraMain(lista, 'M&D');
      expect(retorno.length).toEqual(14);
    });

    it ("[4] filtraSub() -> deve retornar 4 em uma lista de 22", function(){
      let retorno = algoritmo.filtraSub(lista, 'M&D');
      expect(retorno.length).toEqual(8);
    });
  });

  describe("(MRBC) POW/INT/SPE/ENV ->", function(){
    beforeEach(function(){
      lista = ListaDeCartaBuilder()
      .addItem(2, 'Mocchi', 'POW').addItem(4, 'Mocchi', 'SPE').addItem(2, 'Mocchi', 'BLK').addItem(2, 'Mocchi', 'POW')
      .addItem(2, 'Mocchi', 'INT').addItem(2, 'Mocchi', 'POW').addItem(2, 'Mocchi', 'DGE').addItem(2, 'Mocchi', 'INT')
      .addItem(2, 'Mocchi', 'INT').addItem(2, 'Mocchi', 'POW').addItem(2, 'Mocchi', 'SPE').addItem(2, 'Mocchi', 'DGE')
      .preenche();
    });

    it ("[1] filtraMain() deve retornar um array vazio por ter game incorreto", function(){
      let retorno = algoritmo.filtraMain(lista, 'M&D');
      expect(retorno.length).toEqual(0);
    });

    it ("[2] filtraSub() deve retornar um array vazio por ter game incorreto", function(){
      let retorno = algoritmo.filtraSub(lista, 'M&D');
      expect(retorno.length).toEqual(0);
    });

    it ("[3] filtraMain() deve retornar 9 em uma lista de 26", function(){
      let retorno = algoritmo.filtraMain(lista, 'MRBC');
      expect(retorno.length).toEqual(20);
    });

    it ("[4] filtraSub() -> deve retornar 3 em uma lista de 26", function(){
      let retorno = algoritmo.filtraSub(lista, 'MRBC');
      expect(retorno.length).toEqual(6);
    });
  });
});
