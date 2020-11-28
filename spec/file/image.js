const algoritmo = require('../../js/file/image.js');

let mergeImg;
let fs;

function mock(){
  return (param1) => {
    return new Promise(resolve => {
      resolve('data:image/png;base64,123456789');
    });
  }
}

describe("save() -> crias e salva as imagens do deck ->", function(){

  describe("salva com sucesso ->", function(){
    beforeEach(function(){
      fs = jasmine.createSpyObj('fs', ['writeFile']);
      fs.writeFile.and.returnValue(null);

      let args = [
        { src: 'https://drive.google.com/uc?export=download&id=1u8jln2C6Johb-RHmBExTo3TXaG4exW1W', x: 0, y: 0, opacity: 0.1 },
        { src: 'https://drive.google.com/uc?export=download&id=imagem-heroi1', x: 1, y: 120 },
        { src: 'https://drive.google.com/uc?export=download&id=imagem-heroi2', x: 180, y: 120 },
        { src: 'https://drive.google.com/uc?export=download&id=imagem-heroi3', x: 360, y: 120 }
      ];

      mergeImg = jasmine.createSpy('mergeImg');
      mergeImg.withArgs(args).and.callFake(mock());
    });

    it ("[1] deve retornar true", function(){
      let herois = [{imgurl: 'imagem-heroi1'}, {imgurl: 'imagem-heroi2'}, {imgurl: 'imagem-heroi3'}];
      let deck = {name: 'NomeDoDeck', heroes: herois};

      algoritmo.save('caminho', 'M&D', deck, mergeImg, fs)
      .then(function(retorno) {
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
        { src: 'https://drive.google.com/uc?export=download&id=1DcyZHx91CWfPAme_r1yhphlivyMkPa7l', x: 0, y: 0, opacity: 0.1 },
        { src: 'https://drive.google.com/uc?export=download&id=imagem-heroi1', x: 1, y: 190 },
        { src: 'https://drive.google.com/uc?export=download&id=imagem-heroi2', x: 260, y: 190 },
        { src: 'https://drive.google.com/uc?export=download&id=imagem-heroi3', x: 520, y: 190 }
      ];

      mergeImg = jasmine.createSpy('mergeImg');
      mergeImg.withArgs(args).and.callFake(mock());
    });

    it ("[1] deve retornar um erro", async function(){
      let herois = [{imgurl: 'imagem-heroi1'}, {imgurl: 'imagem-heroi2'}, {imgurl: 'imagem-heroi3'}];
      let deck = {name: 'NomeDoDeck', heroes: herois};

      let retorno = algoritmo.save('caminho', 'MRBC', deck, mergeImg, fs);
      await expectAsync(retorno).toBeRejected();
      await expectAsync(retorno).toBeRejectedWithError('Teste Error');
      expect(mergeImg).toHaveBeenCalledTimes(1);
      expect(fs.writeFile).toHaveBeenCalledTimes(1);
    });
  });

});
