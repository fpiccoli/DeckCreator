module.exports = { clearCache }

function clearCache(os, fs, path){


  let caminho = path.valida(tree());
  let files = [];

  fs.readdirSync(caminho).forEach(file => {
    files.push(file);
  })

  files.forEach(excluir);
  function excluir(file, index, array){
    fs.unlinkSync(caminho + '/' + file);
  }
}

function tree(){
  let tree = [];
  if(os.platform() == 'win32'){
    tree.push('/My Games');
  }
  tree.push('/Tabletop Simulator');
  tree.push('/Mods');
  tree.push('/Images');
  return tree;
}
