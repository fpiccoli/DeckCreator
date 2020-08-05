const algoritmo = require('../../js/manager/string.js');

let lista = [];

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

describe("getNome() -> retorna uma string sem espaços ou acentos ->", function(){
  it ("[1] deve retornar a string alterada", function(){
    let string = `a e i o u á é í ó ú ã ê â ô`;
    let retorno = algoritmo.getNome(string);
    expect(retorno).toEqual(`a-e-i-o-u-a-e-i-o-u-a-e-a-o`);
  });
});
