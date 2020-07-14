const file = require('../file-manager.js');
const dataUser = require('../rest/user.js');
const alert = require('../alert-message.js');

module.exports = {
  login(user, pass, documento, ipcRenderer){
    var userFind = dataUser.login(user, pass);

    userFind.then((retorno) => {
      if(retorno){
        if(documento){
          if(documento.querySelector('#lembrar').checked){
            manterUsuario({user: user, password: pass});
          }
        }
        ipcRenderer.send('set-cookie', 'login', JSON.stringify({user: retorno.user, game: retorno.game}));
        ipcRenderer.send('redirecionar-pagina','index');
      }
      else{
        alert.message(documento.querySelector('#alert-message'), 'Login incorrect!', 'danger');
      }
    }).catch(err => ipcRenderer.send('console-log-main', err));
  }
}

function manterUsuario(json){
  file.saveLogin('dclogin', json);
}
