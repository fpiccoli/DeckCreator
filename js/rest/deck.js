const { ipcRenderer }  = require('electron');
const http = require('./http.js');
const cognito = require('../login/cognito.js');

module.exports = { find, exists, public, grupo, recipe, remove, update, save }

function find(user, game, token){
  console.log(token);
  return new Promise((resolve, reject) => {
    http.post(http.stage()+'/deck/'+http.valida(game)+'/list', {user: user.toLowerCase(), recipe: null}, token)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => {
      if (err.body.message == 'The incoming token has expired'){
        cognito.getSessionStorage().then((obj) => {
          cognito.refresh(obj.cognitoUser, obj.session).then((retorno) => {
            ipcRenderer.send('set-cookie', 'login', JSON.stringify(retorno));
            resolve(find(user, game, retorno.idToken));
          }).catch(err => console.log(err));
        }).catch(err => {
          if (err.code == 'NotAuthorizedException'){
            ipcRenderer.send('clear-cookies');
            ipcRenderer.send('redirecionar-pagina','login');
          }
          else console.log(err);
        });
      } else {
        reject(err)
      }
    });
  });
}

function exists(deck, game, token){
  return new Promise((resolve, reject) => {
    http.post(http.stage()+'/deck/'+http.valida(game)+'/find', {name: deck.name, user: deck.user, recipe: null}, token)
    .then(obj => {
      let retorno;
      if (obj.status == 500 || obj.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo);
        console.error(retorno.conteudo);
        retorno = {error: true};
      } else if (obj.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game');
        console.error('Erro no game');
        retorno = {error: true};
      } else if (obj.status == 200){
        console.error('Deck ja cadastrado com este nome');
        ipcRenderer.send('console-log-main', 'Deck ja cadastrado com este nome');
        retorno = {error: false, exists:true};
      } else if (obj.status == 204){
        console.error('Deck pode ser cadastrado com este nome');
        ipcRenderer.send('console-log-main', 'Deck pode ser cadastrado com este nome');
        retorno = {error: false, exists:false};
      }
      resolve(retorno);
    }).catch(err => reject(err));
  });
}

function public(game){
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/deck/'+http.valida(game)+'/public', null)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}

function recipe(game){
  return new Promise((resolve, reject) => {
    http.get(http.stage()+'/deck/'+http.valida(game)+'/recipe', null)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}

function grupo(user, game, token){
  return new Promise((resolve, reject) => {
    http.post(http.stage()+'/deck/'+http.valida(game)+'/group', {user: user.toLowerCase()}, token)
    .then(retorno => {
      resolve(retorno.conteudo);
    }).catch(err => reject(err));
  });
}

function remove(nome, user, game, token){
  return new Promise((resolve, reject) => {
    http.remove(http.stage()+'/deck/delete/'+http.valida(game), {name: nome, user: user, recipe: null}, token)
    .then(retorno => {
      let deletado;
      if (retorno.status == 500 || retorno.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo)
        console.error(retorno.conteudo);
      } else if (retorno.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game')
        console.error('Erro no game');
      } else if (retorno.status == 200){
        console.error('Deck deletado');
        ipcRenderer.send('console-log-main', 'Deck deletado')
        deletado = retorno.conteudo.deleted;
      }
      resolve(deletado);
    }).catch(err => reject(err));
  });
}

function update(deck, novoNome, nomeAntigo, game, token){
  deck.name = novoNome;
  deck.nomeAntigo = nomeAntigo;
  return new Promise(resolve => {
    http.put(http.stage()+'/deck/'+http.valida(game)+'/save', deck, token)
    .then(retorno => {
      let criado = false;
      if (retorno.status == 500 || retorno.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo)
        console.error(retorno.conteudo);
      } else if (retorno.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game')
        console.error('Erro no game');
      } else if (retorno.status == 200){
        console.error('Deck ja existente foi alterado');
        ipcRenderer.send('console-log-main', 'Deck ja existente foi alterado')
        criado = true;
      } else if (retorno.status == 201){
        console.error('Deck novo criado');
        ipcRenderer.send('console-log-main', 'Deck novo criado')
        criado = true;
      }
      resolve(criado);
    }).catch(err => reject(err));
  });
}

function save(deck, game, token){
  return new Promise((resolve, reject) => {
    http.put(http.stage()+'/deck/'+http.valida(game)+'/save', deck, token)
    .then(retorno => {
      let criado = false;
      if (retorno.status == 500 || retorno.status == 400){
        ipcRenderer.send('console-log-main', retorno.conteudo)
        console.error(retorno.conteudo);
      } else if (retorno.status == 404){
        ipcRenderer.send('console-log-main', 'Erro no game')
        console.error('Erro no game');
      } else if (retorno.status == 200){
        console.error('Deck ja existente foi alterado');
        ipcRenderer.send('console-log-main', 'Deck ja existente foi alterado')
        criado = true;
      } else if (retorno.status == 201){
        console.error('Deck novo criado');
        ipcRenderer.send('console-log-main', 'Deck novo criado')
        criado = true;
      }
      resolve(criado);
    }).catch(err => reject(err));
  });
}
