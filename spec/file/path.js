const algoritmo = require('../../js/file/path.js');

let os;
let fs;
let pastas;

describe("local() -> devolve informaçoes sobre o sistema ->", function () {

    describe("(windows) ->", function () {
        beforeEach(function () {
            os = jasmine.createSpyObj('os', ['homedir', 'platform']);
            os.homedir.and.returnValue('C:/User/username');
            os.platform.and.returnValue('win32');
        });

        it("[1] deve retornar o diretorio padrao do windows + o caminho ", function () {
            let retorno = algoritmo.local(os);
            expect(retorno).toEqual(`C:/User/username/Documents`);
            expect(os.homedir).toHaveBeenCalledTimes(2);
            expect(os.platform).toHaveBeenCalledTimes(1);
        });
    });

    describe("(linux) ->", function () {
        beforeEach(function () {
            os = jasmine.createSpyObj('os', ['homedir', 'platform']);
            os.homedir.and.returnValue('~');
            os.platform.and.returnValue('linux');
        });

        it("[1] deve retornar o diretorio padrao do linux + o caminho ", function () {
            let retorno = algoritmo.local(os);
            expect(retorno).toEqual(`~/.local/share`);
            expect(os.homedir).toHaveBeenCalledTimes(1);
            expect(os.platform).toHaveBeenCalledTimes(1);
        });
    });

});

describe("valida() -> verifica a existência de pastas e cria se necessario ->", function () {

    describe("encontra a pasta ->", function () {
        beforeEach(function () {
            os = jasmine.createSpyObj('os', ['homedir', 'platform']);
            os.homedir.and.returnValue('C:/User/username');
            os.platform.and.returnValue('win32');

            fs = jasmine.createSpyObj('fs', ['existsSync', 'mkdirSync']);
            fs.existsSync.and.returnValue(true);

            pastas = ['/Pasta1', '/Pasta2', '/Pasta3'];
        });

        it("[1] deve verificar a arvore de pastas, nao criar nova pasta e devolver a string do caminho ", function () {
            let retorno = algoritmo.valida(pastas, os, fs);
            expect(retorno).toEqual(`C:/User/username/Documents/Pasta1/Pasta2/Pasta3`);
            expect(os.homedir).toHaveBeenCalledTimes(2);
            expect(os.platform).toHaveBeenCalledTimes(1);
            expect(fs.existsSync).toHaveBeenCalledTimes(3);
            expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
        });
    });

    describe("nao encontra a pasta ->", function () {
        beforeEach(function () {
            os = jasmine.createSpyObj('os', ['homedir', 'platform']);
            os.homedir.and.returnValue('C:/User/username');
            os.platform.and.returnValue('win32');

            fs = jasmine.createSpyObj('fs', ['existsSync', 'mkdirSync']);
            fs.existsSync.and.returnValue(false);

            pastas = ['/Pasta1', '/Pasta2', '/Pasta3'];
        });

        it("[1] deve verificar a arvore de pastas, criar as pastas e devolver a string do caminho ", function () {
            let retorno = algoritmo.valida(pastas, os, fs);
            expect(retorno).toEqual(`C:/User/username/Documents/Pasta1/Pasta2/Pasta3`);
            expect(os.homedir).toHaveBeenCalledTimes(2);
            expect(os.platform).toHaveBeenCalledTimes(1);
            expect(fs.existsSync).toHaveBeenCalledTimes(3);
            expect(fs.mkdirSync).toHaveBeenCalledTimes(3);
        });
    });

});
