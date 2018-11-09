const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
  save(path, nome, json){
    let caminho = path + '/My Games/';
    valida(caminho);

    caminho += '/Tabletop Simulator/';
    valida(caminho);
    caminho += '/Saves/';
    valida(caminho);
    caminho += '/Saved Objects/';
    valida(caminho);
    caminho += '/DeckCreator/';
    valida(caminho);

    let file = caminho + nome + '.json';
    return jsonfile.writeFile(file, json, {spaces: 2})
    .then(() => {
      console.log('Arquivo Criado');
    }).catch((err) => {
      console.log(err);
    })
  }
  // ,
  // pegaDados(curso){
  //     let arquivoDoCurso = __dirname + '/data/'+ curso + '.json';
  //     return jsonfile.readFile(arquivoDoCurso);
  // }
}

function valida(caminho) {
  if(!fs.existsSync(caminho)){
    fs.mkdirSync(caminho);
  }
}
