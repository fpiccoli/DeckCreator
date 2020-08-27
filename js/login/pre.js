const { ipcRenderer }  = require('electron');
const cookie = require('../manager/interface/cookie.js');
const file = require('../file/interface/login.js');
const cognito = require('./cognito.js');

var package = require('../../package.json');
document.querySelector('#title').innerHTML = package.productName + ' v' + package.version;

cookie.login().then((user) => {
  if(user){
    ipcRenderer.send('redirecionar-pagina','index');
  } else{
    let login = file.valida();
    if(login){
      refresh(login)
    } else{
      ipcRenderer.send('redirecionar-pagina','login');
    }
  }
}).catch(err => console.log(err));

function refresh(login, game){
  cognito.refreshSession(login)
  .then((retorno) => {
    logged(login.user, game, retorno);
  }).catch(err => {
    alert.message(document.querySelector('#alert-message'), err.message, 'danger');
  });
}

function logged(user, game, access){
  let idToken = access.idToken;
  let refreshToken = access.refreshToken;
  file.save({user: user, rftkn: refreshToken});

  ipcRenderer.send('set-cookie', 'login', JSON.stringify({user: user, game: game, idToken: idToken, refreshToken: refreshToken}));
  ipcRenderer.send('redirecionar-pagina','index');
}
