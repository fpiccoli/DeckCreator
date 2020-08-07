const algoritmo = require('../../js/file/cache.js');

let path;
let os;
let fs;
let pastas;

describe("clear() -> limpa os arquivos de cache do TTS ->", function(){

  describe ("(windows) ->", function(){
    beforeEach(function(){
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      fs = jasmine.createSpyObj('os', ['readdirSync', 'unlinkSync']);
      fs.readdirSync.and.returnValue(['arquivo1.json', 'arquivo2.json', 'arquivo3.json', 'arquivo4.json']);

      path = jasmine.createSpyObj('path', ['valida']);
      path.valida.and.returnValue('C:/User/username/Documents');

      pastas = ['/Pasta1', '/Pasta2', '/Pasta3'];
    });

    it ("[1] deve retornar o diretorio padrao do windows + o caminho ", function(){
      let retorno = algoritmo.clear(os, fs, path);
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(fs.readdirSync).toHaveBeenCalledTimes(1);
      expect(fs.unlinkSync).toHaveBeenCalledTimes(4);
    });
  });

});
