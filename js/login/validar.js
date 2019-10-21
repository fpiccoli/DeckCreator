const file = require('../file-manager.js');
const data = require('../data-mongo.js');
const alert = require('../alert-message.js');

module.exports = {
  login(user, pass, documento, ipcRenderer){
    data.login(user, pass).then((retorno) => {
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
        ipcRenderer.send('redirecionar-pagina','login');
        alert.message(documento.querySelector('#alert-message'), 'Login incorreto!', 'danger');
      }
    }).catch(err => ipcRenderer.send('console-log-main', err));
  }
}

function manterUsuario(json){
  file.saveLogin('dclogin', json);
}
