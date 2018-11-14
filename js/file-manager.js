const jsonfile = require('jsonfile');
const fs = require('fs');

module.exports = {
  save(path, nome, json){

    let caminho = validaPath(path, ['/My Games','/Tabletop Simulator','/Saves','/Saved Objects','/DeckCreator/']);

    let file = caminho + nome + '.json';
    return jsonfile.writeFile(file, json, {spaces: 2})
    .then(() => {
      console.log('Arquivo Criado');
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
