const alert = require('../manager/interface/alert.js');
const file = require('../file/interface/login.js');
const dataUser = require('../rest/user.js');

module.exports = { login }

function login(user, pass){
  // dataUser.login(user, md5(pass))
  // .then((retorno) => {
  //   if(retorno){
  //     validarCognito().then((retorno) => {
  //       if(document.querySelector('#lembrar').checked){
  //         manterUsuario({user: user, password: md5(pass)});
  //       }
  //       ipcRenderer.send('set-cookie', 'login', JSON.stringify({user: retorno.user, game: retorno.game}));
  //       ipcRenderer.send('redirecionar-pagina','index');
  //     }).catch(err => ipcRenderer.send('console-log-main', err));
  //   }
  //   else{
  //     alert.message(document.querySelector('#alert-message'), 'Login incorrect!', 'danger');
  //   }
  // }).catch(err => ipcRenderer.send('console-log-main', err));
}

function validarCognito(){
  // return new Promise((resolve, reject) => {
    // http.get(http.stage()+'/version/list')
  //   .then(retorno => {
  //     resolve(retorno);
  //   }).catch(err => reject(err));
  // });
}

function manterUsuario(json){
  file.save(json);
}
