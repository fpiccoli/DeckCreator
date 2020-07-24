describe("obj() -> conta quantos objetos com o mesmo cardnumber existem na lista ->", function(){
  let algoritmo = require('../../js/conta.js');

  it ("deve conter zero por ter lista vazia", function(){
    let lista = [];
    let objeto = {cardnumber: '123'};
    expect(algoritmo.obj(lista, objeto)).toEqual(0);
  });

  it ("deve conter zero por ter cardnumer diferente", function(){
    let lista = [{cardnumber: '123'}];
    let objeto = {cardnumber: '231'};
    expect(algoritmo.obj(lista, objeto)).toEqual(0);
  });

  it ("deve conter 1", function(){
    let lista = [{cardnumber: '123'},{cardnumber: '231'}];
    let objeto = {cardnumber: '123'};
    expect(algoritmo.obj(lista, objeto)).toEqual(1);
  });

  it ("deve conter 3", function(){
    let lista = [{cardnumber: '123'},{cardnumber: '123'},{cardnumber: '123'},{cardnumber: '555'}];
    let objeto = {cardnumber: '123'};
    expect(algoritmo.obj(lista, objeto)).toEqual(3);
  });
});

describe("mainClass() -> conta quantas cartas são usadas pelo MAIN (ATK/TEC/SKL/DOM) e da mesma classe do HERÓI ->", function(){
  let algoritmo = require('../../js/conta.js');

  it ("deve contar 3 em uma lista de 6 (M&D)", function(){
    let lista = [
      {class: "Warrior", subtype: 'ATK'},
      {class: "Amazon", subtype: 'ATK'},
      {class: "Warrior", subtype: 'TEC'},
      {class: "Warrior", subtype: 'SKL'},
      {class: "Warrior", subtype: 'GRD'},
      {class: "Warrior", subtype: 'EVD'}
    ];
    let heroi = {main: "Warrior", sub: "Amazon"};
    let game = "M&D";
    expect(algoritmo.mainClass(lista, heroi, game)).toEqual(3);
  });

  it ("deve contar 4 em uma lista de 7 (MRBC)", function(){
    let lista = [
      {class: "Mocchi", subtype: 'POW'},
      {class: "Tiger", subtype: 'POW'},
      {class: "Mocchi", subtype: 'INT'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'BLK'},
      {class: "Mocchi", subtype: 'DGE'}
    ];
    let heroi = {main: "Mocchi", sub: "Tiger"};
    let game = "MRBC";
    expect(algoritmo.mainClass(lista, heroi, game)).toEqual(4);
  });

  it ("deve contar 0 em uma lista de 7 (MRBC)", function(){
    let lista = [
      {class: "Mocchi", subtype: 'POW'},
      {class: "Tiger", subtype: 'POW'},
      {class: "Mocchi", subtype: 'INT'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'BLK'},
      {class: "Mocchi", subtype: 'DGE'}
    ];
    let heroi = {main: "Mocchi", sub: "Tiger"};
    let game = "M&D";
    expect(algoritmo.mainClass(lista, heroi, game)).toEqual(0);
  });
});

describe("subClass() -> conta quantas cartas são usadas pelo SUB (GRD/EVD) e da mesma classe do HERÓI ->", function(){
  let algoritmo = require('../../js/conta.js');

  it ("deve contar 1 em uma lista de 8 (M&D)", function(){
    let lista = [
      {class: "Warrior", subtype: 'ATK'},
      {class: "Amazon", subtype: 'ATK'},
      {class: "Warrior", subtype: 'TEC'},
      {class: "Amazon", subtype: 'SKL'},
      {class: "Warrior", subtype: 'GRD'},
      {class: "Warrior", subtype: 'EVD'},
      {class: "Amazon", subtype: 'GRD'},
      {class: "Amazon", subtype: 'EVD'}
    ];
    let heroi = {main: "Warrior", sub: "Amazon"};
    let game = "M&D";
    expect(algoritmo.subClass(lista, heroi, game)).toEqual(2);
  });

  it ("deve contar 1 em uma lista de 8 (MRBC)", function(){
    let lista = [
      {class: "Mocchi", subtype: 'POW'},
      {class: "Tiger", subtype: 'POW'},
      {class: "Mocchi", subtype: 'INT'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'BLK'},
      {class: "Mocchi", subtype: 'DGE'},
      {class: "Tiger", subtype: 'DGE'}
    ];
    let heroi = {main: "Mocchi", sub: "Tiger"};
    let game = "MRBC";
    expect(algoritmo.subClass(lista, heroi, game)).toEqual(1);
  });

  it ("deve contar 0 em uma lista de 8 (MRBC)", function(){
    let lista = [
      {class: "Mocchi", subtype: 'POW'},
      {class: "Tiger", subtype: 'POW'},
      {class: "Mocchi", subtype: 'INT'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'SPE'},
      {class: "Mocchi", subtype: 'BLK'},
      {class: "Mocchi", subtype: 'DGE'},
      {class: "Tiger", subtype: 'DGE'}
    ];
    let heroi = {main: "Mocchi", sub: "Tiger"};
    let game = "M&D";
    expect(algoritmo.subClass(lista, heroi, game)).toEqual(0);
  });
});

describe("class() -> conta quantas cartas são de determinada classe ->", function(){
  let algoritmo = require('../../js/conta.js');

  it ("deve contar 5 em uma lista de 8", function(){
    let lista = [
      {class: "Warrior"},{class: "Amazon"},{class: "Warrior"},
      {class: "Amazon"},{class: "Warrior"},{class: "Warrior"},
      {class: "Amazon"},{class: "Amazon"},{class: "Amazon"}
    ];
    let tipo = "Amazon";
    expect(algoritmo.class(lista, tipo)).toEqual(5);
  });

  it ("deve contar 4 em uma lista de 9", function(){
    let lista = [
      {class: "Mocchi"},{class: "Tiger"},{class: "Tiger"},
      {class: "Tiger"},{class: "Mocchi"},{class: "Mocchi"},
      {class: "Mocchi"},{class: "Mocchi"},{class: "Tiger"}
    ];
    let tipo = "Tiger";
    expect(algoritmo.class(lista, tipo)).toEqual(4);
  });

  it ("deve contar 0 em uma lista de 9", function(){
    let lista = [
      {class: "Mocchi"},{class: "Tiger"},{class: "Tiger"},
      {class: "Tiger"},{class: "Mocchi"},{class: "Mocchi"},
      {class: "Mocchi"},{class: "Mocchi"},{class: "Tiger"}
    ];
    let tipo = "Golem";
    expect(algoritmo.class(lista, tipo)).toEqual(0);
  });
});
