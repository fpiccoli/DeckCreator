const algoritmo = require('../../js/manager/cookie.js');

let ipcRenderer;
let lista;

function mock(){
  return (param1, param2, param3) => {
    return new Promise(resolve => {
      resolve(lista);
    });
  }
}

describe("login() -> filtra os cookies para trazer aquele que for referente ao login ->", function(){

  describe("encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'},
        {domain: 'deckcreator.com', name: 'login', value:`{"user": "teste", "game": "M&D"}`}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar um objeto com name e game", function(){
      algoritmo.login(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeDefined();
        expect(retorno.name).toEqual('teste');
        expect(retorno.game).toEqual('M&D');
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("não encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar undefined", function(){
      algoritmo.login(ipcRenderer).then(function(retorno) {
        expect(retorno).not.toBeDefined();
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

});

describe("herois() -> filtra os cookies para trazer aquele que for referente aos herois ->", function(){

  describe("encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1', value:`{"class": "Alchemist"}`},
        {domain: 'deckcreator.com', name: 'heroi2', value:`{"class": "Warrior"}`},
        {domain: 'deckcreator.com', name: 'heroi3', value:`{"class": "Amazon"}`},
        {domain: 'deckcreator.com', name: 'login'}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma lista de herois", function(){
      algoritmo.herois(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeDefined();
        expect(retorno[0].class).toEqual('Alchemist');
        expect(retorno[0].panel).toEqual('1');
        expect(retorno[1].class).toEqual('Warrior');
        expect(retorno[1].panel).toEqual('2');
        expect(retorno[2].class).toEqual('Amazon');
        expect(retorno[2].panel).toEqual('3');
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("não encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'login'}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma lista vazia", function(){
      algoritmo.herois(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeDefined();
        expect(retorno).toEqual([]);
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

});

describe("grupo() -> filtra os cookies para trazer aquele que for referente ao grupo ->", function(){

  describe("encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'},
        {domain: 'deckcreator.com', name: 'grupo', value:`DecksGrupo`}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma string de grupo", function(){
      algoritmo.grupo(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeDefined();
        expect(retorno).toEqual('DecksGrupo');
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("não encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma string de grupo", function(){
      algoritmo.grupo(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeDefined();
        expect(retorno).toEqual('');
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

});

describe("public() -> filtra os cookies para trazer aquele que for referente ao grupo ->", function(){

  describe("encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'},
        {domain: 'deckcreator.com', name: 'public', value:`true`}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma boolean true", function(){
      algoritmo.public(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeTruthy();
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("não encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma boolean false", function(){
      algoritmo.public(ipcRenderer).then(function(retorno) {
        expect(retorno).not.toBeTruthy();
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

});

describe("cards() -> filtra os cookies para trazer aquele que for referente aos cards ->", function(){

  describe("encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'},
        {domain: 'deckcreator.com', name: 'cards', value:`[{"name": "Card1", "class": "Amazon"},{"name": "Card2", "class": "Barbarian"}]`}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma lista de cartas", function(){
      algoritmo.cards(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeDefined();
        expect(retorno[0].name).toEqual('Card1');
        expect(retorno[0].class).toEqual('Amazon');
        expect(retorno[1].name).toEqual('Card2');
        expect(retorno[1].class).toEqual('Barbarian');
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("não encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar undefined", function(){
      algoritmo.cards(ipcRenderer).then(function(retorno) {
        expect(retorno).not.toBeDefined();
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

});

describe("nome() -> filtra os cookies para trazer aquele que for referente ao nome do deck ->", function(){

  describe("encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'},
        {domain: 'deckcreator.com', name: 'nome', value:`NomeDoDeck`}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar uma lista de cartas", function(){
      algoritmo.nome(ipcRenderer).then(function(retorno) {
        expect(retorno).toBeDefined();
        expect(retorno).toEqual('NomeDoDeck');
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("não encontrou os cookies ->", function(){
    beforeEach(function(){
      lista = [
        {domain: 'deckcreator.com', name: 'heroi1'},
        {domain: 'deckcreator.com', name: 'heroi2'},
        {domain: 'deckcreator.com', name: 'heroi3'}
      ];
      ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
      ipcRenderer.invoke.and.callFake(mock());
    });

    it ("[1] deve retornar undefined", function(){
      algoritmo.nome(ipcRenderer).then(function(retorno) {
        expect(retorno).not.toBeDefined();
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
    });
  });

});
