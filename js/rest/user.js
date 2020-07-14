const clients = require('restify-clients');
const { ipcRenderer }  = require('electron');

const client = clients.createJsonClient({
  url: 'http://localhost:3000'
});

module.exports = {
  login(user, pass){
    return new Promise(resolve => {
      getPromise('/user/login', {user: user, password: pass}).then(obj => {
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

function getPromise(path, query) {
  return new Promise(resolve => {
    client.post(path, query, function(err, req, res, obj) {
      if(err) console.log(err);
      resolve({conteudo: obj, status: res.statusCode});
    })
  });
}
