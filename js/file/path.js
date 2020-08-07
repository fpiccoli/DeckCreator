module.exports = { local, valida }

function local(os){
  let path = os.homedir()+"/.local/share";
  if(os.platform() == 'win32') path = os.homedir()+'/Documents';
  return path;
}

function valida(pastas, os, fs) {
  let caminho = local(os);
  pastas.forEach(function (pasta, index, array) {
    caminho += pasta;
    if(!fs.existsSync(caminho)){
      fs.mkdirSync(caminho);
    }
  });
  return caminho;
}
