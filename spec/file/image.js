const algoritmo = require('../../js/file/image.js');

let mergeImg;
let fs;

function mock() {
  return (param1) => {
    return new Promise(resolve => {
      resolve('data:image/png;base64,123456789');
    });
  }
}

describe("save() -> crias e salva as imagens do deck ->", function () {

  describe("salva com sucesso ->", function () {
    beforeEach(function () {
      fs = jasmine.createSpyObj('fs', ['writeFile']);
      fs.writeFile.and.returnValue(null);

      let args = [
        { src: 'https://tabletop-simulator-mods.s3.amazonaws.com/md/bg-deckcreator.png', x: 0, y: 0, opacity: 0.1 },
        { src: '../../img/M&D/cards/pure/P12.png', x: 1, y: 120 },
        { src: '../../img/M&D/cards/pure/P13.png', x: 180, y: 120 },
        { src: '../../img/M&D/cards/hybrid/H14.png', x: 360, y: 120 }
      ];

      mergeImg = jasmine.createSpy('mergeImg');
      mergeImg.withArgs(args).and.callFake(mock());
    });

    it("[1] deve retornar true", function () {
      let herois = [
        { cardnumber: 'P12', main: 'Ranger', sub: 'Ranger' },
        { cardnumber: 'P13', main: 'Barbarian', sub: 'Barbarian' },
        { cardnumber: 'H14', main: 'Bard', sub: 'Cleric' }
      ];
      let deck = { name: 'NomeDoDeck', heroes: herois };

      algoritmo.save('caminho', 'M&D', deck, mergeImg, fs, '../../img/')
        .then(function (retorno) {
          expect(retorno).toBeTruthy();
          expect(mergeImg).toHaveBeenCalledTimes(1);
          expect(fs.writeFile).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe("erro ao salvar arquivo ->", function(){
    beforeEach(function(){
      fs = jasmine.createSpyObj('fs', ['writeFile']);
      fs.writeFile.and.returnValue(new Error('Teste Error'));
      
      let args = [
        { src: 'https://tabletop-simulator-mods.s3.amazonaws.com/mrbc/bg-deckcreator.png', x: 0, y: 0, opacity: 0.1 },
        { src: '../../img/MRBC/cards/pure/123.png', x: 1, y: 190 },
        { src: '../../img/MRBC/cards/pure/124.png', x: 260, y: 190 },
        { src: '../../img/MRBC/cards/hybrid/321.png', x: 520, y: 190 }
      ];

      mergeImg = jasmine.createSpy('mergeImg');
      mergeImg.withArgs(args).and.callFake(mock());
    });

    it ("[1] deve retornar um erro", async function(){
      let herois = [
        { cardnumber: '123', main: 'Suezo', sub: 'Suezo' },
        { cardnumber: '124', main: 'Mocchi', sub: 'Mocchi' },
        { cardnumber: '321', main: 'Tiger', sub: 'Hare' }
      ];
      let deck = {name: 'NomeDoDeck', heroes: herois};

      let retorno = algoritmo.save('caminho', 'MRBC', deck, mergeImg, fs, '../../img/');
      await expectAsync(retorno).toBeRejected();
      await expectAsync(retorno).toBeRejectedWithError('Teste Error');
      expect(mergeImg).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
    });
  });

});
