const { ipcRenderer }  = require('electron');
const http = require('./http.js');

module.exports = {
  login(user, pass){
    return new Promise(resolve => {
      http.post('/user/login', {user: user, password: pass}).then(obj => {
        let retorno;
        if (obj.status == 500 || obj.status == 400){
          ipcRenderer.send('console-log-main', obj.conteudo)
          console.error(obj.conteudo);
        } else if (obj.status == 200){
          retorno = obj.conteudo;
          ipcRenderer.send('console-log-main', "Login realizado com sucesso")
        } else{
          console.error("Login incorreto");
          ipcRenderer.send('console-log-main', "Login incorreto")
        }
        resolve(retorno);
      });
    });
  },
  find(query){
  },
  save(obj){
  },
  activate(email){
  },
  update(obj){
  }
}
