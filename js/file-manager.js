const { remote }  = require('electron');
const dialog = remote.dialog;
const jsonfile = require('jsonfile');
const fs = require('fs');
const { ipcRenderer }  = require('electron');


module.exports = {
  saveLogin(path, nome, json){
    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator/']);
    let file = caminho + nome + '.json';

    jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  deleteLogin(path){
    if(!confirmDialog('Remover Deck', 'Sim', 'Não', 'Tem certeza que deseja sair?')){
      return 0;
    }
    var filePath = path + '/My Games/Tabletop Simulator/dclogin.json';

    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
    }
    return 1;
  },
  export(path, nome, json){
    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']);
    let file = caminho + nome + '.json';

    jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  update(path, nome, antigo, json){
    // if(verificaSeExiste(this.readDir(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']), nome)){
    //   if(!confirmDialog('Deck já existente', 'Quero salvar por cima', 'Vou alterar o nome', 'Já existe um deck salvo com esse nome, o que deseja fazer?')){
    //     console.log('Salvamento Cancelado');
    //     return 0;
    //   }
    // }
    // else{
    if(!confirmDialog('Salvar Deck', 'Sim', 'Não', 'Deseja alterar o nome de "'+antigo+'" para  "'+nome+'"?')){
      console.log('Salvamento Cancelado');
      return 0;
    }
    // }
    json.Nickname = nome;
    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']);
    let newFile = caminho + nome + '.json';
    let oldFile = caminho + antigo + '.json';
    fs.unlinkSync(oldFile);

    json = {SaveName: '',GameMode: '',Gravity: 0.5,Date: '',Table: '',Sky: '',Note: '',Rules: '',XmlUI: '',LuaScript: '',ObjectStates: [json],LuaScriptState: ''};

    jsonfile.writeFile(newFile, json, {spaces: 2}, function (err) {
      if (err) console.error(err)
    });
    return 1;
  },
  delete(path, name){
    if(!confirmDialog('Remover Deck', 'Sim', 'Não', 'Tem certeza que deseja remover o deck "'+ name +'"?')){
      return 0;
    }
    var filePath = path + '/My Games/Tabletop Simulator/Saves/Saved Objects/DeckCreator/' + name + '.json';
    fs.unlinkSync(filePath);
    return 1;
  },
  readDir(path, fileTree){
    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']);
    let json = [];

    fs.readdirSync(caminho).forEach(file => {
      json.push(this.readFile(path, file, fileTree).ObjectStates[0]);
    })
    return json;
  },
  readFile(path, nome, fileTree){
    let file = validaPath(path, fileTree) + nome;
    if(fs.existsSync(file)){
      return jsonfile.readFileSync(file);
    }
    return 0;
  },
  clearCache(path){
    let caminho = validaPath(path, fileTree);
    let files = [];

    fs.readdirSync(caminho).forEach(file => {
      files.push(file);
    })

    files.forEach(excluir);
    function excluir(file, index, array){
      fs.unlinkSync(caminho + file);
    }
  }
}

function confirmDialog(title, confirm, cancel, message) {
  var choice = dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      type: 'question',
      buttons: [confirm, cancel],
      title: title,
      message: message
    });
    return choice === 0;
  }

  function validaPath(path, pastas) {
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

  function verificaSeExiste(json, nome) {
    return json.find(
      function(deck){
        return deck.Nickname == nome
      }
    );
  }
