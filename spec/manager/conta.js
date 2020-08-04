const algoritmo = require('../../js/manager/conta.js');
const CartaBuilder = require('../builder/carta.js');
const ListaDeCartaBuilder = require('../builder/lista-cartas.js');

let listaMRBC = [];
let listaMD = [];

describe("obj() -> conta quantos objetos com o mesmo cardnumber existem na lista ->", function(){
  it ("deve conter zero por ter lista vazia", function(){
    let lista = [];
    let objeto = CartaBuilder().comCardNumber('123').constroi();
    expect(algoritmo.obj(lista, objeto)).toEqual(0);
  });

  it ("deve conter zero por ter cardnumer diferente", function(){
    let lista = [{cardnumber: '123'}];
    let objeto = CartaBuilder().comCardNumber('231').constroi();
    expect(algoritmo.obj(lista, objeto)).toEqual(0);
  });

  it ("deve conter 1", function(){
    let lista = [{cardnumber: '123'},{cardnumber: '231'}];
    let objeto = CartaBuilder().comCardNumber('123').constroi();
    expect(algoritmo.obj(lista, objeto)).toEqual(1);
  });

  it ("deve conter 3", function(){
    let lista = [{cardnumber: '123'},{cardnumber: '123'},{cardnumber: '123'},{cardnumber: '555'}];
    let objeto = CartaBuilder().comCardNumber('123').constroi();
    expect(algoritmo.obj(lista, objeto)).toEqual(3);
  });
});

describe("mainClass() -> conta quantas cartas são usadas pelo MAIN e da mesma classe do HERÓI ->", function(){

  describe("(M&D) ATK/TEC/SKL/DOM ->", function(){
    beforeEach(function(){
      listaMD = ListaDeCartaBuilder()
      .addItem(2, 'Warrior', 'ATK').addItem(2, 'Warrior', 'TEC').addItem(2, 'Warrior', 'EVD').addItem(2, 'Warrior', 'GRD')
      .addItem(2, 'Amazon', 'ATK').addItem(1, 'Amazon', 'TEC').addItem(1, 'Amazon', 'SKL').addItem(2, 'Amazon', 'EVD').addItem(2, 'Amazon', 'GRD')
      .preenche();
    });

    it ("deve contar 4 em uma lista de 16", function(){
      let heroi = {main: "Warrior", sub: "Amazon"};
      let game = "M&D";
      expect(algoritmo.mainClass(listaMD, heroi, game)).toEqual(4);
    });
    it ("deve contar 0 em uma lista de 16", function(){
      let heroi = {main: "Warrior", sub: "Amazon"};
      let game = "MRBC";
      expect(algoritmo.mainClass(listaMD, heroi, game)).toEqual(0);
    });
  });

  describe("(MRBC) POW/INT/SPE/ENV ->", function(){
    beforeEach(function(){
      listaMRBC = ListaDeCartaBuilder()
      .addItem(2, 'Mocchi', 'POW').addItem(4, 'Mocchi', 'SPE').addItem(2, 'Mocchi', 'BLK').addItem(2, 'Mocchi', 'DGE').addItem(2, 'Mocchi', 'INT')
      .addItem(2, 'Tiger', 'POW').addItem(2, 'Tiger', 'DGE')
      .preenche();
    });

    it ("deve contar 8 em uma lista de 16", function(){
      let heroi = {main: "Mocchi", sub: "Tiger"};
      let game = "MRBC";
      expect(algoritmo.mainClass(listaMRBC, heroi, game)).toEqual(8);
    });
    it ("deve contar 0 em uma lista de 16", function(){
      let heroi = {main: "Mocchi", sub: "Tiger"};
      let game = "M&D";
      expect(algoritmo.mainClass(listaMRBC, heroi, game)).toEqual(0);
    });
  });

});

describe("subClass() -> conta quantas cartas são usadas pelo SUB e da mesma classe do HERÓI ->", function(){

  describe("(M&D) EVD/GRD ->", function(){
    beforeEach(function(){
      listaMD = ListaDeCartaBuilder()
      .addItem(2, 'Warrior', 'ATK').addItem(2, 'Warrior', 'TEC').addItem(2, 'Warrior', 'EVD').addItem(2, 'Warrior', 'GRD')
      .addItem(2, 'Amazon', 'ATK').addItem(1, 'Amazon', 'TEC').addItem(1, 'Amazon', 'SKL').addItem(2, 'Amazon', 'EVD').addItem(2, 'Amazon', 'GRD')
      .preenche();
    });

    it ("deve contar 4 em uma lista de 16 (M&D)", function(){
      let heroi = {main: "Warrior", sub: "Amazon"};
      let game = "M&D";
      expect(algoritmo.subClass(listaMD, heroi, game)).toEqual(4);
    });
    it ("deve contar 0 em uma lista de 16 (M&D)", function(){
      let heroi = {main: "Warrior", sub: "Amazon"};
      let game = "MRBC";
      expect(algoritmo.subClass(listaMD, heroi, game)).toEqual(0);
    });
  });

  describe("(MRBC) DGE/BLK ->", function(){
    beforeEach(function(){
      listaMRBC = ListaDeCartaBuilder()
      .addItem(2, 'Mocchi', 'POW').addItem(4, 'Mocchi', 'SPE').addItem(2, 'Mocchi', 'BLK').addItem(2, 'Mocchi', 'DGE').addItem(2, 'Mocchi', 'INT')
      .addItem(2, 'Tiger', 'POW').addItem(2, 'Tiger', 'DGE')
      .preenche();
    });

    it ("deve contar 2 em uma lista de 16 (MRBC)", function(){
      let heroi = {main: "Mocchi", sub: "Tiger"};
      let game = "MRBC";
      expect(algoritmo.subClass(listaMRBC, heroi, game)).toEqual(2);
    });

    it ("deve contar 0 em uma lista de 16 (MRBC)", function(){
      let heroi = {main: "Mocchi", sub: "Tiger"};
      let game = "M&D";
      expect(algoritmo.subClass(listaMRBC, heroi, game)).toEqual(0);
    });
  });

});

describe("class() -> conta quantas cartas são de determinada classe ->", function(){

  describe("(M&D) ->", function(){
    beforeEach(function(){
      listaMD = ListaDeCartaBuilder()
      .addItem(2, 'Warrior', 'ATK').addItem(2, 'Warrior', 'TEC').addItem(2, 'Warrior', 'EVD').addItem(2, 'Warrior', 'GRD')
      .addItem(2, 'Amazon', 'ATK').addItem(1, 'Amazon', 'TEC').addItem(1, 'Amazon', 'SKL').addItem(2, 'Amazon', 'EVD').addItem(2, 'Amazon', 'GRD')
      .preenche();
    });

    it ("deve contar 8 em uma lista de 16", function(){
      let tipo = "Amazon";
      expect(algoritmo.class(listaMD, tipo)).toEqual(8);
    });
    it ("deve contar 0 em uma lista de 16", function(){
      let tipo = "Cleric";
      expect(algoritmo.class(listaMD, tipo)).toEqual(0);
    });
  });

  describe("(MRBC) ->", function(){
    beforeEach(function(){
      listaMRBC = ListaDeCartaBuilder()
      .addItem(2, 'Mocchi', 'POW').addItem(4, 'Mocchi', 'SPE').addItem(2, 'Mocchi', 'BLK').addItem(2, 'Mocchi', 'DGE').addItem(2, 'Mocchi', 'INT')
      .addItem(2, 'Tiger', 'POW').addItem(2, 'Tiger', 'DGE')
      .preenche();
    });

    it ("deve contar 4 em uma lista de 16", function(){
      let tipo = "Tiger";
      expect(algoritmo.class(listaMRBC, tipo)).toEqual(4);
    });
    it ("deve contar 0 em uma lista de 16", function(){
      let tipo = "Golem";
      expect(algoritmo.class(listaMRBC, tipo)).toEqual(0);
    });
  });

});
