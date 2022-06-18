module.exports = { save }

function save(caminho, game, deck, mergeImg, fs) {
  let arquivo = caminho + '/' + deck.name + '.png';

  let arrayImg = montaArray(game, deck.heroes);

  return mergeImg(arrayImg)
    .then((b64) => {
      let base64Data = b64.replace(/^data:image\/\w+;base64,/, "");
      binaryData = Buffer.from(base64Data, 'base64');

      return new Promise(function (resolve, reject) {
        let error = fs.writeFile(arquivo, binaryData, function (err) {
          return err;
        });
        if (error) reject(error);
        else resolve(true);
      });
    });
}

function montaArray(game, images) {
  let array = [];

  let posY = 120;
  let posX1 = 1;
  let posX2 = 180;
  let posX3 = 360;
  let bg = 'md/bg-deckcreator.png';

  if (game === 'MRBC') {
    posY = 190;
    posX2 = 260;
    posX3 = 520;
    bg = 'mrbc/bg-deckcreator.png';
  }

  array = [
    { src: 'https://tabletop-simulator-mods.s3.amazonaws.com/' + bg, x: 0, y: 0, opacity: 0.1 },
    montaObj(game, images[0], posX1, posY), montaObj(game, images[1], posX2, posY), montaObj(game, images[2], posX3, posY)
  ];
  return array;
}

function montaObj(game, obj, posX, posY) {
  let subtype = 'pure';
  if (obj.main !== obj.sub) {
    subtype = 'hybrid';
  }

  let retorno = { src: obj ? '../img/' + game + '/cards/' + subtype + '/' + obj.cardnumber + '.png' : bg, x: posX, y: posY };

  return retorno
}
