const jsonfile = require('jsonfile');
const fs = require('fs');
const { ipcRenderer }  = require('electron');
const os = require('os');
const path = os.homedir()+'\\Documents';

module.exports = {
  saveLogin(nome, json){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('\\My Games');
    }
    tree.push('\\Tabletop Simulator');

    let caminho = validaPath(tree);
    let file = caminho + '\\' + nome + '.json';

    jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  deleteLogin(){
    tree = '';
    if(os.platform() == 'win32'){
      tree += '\\My Games';
    }
    tree += '\\Tabletop Simulator';

    var filePath = path + tree + '\\dclogin.json';

    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }
    return 1;
  },
  export(nome, json){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('\\My Games');
    }
    tree.push('\\Tabletop Simulator');
    tree.push('\\Saves');
    tree.push('\\Saved Objects');
    tree.push('\\DeckCreator');

    let caminho = validaPath(tree);
    let file = caminho + '\\' + nome + '.json';

    jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  update(nome, antigo, json){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('\\My Games');
    }
    tree.push('\\Tabletop Simulator');
    tree.push('\\Saves');
    tree.push('\\Saved Objects');
    tree.push('\\DeckCreator');

    json.Nickname = nome;
    let caminho = validaPath(tree);
    let newFile = caminho + '\\' + nome + '.json';
    let oldFile = caminho + '\\' + antigo + '.json';
    fs.unlinkSync(oldFile);

    json = {SaveName: '',GameMode: '',Gravity: 0.5,Date: '',Table: '',Sky: '',Note: '',Rules: '',XmlUI: '',LuaScript: '',ObjectStates: [json],LuaScriptState: ''};

    jsonfile.writeFile(newFile, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  delete(name){
    tree = '';
    if(os.platform() == 'win32'){
      tree += '\\My Games';
    }
    tree += '\\Tabletop Simulator';
    tree += '\\Saves';
    tree += '\\Saved Objects';
    tree += '\\DeckCreator';

    var filePath = path + tree + '\\' + name + '.json';
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }
  },
  validaLogin(){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('\\My Games');
    }
    tree.push('\\Tabletop Simulator');

    let caminho = validaPath(tree);

    let file = caminho + '\\dclogin.json';
    if(fs.existsSync(file)){
      return jsonfile.readFileSync(file);
    }
    return 0;
  },
  clearCache(){
    let tree = [];
    if(os.platform() == 'win32'){
      tree.push('\\My Games');
    }
    tree.push('\\Tabletop Simulator');
    tree.push('\\Mods');
    tree.push('\\Images');

    let caminho = validaPath(tree);
    let files = [];

    fs.readdirSync(caminho).forEach(file => {
      files.push(file);
    })

    files.forEach(excluir);
    function excluir(file, index, array){
      fs.unlinkSync(caminho + '\\' + file);
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
