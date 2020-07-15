const { ipcRenderer }  = require('electron');
const http = require('./http.js');

module.exports = {
  find(query){
    return new Promise(resolve => {
      http.post('/code/find', query).then(obj => {
        let retorno;
        if (obj.status == 500 || obj.status == 400){
          ipcRenderer.send('console-log-main', obj.conteudo)
          console.error(obj.conteudo);
        } else if (obj.status == 200){
          console.error('Codigo encontrado');
          ipcRenderer.send('console-log-main', 'Codigo encontrado')
          retorno = obj.conteudo;
        } else if (obj.status == 204){
          console.error('Codigo nao encontrado');
          ipcRenderer.send('console-log-main', 'Codigo nao encontrado')
        }
        resolve(retorno);
      });
    });
  },
  save(obj){
    return new Promise(resolve => {
      http.put('/code/save', obj).then(retorno => {
        let criado = false;
        if (retorno.status == 200){
          console.error('Codigo ja existente foi alterado');
          ipcRenderer.send('console-log-main', 'Codigo ja existente foi alterado')
          criado = true;
        } else if (retorno.status == 201){
          console.error('Codigo novo criado');
          ipcRenderer.send('console-log-main', 'Codigo novo criado')
          criado = true;
        }
        resolve(criado);
      });
    });
  }
}
