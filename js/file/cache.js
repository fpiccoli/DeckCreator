module.exports = { clear }

function clear(os, fs, path){
  let caminho = path.valida(tree(os));
  let files = [];

  fs.readdirSync(caminho).forEach(file => {
    files.push(file);
  })

  files.forEach(function (file, index, array) {
    fs.unlinkSync(caminho + '/' + file);
  });
}

function tree(os){
  let tree = [];
  if(os.platform() == 'win32'){
    tree.push('/My Games');
  }
  tree.push('/Tabletop Simulator');
  tree.push('/Mods');
  tree.push('/Images');
  return tree;
}
