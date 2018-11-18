const { remote }  = require('electron');
const dialog = remote.dialog;
const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
  save(path, nome, json){
    if(!confirmDialog('Deck já existente', 'Quero salvar por cima', 'Vou alterar o nome', 'Já existe um deck salvo com esse nome, o que deseja fazer?')){
      console.log('Salvamento Cancelado');
      return 0;
    }

    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']);

    let file = caminho + nome + '.json';
    return jsonfile.writeFile(file, json, {spaces: 2})
    .then(() => {
      console.log('Arquivo Salvo');
    }).catch((err) => {
      console.log(err);
    })
  },
  delete(path, name){
    if(!confirmDialog('Remover Deck', 'Sim', 'Não', 'Tem certeza que deseja remover o deck "'+ name +'"?')){
      return;
    }
    var filePath = path + '/My Games/Tabletop Simulator/Saves/Saved Objects/DeckCreator/' + name + '.json';
    fs.unlinkSync(filePath);
  },
  readDir(path){
    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']);
    let json = [];

    fs.readdirSync(caminho).forEach(file => {
      json.push(jsonfile.readFileSync(caminho + file).ObjectStates[0]);
    })
    return json;
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
