const algoritmo = require('../../js/file/deck.js');

let path;
let os;
let jsonfile;
let image;

function mock() {
  return (param1, param2, param3) => {
    return new Promise(resolve => {
      resolve(true);
    });
  }
}

describe("saveLocal() -> salva o arquivo json do deck na maquina local ->", function () {

  describe("sem erros ->", function () {
    beforeEach(function () {
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      jsonfile = jasmine.createSpyObj('jsonfile', ['writeFile']);
      jsonfile.writeFile.and.callFake(mock());

      image = jasmine.createSpyObj('image', ['save']);
      image.save.and.returnValue(true);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');
    });

    it("[1] deve salvar o deck dentro da pasta de seu grupo", function () {
      let deck = { name: 'NomeDoDeck', grupo: 'GrupoTeste' };

      algoritmo.saveLocal(deck, 'json', 'game', os, jsonfile, image, path)
        .then(function (retorno) {
          expect(retorno).toBeTruthy();
          expect(os.platform).toHaveBeenCalledTimes(1);
          expect(jsonfile.writeFile).toHaveBeenCalledTimes(1);
          expect(image.save).toHaveBeenCalledTimes(1);
          expect(path.valida).toHaveBeenCalledTimes(1);
        });
    });

    it("[2] deve salvar o deck dentro da pasta default sem grupo (Other Decks)", function () {
      let herois = [{ imgurl: 'imagem-heroi1' }, { imgurl: 'imagem-heroi2' }, { imgurl: 'imagem-heroi3' }];
      let deck = { name: 'NomeDoDeck', heroes: herois };

      algoritmo.saveLocal(deck, 'json', 'game', os, jsonfile, image, path)
        .then(function (retorno) {
          expect(retorno).toBeTruthy();
          expect(os.platform).toHaveBeenCalledTimes(1);
          expect(jsonfile.writeFile).toHaveBeenCalledTimes(1);
          expect(image.save).toHaveBeenCalledTimes(1);
          expect(path.valida).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("lança um erro ->", function () {
    beforeEach(function () {
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      jsonfile = jasmine.createSpyObj('jsonfile', ['writeFile']);
      jsonfile.writeFile.and.returnValue(Promise.reject(new Error('Teste Error')));

      image = jasmine.createSpyObj('image', ['save']);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');

      spyOn(console, 'error');
    });

    it("[1] deve lançar um erro ao retornar a Promise", async function () {
      let herois = [{ imgurl: 'imagem-heroi1' }, { imgurl: 'imagem-heroi2' }, { imgurl: 'imagem-heroi3' }];
      let deck = { name: 'NomeDoDeck', grupo: 'GrupoTeste', heroes: herois };
      let json = { name: 'QualquerCoisa' };
      let game = 'M&D';

      let retorno = algoritmo.saveLocal(deck, json, game, os, jsonfile, image, path);
      await expectAsync(retorno).toBeRejected();
      await expectAsync(retorno).toBeRejectedWithError('Teste Error');
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(jsonfile.writeFile).toHaveBeenCalledTimes(1);
      expect(image.save).toHaveBeenCalledTimes(0);
      expect(path.valida).toHaveBeenCalledTimes(1);
    });
  });

});

describe("changeName() -> salva o arquivo json do deck na maquina local ->", function () {

  describe("sem erros ->", function () {
    beforeEach(function () {
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      fs = jasmine.createSpyObj('fs', ['existsSync', 'unlinkSync']);
      fs.existsSync.and.returnValue(1);

      jsonfile = jasmine.createSpyObj('jsonfile', ['writeFile']);
      jsonfile.writeFile.and.callFake(mock());

      image = jasmine.createSpyObj('image', ['save']);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');
    });

    it("[1] deve salvar o deck dentro da pasta de seu grupo", function () {
      let herois = [{ imgurl: 'imagem-heroi1' }, { imgurl: 'imagem-heroi2' }, { imgurl: 'imagem-heroi3' }];
      let deck = { name: 'NomeDoDeck', grupo: 'GrupoTeste', heroes: herois };
      let json = { Nickname: 'JsonNickname' }

      algoritmo.changeName('NovoNome', 'NomeAntigo', json, 'M&D', deck, os, fs, jsonfile, image, path)
        .then(function (retorno) {
          expect(retorno).toBeTruthy();
          expect(os.platform).toHaveBeenCalledTimes(1);
          expect(jsonfile.writeFile).toHaveBeenCalledTimes(1);
          expect(image.save).toHaveBeenCalledTimes(1);
          expect(path.valida).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("lança um erro ->", function () {
    beforeEach(function () {
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      fs = jasmine.createSpyObj('fs', ['existsSync', 'unlinkSync']);
      fs.existsSync.and.returnValue(1);

      jsonfile = jasmine.createSpyObj('jsonfile', ['writeFile']);
      jsonfile.writeFile.and.returnValue(Promise.reject(new Error('Teste Error')));

      image = jasmine.createSpyObj('image', ['save']);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');
    });

    it("[1] deve salvar o deck dentro da pasta de seu grupo", async function () {
      let herois = [{ imgurl: 'imagem-heroi1' }, { imgurl: 'imagem-heroi2' }, { imgurl: 'imagem-heroi3' }];
      let deck = { name: 'NomeDoDeck', grupo: 'GrupoTeste', heroes: herois };
      let json = { Nickname: 'JsonNickname' }

      let retorno = algoritmo.changeName('NovoNome', 'NomeAntigo', json, 'M&D', deck, os, fs, jsonfile, image, path)
      await expectAsync(retorno).toBeRejected();
      await expectAsync(retorno).toBeRejectedWithError('Teste Error');
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(jsonfile.writeFile).toHaveBeenCalledTimes(1);
      expect(image.save).toHaveBeenCalledTimes(0);
      expect(path.valida).toHaveBeenCalledTimes(1);
    });
  });

});

describe("removeLocal() -> deleta o arquivo json do deck na maquina local ->", function () {

  describe("encontra o arquivo ->", function () {
    beforeEach(function () {
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      fs = jasmine.createSpyObj('fs', ['existsSync', 'unlinkSync']);
      fs.existsSync.and.returnValue(true);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');
    });

    it("[1] deve salvar o deck dentro da pasta de seu grupo", function () {
      let deck = { name: 'NomeDoDeck', grupo: 'GrupoTeste' };

      algoritmo.removeLocal(deck, 'game', os, fs, path)
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(2);
      expect(fs.unlinkSync).toHaveBeenCalledTimes(2);
      expect(path.valida).toHaveBeenCalledTimes(1);
    });
  });

  describe("nao encontra o arquivo ->", function () {
    beforeEach(function () {
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      fs = jasmine.createSpyObj('fs', ['existsSync', 'unlinkSync']);
      fs.existsSync.and.returnValue(false);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');
    });

    it("[1] deve salvar o deck dentro da pasta de seu grupo", function () {
      let deck = { name: 'NomeDoDeck', grupo: 'GrupoTeste' };

      algoritmo.removeLocal(deck, 'game', os, fs, path)
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(2);
      expect(fs.unlinkSync).toHaveBeenCalledTimes(0);
      expect(path.valida).toHaveBeenCalledTimes(1);
    });
  });

});

describe("clearLocal() -> deleta todos os arquivos json de deck da maquina local ->", function () {

  describe("remove os arquivos ->", function () {
    beforeEach(function () {
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      fsExtra = jasmine.createSpyObj('fsExtra', ['emptyDirSync']);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');
    });

    it("[1] deve excluir todos os arquivos json e png da pasta", function () {
      algoritmo.clearLocal('game', os, fsExtra, path)
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(fsExtra.emptyDirSync).toHaveBeenCalledTimes(1);
      expect(path.valida).toHaveBeenCalledTimes(1);
    });
  });

});
