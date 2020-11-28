const algoritmo = require('../../js/manager/alert.js');

let remote;
let dialog;

describe("message() -> altera a mensagem de alerta do sistema ->", function(){
  beforeEach(function(){
    jasmine.clock().install();
  });
  it ("[1] deve alterar o innerHTML do campo e depois retona-lo para vazio", function(){

    let campo = {innerHTML: ''};
    let retorno = algoritmo.message(campo, 'message', 'color');

    expect(campo.innerHTML).toEqual('<div class="alert alert-color">message</div>');
    jasmine.clock().tick(10000)
    expect(campo.innerHTML).toEqual('');

  });
});

describe("confirmDialog() -> retorna um boolean se a resposta do dialog for positiva ->", function(){
  beforeEach(function(){
    function mock(){
      return function(param1, param2) {
        return 0;
      }
    }

    dialog = jasmine.createSpyObj('dialog', ['showMessageBox']);
    dialog.showMessageBox.and.callFake(mock());

    remote = jasmine.createSpyObj('remote', ['getCurrentWindow']);
    remote.getCurrentWindow.and.returnValue(1);
    remote.dialog = dialog;
  });

  it ("[1] deve retornar verdadeiro", function(){
    let retorno = algoritmo.confirmDialog('Unit Test', 'OK', 'Não', 'Deseja realizar este mock?', remote);
    expect(retorno).toBeTruthy();
    expect(remote.getCurrentWindow).toHaveBeenCalledTimes(1);
    expect(remote.dialog.showMessageBox).toHaveBeenCalledTimes(1);
  });
});
