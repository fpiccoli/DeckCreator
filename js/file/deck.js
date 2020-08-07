module.exports = { saveLocal, changeName, removeLocal, clearLocal }

function saveLocal(deck, json, game, mergeImg, os, fs, jsonfile, path){
  let treeArray = tree(game, os);
  if(deck.grupo) {
    treeArray.push('/'+deck.grupo);
  } else {
    treeArray.push('/Other Decks');
  }
  let caminho = path.valida(treeArray);
  let file = caminho + '/' + deck.name + '.json';

  jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
    saveImg(caminho, game, deck, mergeImg, fs);
    if (err) console.error(err)
  });
  return 1;
}

function changeName(nome, antigo, json, game, deck, mergeImg, os, fs, jsonfile, path){
  json.Nickname = nome;
  let caminho = path.valida(tree(game, os));
  let newFile = caminho + '/' + deck.grupo + '/' + nome + '.json';
  let oldFile = caminho + '/' + deck.grupo + '/' + antigo;

  if(fs.existsSync(oldFile + '.json')){
    fs.unlinkSync(oldFile + '.json');
  }
  if(fs.existsSync(oldFile + '.png')){
    fs.unlinkSync(oldFile + '.png');
  }

  jsonfile.writeFile(newFile, json, {spaces: 2}, function (err) {
    saveImg(caminho, game, deck, mergeImg, fs);
    if (err) console.error(err)
  });
  return 1;
}

function removeLocal(deck, game, os, fs, path){
  let caminho = path.valida(tree(game, os));
  var filePath = caminho + '/' + deck.grupo + '/' + deck.name;

  if(fs.existsSync(filePath + '.json')){
    fs.unlinkSync(filePath + '.json');
  }
  if(fs.existsSync(filePath + '.png')){
    fs.unlinkSync(filePath + '.png');
  }
}

function clearLocal(game, os, fs, fsExtra, path){
  let caminho = path.valida(tree(game, os));
  let files = [];

  fsExtra.emptyDirSync(caminho);
}

function saveImg(caminho, game, deck, mergeImg, fs){
  let arquivo = caminho + '/' + deck.name + '.png';
  let arrayImg = montaArrayImg(game, deck.heroes);

  mergeImg(arrayImg)
  .then((b64) =>{
    let base64Data = b64.replace(/^data:image\/\w+;base64,/, "");
    binaryData = Buffer.from(base64Data, 'base64');
    fs.writeFile(arquivo, binaryData, function(err) {
      if (err) console.error(err);
    });
  });
}

function montaArrayImg(game, images){
  let stringImg = 'https://drive.google.com/uc?export=download&id=';
  let bgMRBC = '1DcyZHx91CWfPAme_r1yhphlivyMkPa7l';
  let bgMD = '1u8jln2C6Johb-RHmBExTo3TXaG4exW1W';

  let array = [
    { src: stringImg+bgMD, x: 0, y: 0, opacity: 0.1},
    { src: images[0] ? stringImg+images[0].imgurl : stringImg+bgMD, x: 1, y: 120},
    { src: images[1] ? stringImg+images[1].imgurl : stringImg+bgMD, x: 180, y: 120 },
    { src: images[2] ? stringImg+images[2].imgurl : stringImg+bgMD, x: 360, y: 120 }
  ];
  if (game == 'MRBC'){
    array = [{ src: stringImg+bgMRBC, x: 0, y: 0, opacity: 0.1},
      { src: images[0] ? stringImg+images[0].imgurl : stringImg+bgMRBC, x: 1, y: 190},
      { src: images[1] ? stringImg+images[1].imgurl : stringImg+bgMRBC, x: 260, y: 190 },
      { src: images[2] ? stringImg+images[2].imgurl : stringImg+bgMRBC, x: 520, y: 190 }
    ];
  }
  return array;
}

function tree(game, os){
  let addGame = '';
  if(game == 'MRBC') addGame = 'MRBC';

  let tree = [];
  if(os.platform() == 'win32'){
    tree.push('/My Games');
  }
  tree.push('/Tabletop Simulator');
  tree.push('/Saves');
  tree.push('/Saved Objects');
  tree.push('/DeckCreator'+addGame);

  return tree;
}
