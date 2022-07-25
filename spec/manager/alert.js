const algoritmo = require('../../js/manager/alert.js');

let ipcRenderer;
let retorno;

function mock() {
  return (param1, param2, param3, param4, param5) => {
    return new Promise(resolve => {
      resolve(retorno);
    });
  }
}

describe("message() -> altera a mensagem de alerta do sistema ->", function () {
  beforeEach(function () {
    jasmine.clock().install();
  });
  it("[1] deve alterar o innerHTML do campo e depois retona-lo para vazio", function () {

    let campo = { innerHTML: '' };
    let retorno = algoritmo.message(campo, 'message', 'color');

    expect(campo.innerHTML).toEqual('<div class="alert alert-color">message</div>');
    jasmine.clock().tick(10000)
    expect(campo.innerHTML).toEqual('');

  });
});

describe("confirmDialog() -> retorna um boolean se a resposta do dialog for positiva ->", function () {
  beforeEach(function () {
    retorno = true;
    ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
    ipcRenderer.invoke.and.callFake(mock(retorno));
  });

  it("[1] deve retornar verdadeiro", function () {
    algoritmo.confirmDialog('Unit Test', 'OK', 'Não', 'Deseja realizar este mock?', ipcRenderer)
      .then(function (retorno) {
        expect(retorno).toBeTruthy();
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
  });
});

describe("confirmDialog() -> retorna um boolean se a resposta do dialog for negativa ->", function () {
  beforeEach(function () {
    retorno = false;
    ipcRenderer = jasmine.createSpyObj('ipcRenderer', ['invoke']);
    ipcRenderer.invoke.and.callFake(mock(retorno));
  });

  it("[1] deve retornar falso", function () {
    algoritmo.confirmDialog('Unit Test', 'OK', 'Não', 'Deseja realizar este mock?', ipcRenderer)
      .then(function (retorno) {
        expect(retorno).toBeFalsy();
        expect(ipcRenderer.invoke).toHaveBeenCalledTimes(1);
      });
  });
});
