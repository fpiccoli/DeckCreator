const algoritmo = require('../../js/file/cache.js');

let path;
let os;
let fs;

describe("clear() -> limpa os arquivos de cache do TTS ->", function () {
    beforeEach(function () {
        os = jasmine.createSpyObj('os', ['platform']);
        os.platform.and.returnValue('win32');

        fs = jasmine.createSpyObj('fs', ['readdirSync', 'unlinkSync']);
        fs.readdirSync.and.returnValue(['arquivo1.json', 'arquivo2.json', 'arquivo3.json', 'arquivo4.json']);

        path = jasmine.createSpyObj('path', ['valida']);
        path.valida.and.returnValue('C:/User/username/Documents');
    });

    it("[1] deve ler a pasta e excluir cada um dos 4 arquivos existentes", function () {
        let retorno = algoritmo.clear(os, fs, path);
        expect(os.platform).toHaveBeenCalledTimes(1);
        expect(fs.readdirSync).toHaveBeenCalledTimes(1);
        expect(fs.unlinkSync).toHaveBeenCalledTimes(4);
        expect(path.valida).toHaveBeenCalledTimes(1);
    });
});
