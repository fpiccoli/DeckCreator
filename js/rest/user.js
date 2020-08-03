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
        } else {
          console.error("Login incorreto");
          ipcRenderer.send('console-log-main', "Login incorreto")
        }
        resolve(retorno);
      });
    });
  },
  active(query){
    return new Promise(resolve => {
      http.post('/user/active', query).then(obj => {
        let retorno;
        if (obj.status == 500 || obj.status == 400){
          ipcRenderer.send('console-log-main', obj.conteudo)
          console.error(obj.conteudo);
        } else if (obj.status == 200){
          console.error("Usuario ou Email ja cadastrado");
          ipcRenderer.send('console-log-main', "Usuario ou Email ja cadastrado")
          retorno = obj.conteudo;
        } else {
          ipcRenderer.send('console-log-main', "Registro permitido")
        }
        resolve(retorno);
      });
    });
  },
  save(obj){
    return new Promise(resolve => {
      http.put('/user/save', obj).then(retorno => {
        let criado = false;
        if (retorno.status == 200){
          console.error('Usuario que nao estava ativo foi alterado');
          ipcRenderer.send('console-log-main', 'Usuario que nao estava ativo foi alterado')
          criado = true;
        } else if (retorno.status == 201){
          console.error('Usuario novo criado');
          ipcRenderer.send('console-log-main', 'Usuario novo criado')
          criado = true;
        }
        resolve(criado);
      });
    });
  },
  activate(email){
    return new Promise(resolve => {
      http.put('/user/activate', {email: email}).then(obj => {
        let ativado = false;
        if (obj.status == 500 || obj.status == 400){
          ipcRenderer.send('console-log-main', obj.conteudo)
          console.error(obj.conteudo);
        } else if (obj.status == 200){
          console.error('Usuario ativado');
          ipcRenderer.send('console-log-main', 'Usuario ativado')
          ativado = true;
        }
        resolve(ativado);
      });
    });
  }
}