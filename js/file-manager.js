const { remote }  = require('electron');
const dialog = remote.dialog;
const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
  save(path, nome, json){

    // let resposta = confirmDialog();
    // if(!resposta){
    //   console.log('Salvamento Cancelado');
    //   return;
    // }

    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']);

    let file = caminho + nome + '.json';
    return jsonfile.writeFile(file, json, {spaces: 2})
    .then(() => {
      console.log('Arquivo Salvo');
    }).catch((err) => {
      console.log(err);
    })
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

function confirmDialog() {
    var choice = dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        type: 'question',
        buttons: ['Quero salvar por cima', 'Vou alterar o nome'],
        title: 'Deck já existente',
        message: 'Já existe um deck salvo com esse nome, o que deseja fazer?'
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
