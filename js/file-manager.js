const jsonfile = require('jsonfile');
const fs = require('fs');
const { ipcRenderer }  = require('electron');
const os = require('os');
let path = os.homedir()+"/.local/share";
if(os.platform() == 'win32') path = os.homedir()+'/Documents';

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
  export(nome, json, game){
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
    let file = caminho + '/' + nome + '.json';

    jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
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

    var filePath = path + tree + '/' + name + '.json';
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
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
