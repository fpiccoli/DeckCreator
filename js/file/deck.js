module.exports = { saveLocal, changeName, removeLocal, clearLocal }

function saveLocal(deck, json, game, os, jsonfile, image, path){
  let treeArray = tree(game, os);
  if(deck.grupo) {
    treeArray.push('/'+deck.grupo);
  } else {
    treeArray.push('/Other Decks');
  }
  let caminho = path.valida(treeArray);
  let file = caminho + '/' + deck.name + '.json';

  return new Promise((resolve, reject) => {
    jsonfile.writeFile(file, json, {spaces: 2}).then(res => {
      image.save(caminho, game, deck);
      resolve(true);
    }).catch(err => reject(err));
  });
}

function changeName(nome, antigo, json, game, deck, os, fs, jsonfile, image, path){
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

  return new Promise((resolve, reject) => {
    jsonfile.writeFile(newFile, json, {spaces: 2}).then(res => {
      image.save(caminho, game, deck);
      resolve(true);
    }).catch(err => reject(err));
  });
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

function clearLocal(game, os, fsExtra, path){
  let caminho = path.valida(tree(game, os));

  fsExtra.emptyDirSync(caminho);
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
