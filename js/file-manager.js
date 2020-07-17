const jsonfile = require('jsonfile');
const fs = require('fs');
const { ipcRenderer }  = require('electron');
const os = require('os');
let path = os.homedir()+"/.local/share";
if(os.platform() == 'win32') path = os.homedir()+'/Documents';
const mergeImages = require('merge-images');

module.exports = {
  saveLogin(nome, json){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('/My Games');
    }
    tree.push('/Tabletop Simulator');

    let caminho = validaPath(tree);
    let file = caminho + '/' + nome + '.json';

    jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  deleteLogin(){
    tree = '';
    if(os.platform() == 'win32'){
      tree += '/My Games';
    }
    tree += '/Tabletop Simulator';

    var filePath = path + tree + '/dclogin.json';

    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }
    return 1;
  },
  export(deck, json, game){
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

    let caminho = validaPath(tree);
    let file = caminho + '/' + deck.name + '.json';

    jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
      saveImg(caminho, game, deck);
      if (err) console.error(err)
    });
    return 1;
  },
  update(nome, antigo, json, game){
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

    json.Nickname = nome;
    let caminho = validaPath(tree);
    let newFile = caminho + '/' + nome + '.json';
    let oldFile = caminho + '/' + antigo + '.json';
    fs.unlinkSync(oldFile);

    jsonfile.writeFile(newFile, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  delete(name, game){
    let addGame = '';
    if(game == 'MRBC') addGame = 'MRBC';

    tree = '';
    if(os.platform() == 'win32'){
      tree += '/My Games';
    }
    tree += '/Tabletop Simulator';
    tree += '/Saves';
    tree += '/Saved Objects';
    tree += '/DeckCreator'+addGame;

    var filePath = path + tree + '/' + name;
    if(fs.existsSync(filePath + '.json')){
      fs.unlinkSync(filePath + '.json');
    }
    if(fs.existsSync(filePath + '.png')){
      fs.unlinkSync(filePath + '.png');
    }
  },
  validaLogin(){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('/My Games');
    }
    tree.push('/Tabletop Simulator');

    let caminho = validaPath(tree);

    let file = caminho + '/dclogin.json';
    if(fs.existsSync(file)){
      return jsonfile.readFileSync(file);
    }
    return 0;
  },
  clearCache(){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('/My Games');
    }
    tree.push('/Tabletop Simulator');
    tree.push('/Mods');
    tree.push('/Images');

    let caminho = validaPath(tree);
    let files = [];

    fs.readdirSync(caminho).forEach(file => {
      files.push(file);
    })

    files.forEach(excluir);
    function excluir(file, index, array){
      fs.unlinkSync(caminho + '/' + file);
    }
  },
  clearLocalFile(game){
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

    let caminho = validaPath(tree);
    let files = [];

    fs.readdirSync(caminho).forEach(file => {
      files.push(file);
    })

    files.forEach(excluir);
    function excluir(file, index, array){
      fs.unlinkSync(caminho + '/' + file);
    }
  }
}

function saveImg(caminho, game, deck){
  let arquivo = caminho + '/' + deck.name + '.png';
  let arrayImg = montaArrayImg(game, deck.heroes);

  mergeImages(arrayImg)
  .then((b64) =>{
    let base64Data = b64.replace(/^data:image\/\w+;base64,/, "");
    binaryData = Buffer.from(base64Data, 'base64');
    fs.writeFile(arquivo, binaryData, function(err) {
      if (err) throw err;
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

function validaPath(pastas) {
  let caminho = path;

  pastas.forEach(valida);
  function valida(pasta, index, array){
    caminho += pasta;
    if(!fs.existsSync(caminho)){
      fs.mkdirSync(caminho);
    }
  }
  return caminho;
}
