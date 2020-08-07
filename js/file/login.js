module.exports = { save, remove, valida }

function save(json, os, jsonfile, path){ //saveLogin
  let caminho = path.valida(tree(os));
  let file = caminho + '/dclogin.json';

  jsonfile.writeFile(file, json, {spaces: 2}, function (err) {
    if (err) console.error(err)
  });
  return 1;
}

function remove(os, fs, path){ //deleteLogin
  let caminho = path.valida(tree(os));
  var filePath = caminho + '/dclogin.json';

  if(fs.existsSync(filePath)){
    fs.unlinkSync(filePath);
  }
  return 1;
}

function valida(os, fs, jsonfile, path){ //validaLogin
  let caminho = path.valida(tree(os));
  let file = caminho + '/dclogin.json';

  if(fs.existsSync(file)){
    return jsonfile.readFileSync(file);
  }
  return 0;
}

function tree(os){
  let tree = [];
  if(os.platform() == 'win32'){
    tree.push('/My Games');
  }
  tree.push('/Tabletop Simulator');
  return tree;
}
