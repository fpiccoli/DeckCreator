module.exports = { save }

function save(caminho, game, deck, mergeImg, fs){
  let arquivo = caminho + '/' + deck.name + '.png';
  let arrayImg = montaArray(game, deck.heroes);

  return mergeImg(arrayImg)
  .then((b64) =>{
    let base64Data = b64.replace(/^data:image\/\w+;base64,/, "");
    binaryData = Buffer.from(base64Data, 'base64');

    return new Promise(function(resolve, reject) {
      let error = fs.writeFile(arquivo, binaryData, function(err) {
        return err;
      });
      if (error) reject(error);
      else resolve(true);
    });
  });
}

function montaArray(game, images){
  let stringImg = 'https://drive.google.com/uc?export=download&id=';
  let bgMRBC = '1DcyZHx91CWfPAme_r1yhphlivyMkPa7l';
  let bgMD = '1u8jln2C6Johb-RHmBExTo3TXaG4exW1W';

  let array = [
    { src: stringImg + bgMD, x: 0, y: 0, opacity: 0.1},
    { src: images[0] ? stringImg + images[0].imgurl : stringImg + bgMD, x: 1, y: 120},
    { src: images[1] ? stringImg + images[1].imgurl : stringImg + bgMD, x: 180, y: 120 },
    { src: images[2] ? stringImg + images[2].imgurl : stringImg + bgMD, x: 360, y: 120 }
  ];
  if (game == 'MRBC'){
    array = [{ src: stringImg+bgMRBC, x: 0, y: 0, opacity: 0.1},
      { src: images[0] ? stringImg + images[0].imgurl : stringImg + bgMRBC, x: 1, y: 190},
      { src: images[1] ? stringImg + images[1].imgurl : stringImg + bgMRBC, x: 260, y: 190 },
      { src: images[2] ? stringImg + images[2].imgurl : stringImg + bgMRBC, x: 520, y: 190 }
    ];
  }
  return array;
}
