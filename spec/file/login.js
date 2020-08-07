const algoritmo = require('../../js/file/login.js');

let path;
let os;
let fs;
let json;
let jsonfile;

describe("save() -> salva um arquivo json local com as informaçoes de login ->", function(){
  beforeEach(function(){
    os = jasmine.createSpyObj('os', ['platform']);
    os.platform.and.returnValue('win32');

    path = jasmine.createSpyObj('path', ['valida']);

    jsonfile = jasmine.createSpyObj('jsonfile', ['writeFile']);

    json = {user: 'usuario', password: 'senha'};
  });

  it ("[1] deve salvar o arquivo e retornar 1", function(){
    let retorno = algoritmo.save(json, os, jsonfile, path);
    expect(retorno).toEqual(1);
    expect(os.platform).toHaveBeenCalledTimes(1);
    expect(jsonfile.writeFile).toHaveBeenCalledTimes(1);
    expect(path.valida).toHaveBeenCalledTimes(1);
  });
});

describe("remove() -> deleta o arquivo json local com as informaçoes de login ->", function(){

  describe("encontra o arquivo ->", function(){
    beforeEach(function(){
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      path = jasmine.createSpyObj('path', ['valida']);

      fs = jasmine.createSpyObj('fs', ['existsSync', 'unlinkSync']);
      fs.existsSync.and.returnValue(true);
    });

    it ("[1] deve salvar o arquivo e retornar 1", function(){
      let retorno = algoritmo.remove(os, fs, path);
      expect(retorno).toEqual(1);
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(path.valida).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(fs.unlinkSync).toHaveBeenCalledTimes(1);
    });
  });

  describe("nao encontra o arquivo ->", function(){
    beforeEach(function(){
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      path = jasmine.createSpyObj('path', ['valida']);

      fs = jasmine.createSpyObj('fs', ['existsSync', 'unlinkSync']);
      fs.existsSync.and.returnValue(false);
    });

    it ("[1] deve salvar o arquivo e retornar 1", function(){
      let retorno = algoritmo.remove(os, fs, path);
      expect(retorno).toEqual(1);
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(path.valida).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(fs.unlinkSync).toHaveBeenCalledTimes(0);
    });
  });

});

describe("valida() -> verifica se existe arquivo json local com as informaçoes de login ->", function(){

  describe("encontra o arquivo ->", function(){
    beforeEach(function(){
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      path = jasmine.createSpyObj('path', ['valida']);
      jsonfile = jasmine.createSpyObj('jsonfile', ['readFileSync']);
      jsonfile.readFileSync.and.returnValue({user: 'usuario', password: 'senha'});

      fs = jasmine.createSpyObj('fs', ['existsSync']);
      fs.existsSync.and.returnValue(true);
    });

    it ("[1] deve retornar o arquivo", function(){
      let retorno = algoritmo.valida(os, fs, jsonfile, path);
      expect(retorno.user).toEqual('usuario');
      expect(retorno.password).toEqual('senha');
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(path.valida).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(jsonfile.readFileSync).toHaveBeenCalledTimes(1);
    });
  });

  describe("nao encontra o arquivo ->", function(){
    beforeEach(function(){
      os = jasmine.createSpyObj('os', ['platform']);
      os.platform.and.returnValue('win32');

      path = jasmine.createSpyObj('path', ['valida']);
      jsonfile = jasmine.createSpyObj('jsonfile', ['readFileSync']);

      fs = jasmine.createSpyObj('fs', ['existsSync']);
      fs.existsSync.and.returnValue(false);
    });

    it ("[1] deve retornar 0", function(){
      let retorno = algoritmo.valida(os, fs, jsonfile, path);
      expect(retorno).toEqual(0);
      expect(os.platform).toHaveBeenCalledTimes(1);
      expect(path.valida).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(jsonfile.readFileSync).toHaveBeenCalledTimes(0);
    });
  });

});
